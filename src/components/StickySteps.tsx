"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    eyebrow: "Garantía",
    titleNode: <><span className="text-gradient">Emisión Real</span> y Verificable</>,
    text: "Cada boleto que emitimos tiene un código PNR verificable directamente en la web de la aerolínea. No hay intermediarios ocultos ni agencias fantasma. Tu dinero está seguro.",
    image: "/step-garantia.webp",
  },
  {
    eyebrow: "Experiencia",
    titleNode: <>Más de <span className="text-gradient">25 años</span> en biliettería</>,
    text: "Conocemos el sector por dentro: tarifas, regulaciones y emisión real con aerolíneas. También impartimos formación en biliettería aérea para quienes quieren profesionalizarse con práctica de agencia.",
    image: "/step-experiencia.jpg",
  },
  {
    eyebrow: "Asesoría",
    titleNode: <>Expertos en <span className="text-gradient">Regulaciones</span></>,
    text: "¿Necesitas carta de invitación? ¿Seguro de viaje obligatorio? ¿Requisitos de entrada? Te asesoramos con todo lo que necesitas para España, Italia, Perú y Colombia.",
    image: "/office-passport-experto-regulaciones.jpg",
  },
];

export default function StickySteps() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = [
      ...container.querySelectorAll("[data-sticky-steps-item]"),
    ] as HTMLElement[];
    if (!items.length) return;

    function setActiveStep(activeIndex: number) {
      items.forEach((item, index) => {
        let status = "active";
        if (index < activeIndex) status = "before";
        if (index > activeIndex) status = "after";
        item.setAttribute("data-sticky-steps-item-status", status);
      });
    }

    const triggers: ScrollTrigger[] = [];

    items.forEach((item, index) => {
      const anchor = item.querySelector("[data-sticky-steps-anchor]");
      if (!anchor) return;

      const st = ScrollTrigger.create({
        trigger: anchor,
        start: "center center",
        onEnter: () => setActiveStep(index),
        onEnterBack: () => setActiveStep(index),
      });

      triggers.push(st);
    });

    setActiveStep(0);

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="sticky-steps relative overflow-clip min-h-dvh">
      <div className="max-w-[74em] mx-auto px-6">
        <div
          ref={containerRef}
          data-sticky-steps-init=""
          className="min-h-dvh flex relative"
        >
          <div className="flex flex-col gap-[30dvh] flex-1 pt-[calc(50dvh-7.5em)] pb-[calc(50dvh-7.5em)] max-lg:gap-[7.5em] max-lg:pt-40 max-lg:pb-40">
            {steps.map((step, i) => (
              <div
                key={step.eyebrow}
                data-sticky-steps-item=""
                data-sticky-steps-item-status={i === 0 ? "active" : "after"}
                className="sticky-steps__item"
              >
                {/* Text (anchor for scroll calculations) */}
                <div
                  data-sticky-steps-anchor=""
                  className="flex flex-col gap-6 w-1/2 pr-24 max-lg:w-full max-lg:pr-0 max-lg:pb-10 max-md:gap-4 sticky-steps__text"
                >
                  <span className="text-base font-bold uppercase opacity-50 text-navy tracking-wider">
                    {step.eyebrow}
                  </span>
                  <h2 className="section-heading m-0">
                    {step.titleNode}
                  </h2>
                  <p className="text-base text-text leading-relaxed opacity-60 m-0">
                    {step.text}
                  </p>
                </div>

                {/* Media (sticky on desktop) */}
                <div className="w-1/2 h-full pl-12 absolute top-0 right-0 max-lg:w-full max-lg:h-auto max-lg:pl-0 max-lg:relative max-lg:top-auto max-lg:right-auto sticky-steps__media">
                  <div className="flex items-center justify-center w-full min-h-[80dvh] sticky top-[5rem] max-lg:min-h-0 max-lg:relative max-lg:top-auto">
                    <div className="aspect-[3/4] rounded-[12px] w-[85%] relative overflow-hidden sticky-steps__visual">
                      <Image
                        src={step.image}
                        alt={step.eyebrow}
                        fill
                        className="object-cover rounded-[inherit]"
                        sizes="(max-width: 991px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 992px) {
          [data-sticky-steps-item-status] :global(.sticky-steps__visual) {
            transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
            opacity: 0;
            visibility: hidden;
          }
          [data-sticky-steps-item-status="before"] :global(.sticky-steps__visual),
          [data-sticky-steps-item-status="active"] :global(.sticky-steps__visual) {
            opacity: 1;
            visibility: visible;
          }
          [data-sticky-steps-item-status] :global(.sticky-steps__text) {
            transition: opacity 0.5s ease-in-out;
            opacity: 0.25;
          }
          [data-sticky-steps-item-status="active"] :global(.sticky-steps__text) {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
