import { useState, useRef, useEffect, useMemo } from 'react';
import LogosMarquee from './components/LogosMarquee';
import {
  Palette,
  Globe,
  Rocket,
  Layers,
  ArrowRight,
  X,
  Menu,
  Lightbulb,
  PenTool,
  Code2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Inicio', href: '#' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#portafolio' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' }
];

const CATEGORIES = ['Todos', 'Branding', 'Web', '3D & Motion'];

const WHATSAPP_URL =
  'https://wa.me/50582241088?text=' +
  encodeURIComponent('Hola Nova Creativa, me gustaría cotizar un proyecto.');

const MAILTO_URL = 'mailto:novacreativanic@outlook.com';

const FACEBOOK_URL = 'https://www.facebook.com/share/1BL7ksVmL4/?mibextid=wwXIfr';

const SERVICES = [
  {
    num: '1.',
    icon: Palette,
    title: 'Branding e Identidad Visual',
    desc: 'Creamos marcas desde su concepto hasta su identidad visual, desarrollando logotipos, paletas cromáticas, tipografías y sistemas gráficos.'
  },
  {
    num: '2.',
    icon: Layers,
    title: 'Diseño Gráfico Publicitario',
    desc: 'Diseñamos piezas visuales para comunicar, promocionar productos, presentar servicios y fortalecer la imagen de tu empresa.'
  },
  {
    num: '3.',
    icon: Globe,
    title: 'Gestión de Redes Sociales',
    desc: 'Planificamos, diseñamos y gestionamos contenido digital para mantener una comunicación constante y profesional con tu audiencia.'
  },
  {
    num: '4.',
    icon: Rocket,
    title: 'Producción y Edición Audiovisual',
    desc: 'Desarrollamos contenido audiovisual para promocionar marcas, productos, servicios y experiencias.'
  }
];

const PROJECTS = [
  {
    id: 1,
    title: 'AUTOPARTES ALBUQUERQUE',
    category: 'Branding',
    image: '/images/albuquerquebaner.jpg'
  },
  {
    id: 2,
    title: 'MULTEC',
    category: 'Web',
    image: '/images/multecbaner.png'
  },
  {
    id: 3,
    title: 'SEGMECO',
    category: '3D & Motion',
    image: '/images/segmecobaner.png'
  },
  {
    id: 4,
    title: 'FRANCINNY',
    category: 'Web',
    image: '/images/francinnybaner.png'
  },
  {
    id: 5,
    title: 'UMAMI',
    category: 'Branding',
    image: '/images/umamibaner.png'
  },
  {
    id: 6,
    title: 'EL MUNDO MAGICO DE ALESSIA',
    category: 'Branding',
    image: '/images/alessiabaner.png'
  },
  {
    id: 7,
    title: 'SUZUKI MOTOS',
    category: 'Branding',
    image: '/images/suzukibaner.png'
  }
];

const PROCESS_STEPS = [
  {
    num: '01',
    icon: Lightbulb,
    title: 'Descubrimos',
    desc: 'Conocemos tu negocio, objetivos y necesidades.'
  },
  {
    num: '02',
    icon: PenTool,
    title: 'Creamos',
    desc: 'Desarrollamos una propuesta creativa y estratégica.'
  },
  {
    num: '03',
    icon: Code2,
    title: 'Diseñamos',
    desc: 'Damos forma a la idea con soluciones visuales de alto impacto.'
  },
  {
    num: '04',
    icon: Rocket,
    title: 'Impulsamos',
    desc: 'Te acompañamos para llevar tu marca a sus puntos de contacto y comunicar con coherencia.'
  }
];

export default function App() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const carouselRef = useRef(null);

  const filteredProjects = useMemo(() => {
    return activeFilter === 'Todos'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = direction === 'left' ? -420 : 420;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleSelectLogoFromMarquee = (logo) => {
    const matchedProject = PROJECTS.find(
      (p) => p.title.toUpperCase() === (logo.projectTitle || logo.nombre).toUpperCase()
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

  return (
    <>
      {/* NAVEGACIÓN PRINCIPAL */}
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
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-cyan-400 transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contacto"
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              Hablemos
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menú"
              className="md:hidden text-slate-300 cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>

        {/* MENÚ MÓVIL */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#111827] border-b border-slate-800 px-6 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-sm text-slate-300 hover:text-cyan-400"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setIsMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm"
            >
              Hablemos
            </a>
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
              Marcas que conectan. Ideas que comunican.
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
              Creamos identidades visuales, contenido estratégico y soluciones de comunicación digital que ayudan a las empresas a construir una imagen sólida y destacar en su mercado.
            </p>

            <a
              href="#portafolio"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-full font-bold text-base transition-all shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:scale-105 active:scale-95"
            >
              Conoce nuestros proyectos
              <ArrowRight className="w-5 h-5" />
            </a>
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
              {SERVICES.map((s, idx) => {
                const ServiceIcon = s.icon;
                return (
                  <article
                    key={idx}
                    className="bg-[#111827] border border-slate-800 p-7 rounded-2xl hover:border-cyan-500/50 transition-all hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)] flex items-start gap-5"
                  >
                    <div className="p-3.5 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/25 flex-shrink-0">
                      <ServiceIcon className="w-6 h-6 text-cyan-400" />
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
                );
              })}
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
              <nav aria-label="Filtro de proyectos" className="flex gap-2 bg-[#111827] p-1.5 rounded-xl border border-slate-800">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
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
            {filteredProjects.map((proj) => (
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
            {PROCESS_STEPS.map((step) => {
              const StepIcon = step.icon;
              return (
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
                        <StepIcon className="w-6 h-6 text-cyan-400" />
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
              );
            })}
          </div>
        </section>

        {/* CONTACTO DIRECTO */}
        <section id="contacto" className="bg-[#070b12] text-white px-6 py-20 md:py-24">
          <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            {/* Columna Izquierda: Logo, Texto y Botones Neón */}
            <div className="max-w-[560px] w-full">
              <div
                aria-label="Nova Creativa"
                className="w-[68px] h-[68px] rounded-2xl bg-[#0e1522] border border-sky-400/20 shadow-[0_0_28px_rgba(0,168,232,0.14)] flex items-center justify-center mb-8"
              >
                <svg viewBox="0 0 100 100" fill="none" className="w-11 h-11" aria-hidden="true">
                  <path
                    d="M16 65C9 44 25 20 53 16C79 12 91 31 85 50C81 62 67 68 53 67C64 63 72 54 73 43C74 29 62 23 47 26C26 30 15 47 16 65Z"
                    fill="#00A8E8"
                  />
                  <path
                    d="M87 44C93 66 76 87 48 88C24 89 13 71 21 51C26 39 39 32 54 32C66 32 74 40 71 51C68 62 56 69 40 67C51 64 59 58 61 50C63 42 56 38 47 39C33 41 26 53 29 65C33 77 48 80 63 75C76 70 84 58 87 44Z"
                    fill="#00A8E8"
                  />
                  <circle cx="50" cy="51" r="9.5" fill="#00A8E8" />
                  <path d="M47.5 46.8L54.8 51L47.5 55.2V46.8Z" fill="#FFFFFF" />
                </svg>
              </div>

              <h2 className="text-3xl md:text-[2.35rem] font-extrabold leading-[1.18] tracking-tight text-white mb-4">
                Tu próximo proyecto comienza con una idea.
              </h2>
              <p className="text-[0.98rem] leading-relaxed text-slate-400 mb-9">
                Cuéntanos que tienes en mente. En Nova Creativa estamos listos para ayudarte a desarrollar, renovar o fortalecer la imagen y comunicación de tu negocio.
              </p>

              <div className="flex flex-col gap-3.5 w-full max-w-[340px]">
                {/* Botón WhatsApp */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-600 text-white text-[0.92rem] font-semibold shadow-[0_0_22px_rgba(6,182,212,0.35),0_0_40px_rgba(0,102,255,0.2)] hover:shadow-[0_0_28px_rgba(6,182,212,0.55),0_0_48px_rgba(0,102,255,0.35)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                  </svg>
                  <span>WhatsApp</span>
                </a>

                {/* Botón Correo */}
                <a
                  href={MAILTO_URL}
                  className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-600 text-white text-[0.92rem] font-semibold shadow-[0_0_22px_rgba(6,182,212,0.35),0_0_40px_rgba(0,102,255,0.2)] hover:shadow-[0_0_28px_rgba(6,182,212,0.55),0_0_48px_rgba(0,102,255,0.35)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 shrink-0"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>novacreativanic@outlook.com</span>
                </a>

                {/* Botón Facebook */}
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-600 text-white text-[0.92rem] font-semibold shadow-[0_0_22px_rgba(6,182,212,0.35),0_0_40px_rgba(0,102,255,0.2)] hover:shadow-[0_0_28px_rgba(6,182,212,0.55),0_0_48px_rgba(0,102,255,0.35)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span>Nova Creativa en Facebook</span>
                </a>
              </div>
            </div>

            {/* Columna Derecha: Síguenos */}
            <div className="flex flex-col items-start md:items-center pt-2">
              <span className="text-[0.95rem] font-bold text-white mb-6 md:mb-8">
                Síguenos
              </span>
              <div className="flex flex-row md:flex-col items-center gap-6 md:gap-8">
                <a
                  href={MAILTO_URL}
                  aria-label="Correo electrónico"
                  className="text-slate-300 hover:text-sky-400 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>

                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-slate-300 hover:text-sky-400 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                    aria-hidden="true"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="text-slate-300 hover:text-sky-400 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                    aria-hidden="true"
                  >
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                  </svg>
                </a>
              </div>
            </div>
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
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
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
    </>
  );
}
