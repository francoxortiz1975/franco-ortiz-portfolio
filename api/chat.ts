/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTION, MODEL_NAME } from './_profile.js';

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_TURNS = 8;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 15;

// Best-effort in-memory limiter: resets whenever the serverless instance is
// recycled, and isn't shared across regions/instances. Good enough to blunt
// casual abuse on a portfolio site without needing external storage.
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

type ChatTurn = { role: 'user' | 'model'; text: string };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
    || req.socket.remoteAddress
    || 'unknown';

  if (isRateLimited(ip)) {
    res.status(429).json({ error: 'Too many requests. Try again in a few minutes.' });
    return;
  }

  const { message, history } = req.body ?? {};

  if (typeof message !== 'string' || !message.trim()) {
    res.status(400).json({ error: 'Missing "message" string.' });
    return;
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    res.status(400).json({ error: `Message too long (max ${MAX_MESSAGE_LENGTH} characters).` });
    return;
  }

  const safeHistory: ChatTurn[] = Array.isArray(history)
    ? history
        .filter((t): t is ChatTurn =>
          t && (t.role === 'user' || t.role === 'model') && typeof t.text === 'string'
        )
        .slice(-MAX_HISTORY_TURNS)
    : [];

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Server misconfiguration: missing API key.' });
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        ...safeHistory.map((turn) => ({ role: turn.role, parts: [{ text: turn.text }] })),
        { role: 'user', parts: [{ text: message }] },
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4,
        maxOutputTokens: 400,
      },
    });

    res.status(200).json({ reply: response.text ?? '' });
  } catch (err) {
    console.error('Gemini chat error:', err);
    res.status(502).json({ error: 'The assistant is unavailable right now. Try again shortly.' });
  }
}
