"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "1.",
    title: "Cuéntanos tu viaje",
    services: [
      "Escríbenos por WhatsApp",
      "Indícanos fechas y destino",
      "Cuántas personas viajan",
      "Nosotros nos encargamos del resto",
    ],
    variant: "",
  },
  {
    number: "2.",
    title: "Recibe opciones reales",
    services: [
      "Mejores tarifas con equipaje incluido",
      "Horarios claros y sin sorpresas",
      "Opciones de pago flexibles",
      "Tú eliges la que más te convenga",
    ],
    variant: "is--blue",
  },
  {
    number: "3.",
    title: "Confirma y viaja tranquilo",
    services: [
      "Boleto con código PNR verificable",
      "Itinerario por email y WhatsApp",
      "Soporte si algo cambia antes del vuelo",
      "Te acompañamos hasta que aterrizas",
    ],
    variant: "is--dark",
  },
];

export default function ComoFunciona() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const getCurrentViewportTier = () => {
      const width = window.innerWidth;
      if (width <= 479) return "mobile-portrait";
      if (width <= 767) return "mobile-landscape";
      if (width <= 991) return "tablet";
      return "desktop";
    };

    const parseValues = (attr: string, fallback: string[]) => {
      const raw = section.getAttribute(attr);
      if (!raw) return fallback;
      const values = raw.split(",").map((v) => v.trim()).filter((v) => v !== "");
      return values.length ? values : fallback;
    };

    const parseRotate = (attr: string) => {
      const fallback = [0, 4, -4];
      const values = (section.getAttribute(attr) || "")
        .split(",")
        .map((v) => parseFloat(v.trim()));
      return values.length >= 1 && values.every((v) => !isNaN(v))
        ? values
        : fallback;
    };

    const pulseElement = (targetEl: HTMLElement) => {
      const width = targetEl.offsetWidth;
      const height = targetEl.offsetHeight;
      const fontSize = parseFloat(getComputedStyle(targetEl).fontSize);
      const stretchPx = 1.5 * fontSize;
      const targetScaleX = (width + stretchPx) / width;
      const targetScaleY = (height - stretchPx * 0.33) / height;

      const tl = gsap.timeline();
      tl.to(targetEl, {
        scaleX: targetScaleX,
        scaleY: targetScaleY,
        duration: 0.1,
        ease: "power1.out",
      }).to(targetEl, {
        scaleX: 1,
        scaleY: 1,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      });
    };

    const init = () => {
      const tier = getCurrentViewportTier();

      const isEnabled =
        (tier === "desktop" &&
          section.dataset.stackingCardsDesktop === "true") ||
        (tier === "tablet" &&
          section.dataset.stackingCardsTablet === "true") ||
        ((tier === "mobile-portrait" || tier === "mobile-landscape") &&
          section.dataset.stackingCardsMobile === "true");

      if (!isEnabled) return;

      const cards = Array.from(
        section.querySelectorAll("[data-stacking-card]")
      ) as HTMLElement[];
      if (!cards.length) return;

      const stickyTop = parseFloat(getComputedStyle(cards[0]).top) || 0;

      const rotateAttr =
        tier === "desktop"
          ? "data-stacking-cards-desktop-rotate"
          : tier === "tablet"
            ? "data-stacking-cards-tablet-rotate"
            : "data-stacking-cards-mobile-rotate";
      const xAttr =
        tier === "desktop"
          ? "data-stacking-cards-desktop-x"
          : tier === "tablet"
            ? "data-stacking-cards-tablet-x"
            : "data-stacking-cards-mobile-x";
      const yAttr =
        tier === "desktop"
          ? "data-stacking-cards-desktop-y"
          : tier === "tablet"
            ? "data-stacking-cards-tablet-y"
            : "data-stacking-cards-mobile-y";

      const rotateValues = parseRotate(rotateAttr);
      const xValues = parseValues(xAttr, ["0em", "0em", "0em"]);
      const yValues = parseValues(yAttr, ["0em", "0em", "0em"]);

      cards.forEach((card, index) => {
        const targetEl = card.querySelector(
          "[data-stacking-card-target]"
        ) as HTMLElement;
        if (!targetEl) return;

        const rotate = rotateValues[index % rotateValues.length];
        const x = xValues[index % xValues.length];
        const y = yValues[index % yValues.length];

        gsap.set(targetEl, {
          rotate: 0,
          x: 0,
          y: 0,
          scale: 1,
          zIndex: cards.length - index,
        });

        gsap.to(targetEl, {
          rotate,
          x,
          y,
          ease: "power1.in",
          overwrite: "auto",
          scrollTrigger: {
            id: `stacking-rotate-${index}`,
            trigger: card,
            start: "top 75%",
            end: `top-=${stickyTop} top`,
            scrub: true,
          },
        });

        ScrollTrigger.create({
          id: `stacking-bounce-${index}`,
          trigger: card,
          start: `top-=${stickyTop} top`,
          onEnter: () => pulseElement(targetEl),
        });
      });

      ScrollTrigger.refresh();
    };

    init();

    let lastTier = getCurrentViewportTier();
    const onResize = () => {
      const next = getCurrentViewportTier();
      if (lastTier !== next) {
        ScrollTrigger.getAll().forEach((t) => {
          if (
            typeof t.vars?.id === "string" &&
            t.vars.id.startsWith("stacking")
          )
            t.kill();
        });
        section
          .querySelectorAll<HTMLElement>("[data-stacking-card-target]")
          .forEach((el) => {
            gsap.killTweensOf(el);
            gsap.set(el, { clearProps: "all" });
          });
        lastTier = next;
        init();
      }
    };

    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(onResize, 250);
    };
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      ScrollTrigger.getAll().forEach((t) => {
        if (
          typeof t.vars?.id === "string" &&
          t.vars.id.startsWith("stacking")
        )
          t.kill();
      });
    };
  }, []);

  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      data-stacking-cards-init
      data-stacking-cards-desktop="true"
      data-stacking-cards-tablet="true"
      data-stacking-cards-mobile="true"
      className="cards-stack scroll-mt-20"
    >
      <div className="cards-stack__container">
        <div className="text-center mb-12">
          <h2 className="section-heading mb-4">
            Reservar tu vuelo es{" "}
            <span className="text-gradient">así de fácil</span>
          </h2>
          <p className="text-text text-base max-w-xl mx-auto">
            En 3 pasos tienes tu boleto confirmado. Sin complicaciones, sin
            letras pequeñas.
          </p>
        </div>

        <div className="cards-stack__collection">
          <div data-stacking-card-stack className="cards-stack__list">
            {steps.map((step) => (
              <div
                key={step.number}
                data-stacking-card
                className="cards-stack__item is--wide"
              >
                <div
                  data-stacking-card-target
                  className={`cards-stack-card is--wide ${step.variant}`}
                >
                  <div className="cards-stack-card__start">
                    <span className="cards-stack-card__number">
                      {step.number}
                    </span>
                  </div>
                  <div className="cards-stack-card__end">
                    <h3 className="cards-stack-card__h is--l">{step.title}</h3>
                    <div className="cards-stack-card__services">
                      {step.services.map((s) => (
                        <p key={s} className="cards-stack-card__services-p">
                          {s}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
