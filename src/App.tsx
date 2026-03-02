/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, Github, Mail, Send, ExternalLink, Menu, X, ChevronDown, Rocket, Heart, Globe, Code } from 'lucide-react';

type Language = 'en' | 'fr' | 'es';

const translations = {
  en: {
    nav: {
      home: 'Home',
      work: 'My Work',
      contact: 'Say Hi',
      about: 'About Me',
    },
    hero: {
      role: 'ABOUT ME',
      title: "Hola, hello there!",
      description: " I'm a… well I… err… I suppose software engineer is the right word. That sounds a little pretentious, though, doesn't it? I like to build things, and I've been doing that for a while. That seems fair.",
      stats: [
      ],
      button: 'Take a look at my work'
    },
    work: {
      title: 'Stuff I\'ve Built',
      more: 'Check out my Github',
    },
    contact: {
      label: 'Contact',
      title: 'Let\'s Chat?',
      description: "I'm always open to new opportunities, collaborations, or just a friendly chat. I'd be pleased to meet you, so send me an email!",
      button: 'Connect on LinkedIn',
      form: {
        name: 'What\'s your name?',
        email: 'Your email?',
        subject: 'What\'s your subject?',
        message: 'Tell me everything...',
        submit: 'Send it!',
        placeholders: {
          name: 'Obiwan Kenobi',
          email: 'obiwan@example.com',
          subject: 'Let\'s build something cool',
          message: 'I have this crazy idea...'
        }
      }
    },
    about: {
      title: 'A bit more about me',
      p1: 'I was born in Quito and carry with me a deep appreciation for culture, human sensitivity, and creativity. This is reflected not only in my projects, but also in my daily life, both professionally and personally.',
      p2: 'I completed my degree in France, an experience that broadened my perspective and allowed me to discover a new way of understanding culture, an academic system, and inspiring people, both personally and professionally.',
      p3: 'Later, I had the opportunity to take part in an exchange at the University of Toronto, where I strengthened my technical skills in project development, including this website.',
      p4: 'For me, computer science is the meeting point between a creative and a technical life. It is the space where ideas, guided by logic, can take on meaningful and powerful forms.',
      p5: 'In short: i am under construction :)'
    },
    footer: {
      rights: 'All Rights Reserved. Made with <3 (and lots of coffee)'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      work: 'Mes Projets',
      contact: 'Dis Bonjour',
      about: 'À Propos',
    },
    hero: {
      role: 'À PROPOS',
      title: "Eh bien, bonjour !",
      description: "Je suis un… enfin je… euh… je suppose qu'ingénieur informaticien est le bon mot. Ça sonne un peu prétentieux, non ? J'aime construire des choses, et je fais ça depuis un moment. ",
      stats: [
      ],
      button: 'Jeter un œil à mon travail'
    },
    work: {
      title: 'Choses que j\'ai construites',
      more: 'Voir mon Github',
    },
    contact: {
      label: 'Contact',
      title: 'On discute ?',
      description: "Je suis toujours ouvert à de nouvelles opportunités, collaborations ou simplement à une discussion amicale. Je serais ravi de vous rencontrer, alors envoyez-moi un e-mail !",
      button: 'Se connecter sur LinkedIn',
      form: {
        name: 'Quel est votre nom ?',
        email: 'Votre e-mail ?',
        subject: 'Quel est le sujet ?',
        message: 'Dites-moi tout...',
        submit: 'Envoyer !',
        placeholders: {
          name: 'Obiwan Kenobi',
          email: 'obiwan@exemple.com',
          subject: 'Construisons quelque chose de cool',
          message: 'J\'ai cette idée folle...'
        }
      }
    },
    about: {
      title: 'Un peu plus sur moi',
      p1: 'Je suis né à Quito et je porte en moi une profonde appréciation pour la culture, la sensibilité humaine et la créativité. Cela se reflète non seulement dans mes projets, mais aussi dans ma vie quotidienne, tant sur le plan professionnel que personnel.',
      p2: 'J\'ai fait mes études en France, une expérience qui a élargi ma perspective et m\'a permis de découvrir une nouvelle façon de comprendre la culture, un système académique et des personnes inspirantes, tant personnellement que professionnellement.',
      p3: 'Plus tard, j\'ai eu l\'opportunité de participer à un échange à l\'Université de Toronto, où j\'ai renforcé mes compétences techniques en développement de projets, y compris ce site web.',
      p4: 'Pour moi, l\'informatique est le point de rencontre entre une vie créative et une vie technique. C\'est l\'espace où les idées, guidées par la logique, peuvent prendre des formes significatives et puissantes.',
      p5: 'En bref : je suis en construction :)'
    },
    footer: {
      rights: 'Tous droits réservés. Fait avec <3 (et beaucoup de café)'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      work: 'Mis Proyectos',
      contact: 'Saluda',
      about: 'Sobre Mí',
    },
    hero: {
      role: 'SOBRE MÍ',
      title: "Hola, ¡qué tal!",
      description: "Soy un… bueno yo… eeh… supongo que ingeniero de software es la palabra correcta. Suena un poco pretencioso, ¿no? En realidad, me gusta construir cosas y llevo un buen rato haciéndolo.",
      stats: [
      ],
      button: 'Echa un vistazo a mi trabajo'
    },
    work: {
      title: 'Cosas que he construido',
      more: 'Ver mi Github',
    },
    contact: {
      label: 'Contacto',
      title: '¿Hablamos?',
      description: "Siempre estoy abierto a nuevas oportunidades, colaboraciones o simplemente una charla amistosa. Me encantaría conocerte, ¡así que mándame un email!",
      button: 'Conectar en LinkedIn',
      form: {
        name: '¿Cómo te llamas?',
        email: '¿Tu email?',
        subject: '¿Cuál es el tema?',
        message: 'Cuéntame todo...',
        submit: '¡Enviar!',
        placeholders: {
          name: 'Obiwan Kenobi',
          email: 'obiwan@ejemplo.com',
          subject: 'Construyamos algo genial',
          message: 'Tengo esta idea loca...'
        }
      }
    },
    about: {
      title: 'Un poco más sobre mí',
      p1: 'Nací en Quito y llevo conmigo una profunda apreciación por la cultura, la sensibilidad humana y la creatividad. Esto se refleja no solo en mis proyectos, sino también en mi vida diaria, tanto profesional como personal.',
      p2: 'Hice mis estudios en Francia, una experiencia que amplió mi perspectiva y me permitió descubrir una nueva forma de entender la cultura, un sistema académico y personas inspiradoras, tanto personal como profesionalmente.',
      p3: 'Más tarde, tuve la oportunidad de participar en un intercambio en la Universidad de Toronto, donde fortalecí mis habilidades técnicas en desarrollo de proyectos, incluyendo este sitio web.',
      p4: 'Para mí, la informática es el punto de encuentro entre una vida creativa y una vida técnica. Es el espacio donde las ideas, guiadas por la lógica, pueden tomar formas significativas y poderosas.',
      p5: 'En resumen: estoy en construcción :)'
    },
    footer: {
      rights: 'Todos los derechos reservados. Hecho con <3 (y mucho café)'
    }
  }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isLangOpen, setIsLangOpen] = useState(false);

  const t = translations[currentLang];

  // Define your projects here — edit each one individually
  // Images go in the public/ folder and are referenced as /filename.png
  const projects = [
    {
      title: { en: 'Etudly • Web App', fr: 'Etudly • Web App', es: 'Etudly • Web App' },
      category: { en: 'Scholar Platform. Grade Tracker', fr: 'Plateforme académique intelligente', es: 'Plataforma académica. Seguimiento de notas' },
      image: '/etudly.png',
      link: 'https://etudly.vercel.app',
    },
    {
      title: { en: 'Schedora • iOS App', fr: 'Schedora • iOS App', es: 'Schedora • iOS App' },
      category: { en: 'Academic Intelligent Calendar & Organizer', fr: 'Organisateur et emploi du temps intelligent', es: 'Calendario y organizador académico inteligente' },
      image: '/schedora.png',
      link: 'https://github.com/francoxortiz1975/Schedora',
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e8e8e8] font-sans selection:bg-white/20 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0a0a0a]/90 backdrop-blur-md z-50 nav-gradient-line">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="text-base font-[family-name:var(--font-sans)] cursor-pointer text-white tracking-widest font-normal nav-name transition-all duration-300"
            data-text="franco ortiz"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            franco ortiz
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 font-[family-name:var(--font-mono)] text-[11px] tracking-wide text-[#888]">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors lowercase">{t.nav.home}</button>
            <button onClick={() => scrollToSection('work')} className="hover:text-white transition-colors lowercase">{t.nav.work}</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors lowercase">{t.nav.contact}</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors lowercase">{t.nav.about}</button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-2 hover:text-white transition-colors"
              >
                <span>{languages.find(l => l.code === currentLang)?.flag}</span>
                <ChevronDown size={12} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-4 bg-[#141414] border border-white/10 rounded-lg shadow-2xl overflow-hidden min-w-[140px]"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code as Language);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white/5 transition-colors font-[family-name:var(--font-mono)] text-[11px] ${currentLang === lang.code ? 'bg-white/5 text-white' : 'text-[#888]'}`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="https://www.linkedin.com/in/francoxortiz"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#888] hover:text-white transition-colors"
            >
              <Linkedin size={16} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={() => setCurrentLang(currentLang === 'en' ? 'fr' : currentLang === 'fr' ? 'es' : 'en')}
              className="text-xl"
            >
              {languages.find(l => l.code === currentLang)?.flag}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-16 left-0 w-full bg-[#0a0a0a] border-b border-white/10 p-6 flex flex-col space-y-4 text-center font-[family-name:var(--font-mono)] text-[11px] text-[#888] lowercase"
          >
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white">{t.nav.home}</button>
            <button onClick={() => scrollToSection('work')} className="hover:text-white">{t.nav.work}</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-white">{t.nav.contact}</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-white">{t.nav.about}</button>
            <div className="flex justify-center pt-4">
              <a href="https://www.linkedin.com/in/francoxortiz" target="_blank" rel="noopener noreferrer">
                <Linkedin size={20} className="text-[#888] hover:text-white" />
              </a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div>
            <h1 className="text-5xl md:text-8xl text-white leading-[1.1] mb-2">
              <span className="font-[family-name:var(--font-headline)] italic text-[1.4em]">
                {currentLang === 'es' ? '¡hola, ' : 'hola, '}
              </span>  
              <span className="font-[family-name:var(--font-sans)] text-[0.85em]">
                {currentLang === 'en' ? 'hello there!' : currentLang === 'fr' ? 'bonjour !' : 'qué tal!'}
              </span>
            </h1>
          </div>

          <div className="max-w-2xl space-y-8">
            <p className="font-[family-name:var(--font-mono)] text-sm md:text-base text-[#888] leading-[1.8] font-light">
              {t.hero.description}
            </p>
            {t.hero.stats.length > 0 && (
              <div className="flex flex-wrap gap-x-6 gap-y-3 font-[family-name:var(--font-mono)] text-[11px] text-[#666]">
                {t.hero.stats.map((stat, i) => (
                  <React.Fragment key={i}>
                    <span className="flex items-center gap-2 lowercase">
                      <div className="w-1 h-1 bg-white/30 rounded-full" />
                      {stat}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            )}
            <button
              onClick={() => scrollToSection('work')}
              className="btn-aura group flex items-center space-x-4 text-white px-8 py-4 rounded-full font-[family-name:var(--font-mono)] text-[11px] lowercase tracking-wide transition-all"
            >
              <span>{t.hero.button}</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Rocket size={14} />
              </motion.div>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="py-28 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl text-white lowercase">
                <span className="font-[family-name:var(--font-sans)] text-[0.85em]">{currentLang === 'en' ? 'stuff i\'ve ' : currentLang === 'fr' ? 'choses que j\'ai ' : 'cosas que he '}</span>
                <span className="font-[family-name:var(--font-headline)] italic text-[1.4em]">{currentLang === 'en' ? 'built' : currentLang === 'fr' ? 'construites' : 'construido'}</span>
              </h2>
            </div>
            <a
              href="https://github.com/francoxortiz1975"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center space-x-2 font-[family-name:var(--font-mono)] text-[11px] text-[#666] hover:text-white transition-colors lowercase"
            >
              <span>{t.work.more}</span>
              <Github size={14} />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer"
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <div className="aspect-[4/3] bg-[#111] rounded-2xl overflow-hidden mb-5 relative border border-white/5 group-hover:border-white/15 transition-all duration-500">
                    <img
                      src={project.image}
                      alt={project.title[currentLang]}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-white/10 backdrop-blur-sm text-white p-2.5 rounded-full">
                        <ExternalLink size={14} />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-sans text-lg font-medium text-white lowercase">{project.title[currentLang]}</h3>
                  <p className="font-[family-name:var(--font-mono)] text-[11px] text-[#666] lowercase mt-1">{project.category[currentLang]}</p>
                </a>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 md:hidden flex justify-center">
            <a
              href="https://github.com/francoxortiz1975"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-aura flex items-center space-x-2 font-[family-name:var(--font-mono)] text-[11px] px-6 py-3 rounded-full text-white lowercase"
            >
              <span>{t.work.more}</span>
              <Github size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-28 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-6xl text-white lowercase leading-tight">
                <span className="font-[family-name:var(--font-sans)] text-[0.85em]">{currentLang === 'en' ? 'let\'s ' : currentLang === 'fr' ? 'on ' : '¿hablamos?'}</span>
                <span className="font-[family-name:var(--font-headline)] italic text-[1.4em]">{currentLang === 'en' ? 'chat?' : currentLang === 'fr' ? 'discute ?' : ''}</span>
              </h2>
            </div>
            <p className="font-[family-name:var(--font-mono)] text-sm text-[#888] leading-[1.8] font-light max-w-md">
              {t.contact.description}
            </p>
            <div className="flex flex-col space-y-4">
              <a
                href="https://www.linkedin.com/in/francoxortiz"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-aura inline-flex items-center space-x-4 px-8 py-4 rounded-full font-[family-name:var(--font-mono)] text-[11px] lowercase tracking-wide transition-all group text-white w-fit"
              >
                <span>{t.contact.button}</span>
                <Linkedin size={14} className="group-hover:scale-110 transition-transform" />
              </a>
              <div className="flex items-center space-x-6 pt-4 text-[#666]">
                <a href="mailto:francoxortiz@gmail.com" className="hover:text-white transition-colors flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px]">
                  <Mail size={14} />
                  <span>francoxortiz@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-[#111] p-8 md:p-12 rounded-2xl border border-white/5">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-[family-name:var(--font-mono)] text-[10px] text-[#666] ml-1 lowercase">{t.contact.form.name}</label>
                  <input
                    type="text"
                    placeholder={t.contact.form.placeholders.name}
                    className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-5 py-3.5 font-[family-name:var(--font-mono)] text-sm focus:border-white/20 transition-all outline-none text-white placeholder:text-white/15"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-[family-name:var(--font-mono)] text-[10px] text-[#666] ml-1 lowercase">{t.contact.form.email}</label>
                  <input
                    type="email"
                    placeholder={t.contact.form.placeholders.email}
                    className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-5 py-3.5 font-[family-name:var(--font-mono)] text-sm focus:border-white/20 transition-all outline-none text-white placeholder:text-white/15"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-[family-name:var(--font-mono)] text-[10px] text-[#666] ml-1 lowercase">{t.contact.form.subject}</label>
                <input
                  type="text"
                  placeholder={t.contact.form.placeholders.subject}
                  className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-5 py-3.5 font-[family-name:var(--font-mono)] text-sm focus:border-white/20 transition-all outline-none text-white placeholder:text-white/15"
                />
              </div>
              <div className="space-y-2">
                <label className="font-[family-name:var(--font-mono)] text-[10px] text-[#666] ml-1 lowercase">{t.contact.form.message}</label>
                <textarea
                  rows={4}
                  placeholder={t.contact.form.placeholders.message}
                  className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-5 py-3.5 font-[family-name:var(--font-mono)] text-sm focus:border-white/20 transition-all outline-none resize-none text-white placeholder:text-white/15"
                />
              </div>
              <button
                type="submit"
                className="btn-aura w-full text-white py-4 rounded-xl font-[family-name:var(--font-mono)] text-[11px] lowercase tracking-wide flex items-center justify-center space-x-3 transition-all"
              >
                <span>{t.contact.form.submit}</span>
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-28 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-4xl md:text-5xl text-white lowercase">
                <span className="font-[family-name:var(--font-sans)] text-[0.85em]">{currentLang === 'en' ? 'a bit more ' : currentLang === 'fr' ? 'un peu plus ' : 'un poco más '}</span>
                <span className="font-[family-name:var(--font-headline)] italic text-[1.4em]">{currentLang === 'en' ? 'about me' : currentLang === 'fr' ? 'sur moi' : 'sobre mí'}</span>
              </h2>
            </div>

            <div className="grid gap-8 font-[family-name:var(--font-mono)] text-sm text-[#888] leading-[1.8] font-light">
              <div className="flex gap-5">
                <Globe className="text-[#555] shrink-0 mt-1" size={18} />
                <p>{t.about.p1}</p>
              </div>
              <div className="flex gap-5">
                <Heart className="text-[#555] shrink-0 mt-1" size={18} />
                <p>{t.about.p2}</p>
              </div>
              <div className="flex gap-5">
                <Code className="text-[#555] shrink-0 mt-1" size={18} />
                <p>{t.about.p3}</p>
              </div>
              <div className="flex gap-5">
                <Rocket className="text-[#555] shrink-0 mt-1" size={18} />
                <p>{t.about.p4}</p>
              </div>
              <div className="pt-6 text-center">
                <span className="font-[family-name:var(--font-sans)] text-xl text-white/80 lowercase">
                  {t.about.p5}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-[family-name:var(--font-sans)] text-lg text-white/60">franco ortiz</div>
          <div className="font-[family-name:var(--font-mono)] text-[10px] text-[#555] lowercase">
            © {new Date().getFullYear()} {t.footer.rights}
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://github.com/francoxortiz1975" target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-white transition-colors"><Github size={16} /></a>
            <a href="https://www.linkedin.com/in/francoxortiz" target="_blank" rel="noopener noreferrer" className="text-[#555] hover:text-white transition-colors"><Linkedin size={16} /></a>
            <a href="mailto:francoxortiz@gmail.com" className="text-[#555] hover:text-white transition-colors"><Mail size={16} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
