"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_GROUP_HREF =
  "https://chat.whatsapp.com/EEEQfbKdsMNI8RbIQxaRwO";

const benefits = [
  "Tarifas de error y ofertas flash antes que nadie",
  "Alertas de temporada baja para tus rutas",
  "Tips de equipaje, migración y escalas",
  "Cero spam — solo ofertas reales",
];

function CheckIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="#38bdf8"
      />
      <path d="M8 12L11 15L16 10" stroke="#38bdf8" strokeMiterlimit="10" />
    </svg>
  );
}

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

        <div className="animate-in flex flex-col gap-4 mb-10 max-w-md mx-auto text-left">
          {benefits.map((text) => (
            <div
              key={text}
              className="flex items-center gap-3 text-base text-on-dark"
            >
              <CheckIcon />
              <span>{text}</span>
            </div>
          ))}
        </div>

        <div className="animate-in">
          <a
            href={WHATSAPP_GROUP_HREF}
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
