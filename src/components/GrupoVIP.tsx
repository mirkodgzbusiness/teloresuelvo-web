"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { icon: "🏷️", text: "Tarifas de error y ofertas flash antes que nadie" },
  { icon: "📅", text: "Alertas de temporada baja para tus rutas" },
  { icon: "💡", text: "Tips de equipaje, migración y escalas" },
  { icon: "🚫", text: "Cero spam — solo ofertas reales" },
];

export default function GrupoVIP() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".animate-in"), {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 sm:py-32 px-6 bg-navy text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="section-heading section-heading--light animate-in mb-6">
          <span className="mr-2">🔥</span>
          <span className="text-gradient">Ofertas exclusivas</span> que duran horas, no días
        </h2>

        <p className="animate-in text-base !text-white mb-10 leading-relaxed max-w-2xl mx-auto">
          Las aerolíneas lanzan tarifas flash que desaparecen en minutos.
          Nuestro Grupo VIP de WhatsApp es donde las compartimos primero —
          antes que en cualquier web.
        </p>

        <div className="animate-in grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-md mx-auto text-left">
          {benefits.map((b) => (
            <div
              key={b.text}
              className="flex items-start gap-2 text-base text-on-dark"
            >
              <span className="text-base mt-0.5">{b.icon}</span>
              <span>{b.text}</span>
            </div>
          ))}
        </div>

        <div className="animate-in">
          <a
            href="https://chat.whatsapp.com/ENLACE_GRUPO_VIP"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-navy text-base font-bold px-8 py-4 rounded-full transition-all duration-200 hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            <span>👥</span>
            Unirme al Grupo VIP de Ofertas
          </a>
        </div>

        <p className="animate-in mt-5 text-base !text-white">
          +200 personas ya reciben nuestras alertas. Gratis, sin compromiso.
        </p>
      </div>
    </section>
  );
}
