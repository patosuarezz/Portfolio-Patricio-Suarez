import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Send, 
  Menu, 
  X, 
  Video,
  Smartphone,
  Palette,
  MessageSquare,
  Repeat,
  Clapperboard
} from 'lucide-react';

// --- Types ---
interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  videoUrl: string;
}

interface PortfolioState {
  nav: {
    name: string;
    links: string[];
  };
  hero: {
    name: string;
    rolePrefix: string;
    roleHighlight: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    paragraphs: string[];
    location: string;
    status: string;
  };
  services: {
    title: string;
    items: Service[];
  };
  portfolio: {
    title: string;
    items: PortfolioItem[];
  };
  ugc: {
    title: string;
    items: PortfolioItem[];
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
    instagram: string;
    instagramLabel: string;
  };
}

// --- Icons Map (to handle serialization if needed, though here we use React.ReactNode directly) ---
const ICONS = {
  Video: <Video className="w-8 h-8 text-brand" />,
  Smartphone: <Smartphone className="w-8 h-8 text-brand" />,
  Palette: <Palette className="w-8 h-8 text-brand" />,
  MessageSquare: <MessageSquare className="w-8 h-8 text-brand" />,
  Repeat: <Repeat className="w-8 h-8 text-brand" />,
  Clapperboard: <Clapperboard className="w-8 h-8 text-brand" />
};

// --- Default Data ---
const DEFAULT_STATE: PortfolioState = {
  nav: {
    name: "Patricio Suarez",
    links: ["Inicio", "Servicios", "Portfolio", "UGC Creator", "Contacto"]
  },
  hero: {
    name: "Patricio Suarez",
    rolePrefix: "Editor de ",
    roleHighlight: "video",
    description: "Especializado en contenido digital, con enfoque en edición dinámica, narrativa visual y optimización para redes sociales.",
    ctaPrimary: "→ Ver Portfolio",
    ctaSecondary: "Contactame"
  },
  about: {
    paragraphs: [
      "Trabajo en proyectos orientados a generar impacto visual y retención de audiencia, combinando ritmo de edición, color grading y subtitulación profesional para potenciar cada pieza de contenido.",
      "Me interesa colaborar con marcas, creadores de contenido, agencias y proyectos vinculados al deporte, lifestyle y contenido digital.",
      "Disponible para trabajo freelance y remoto."
    ],
    location: "Buenos Aires, Argentina",
    status: "Freelance & Remoto"
  },
  services: {
    title: "Mis servicios",
    items: [
      { id: 1, icon: ICONS.Video, title: "Edición de videos", description: "Edición de videos cortos y largos con ritmo narrativo y cohesión visual." },
      { id: 2, icon: ICONS.Smartphone, title: "Reels, Shorts y verticales", description: "Contenido optimizado para Instagram, YouTube Shorts y TikTok en formato vertical." },
      { id: 3, icon: ICONS.Palette, title: "Color Grading", description: "Corrección de color cinematográfica para darle identidad visual a cada proyecto." },
      { id: 4, icon: ICONS.MessageSquare, title: "Subtítulos dinámicos", description: "Subtítulos estilizados y animados que potencian la retención y accesibilidad." },
      { id: 5, icon: ICONS.Repeat, title: "Adaptación multiplataforma", description: "Reformateo y adaptación de contenido para distintas plataformas y formatos." },
      { id: 6, icon: ICONS.Clapperboard, title: "Storytelling audiovisual", description: "Construcción de narrativa visual con ritmo, emoción y estructura dramática." }
    ]
  },
  portfolio: {
    title: "Portfolio",
    items: [
      { id: 1, title: "Pampers", category: "Shorts · 2026", description: "Edición dinámica optimizada para redes sociales con enfoque en retención y ritmo visual.", videoUrl: "https://youtube.com/shorts/HKvcu_ayXjc?feature=share" },
      { id: 2, title: "Mr Beat", category: "Shorts · 2026", description: "Contenido de alto impacto diseñado para máxima retención en plataformas móviles.", videoUrl: "https://youtube.com/shorts/D8haZSi-dME?feature=share" },
      { id: 3, title: "Seguridad Vial", category: "Shorts · 2026", description: "Narrativa visual fluida y color grading especializado para marcas.", videoUrl: "https://youtube.com/shorts/6qov4BPpMCw?feature=share" },
      { id: 4, title: "Blu Spirito", category: "Shorts · 2026", description: "Estructura narrativa rápida y dinámica.", videoUrl: "https://youtube.com/shorts/YWrZLdl296A?feature=share" },
      { id: 5, title: "Carpano", category: "Shorts · 2026", description: "Edición con enfoque cinematográfico y ritmo emocional para contar una historia en pocos segundos.", videoUrl: "https://youtube.com/shorts/ru3k1IMetzE?feature=share" }
    ]
  },
  ugc: {
    title: "UGC Creator",
    items: [
      { id: 101, title: "NEVO", category: "UGC · 2026", description: "Contenido auténtico.", videoUrl: "https://youtube.com/shorts/VFUeNMN8ZTY?feature=share" },
      { id: 102, title: "NEVO", category: "UGC · 2026", description: "Análisis de producto con narrativa orgánica para generar confianza y conexión con la audiencia.", videoUrl: "https://youtube.com/shorts/It4LVZW8Qcs?feature=share" },
      { id: 103, title: "NEVO", category: "UGC · 2026", description: "Vlogging de estilo de vida diseñado para promocionar servicios y productos de forma natural.", videoUrl: "https://youtube.com/shorts/Qm3PYj8p7RM?feature=share" }
    ]
  },
  contact: {
    title: "Contacto",
    subtitle: "¿Tenés un proyecto en mente? Escribime.",
    email: "patrisuarez1603@gmail.com",
    phone: "+54 11 51781758",
    location: "Buenos Aires, Argentina",
    instagramLabel: "@pato.suarezz",
    instagram: "https://instagram.com/pato.suarezz"
  }
};

export default function App() {
  const [state] = useState<PortfolioState>(DEFAULT_STATE);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sync body scroll lock
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);


  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Mensaje enviado! Te responderé a la brevedad.");
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // YouTube detection
    const ytRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(?:embed\/)?(?:shorts\/)?(?:v\/)?(?:[\w-]{11})/;
    const match = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/|v\/)([\w-]{11})/);
    
    if (match && match[1]) {
      const videoId = match[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3`;
    }
    
    return url;
  };

  return (
    <div className="relative min-h-screen bg-bg-deep text-white font-sans selection:bg-brand selection:text-white">
      <div className="cinematic-noise fixed inset-0 z-[9999]" />
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-bg-deep/95 backdrop-blur-md border-b border-bg-border/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xl font-display font-bold">
            {state.nav.name}
            <span className="text-brand text-2xl leading-none">.</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {state.nav.links.map((link, idx) => (
              <a 
                key={idx} 
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium hover:text-brand transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg-deep/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {state.nav.links.map((link, idx) => (
              <motion.a 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-3xl font-display font-bold hover:text-brand transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* HERO */}
        <section id="inicio" className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden pt-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,107,0,0.07)_0%,_transparent_70%)]" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10 max-w-4xl"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-display font-black mb-4 tracking-tighter leading-none">
              {state.hero.name}
            </h1>
            <div className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-display font-bold mb-8 flex items-center justify-center flex-wrap gap-x-2 md:gap-x-3">
              <span>{state.hero.rolePrefix}</span>
              <span className="text-brand">{state.hero.roleHighlight}</span>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light px-4 sm:px-0">
              {state.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#portfolio" className="bg-brand text-white px-10 py-4 rounded font-bold hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto shadow-[0_0_20px_rgba(255,107,0,0.3)]">
                {state.hero.ctaPrimary}
              </a>
              <a href="#contacto" className="border border-brand/50 text-white px-10 py-4 rounded font-bold hover:bg-brand/10 transition-all duration-300 w-full sm:w-auto">
                {state.hero.ctaSecondary}
              </a>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30 text-[10px] tracking-[0.3em] uppercase hidden md:block"
          >
            Scroll para explorar
          </motion.div>
        </section>

        {/* ABOUT */}
        <section id="sobre-mí" className="py-16 sm:py-24 md:py-32 px-6 max-w-7xl mx-auto">
            <div className="mb-12 sm:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-4">Sobre mí</h2>
              <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-brand" />
            </div>

            <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6 sm:space-y-8 border-l-2 border-brand pl-6 sm:pl-10"
              >
                {state.about.paragraphs.map((para, idx) => (
                  <p key={idx} className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed font-light italic">
                    {para}
                  </p>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-bg-card border-l-4 border-brand p-8 sm:p-12 rounded-r-lg shadow-2xl space-y-6"
              >
                <div className="flex items-center gap-4 sm:gap-6 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all">
                    <MapPin size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-lg sm:text-xl font-medium">{state.about.location}</span>
                </div>
                <div className="flex items-center gap-4 sm:gap-6 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all">
                    <Clapperboard size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <span className="text-lg sm:text-xl font-medium">{state.about.status}</span>
                </div>
              </motion.div>
            </div>
        </section>

        {/* SERVICES */}
        <section id="servicios" className="py-16 sm:py-24 md:py-32 bg-bg-card/30">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 sm:mb-20"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-4">{state.services.title}</h2>
              <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-brand" />
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {state.services.items.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-bg-card p-6 sm:p-10 rounded-lg border border-bg-border hover:border-brand/50 hover:bg-bg-card/80 transition-all duration-300 group"
                >
                  <div className="mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-500 ease-out inline-block">
                    {service.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold mb-3 sm:mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed font-light text-sm sm:text-base">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="py-16 sm:py-24 md:py-32 max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 sm:mb-20"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-4">{state.portfolio.title}</h2>
              <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-brand" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-16">
              {state.portfolio.items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={`group flex flex-col ${idx === 4 ? 'md:col-span-2 lg:w-2/3 lg:mx-auto' : ''}`}
                >
                  <div className="relative aspect-video bg-bg-card border-2 border-dashed border-brand/20 rounded-xl overflow-hidden group-hover:border-brand/50 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(255,107,0,0.1)]">
                    {item.videoUrl && (
                      <div className="w-full h-full relative">
                        <iframe 
                          className="w-full h-full pointer-events-none scale-105"
                          src={getEmbedUrl(item.videoUrl)}
                          title={item.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs font-black text-brand uppercase tracking-[0.2em]">{item.category}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold group-hover:text-brand transition-colors tracking-tight">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed font-light text-base sm:text-lg">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
        </section>

        {/* UGC CREATOR */}
        <section id="ugc-creator" className="py-16 sm:py-24 md:py-32 bg-bg-card/10 text-center sm:text-left">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 sm:mb-20"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-4">{state.ugc.title}</h2>
              <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-brand mx-auto sm:mx-0" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              {state.ugc.items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[9/16] bg-bg-card border-2 border-dashed border-brand/20 rounded-xl overflow-hidden group-hover:border-brand/50 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(255,107,0,0.1)]">
                    {item.videoUrl && (
                      <div className="w-full h-full relative">
                        <iframe 
                          className="w-full h-full pointer-events-none scale-105"
                          src={getEmbedUrl(item.videoUrl)}
                          title={item.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-3">
                    <span className="text-[10px] sm:text-xs font-black text-brand uppercase tracking-[0.2em]">{item.category}</span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold group-hover:text-brand transition-colors tracking-tight">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed font-light text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contacto" className="py-16 sm:py-24 md:py-32 bg-[#0c0c0c] border-t border-bg-border/30 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 sm:mb-20 text-center md:text-left"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-4">{state.contact.title}</h2>
              <div className="w-16 sm:w-24 h-1 sm:h-1.5 bg-brand mx-auto md:mx-0" />
              <p className="mt-6 sm:mt-8 text-gray-400 text-lg sm:text-xl font-light">{state.contact.subtitle}</p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              <div className="space-y-8 sm:space-y-12">
                <a 
                  href={`mailto:${state.contact.email}`}
                  className="flex items-center gap-6 sm:gap-8 group p-4 -m-4"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-bg-card border border-bg-border rounded-xl sm:rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                    <Mail size={24} className="sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-1 sm:mb-2 font-bold">Email</p>
                    <span className="text-lg sm:text-xl font-medium group-hover:text-brand transition-colors break-all">{state.contact.email}</span>
                  </div>
                </a>
                {/* ... other contact items with similar scaling ... */}
                <a 
                  href={`https://wa.me/${state.contact.phone.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-6 sm:gap-8 group p-2 -m-2"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-bg-card border border-bg-border rounded-xl sm:rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                    <Phone size={24} className="sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-1 sm:mb-2 font-bold">Teléfono</p>
                    <span className="text-lg sm:text-xl font-medium group-hover:text-brand transition-colors">{state.contact.phone}</span>
                  </div>
                </a>
                <a 
                  href={state.contact.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-6 sm:gap-8 group p-4 -m-4"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-bg-card border border-bg-border rounded-xl sm:rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                    <Instagram size={24} className="sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-1 sm:mb-2 font-bold">Instagram</p>
                    <span className="text-lg sm:text-xl font-medium group-hover:text-brand transition-colors link-underline">{state.contact.instagramLabel}</span>
                  </div>
                </a>
                
                <div className="flex items-center gap-6 sm:gap-8 group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-bg-card border border-bg-border rounded-xl sm:rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                    <MapPin size={24} className="sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-1 sm:mb-2 font-bold">Ubicación</p>
                    <span className="text-lg sm:text-xl font-medium">{state.contact.location}</span>
                  </div>
                </div>
              </div>

              <motion.form 
                onSubmit={handleContactSubmit} 
                className="space-y-6 sm:space-y-8 bg-bg-card/50 p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-bg-border/50 shadow-2xl"
              >
                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-500">Nombre</label>
                    <input required type="text" className="w-full bg-bg-deep/50 border border-bg-border focus:border-brand p-4 sm:p-5 rounded-xl sm:rounded-2xl outline-none transition-all placeholder:text-gray-700 text-sm sm:text-base" placeholder="Juan Perez" />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-500">Email</label>
                    <input required type="email" className="w-full bg-bg-deep/50 border border-bg-border focus:border-brand p-4 sm:p-5 rounded-xl sm:rounded-2xl outline-none transition-all placeholder:text-gray-700 text-sm sm:text-base" placeholder="juan@email.com" />
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-500">Mensaje</label>
                  <textarea required rows={5} className="w-full bg-bg-deep/50 border border-bg-border focus:border-brand p-4 sm:p-5 rounded-xl sm:rounded-2xl outline-none transition-all resize-none placeholder:text-gray-700 text-sm sm:text-base" placeholder="Hola Patricio, me gustaría trabajar contigo en..."></textarea>
                </div>
                <button className="bg-brand text-white w-full py-5 sm:py-6 rounded-xl sm:rounded-2xl font-black uppercase tracking-[0.2em] text-xs sm:text-sm hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(255,107,0,0.2)] hover:shadow-none hover:-translate-y-1">
                  <Send size={18} />
                  Enviar mensaje
                </button>
              </motion.form>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-16 border-t border-bg-border/30 text-center">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest opacity-40">
          © {new Date().getFullYear()} Patricio Suarez. Creado con visión cinematográfica.
        </p>
      </footer>
    </div>
  );
}
