const logosClientes = [
    {
        id: 1,
        nombre: "Francinny Luxury Nails",
        projectTitle: "FRANCINNY",
        src: "/images/francinny.png",
        imgClass: "scale-100"
    },
    {
        id: 2,
        nombre: "Autopartes Albuquerque",
        projectTitle: "AUTOPARTES ALBUQUERQUE",
        src: "/images/albuquerque.png",
        imgClass: "scale-105"
    },
    {
        id: 3,
        nombre: "MULTEC",
        projectTitle: "MULTEC",
        src: "/images/multec.png",
        imgClass: "scale-105"
    },
    {
        id: 4,
        nombre: "SEGMECO",
        projectTitle: "SEGMECO",
        src: "/images/segmeco.png",
        imgClass: "scale-105"
    },
    {
        id: 5,
        nombre: "UMAMI",
        projectTitle: "UMAMI",
        src: "/images/umami.png",
        imgClass: "scale-110"
    },
    {
        id: 6,
        nombre: "EL MUNDO MAGICO DE ALESSIA",
        projectTitle: "EL MUNDO MAGICO DE ALESSIA",
        src: "/images/alessia.png",
        imgClass: "scale-150"
    },
    {
        id: 7,
        nombre: "SUZUKI MOTOS",
        projectTitle: "SUZUKI MOTOS",
        src: "/images/suzuki.png",
        imgClass: "scale-75"
    }
];

const bloqueBase = [...logosClientes, ...logosClientes];

export default function LogosMarquee({ onSelectLogo }) {
    return (
        <section className="py-10 bg-[#050811] border-t border-white/5 overflow-hidden">
            <p className="text-center text-xs text-slate-400 uppercase tracking-[0.22em] mb-8">
                Marcas que confían en nosotros
            </p>

            <div className="relative mx-auto max-w-6xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                <div className="animate-marquee gap-12 md:gap-16 items-center">
                    {[...bloqueBase, ...bloqueBase].map((logo, index) => (
                        <button
                            key={`${logo.id}-${index}`}
                            type="button"
                            onClick={() => onSelectLogo?.(logo)}
                            title={`Ver ${logo.nombre}`}
                            className="flex-shrink-0 w-40 md:w-48 h-14 md:h-16 flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer bg-transparent border-0 p-1 overflow-visible"
                        >
                            <img
                                src={logo.src}
                                alt={logo.nombre}
                                className={`max-h-11 md:max-h-12 max-w-full w-auto object-contain transition-transform duration-300 ${logo.imgClass || ""}`}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}