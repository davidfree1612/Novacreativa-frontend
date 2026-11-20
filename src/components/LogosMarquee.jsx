const logosClientes = [
    { id: 1, nombre: "Francinny Luxury Nails", src: "/images/francinny.png" },
    { id: 2, nombre: "Autopartes Albuquerque", src: "/images/albuquerque.png" },
    { id: 3, nombre: "MULTEC", src: "/images/multec.png" },
    { id: 4, nombre: "SEGMECO", src: "/images/segmeco.png" },
];

const bloqueBase = [...logosClientes, ...logosClientes];

export default function LogosMarquee() {
    return (
        <section className="py-10 bg-[#050811] border-t border-white/5 overflow-hidden">
            <p className="text-center text-xs text-slate-400 uppercase tracking-[0.22em] mb-8">
                Marcas que confían en nosotros
            </p>

            <div className="relative mx-auto max-w-6xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                <div className="animate-marquee gap-16 md:gap-20 items-center">
                    {[...bloqueBase, ...bloqueBase].map((logo, index) => (
                        <div
                            key={`${logo.id}-${index}`}
                            className="flex-shrink-0 opacity-65 hover:opacity-100 transition-all duration-300 hover:scale-105"
                        >
                            <img
                                src={logo.src}
                                alt={logo.nombre}
                                className="h-10 md:h-12 w-auto object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}