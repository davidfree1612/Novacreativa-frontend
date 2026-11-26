import React, { useState, useEffect, useRef } from 'react';
import AuthModal from './components/AuthModal';
import AdminPanel from './components/AdminPanel';
import LogosMarquee from "./components/LogosMarquee";

import {
  createIdea,
  getMyIdeas,
  deleteIdea,
  sendUserMessage,
  wakeUpServer,
  markMessagesRead
} from './services/api';
import {
  Palette,
  Globe,
  Rocket,
  Layers,
  ArrowRight,
  Send,
  X,
  Menu,
  User,
  Building2,
  Clock,
  CheckCircle2,
  XCircle,
  FolderKanban,
  FileText,
  Trash2,
  LogOut,
  ShieldAlert,
  MessageSquare,
  Lightbulb,
  PenTool,
  Code2,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const [userIdeas, setUserIdeas] = useState([]);
  const [loadingIdeas, setLoadingIdeas] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [historySearch, setHistorySearch] = useState('');

  const [replyTexts, setReplyTexts] = useState({});
  const [sendingReplyId, setSendingReplyId] = useState(null);

  const [newIdea, setNewIdea] = useState({
    titulo: '',
    servicio: 'Branding e Identidad Visual',
    presupuesto: '$1,000 - $2,500 USD',
    tiempo: '1 - 3 Meses',
    detalles: ''
  });

  const createModalRef = useRef(null);
  const historyModalRef = useRef(null);
  const tituloRef = useRef(null);
  const carouselRef = useRef(null);

  // Despertar Render al cargar la página + restaurar sesión
  useEffect(() => {
    wakeUpServer();

    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      fetchUserIdeas();
    }
  }, []);

  const fetchUserIdeas = async () => {
    setLoadingIdeas(true);
    try {
      const data = await getMyIdeas();
      setUserIdeas(data);
    } catch (error) {
      console.error("Error al obtener las ideas de la BD:", error.message);
    } finally {
      setLoadingIdeas(false);
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthOpen(false);
    fetchUserIdeas();
    setTimeout(() => {
      if (userData.isAdmin) {
        setIsAdminOpen(true);
      } else {
        historyModalRef.current?.showModal();
      }
    }, 300);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setUserIdeas([]);
    closeModals();
    setIsAdminOpen(false);
  };

  const handleMarkAsRead = async (ideaId) => {
    const targetIdea = userIdeas.find(i => i.id === ideaId);
    const hasUnread = (targetIdea?.messages || []).some(
      m => m.senderId !== user?.id && m.isRead === false
    );
    if (!hasUnread) return;

    await markMessagesRead(ideaId);
    setUserIdeas(prev =>
      prev.map(idea =>
        idea.id === ideaId
          ? {
            ...idea,
            messages: (idea.messages || []).map(m =>
              m.senderId !== user?.id ? { ...m, isRead: true } : m
            )
          }
          : idea
      )
    );
  };

  const handleSendReply = async (e, ideaId) => {
    e.preventDefault();
    const content = replyTexts[ideaId]?.trim();
    if (!content) return;

    setSendingReplyId(ideaId);
    try {
      const savedMsg = await sendUserMessage(ideaId, content);
      await markMessagesRead(ideaId);

      setUserIdeas(prevIdeas =>
        prevIdeas.map(idea =>
          idea.id === ideaId
            ? {
              ...idea,
              messages: [
                ...(idea.messages || []).map(m =>
                  m.senderId !== user?.id ? { ...m, isRead: true } : m
                ),
                savedMsg
              ]
            }
            : idea
        )
      );

      setReplyTexts(prev => ({ ...prev, [ideaId]: '' }));
    } catch (error) {
      alert(`Error al enviar respuesta: ${error.message}`);
    } finally {
      setSendingReplyId(null);
    }
  };

  const services = [
    {
      num: "1.",
      icon: <Palette className="w-6 h-6 text-cyan-400" />,
      title: "Branding e Identidad Visual",
      desc: "Creamos marcas desde su concepto hasta su identidad visual, desarrollando logotipos, paletas cromáticas, tipografías y sistemas gráficos."
    },
    {
      num: "2.",
      icon: <Layers className="w-6 h-6 text-cyan-400" />,
      title: "Diseño Gráfico Publicitario",
      desc: "Diseñamos piezas visuales para comunicar, promocionar productos, presentar servicios y fortalecer la imagen de tu empresa."
    },
    {
      num: "3.",
      icon: <Globe className="w-6 h-6 text-cyan-400" />,
      title: "Gestión de Redes Sociales",
      desc: "Planificamos, diseñamos y gestionamos contenido digital para mantener una comunicación constante y profesional con tu audiencia."
    },
    {
      num: "4.",
      icon: <Rocket className="w-6 h-6 text-cyan-400" />,
      title: "Producción y Edición Audiovisual",
      desc: "Desarrollamos contenido audiovisual para promocionar marcas, productos, servicios y experiencias."
    }
  ];

  const projects = [
    {
      id: 1,
      title: "AUTOPARTES ALBUQUERQUE",
      category: "Branding",
      image: "/images/albuquerquebaner.jpg"
    },
    {
      id: 2,
      title: "MULTEC",
      category: "Web",
      image: "/images/multecbaner.png"
    },
    {
      id: 3,
      title: "SEGMECO",
      category: "3D & Motion",
      image: "/images/segmecobaner.png"
    },
    {
      id: 4,
      title: "FRANCINNY",
      category: "Web",
      image: "/images/francinnybaner.png"
    },
    {
      id: 5,
      title: "UMAMI",
      category: "Branding",
      image: "/images/umamibaner.png"
    },
    {
      id: 6,
      title: "EL MUNDO MAGICO DE ALESSIA",
      category: "Branding",
      image: "/images/alessiabaner.png"
    },
    {
      id: 7,
      title: "SUZUKI MOTOS",
      category: "Branding",
      image: "/images/suzukibaner.png"
    }
  ];

  const filteredProjects = activeFilter === 'Todos'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = direction === 'left' ? -420 : 420;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleSelectLogoFromMarquee = (logo) => {
    const matchedProject = projects.find(
      p => p.title.toUpperCase() === (logo.projectTitle || logo.nombre).toUpperCase()
    );

    const scrollToTarget = () => {
      document.getElementById('portafolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (matchedProject) {
        setTimeout(() => {
          const cardEl = document.getElementById(`proyecto-slide-${matchedProject.id}`);
          if (cardEl) {
            cardEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          }
        }, 250);

        setTimeout(() => {
          setSelectedProject(matchedProject);
        }, 550);
      }
    };

    if (matchedProject && activeFilter !== 'Todos' && activeFilter !== matchedProject.category) {
      setActiveFilter('Todos');
      setTimeout(scrollToTarget, 60);
    } else {
      scrollToTarget();
    }
  };

  const openPortalEmpresa = () => {
    setIsAuthOpen(true);
  };

  const openCreatePanel = () => {
    if (!user) {
      setIsAuthOpen(true);
    } else {
      createModalRef.current?.showModal();
    }
  };

  const openHistoryPanel = () => {
    if (!user) {
      setIsAuthOpen(true);
    } else {
      fetchUserIdeas();
      historyModalRef.current?.showModal();
    }
  };

  const closeModals = () => {
    createModalRef.current?.close();
    historyModalRef.current?.close();
  };

  const handleSaveIdea = async (e) => {
    e.preventDefault();

    if (!user) {
      createModalRef.current?.close();
      setIsAuthOpen(true);
      return;
    }

    if (!newIdea.titulo.trim()) {
      alert("Falta completar el nombre de tu proyecto/idea.");
      tituloRef.current?.focus();
      return;
    }

    setSubmitting(true);
    try {
      await createIdea(newIdea);
      await fetchUserIdeas();

      setNewIdea({
        titulo: '',
        servicio: 'Branding e Identidad Visual',
        presupuesto: '$1,000 - $2,500 USD',
        tiempo: '1 - 3 Meses',
        detalles: ''
      });
      createModalRef.current?.close();
      alert(`¡Idea enviada exitosamente al panel de ${user.empresa || user.company}!`);
    } catch (error) {
      alert(`Error al guardar la idea: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteIdea = async (id) => {
    if (!confirm("¿Deseas eliminar esta cotización de la base de datos?")) return;

    try {
      await deleteIdea(id);
      setUserIdeas(userIdeas.filter(idea => idea.id !== id));
    } catch (error) {
      alert(`Error al eliminar: ${error.message}`);
    }
  };

  // Total de mensajes sin leer del administrador para el cliente
  const unreadAdminMessages = userIdeas.reduce((acc, idea) => {
    const count = (idea.messages || []).filter(
      m => m.senderId !== user?.id && m.isRead === false
    ).length;
    return acc + count;
  }, 0);

  // Filtrado por buscador en historial
  const searchedUserIdeas = userIdeas.filter(item => {
    const q = historySearch.toLowerCase().trim();
    if (!q) return true;
    return (
      item.titulo?.toLowerCase().includes(q) ||
      item.servicio?.toLowerCase().includes(q)
    );
  });

  const ideasEnRevision = searchedUserIdeas.filter(item => !item.estado || item.estado === 'en_revision' || item.estado === 'En revisión' || item.estado === 'revision');
  const ideasAceptadas = searchedUserIdeas.filter(item => item.estado === 'aceptada');
  const ideasRechazadas = searchedUserIdeas.filter(item => item.estado === 'rechazada');

  const renderIdeaCard = (item, borderColor, badgeElement) => {
    const messages = item.messages || [];
    const fallbackAdminMsg = item.mensajeAdmin || item.respuestaAdmin || item.comentarioAdmin;
    const unreadCount = messages.filter(
      m => m.senderId !== user?.id && m.isRead === false
    ).length;

    return (
      <article
        key={item.id}
        onClick={() => handleMarkAsRead(item.id)}
        className={`p-4 rounded-xl bg-[#090D16] border ${borderColor} flex flex-col gap-3`}
      >
        <div className="flex items-center justify-between">
          <nav>
            <div className="flex items-center gap-2">
              <h5 className="font-bold text-slate-50 text-sm">{item.titulo}</h5>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-cyan-500 text-slate-950">
                  {unreadCount} nuevo{unreadCount > 1 ? 's' : ''}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              {item.servicio} • <span className="text-cyan-400 font-medium">{item.presupuesto}</span>
            </p>
          </nav>
          <div className="flex items-center gap-2">
            {badgeElement}
            <button
              onClick={(e) => { e.stopPropagation(); handleDeleteIdea(item.id); }}
              className="text-slate-500 hover:text-red-400 p-1 transition cursor-pointer"
              title="Eliminar"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-1 pt-3 border-t border-slate-800 flex flex-col gap-2">
          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            Chat directo con NovaCreativa
          </span>

          <div className="space-y-2 max-h-36 overflow-y-auto pr-1 flex flex-col">
            {messages.length === 0 && fallbackAdminMsg && (
              <div className="p-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs self-start max-w-[85%]">
                <span className="font-bold text-cyan-300 block text-[10px]">NovaCreativa</span>
                <p className="text-slate-200">{fallbackAdminMsg}</p>
              </div>
            )}

            {messages.length === 0 && !fallbackAdminMsg ? (
              <p className="text-[11px] text-slate-500 italic py-1">
                Aún no hay mensajes. Escribe si deseas agregar detalles o consultar sobre tu proyecto.
              </p>
            ) : (
              messages.map(msg => {
                const isMine = msg.senderId === user?.id;
                return (
                  <div
                    key={msg.id}
                    className={`p-2.5 rounded-xl text-xs max-w-[85%] ${isMine
                      ? 'bg-cyan-600/20 border border-cyan-500/40 text-slate-50 self-end text-right'
                      : 'bg-slate-900 border border-slate-700 text-slate-200 self-start'
                      }`}
                  >
                    <span className={`block text-[10px] font-bold mb-0.5 ${isMine ? 'text-cyan-300' : 'text-blue-400'}`}>
                      {isMine ? 'Tú' : 'NovaCreativa Admin'}
                    </span>
                    <p className="leading-relaxed break-words">{msg.content}</p>
                  </div>
                );
              })
            )}
          </div>

          <form onSubmit={(e) => handleSendReply(e, item.id)} className="flex gap-2 mt-1">
            <input
              type="text"
              placeholder="Escribe un mensaje al administrador..."
              value={replyTexts[item.id] || ''}
              onFocus={() => handleMarkAsRead(item.id)}
              onChange={(e) => setReplyTexts(prev => ({ ...prev, [item.id]: e.target.value }))}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={sendingReplyId === item.id || !(replyTexts[item.id]?.trim())}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1 transition disabled:opacity-40 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </article>
    );
  };

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#090D16]/90 border-b border-slate-800/80">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/images/nova-logo.png"
              alt="Isotipo NovaCreativa"
              className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <img
              src="/images/nova-letras.png"
              alt="NovaCreativa"
              className="h-7 w-auto object-contain brightness-0 invert"
            />
          </a>

          <ul className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Inicio</a></li>
            <li><a href="#nosotros" className="hover:text-cyan-400 transition-colors">Nosotros</a></li>
            <li><a href="#servicios" className="hover:text-cyan-400 transition-colors">Servicios</a></li>
            <li><a href="#portafolio" className="hover:text-cyan-400 transition-colors">Proyectos</a></li>
            <li><a href="#proceso" className="hover:text-cyan-400 transition-colors">Proceso</a></li>
            <li><a href="#contacto" className="hover:text-cyan-400 transition-colors">Contacto</a></li>
          </ul>

          <nav className="flex items-center gap-3">
            <button
              onClick={openCreatePanel}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              Crear Idea
            </button>

            {user?.isAdmin && (
              <button
                onClick={() => setIsAdminOpen(true)}
                className="flex items-center gap-2 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-slate-200 px-5 py-2.5 rounded-full font-semibold text-sm transition-all cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Panel Admin
              </button>
            )}

            <button
              onClick={openPortalEmpresa}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] cursor-pointer"
            >
              <User className="w-4 h-4" />
              {user ? `Panel: ${user.empresa || user.company}` : 'Acceso Empresa'}
            </button>

            <a
              href="#contacto"
              className="hidden xl:inline-block text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors pl-1"
            >
              Hablemos
            </a>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-300 cursor-pointer">
              <Menu className="w-6 h-6" />
            </button>
          </nav>
        </nav>

        {isMenuOpen && (
          <div className="md:hidden bg-[#111827] border-b border-slate-800 px-6 py-4 space-y-3">
            <a href="#" onClick={() => setIsMenuOpen(false)} className="block text-sm text-slate-300 hover:text-cyan-400">Inicio</a>
            <a href="#nosotros" onClick={() => setIsMenuOpen(false)} className="block text-sm text-slate-300 hover:text-cyan-400">Nosotros</a>
            <a href="#servicios" onClick={() => setIsMenuOpen(false)} className="block text-sm text-slate-300 hover:text-cyan-400">Servicios</a>
            <a href="#portafolio" onClick={() => setIsMenuOpen(false)} className="block text-sm text-slate-300 hover:text-cyan-400">Proyectos</a>
            <a href="#proceso" onClick={() => setIsMenuOpen(false)} className="block text-sm text-slate-300 hover:text-cyan-400">Proceso</a>
            <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="block text-sm text-slate-300 hover:text-cyan-400">Contacto</a>
            <button
              onClick={() => { setIsMenuOpen(false); openCreatePanel(); }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm"
            >
              <FileText className="w-4 h-4" /> Crear Idea
            </button>
          </div>
        )}
      </header>

      <main className="min-h-screen bg-[#090D16] text-slate-50 selection:bg-cyan-500 selection:text-slate-950">
        {/* PORTADA PRINCIPAL (HERO) */}
        <section className="relative overflow-hidden border-b border-slate-800/60">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/15 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-24 flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-8 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <img src="/images/nova-logo.png" alt="" className="w-4 h-4 object-contain" />
              ESTUDIO CREATIVO · BRANDING · DISEÑO DIGITAL
            </span>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight max-w-4xl leading-tight mb-8 text-slate-50">
              Marcas que conectan Ideas que comunican
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
              Creamos identidades visuales, contenido estratégico y soluciones de comunicación digital que ayudan a las empresas a construir una imagen sólida y destacar en su mercado.
            </p>

            <nav className="flex flex-col sm:flex-row gap-4">
              <a
                href="#portafolio"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-7 py-4 rounded-full font-bold text-base transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:scale-105 active:scale-95"
              >
                Conoce nuestros proyectos
                <ArrowRight className="w-5 h-5" />
              </a>

              <button
                onClick={openHistoryPanel}
                className="relative flex items-center justify-center gap-3 bg-[#111827] hover:bg-slate-800 text-slate-100 px-8 py-4 rounded-full font-bold text-base transition-all border border-cyan-500/40 hover:border-cyan-400 cursor-pointer"
              >
                {userIdeas.length === 1 ? 'Mi idea' : 'Mis ideas'}
                {unreadAdminMessages > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-cyan-500 text-slate-950 animate-pulse">
                    {unreadAdminMessages}
                  </span>
                )}
                <ArrowRight className="w-5 h-5 text-cyan-400" />
              </button>
            </nav>
          </div>
        </section>

        {/* CARRUSEL DE LOGOS DE CLIENTES */}
        <LogosMarquee onSelectLogo={handleSelectLogoFromMarquee} />

        {/* NOSOTROS */}
        <section id="nosotros" className="py-20 max-w-7xl mx-auto px-6 border-b border-slate-800/80">
          <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl border-l-4 border-cyan-500 pl-6">
              <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-3">
                SOBRE NOSOTROS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-5 text-slate-50">
                Creatividad con propósito. Diseño con estrategia.
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-4">
                En Nova Creativa creemos que cada marca tiene algo que comunicar y una historia que merece destacar. Somos un estudio creativo que combina diseño, estrategia y comunicación para desarrollar soluciones visuales que conectan a las empresas con sus clientes.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Desde la creación de una identidad de marca hasta el desarrollo de contenido publicitario y digital, trabajamos para que cada proyecto tenga coherencia, personalidad y propósito.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-[#090D16] border border-cyan-500/20 w-full lg:w-auto min-w-[260px]">
              <img
                src="/images/nova-logo.png"
                alt="Isotipo NovaCreativa"
                className="h-20 w-auto object-contain mb-4"
              />
              <img
                src="/images/nova-letras.png"
                alt="NovaCreativa"
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="py-24 bg-[#111827]/40 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-6">
            <header className="border-l-4 border-cyan-500 pl-6 mb-14 max-w-3xl">
              <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-3">
                SERVICIOS
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-50 leading-tight">
                Soluciones creativas para marcas que quieren destacar.
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                Integramos diferentes disciplinas creativas para construir y fortalecer la comunicación de tu negocio.
              </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((s, idx) => (
                <article
                  key={idx}
                  className="bg-[#111827] border border-slate-800 p-7 rounded-2xl hover:border-cyan-500/50 transition-all hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)] flex items-start gap-5"
                >
                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/25 flex-shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-slate-50">
                      {s.num} {s.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </article>
              ))}
            </section>
          </div>
        </section>

        {/* PORTAFOLIO (CARRUSEL HORIZONTAL DESLIZABLE) */}
        <section id="portafolio" className="py-24 max-w-7xl mx-auto px-6 border-b border-slate-800/80">
          <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-3">
                NUESTRO TRABAJO
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-3 text-slate-50">
                Ideas que toman forma. Marcas que dejan huella.
              </h2>
              <p className="text-slate-400 max-w-2xl">
                Cada proyecto representa una oportunidad para construir algo diferente. Conoce una selección de identidades visuales, campañas publicitarias y soluciones creativas desarrolladas por Nova Creativa.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <nav className="flex gap-2 bg-[#111827] p-1.5 rounded-xl border border-slate-800">
                {['Todos', 'Branding', 'Web', '3D & Motion'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeFilter === cat
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.35)]'
                      : 'text-slate-400 hover:text-slate-50'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollCarousel('left')}
                  aria-label="Proyecto anterior"
                  className="p-2.5 rounded-xl bg-[#111827] border border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel('right')}
                  aria-label="Siguiente proyecto"
                  className="p-2.5 rounded-xl bg-[#111827] border border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-400 transition cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filteredProjects.map(proj => (
              <article
                key={proj.id}
                id={`proyecto-slide-${proj.id}`}
                onClick={() => setSelectedProject(proj)}
                className="snap-start flex-shrink-0 w-[85%] sm:w-[48%] lg:w-[32%] rounded-2xl border border-slate-800 bg-[#111827] hover:border-cyan-500/50 transition-all overflow-hidden flex flex-col justify-between cursor-pointer group"
              >
                <figure className="aspect-video overflow-hidden bg-[#090D16]">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </figure>
                <footer className="p-5 flex items-center justify-between gap-4 border-t border-slate-800 bg-[#111827]">
                  <h3 className="text-lg font-bold text-slate-50 truncate">{proj.title}</h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(proj);
                    }}
                    className="flex-shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 transition cursor-pointer"
                  >
                    Ver detalles
                  </button>
                </footer>
              </article>
            ))}
          </div>
        </section>

        {/* PROCESO CREATIVO */}
        <section id="proceso" className="py-24 max-w-7xl mx-auto px-6 border-b border-slate-800/80">
          <header className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-widest mb-4">
              NUESTRO PROCESO
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-50">
              Así hacemos realidad tu proyecto.
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Un flujo de trabajo claro, eficiente y colaborativo para materializar tus proyectos.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                icon: <Lightbulb className="w-6 h-6 text-cyan-400" />,
                title: "Descubrimos",
                desc: "Conocemos tu negocio, objetivos y necesidades."
              },
              {
                num: "02",
                icon: <PenTool className="w-6 h-6 text-cyan-400" />,
                title: "Creamos",
                desc: "Desarrollamos una propuesta creativa y estratégica."
              },
              {
                num: "03",
                icon: <Code2 className="w-6 h-6 text-cyan-400" />,
                title: "Diseñamos",
                desc: "Damos forma a la idea con soluciones visuales de alto impacto."
              },
              {
                num: "04",
                icon: <Rocket className="w-6 h-6 text-cyan-400" />,
                title: "Impulsamos",
                desc: "Te acompañamos para llevar tu marca a sus puntos de contacto y comunicar con coherencia."
              }
            ].map((step) => (
              <article
                key={step.num}
                className="group bg-[#111827] border border-slate-800 p-7 rounded-2xl hover:border-cyan-500/60 transition-all hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-black text-base shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                      {step.num}
                    </span>
                    <div className="p-2.5 rounded-xl bg-[#090D16] border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-50 mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACTO / CTA FINAL */}
        <section id="contacto" className="py-24 max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#111827] via-[#0E1B2E] to-[#111827] border border-cyan-500/35 p-10 md:p-16 text-center shadow-[0_0_45px_rgba(6,182,212,0.14)]">
            <h2 className="text-3xl md:text-5xl font-black mb-5 text-slate-50">
              Tu próximo proyecto comienza con una idea.
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-base md:text-lg leading-relaxed">
              Cuéntanos qué tienes en mente. En Nova Creativa estamos listos para ayudarte a desarrollar, renovar o fortalecer la imagen y comunicación de tu negocio.
            </p>
            <button
              type="button"
              onClick={openCreatePanel}
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-full font-bold text-base transition-all shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              Hablemos de tu proyecto
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-[#090D16] border-t border-slate-800/80 py-12">
        <section className="max-w-7xl mx-auto px-6 text-center space-y-3 text-sm text-slate-400">
          <p className="max-w-2xl mx-auto text-slate-300">
            Nova Creativa es un estudio creativo que desarrolla identidad de marca, diseño gráfico, contenido audiovisual y soluciones de comunicación digital.
          </p>
          <p>© 2026 Nova Creativa. Todos los derechos reservados.</p>
        </section>
      </footer>

      {/* VENTANA FLOTANTE SUPERPUESTA DEL PROYECTO */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-2xl bg-[#111827] border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Cerrar ventana"
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#090D16]/90 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video w-full bg-[#090D16] overflow-hidden">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 flex items-center justify-between border-t border-slate-800">
              <h3 className="text-2xl font-black text-slate-50">
                {selectedProject.title}
              </h3>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE HISTORIAL CON BUSCADOR Y NOTIFICACIONES */}
      <dialog
        ref={historyModalRef}
        className="backdrop:bg-black/80 bg-[#111827] text-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-800 max-w-2xl w-full shadow-[0_0_50px_rgba(6,182,212,0.15)] backdrop-blur-2xl"
      >
        <header className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-cyan-400" />
            Historial de Ideas
          </h3>
          <button onClick={() => historyModalRef.current?.close()} className="text-slate-400 hover:text-slate-50 cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </header>

        {user && (
          <aside className="mb-4 p-4 rounded-2xl bg-[#090D16] border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                <Building2 className="w-5 h-5" />
              </div>
              <nav>
                <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">Empresa Registrada</span>
                <h4 className="text-base font-bold text-slate-50">{user.empresa || user.company}</h4>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs bg-cyan-950/60 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30">
                {userIdeas.length} {userIdeas.length === 1 ? 'Idea' : 'Ideas'}
              </span>
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-red-400 transition cursor-pointer"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </aside>
        )}

        {/* Buscador rápido de ideas */}
        {userIdeas.length > 0 && (
          <div className="relative mb-5">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filtrar mis ideas por nombre o servicio..."
              value={historySearch}
              onChange={(e) => setHistorySearch(e.target.value)}
              className="w-full bg-[#090D16] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        )}

        <section className="mb-6">
          <h4 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" /> Ideas en Revisión
          </h4>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {loadingIdeas ? (
              <p className="text-xs text-slate-400 py-3 text-center">Cargando...</p>
            ) : ideasEnRevision.length === 0 ? (
              <p className="text-xs text-slate-500 py-2 italic">No hay ideas en proceso de revisión actualmente.</p>
            ) : (
              ideasEnRevision.map(item =>
                renderIdeaCard(
                  item,
                  'border-amber-500/30',
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-950/60 text-amber-300 border border-amber-500/30">
                    En revisión
                  </span>
                )
              )
            )}
          </div>
        </section>

        <section className="mb-6">
          <h4 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Ideas Aceptadas
          </h4>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {ideasAceptadas.length === 0 ? (
              <p className="text-xs text-slate-500 py-2 italic">Aún no hay ideas aceptadas.</p>
            ) : (
              ideasAceptadas.map(item =>
                renderIdeaCard(
                  item,
                  'border-emerald-500/30',
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                    ✨ Idea aceptada
                  </span>
                )
              )
            )}
          </div>
        </section>

        <section className="mb-2">
          <h4 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-400" /> Ideas Rechazadas
          </h4>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {ideasRechazadas.length === 0 ? (
              <p className="text-xs text-slate-500 py-2 italic">No hay ideas rechazadas.</p>
            ) : (
              ideasRechazadas.map(item =>
                renderIdeaCard(
                  item,
                  'border-red-500/30',
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-red-950/60 text-red-300 border border-red-500/30">
                    ❌ Idea rechazada
                  </span>
                )
              )
            )}
          </div>
        </section>
      </dialog>

      {/* MODAL DE CREACIÓN */}
      <dialog
        ref={createModalRef}
        className="backdrop:bg-black/80 bg-transparent p-0 m-auto max-w-md w-full overflow-visible"
      >
        <div className="relative bg-[#0B1221] text-slate-50 p-6 sm:p-7 rounded-2xl border border-cyan-500/60 shadow-[0_0_45px_rgba(6,182,212,0.35)]">
          <div className="hidden sm:grid grid-cols-3 gap-1.5 absolute -top-6 right-8 pointer-events-none opacity-60">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            ))}
          </div>
          <div className="hidden sm:grid grid-cols-3 gap-1.5 absolute -bottom-6 left-8 pointer-events-none opacity-60">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            ))}
          </div>

          <header className="flex justify-between items-center mb-5 pb-3 border-b border-slate-800/80">
            <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2.5 text-slate-50">
              <span className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-400">
                <FileText className="w-4 h-4" />
              </span>
              Tu próximo proyecto comienza con una idea.
            </h3>
            <button
              type="button"
              onClick={() => createModalRef.current?.close()}
              className="text-slate-400 hover:text-slate-50 transition-colors cursor-pointer p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          <form onSubmit={handleSaveIdea} className="space-y-3.5">
            <label className="block">
              <span className="text-xs font-medium text-slate-300 mb-1.5 block">
                Nombre de tu proyecto/idea
              </span>
              <input
                ref={tituloRef}
                type="text"
                placeholder="Ej. Identidad Visual & Catálogo"
                value={newIdea.titulo}
                onChange={(e) => setNewIdea({ ...newIdea, titulo: e.target.value })}
                className="w-full bg-[#070B14] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </label>

            <label className="block">
              <span className="text-xs font-medium text-slate-300 mb-1.5 block">
                Servicio requerido
              </span>
              <select
                value={newIdea.servicio}
                onChange={(e) => setNewIdea({ ...newIdea, servicio: e.target.value })}
                className="w-full bg-[#070B14] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-50 focus:outline-none focus:border-cyan-400 cursor-pointer transition-colors"
              >
                <option>Branding e Identidad Visual</option>
                <option>Diseño Gráfico Publicitario</option>
                <option>Gestión de Redes Sociales</option>
                <option>Producción y Edición Audiovisual</option>
                <option>Marketing y Comunicación Digital</option>
                <option>Diseño Web</option>
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-medium text-slate-300 mb-1.5 block">
                Presupuesto estimado
              </span>
              <select
                value={newIdea.presupuesto}
                onChange={(e) => setNewIdea({ ...newIdea, presupuesto: e.target.value })}
                className="w-full bg-[#070B14] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-50 focus:outline-none focus:border-cyan-400 cursor-pointer transition-colors"
              >
                <option>$500 - $1,000 USD</option>
                <option>$1,000 - $2,500 USD</option>
                <option>$2,500 - $5,000 USD</option>
                <option>Más de $5,000 USD</option>
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-medium text-slate-300 mb-1.5 block">
                Plazo estimado
              </span>
              <select
                value={newIdea.tiempo}
                onChange={(e) => setNewIdea({ ...newIdea, tiempo: e.target.value })}
                className="w-full bg-[#070B14] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-50 focus:outline-none focus:border-cyan-400 cursor-pointer transition-colors"
              >
                <option>1 - 3 Meses</option>
                <option>2 a 4 semanas</option>
                <option>1 a 2 semanas</option>
                <option>Flexible / Por definir</option>
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-medium text-slate-300 mb-1.5 block">
                Cuéntanos qué tienes en mente
              </span>
              <textarea
                rows={3}
                placeholder="En Nova Creativa estamos listos para ayudarte a desarrollar, renovar o fortalecer la imagen y comunicación de tu negocio."
                value={newIdea.detalles}
                onChange={(e) => setNewIdea({ ...newIdea, detalles: e.target.value })}
                className="w-full bg-[#070B14] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 resize-none transition-colors"
              />
            </label>

            <footer className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-bold py-3 rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.45)] transition-all cursor-pointer disabled:opacity-50"
              >
                {submitting ? 'Enviando...' : 'Hablemos de tu proyecto'}
                <Send className="w-4 h-4" />
              </button>
            </footer>
          </form>
        </div>
      </dialog>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </>
  );
}