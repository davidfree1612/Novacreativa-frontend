import { useState, useRef } from 'react';
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
  ChevronRight,
  Mail,
  MessageCircle
} from 'lucide-react';

function Facebook({ className = 'w-5 h-5', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function App() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const carouselRef = useRef(null);

  const whatsappUrl =
    'https://wa.me/50582241088?text=' +
    encodeURIComponent('Hola Nova Creativa, me gustaría cotizar un proyecto.');

  const mailtoUrl =
    'mailto:novacreativanic@outlook.com?subject=' +
    encodeURIComponent('Consulta de proyecto - Nova Creativa') +
    '&body=' +
    encodeURIComponent('Hola Nova Creativa, me gustaría recibir información sobre sus servicios.');

  const facebookUrl = 'https://www.facebook.com/share/1BL7ksVmL4/?mibextid=wwXIfr';

  const services = [
    {
      num: '1.',
      icon: <Palette className="w-6 h-6 text-cyan-400" />,
      title: 'Branding e Identidad Visual',
      desc: 'Creamos marcas desde su concepto hasta su identidad visual, desarrollando logotipos, paletas cromáticas, tipografías y sistemas gráficos.'
    },
    {
      num: '2.',
      icon: <Layers className="w-6 h-6 text-cyan-400" />,
      title: 'Diseño Gráfico Publicitario',
      desc: 'Diseñamos piezas visuales para comunicar, promocionar productos, presentar servicios y fortalecer la imagen de tu empresa.'
    },
    {
      num: '3.',
      icon: <Globe className="w-6 h-6 text-cyan-400" />,
      title: 'Gestión de Redes Sociales',
      desc: 'Planificamos, diseñamos y gestionamos contenido digital para mantener una comunicación constante y profesional con tu audiencia.'
    },
    {
      num: '4.',
      icon: <Rocket className="w-6 h-6 text-cyan-400" />,
      title: 'Producción y Edición Audiovisual',
      desc: 'Desarrollamos contenido audiovisual para promocionar marcas, productos, servicios y experiencias.'
    }
  ];

  const projects = [
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

  const filteredProjects = activeFilter === 'Todos'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = direction === 'left' ? -420 : 420;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleSelectLogoFromMarquee = (logo) => {
    const matchedProject = projects.find(
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

        {isMenuOpen && (
          <div className="md:hidden bg-[#111827] border-b border-slate-800 px-6 py-4 space-y-3">
            <a href="#" onClick={() => setIsMenuOpen(false)} className="block text-sm text-slate-300 hover:text-cyan-400">Inicio</a>
            <a href="#nosotros" onClick={() => setIsMenuOpen(false)} className="block text-sm text-slate-300 hover:text-cyan-400">Nosotros</a>
            <a href="#servicios" onClick={() => setIsMenuOpen(false)} className="block text-sm text-slate-300 hover:text-cyan-400">Servicios</a>
            <a href="#portafolio" onClick={() => setIsMenuOpen(false)} className="block text-sm text-slate-300 hover:text-cyan-400">Proyectos</a>
            <a href="#proceso" onClick={() => setIsMenuOpen(false)} className="block text-sm text-slate-300 hover:text-cyan-400">Proceso</a>
            <a href="#contacto" onClick={() => setIsMenuOpen(false)} className="block text-sm text-slate-300 hover:text-cyan-400">Contacto</a>
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
                {['Todos', 'Branding', 'Web', '3D & Motion'].map((cat) => (
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
            {[
              {
                num: '01',
                icon: <Lightbulb className="w-6 h-6 text-cyan-400" />,
                title: 'Descubrimos',
                desc: 'Conocemos tu negocio, objetivos y necesidades.'
              },
              {
                num: '02',
                icon: <PenTool className="w-6 h-6 text-cyan-400" />,
                title: 'Creamos',
                desc: 'Desarrollamos una propuesta creativa y estratégica.'
              },
              {
                num: '03',
                icon: <Code2 className="w-6 h-6 text-cyan-400" />,
                title: 'Diseñamos',
                desc: 'Damos forma a la idea con soluciones visuales de alto impacto.'
              },
              {
                num: '04',
                icon: <Rocket className="w-6 h-6 text-cyan-400" />,
                title: 'Impulsamos',
                desc: 'Te acompañamos para llevar tu marca a sus puntos de contacto y comunicar con coherencia.'
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

        {/* CONTACTO DIRECTO */}
        <section id="contacto" className="py-24 max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#111827] via-[#0E1B2E] to-[#111827] border border-cyan-500/35 p-10 md:p-16 text-center shadow-[0_0_45px_rgba(6,182,212,0.14)]">
            <h2 className="text-3xl md:text-5xl font-black mb-5 text-slate-50">
              Tu próximo proyecto comienza con una idea.
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-base md:text-lg leading-relaxed">
              Cuéntanos qué tienes en mente. En Nova Creativa estamos listos para ayudarte a desarrollar, renovar o fortalecer la imagen y comunicación de tu negocio.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-full font-bold text-base transition-all shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                Hablemos por WhatsApp (+505 8224 1088)
              </a>

              <a
                href={mailtoUrl}
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-full font-bold text-base transition-all shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:scale-105 active:scale-95"
              >
                <Mail className="w-5 h-5" />
                novacreativanic@outlook.com
              </a>

              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-full font-bold text-base transition-all shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:scale-105 active:scale-95"
              >
                <Facebook className="w-5 h-5" />
                Nova Creativa en Facebook
              </a>
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