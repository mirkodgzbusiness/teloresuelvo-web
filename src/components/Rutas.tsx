"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RutaCardProps {
  flag1: string;
  flag2: string;
  title: string;
  description: string;
  price: string;
}

function RutaCard({
  flag1,
  flag2,
  title,
  description,
  price,
}: RutaCardProps) {
  return (
    <div className="group rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.08)] bg-white p-7 transition-all duration-300 hover:shadow-xl hover:shadow-navy/5 hover:scale-[1.02] hover:border-gray-300 flex flex-col">
      <div className="flex items-center gap-2 text-3xl mb-3">
        <span>{flag1}</span>
        <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        <span>{flag2}</span>
      </div>

      <h3 className="text-lg font-bold text-navy mb-2">{title}</h3>
      <p className="text-text leading-relaxed text-base mb-4 flex-1">
        {description}
      </p>

      <p className="font-display text-2xl font-extrabold text-navy mb-4">
        {price}
        <span className="text-base font-normal text-text-muted ml-1">
          ida y vuelta*
        </span>
      </p>

    </div>
  );
}

const rutas: RutaCardProps[] = [
  {
    flag1: "🇮🇹",
    flag2: "🇵🇪",
    title: "Milán / Roma ↔ Lima",
    description:
      "La favorita de la comunidad peruana en Italia. Vuelos con maleta en bodega, escalas cortas y flexibilidad para cambios de fecha.",
    price: "Desde €380",
  },
  {
    flag1: "🇪🇸",
    flag2: "🇨🇴",
    title: "Madrid / Barcelona ↔ Bogotá / Medellín / Cali",
    description:
      "Conexiones directas y con escala desde las principales ciudades españolas. Perfecta para vacaciones o visitas familiares.",
    price: "Desde €420",
  },
  {
    flag1: "🇪🇸",
    flag2: "🇵🇪",
    title: "Madrid / Barcelona ↔ Lima",
    description:
      "Cada vez más solicitada por peruanos en España. Vuelos con buen equipaje y horarios que aprovechan tus vacaciones al máximo.",
    price: "Desde €450",
  },
  {
    flag1: "🇮🇹",
    flag2: "🇨🇴",
    title: "Roma / Milán ↔ Bogotá",
    description:
      "La ruta que conecta a la comunidad colombiana en Italia con su país. Vuelos competitivos con opciones de equipaje generoso.",
    price: "Desde €440",
  },
];

export default function Rutas() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      section.querySelectorAll(".animate-in").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="rutas" ref={sectionRef} className="py-24 sm:py-32 px-6 bg-light-bg scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-in">
          <h2 className="section-heading mb-4">
            Nuestras <span className="text-gradient">rutas más buscadas</span>
          </h2>
          <p className="text-text text-base max-w-2xl mx-auto">
            Las conexiones que más nos piden nuestros clientes. ¿No ves tu ruta?
            Escríbenos — volamos a cualquier destino.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in">
          {rutas.map((r) => (
            <RutaCard key={r.title} {...r} />
          ))}
        </div>

        <p className="text-center text-base text-text-muted mt-8 animate-in">
          *Precios referenciales sujetos a disponibilidad y temporada.
          Escríbenos para una cotización personalizada con precios actualizados.
        </p>
      </div>
    </section>
  );
}
