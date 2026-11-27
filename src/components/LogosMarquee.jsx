const logosClientes = [
    {
        id: 1,
        nombre: "Francinny Luxury Nails",
        projectTitle: "FRANCINNY",
        src: "/images/francinny.png",
        imgClass: "scale-180",
        boxClass: "px-10"
    },
    {
        id: 2,
        nombre: "Autopartes Albuquerque",
        projectTitle: "AUTOPARTES ALBUQUERQUE",
        src: "/images/albuquerque.png",
        imgClass: "scale-110",
        boxClass: "px-4"
    },
    {
        id: 3,
        nombre: "MULTEC",
        projectTitle: "MULTEC",
        src: "/images/multec.png",
        imgClass: "scale-100",
        boxClass: "px-3"
    },
    {
        id: 4,
        nombre: "SEGMECO",
        projectTitle: "SEGMECO",
        src: "/images/segmeco.png",
        imgClass: "scale-120",
        boxClass: "px-5"
    },
    {
        id: 5,
        nombre: "UMAMI",
        projectTitle: "UMAMI",
        src: "/images/umami.png",
        imgClass: "scale-200",
        boxClass: "px-10"
    },
    {
        id: 6,
        nombre: "EL MUNDO MAGICO DE ALESSIA",
        projectTitle: "EL MUNDO MAGICO DE ALESSIA",
        src: "/images/alessia.png",
        imgClass: "scale-370",
        boxClass: "px-16"
    },
    {
        id: 7,
        nombre: "SUZUKI MOTOS",
        projectTitle: "SUZUKI MOTOS",
        src: "/images/suzuki.png",
        imgClass: "scale-60",
        boxClass: "-mx-20 md:-mx-24 px-0"
    },
    {
        id: 8,
        nombre: "VARIEDADES EL EDEN",
        projectTitle: "VARIEDADES EL EDEN",
        src: "/images/variedadeseden.png",
        imgClass: "scale-130",
        boxClass: "px-6"
    },
    {
        id: 9,
        nombre: "SAMMY SALON",
        projectTitle: "SAMMY SALON",
        src: "/images/sammysalon.png",
        imgClass: "scale-180",
        boxClass: "px-8"
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
                <div
                    className="animate-marquee gap-8 md:gap-10 items-center"
                    style={{ animationDuration: "60s" }}
                >
                    {[...bloqueBase, ...bloqueBase].map((logo, index) => (
                        <button
                            key={`${logo.id}-${index}`}
                            type="button"
                            onClick={() => onSelectLogo?.(logo)}
                            title={`Ver ${logo.nombre}`}
                            className={`flex-shrink-0 w-auto h-16 md:h-20 flex items-center justify-center opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-105 cursor-pointer bg-transparent border-0 overflow-visible ${logo.boxClass || "px-4"}`}
                        >
                            <img
                                src={logo.src}
                                alt={logo.nombre}
                                className={`max-h-12 md:max-h-14 max-w-full w-auto object-contain transition-transform duration-300 ${logo.imgClass || ""}`}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}