"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "1",
    icon: "💬",
    title: "Cuéntanos tu viaje",
    text: "Escríbenos por WhatsApp con tus fechas, destino y cuántas personas viajan. No necesitas saber nada más — nosotros nos encargamos.",
  },
  {
    number: "2",
    icon: "🔍",
    title: "Recibe opciones reales",
    text: "En minutos te enviamos las mejores tarifas con equipaje incluido, horarios claros y opciones de pago. Tú eliges la que más te convenga.",
  },
  {
    number: "3",
    icon: "✅",
    title: "Confirma y viaja tranquilo",
    text: "Emitimos tu boleto con código PNR verificable en la web de la aerolínea. Y si algo cambia antes de tu vuelo, nosotros nos ocupamos.",
  },
];

export default function ComoFunciona() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      el.querySelectorAll(".step-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.7,
          delay: i * 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="como-funciona" ref={ref} className="py-24 sm:py-32 px-6 scroll-mt-20 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">
            Reservar tu vuelo es <span className="text-gradient">así de fácil</span>
          </h2>
          <p className="text-text text-base max-w-xl mx-auto">
            En 3 pasos tienes tu boleto confirmado. Sin complicaciones, sin
            letras pequeñas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div
              key={s.number}
              className="step-card relative bg-white rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-8 text-center hover:shadow-lg hover:shadow-navy/5 transition-all duration-300"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-navy text-white text-sm font-bold flex items-center justify-center">
                {s.number}
              </div>
              <div className="text-4xl mb-4 mt-2">{s.icon}</div>
              <h3 className="text-lg font-bold text-navy mb-3">{s.title}</h3>
              <p className="text-text leading-relaxed text-base">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
