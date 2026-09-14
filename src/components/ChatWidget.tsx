/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import type { Language } from '../App';

type Message = { role: 'user' | 'model'; text: string };

const copy: Record<Language, {
  title: string;
  subtitle: string;
  placeholder: string;
  greeting: string;
  error: string;
  ariaOpen: string;
  ariaClose: string;
}> = {
  en: {
    title: 'ask about franco',
    subtitle: 'AI assistant • trained on this page',
    placeholder: 'Ask about his experience, projects...',
    greeting: "Hi! I can answer questions about Franco's background, projects, and experience. What would you like to know?",
    error: "Something went wrong. Please try again in a moment.",
    ariaOpen: 'Open chat about Franco',
    ariaClose: 'Close chat',
  },
  fr: {
    title: 'demandez sur franco',
    subtitle: 'Assistant IA • basé sur cette page',
    placeholder: 'Demandez son expérience, ses projets...',
    greeting: "Bonjour ! Je peux répondre à vos questions sur le parcours, les projets et l'expérience de Franco. Que voulez-vous savoir ?",
    error: "Une erreur est survenue. Réessayez dans un instant.",
    ariaOpen: 'Ouvrir le chat sur Franco',
    ariaClose: 'Fermer le chat',
  },
  es: {
    title: 'pregunta sobre franco',
    subtitle: 'Asistente IA • entrenado con esta página',
    placeholder: 'Pregunta por su experiencia, proyectos...',
    greeting: '¡Hola! Puedo responder preguntas sobre el recorrido, los proyectos y la experiencia de Franco. ¿Qué te gustaría saber?',
    error: 'Algo salió mal. Intenta de nuevo en un momento.',
    ariaOpen: 'Abrir chat sobre Franco',
    ariaClose: 'Cerrar chat',
  },
};

export default function ChatWidget({ lang }: { lang: Language }) {
  const t = copy[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const nextHistory = [...messages, { role: 'user' as const, text }];
    setMessages(nextHistory);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: messages }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'request_failed');
      setMessages([...nextHistory, { role: 'model', text: data.reply || '' }]);
    } catch {
      setError(t.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? t.ariaClose : t.ariaOpen}
        className="btn-aura !fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? 'close' : 'open'}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="flow-edge-card !fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[28rem] max-h-[70vh] rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/10 shrink-0">
              <h3 className="font-[family-name:var(--font-sans)] text-[0.85em] text-white lowercase tracking-wide">
                {t.title}
              </h3>
              <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-muted-2)] mt-1 lowercase">
                {t.subtitle}
              </p>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              <div className="flex">
                <div className="max-w-[85%] rounded-xl px-3.5 py-2.5 bg-white/[0.04] border border-white/10 font-[family-name:var(--font-mono)] text-[12px] text-[var(--text-card-body)] leading-relaxed">
                  {t.greeting}
                </div>
              </div>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 font-[family-name:var(--font-mono)] text-[12px] leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[var(--accent-blue)]/15 border border-[var(--accent-blue)]/30 text-[var(--text-primary)]'
                        : 'bg-white/[0.04] border border-white/10 text-[var(--text-card-body)]'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-xl px-3.5 py-2.5 bg-white/[0.04] border border-white/10 text-[var(--text-muted-2)]">
                    <Loader2 size={14} className="animate-spin" />
                  </div>
                </div>
              )}
              {error && (
                <div className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--aura-red-edge,#ff5478)] px-1">
                  {error}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 shrink-0 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.placeholder}
                maxLength={500}
                className="flex-1 bg-[var(--bg-surface)] border border-white/10 rounded-lg px-3.5 py-2.5 font-[family-name:var(--font-mono)] text-[12px] text-white placeholder:text-white/20 outline-none focus:border-white/25 transition-colors"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                aria-label="Send"
                className="btn-aura shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
