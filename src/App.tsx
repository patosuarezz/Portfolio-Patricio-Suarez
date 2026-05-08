import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Send, 
  Save, 
  Download, 
  Menu, 
  X, 
  Link as LinkIcon,
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
      { id: 1, title: "Vertical Dynamic Edit", category: "Shorts · 2024", description: "Edición dinámica optimizada para redes sociales con enfoque en retención y ritmo visual.", videoUrl: "https://youtube.com/shorts/HKvcu_ayXjc?feature=share" },
      { id: 2, title: "Social Media Reel", category: "Shorts · 2024", description: "Contenido de alto impacto diseñado para máxima retención en plataformas móviles.", videoUrl: "https://youtube.com/shorts/D8haZSi-dME?feature=share" },
      { id: 3, title: "Lifestyle Branding", category: "Shorts · 2024", description: "Narrativa visual fluida y color grading especializado para marcas de lifestyle.", videoUrl: "https://youtube.com/shorts/6qov4BPpMCw?feature=share" },
      { id: 4, title: "Fast-Paced Storytelling", category: "Shorts · 2024", description: "Estructura narrativa rápida y dinámica con subtítulos animados integrados.", videoUrl: "https://youtube.com/shorts/YWrZLdl296A?feature=share" },
      { id: 5, title: "Cinematic Narrative", category: "Shorts · 2024", description: "Edición con enfoque cinematográfico y ritmo emocional para contar una historia en pocos segundos.", videoUrl: "https://youtube.com/shorts/ru3k1IMetzE?feature=share" }
    ]
  },
  ugc: {
    title: "UGC Creator",
    items: [
      { id: 101, title: "Tech Review & Setup", category: "UGC · 2024", description: "Contenido auténtico enfocado en reviews de tecnología y optimización de espacios de trabajo.", videoUrl: "https://youtube.com/shorts/VFUeNMN8ZTY?feature=share" },
      { id: 102, title: "Lifestyle & Unboxing", category: "UGC · 2024", description: "Análisis de producto con narrativa orgánica para generar confianza y conexión con la audiencia.", videoUrl: "https://youtube.com/shorts/It4LVZW8Qcs?feature=share" },
      { id: 103, title: "Organic Brand Story", category: "UGC · 2024", description: "Vlogging de estilo de vida diseñado para promocionar servicios y productos de forma natural.", videoUrl: "https://youtube.com/shorts/Qm3PYj8p7RM?feature=share" }
    ]
  },
  contact: {
    title: "Hablemos",
    subtitle: "¿Tenés un proyecto en mente? Escribime.",
    email: "patrisuarez1603@gmail.com",
    phone: "+54 11 51781758",
    location: "Buenos Aires, Argentina",
    instagramLabel: "@pato.suarezz",
    instagram: "https://instagram.com/pato.suarezz"
  }
};

// --- Editable Component ---
const EditableText = ({ 
  value, 
  onChange, 
  className = "", 
  element = "div",
  multiline = false
}: { 
  value: string, 
  onChange: (val: string) => void, 
  className?: string,
  element?: string,
  multiline?: boolean
}) => {
  const Component = element as any;
  return (
    <Component
      contentEditable
      suppressContentEditableWarning
      className={`focus:outline-none ${className}`}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        onChange(e.currentTarget.innerText);
      }}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (!multiline && e.key === 'Enter') {
          e.preventDefault();
          (e.currentTarget as HTMLElement).blur();
        }
      }}
    >
      {value}
    </Component>
  );
};

export default function App() {
  const [state, setState] = useState<PortfolioState>(DEFAULT_STATE);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('patrio_portfolio_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Inject icons back into state as they are not serializable easily if we store them in state
        // In a real app we'd map them by string IDs. Here we just update the text parts.
        setState(prev => ({
          ...prev,
          ...parsed,
          services: {
            ...prev.services,
            items: prev.services.items.map((item, i) => ({
              ...item,
              title: parsed.services?.items?.[i]?.title || item.title,
              description: parsed.services?.items?.[i]?.description || item.description
            }))
          }
        }));
      } catch (e) {
        console.error("Error parsing saved data", e);
      }
    }
  }, []);

  const saveToLocalStorage = () => {
    localStorage.setItem('patrio_portfolio_data', JSON.stringify(state));
    setSaveStatus("✅ Cambios guardados localmente");
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const exportHTML = () => {
    const html = document.documentElement.outerHTML;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-patricio.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const updateState = (path: string, value: any) => {
    setState(prev => {
      const newState = JSON.parse(JSON.stringify(prev)); // Deep clone (simple for this structure)
      // Manually handle icons since they don't clone well with JSON.stringify
      prev.services.items.forEach((item, i) => {
        newState.services.items[i].icon = item.icon;
      });
      
      const keys = path.split('.');
      let current: any = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  const handleAddLink = (id: number, section: 'portfolio' | 'ugc' = 'portfolio') => {
    const url = prompt("Pegá la URL del video (YouTube, Vimeo, etc.):");
    if (url !== null) {
      const newItems = state[section].items.map(item => 
        item.id === id ? { ...item, videoUrl: url } : item
      );
      updateState(`${section}.items`, newItems);
    }
  };

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
            <EditableText 
              value={state.nav.name} 
              onChange={(val) => updateState('nav.name', val)} 
            />
            <span className="text-brand text-2xl leading-none">.</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {state.nav.links.map((link, idx) => (
              <a 
                key={idx} 
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium hover:text-brand transition-colors"
              >
                <EditableText 
                  value={link} 
                  onChange={(val) => {
                    const newLinks = [...state.nav.links];
                    newLinks[idx] = val;
                    updateState('nav.links', newLinks);
                  }}
                />
              </a>
            ))}
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-bg-deep flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {state.nav.links.map((link, idx) => (
              <a 
                key={idx} 
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="text-2xl font-display font-bold hover:text-brand"
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </a>
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
            <EditableText 
              element="h1"
              className="text-6xl md:text-9xl font-display font-black mb-4 tracking-tighter leading-none"
              value={state.hero.name}
              onChange={(val) => updateState('hero.name', val)}
            />
            <div className="text-2xl md:text-5xl font-display font-bold mb-8 flex items-center justify-center flex-wrap gap-x-3">
              <EditableText 
                value={state.hero.rolePrefix} 
                onChange={(val) => updateState('hero.rolePrefix', val)}
              />
              <EditableText 
                className="text-brand"
                value={state.hero.roleHighlight} 
                onChange={(val) => updateState('hero.roleHighlight', val)}
              />
            </div>
            <EditableText 
              multiline
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
              value={state.hero.description}
              onChange={(val) => updateState('hero.description', val)}
            />
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#portfolio" className="bg-brand text-white px-10 py-4 rounded font-bold hover:bg-white hover:text-black transition-all duration-300 w-full sm:w-auto shadow-[0_0_20px_rgba(255,107,0,0.3)]">
                <EditableText 
                  value={state.hero.ctaPrimary} 
                  onChange={(val) => updateState('hero.ctaPrimary', val)}
                />
              </a>
              <a href="#contacto" className="border border-brand/50 text-white px-10 py-4 rounded font-bold hover:bg-brand/10 transition-all duration-300 w-full sm:w-auto">
                <EditableText 
                  value={state.hero.ctaSecondary} 
                  onChange={(val) => updateState('hero.ctaSecondary', val)}
                />
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
        <section id="sobre-mí" className="py-32 px-6 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <EditableText 
              element="h2"
              className="text-5xl font-display font-extrabold mb-4"
              value="Sobre mí"
              onChange={(val) => {}} // Simple placeholder since this is a new editable title
            />
            <div className="w-24 h-1.5 bg-brand" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8 border-l-2 border-brand pl-10"
            >
              {state.about.paragraphs.map((para, idx) => (
                <EditableText 
                  key={idx}
                  multiline
                  className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light italic"
                  value={para}
                  onChange={(val) => {
                    const newParas = [...state.about.paragraphs];
                    newParas[idx] = val;
                    updateState('about.paragraphs', newParas);
                  }}
                />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-bg-card border-l-4 border-brand p-12 rounded-r-lg shadow-2xl space-y-6"
            >
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <EditableText 
                  className="text-xl font-medium"
                  value={state.about.location}
                  onChange={(val) => updateState('about.location', val)}
                />
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-all">
                  <Clapperboard size={24} />
                </div>
                <EditableText 
                  className="text-xl font-medium"
                  value={state.about.status}
                  onChange={(val) => updateState('about.status', val)}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="servicios" className="py-32 bg-bg-card/30">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <EditableText 
                element="h2"
                className="text-5xl font-display font-extrabold mb-4"
                value={state.services.title}
                onChange={(val) => updateState('services.title', val)}
              />
              <div className="w-24 h-1.5 bg-brand" />
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {state.services.items.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-bg-card p-10 rounded-lg border border-bg-border hover:border-brand/50 hover:bg-bg-card/80 transition-all duration-300 group"
                >
                  <div className="mb-8 group-hover:scale-110 transition-transform duration-500 ease-out inline-block">
                    {service.icon}
                  </div>
                  <EditableText 
                    element="h3"
                    className="text-2xl font-display font-bold mb-4 tracking-tight"
                    value={service.title}
                    onChange={(val) => {
                      const newItems = [...state.services.items];
                      newItems[idx].title = val;
                      updateState('services.items', newItems);
                    }}
                  />
                  <EditableText 
                    multiline
                    className="text-gray-400 leading-relaxed font-light"
                    value={service.description}
                    onChange={(val) => {
                      const newItems = [...state.services.items];
                      newItems[idx].description = val;
                      updateState('services.items', newItems);
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="py-32 max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <EditableText 
              element="h2"
              className="text-5xl font-display font-extrabold mb-4"
              value={state.portfolio.title}
              onChange={(val) => updateState('portfolio.title', val)}
            />
            <div className="w-24 h-1.5 bg-brand" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16">
            {state.portfolio.items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                viewport={{ once: true, margin: "-50px" }}
                className={`group flex flex-col ${idx === 4 ? 'md:col-span-2 md:w-2/3 md:mx-auto' : ''}`}
              >
                <div className="relative aspect-video bg-bg-card border-2 border-dashed border-brand/20 rounded-xl overflow-hidden group-hover:border-brand/50 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(255,107,0,0.1)]">
                  {item.videoUrl ? (
                    <div className="w-full h-full relative">
                      <iframe 
                        className="w-full h-full pointer-events-none scale-105"
                        src={getEmbedUrl(item.videoUrl)}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                      {/* Overlay to catch clicks/hovers since iframe is pointer-events-none */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 gap-4">
                         <button 
                            onClick={() => handleAddLink(item.id, 'portfolio')}
                            className="flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all transform hover:scale-110 shadow-xl"
                          >
                            <LinkIcon size={14} />
                            Cambiar Video
                          </button>
                          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.videoUrl}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full p-8 text-center">
                      <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-white transition-all duration-500 transform group-hover:rotate-12">
                        <Play size={40} className="ml-1" />
                      </div>
                      <p className="text-gray-500 font-medium mb-6 text-sm">Hacé clic para agregar video/imagen</p>
                      
                      <button 
                        onClick={() => handleAddLink(item.id, 'portfolio')}
                        className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-brand hover:text-white transition-all transform hover:scale-105"
                      >
                        <LinkIcon size={14} />
                        Clip Link
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-8 space-y-3">
                  <div className="flex items-center justify-between">
                    <EditableText 
                      className="text-xs font-black text-brand uppercase tracking-[0.2em]"
                      value={item.category}
                      onChange={(val) => {
                        const newItems = [...state.portfolio.items];
                        newItems[idx].category = val;
                        updateState('portfolio.items', newItems);
                      }}
                    />
                  </div>
                  <EditableText 
                    className="text-3xl font-display font-bold group-hover:text-brand transition-colors tracking-tight"
                    value={item.title}
                    onChange={(val) => {
                      const newItems = [...state.portfolio.items];
                      newItems[idx].title = val;
                      updateState('portfolio.items', newItems);
                    }}
                  />
                  <EditableText 
                    multiline
                    className="text-gray-400 leading-relaxed font-light text-lg"
                    value={item.description}
                    onChange={(val) => {
                      const newItems = [...state.portfolio.items];
                      newItems[idx].description = val;
                      updateState('portfolio.items', newItems);
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* UGC CREATOR */}
        <section id="ugc-creator" className="py-32 bg-bg-card/10">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <EditableText 
                element="h2"
                className="text-5xl font-display font-extrabold mb-4"
                value={state.ugc.title}
                onChange={(val) => updateState('ugc.title', val)}
              />
              <div className="w-24 h-1.5 bg-brand" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12">
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
                    {item.videoUrl ? (
                      <div className="w-full h-full relative">
                        <iframe 
                          className="w-full h-full pointer-events-none scale-105"
                          src={getEmbedUrl(item.videoUrl)}
                          title={item.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 gap-4">
                           <button 
                              onClick={() => handleAddLink(item.id, 'ugc')}
                              className="flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all transform hover:scale-110 shadow-xl"
                            >
                              <LinkIcon size={14} />
                              Cambiar Video
                            </button>
                            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest max-w-[80%] truncate">{item.videoUrl}</div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center w-full h-full p-8 text-center">
                        <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-white transition-all duration-500 transform group-hover:rotate-12">
                          <Play size={32} className="ml-1" />
                        </div>
                        <p className="text-gray-500 font-medium mb-6 text-xs px-4">Hacé clic para agregar contenido UGC</p>
                        
                        <button 
                          onClick={() => handleAddLink(item.id, 'ugc')}
                          className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-[10px) font-black uppercase tracking-widest hover:bg-brand hover:text-white transition-all transform hover:scale-105"
                        >
                          <LinkIcon size={12} />
                          Clip Link
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 space-y-3">
                    <EditableText 
                      className="text-xs font-black text-brand uppercase tracking-[0.2em]"
                      value={item.category}
                      onChange={(val) => {
                        const newItems = [...state.ugc.items];
                        newItems[idx].category = val;
                        updateState('ugc.items', newItems);
                      }}
                    />
                    <EditableText 
                      className="text-2xl font-display font-bold group-hover:text-brand transition-colors tracking-tight"
                      value={item.title}
                      onChange={(val) => {
                        const newItems = [...state.ugc.items];
                        newItems[idx].title = val;
                        updateState('ugc.items', newItems);
                      }}
                    />
                    <EditableText 
                      multiline
                      className="text-gray-400 leading-relaxed font-light text-sm"
                      value={item.description}
                      onChange={(val) => {
                        const newItems = [...state.ugc.items];
                        newItems[idx].description = val;
                        updateState('ugc.items', newItems);
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contacto" className="py-32 bg-[#0c0c0c] border-t border-bg-border/30 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-20 text-center md:text-left"
            >
              <EditableText 
                element="h2"
                className="text-5xl font-display font-extrabold mb-4"
                value={state.contact.title}
                onChange={(val) => updateState('contact.title', val)}
              />
              <div className="w-24 h-1.5 bg-brand mx-auto md:mx-0" />
              <EditableText 
                className="mt-8 text-gray-400 text-xl font-light"
                value={state.contact.subtitle}
                onChange={(val) => updateState('contact.subtitle', val)}
              />
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-24">
              <div className="space-y-10">
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 bg-bg-card border border-bg-border rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                    <Mail size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2 font-bold">Email</p>
                    <EditableText 
                      className="text-xl font-medium hover:text-brand transition-colors"
                      value={state.contact.email}
                      onChange={(val) => updateState('contact.email', val)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 bg-bg-card border border-bg-border rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                    <Phone size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2 font-bold">Teléfono</p>
                    <EditableText 
                      className="text-xl font-medium hover:text-brand transition-colors"
                      value={state.contact.phone}
                      onChange={(val) => updateState('contact.phone', val)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 bg-bg-card border border-bg-border rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                    <Instagram size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2 font-bold">Instagram</p>
                    <a href={state.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">
                      <EditableText 
                        className="text-xl font-medium link-underline"
                        value={state.contact.instagramLabel}
                        onChange={(val) => updateState('contact.instagramLabel', val)}
                      />
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 group">
                  <div className="w-16 h-16 bg-bg-card border border-bg-border rounded-2xl flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white group-hover:rotate-6 transition-all duration-300">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2 font-bold">Ubicación</p>
                    <EditableText 
                      className="text-xl font-medium"
                      value={state.contact.location}
                      onChange={(val) => updateState('contact.location', val)}
                    />
                  </div>
                </div>
              </div>

              <motion.form 
                onSubmit={handleContactSubmit} 
                className="space-y-8 bg-bg-card/50 p-10 rounded-3xl border border-bg-border/50 shadow-2xl"
              >
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Nombre</label>
                    <input required type="text" className="w-full bg-bg-deep/50 border border-bg-border focus:border-brand p-5 rounded-2xl outline-none transition-all placeholder:text-gray-700" placeholder="Juan Perez" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email</label>
                    <input required type="email" className="w-full bg-bg-deep/50 border border-bg-border focus:border-brand p-5 rounded-2xl outline-none transition-all placeholder:text-gray-700" placeholder="juan@email.com" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Mensaje</label>
                  <textarea required rows={5} className="w-full bg-bg-deep/50 border border-bg-border focus:border-brand p-5 rounded-2xl outline-none transition-all resize-none placeholder:text-gray-700" placeholder="Hola Patricio, me gustaría trabajar contigo en..."></textarea>
                </div>
                <button className="bg-brand text-white w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-white hover:text-black transition-all duration-500 flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(255,107,0,0.2)] hover:shadow-none hover:-translate-y-1">
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

      {/* FLOATING ACTIONS */}
      <div className="fixed bottom-10 right-10 flex flex-col gap-5 z-[10000]">
        <AnimatePresence>
          {saveStatus && (
            <motion.div 
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="bg-brand text-white px-6 py-3 rounded-2xl text-xs shadow-2xl font-black uppercase tracking-widest text-center"
            >
              {saveStatus}
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={saveToLocalStorage}
          className="w-16 h-16 bg-brand text-white rounded-2xl shadow-[0_10px_30px_rgba(255,107,0,0.4)] flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group relative"
        >
          <Save size={24} />
          <span className="absolute right-20 bg-black/90 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-bg-border backdrop-blur-md">Guardar cambios</span>
        </button>
        
        <button 
          onClick={exportHTML}
          className="w-16 h-16 bg-white text-black rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group relative"
        >
          <Download size={24} />
          <span className="absolute right-20 bg-black/90 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-bg-border backdrop-blur-md">Exportar HTML</span>
        </button>
      </div>
    </div>
  );
}
