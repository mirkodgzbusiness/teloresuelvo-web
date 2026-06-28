"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "¿Los boletos son reales y verificables?",
    a: "Sí, al 100%. Cada boleto que emitimos incluye un código PNR (código de reserva) que puedes verificar directamente en la web de la aerolínea. También recibes tu itinerario completo por email y WhatsApp.",
  },
  {
    q: "¿Cómo pago mi boleto?",
    a: "Aceptamos transferencia bancaria (Europa y Latinoamérica), tarjeta de crédito/débito y pagos en cuotas según la aerolínea. Te explicamos todas las opciones al momento de cotizar.",
  },
  {
    q: "¿Qué pasa si me cancelan el vuelo?",
    a: "Nosotros nos encargamos. Contactamos a la aerolínea, gestionamos el cambio o reembolso y te mantenemos informado en todo momento. No tienes que hacer nada.",
  },
  {
    q: "¿Puedo cambiar la fecha después de comprar?",
    a: "Depende de la tarifa que elijas. Siempre te explicamos antes de comprar cuáles son las condiciones de cambio y cancelación para que decidas con toda la información.",
  },
  {
    q: "¿Solo vuelan entre Sudamérica y Europa?",
    a: "Esas son nuestras rutas principales y donde tenemos las mejores tarifas, pero podemos cotizarte vuelos a cualquier destino del mundo. Escríbenos y te sorprenderás.",
  },
  {
    q: "¿Ofrecen formación en biliettería aérea?",
    a: "Sí. Con más de 20 años de experiencia en el sector, también formamos a personas que quieren aprender biliettería aérea con criterio real de agencia. Escríbenos por WhatsApp si te interesa y te contamos cómo funciona.",
  },
  {
    q: "¿Por qué reservar con ustedes y no en una web?",
    a: "Porque una web te da un precio y ya. Nosotros te damos asesoría, te incluimos el equipaje correcto, verificamos los requisitos de tu destino y te acompañamos si algo sale mal. Además, muchas veces nuestro precio es igual o mejor.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-display text-base font-bold text-navy pr-4 group-hover:text-navy/70 transition-colors">
          {q}
        </span>
        <svg
          className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-48 pb-5" : "max-h-0"}`}
      >
        <p className="text-base text-text leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".animate-in"), {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={ref} className="py-24 sm:py-32 px-6 scroll-mt-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12 animate-in">
          <h2 className="section-heading mb-4">
            Preguntas que nos hacen <span className="text-gradient">todos los días</span>
          </h2>
          <p className="text-text text-base">
            Si tienes otra duda, escríbenos por WhatsApp y te respondemos al
            instante.
          </p>
        </div>

        <div className="animate-in bg-white rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.08)] px-6 sm:px-8">
          {faqs.map((f) => (
            <FAQItem key={f.q} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
