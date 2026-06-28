"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

const testimonios = [
  {
    quote:
      "Personale super disponibile, mi hanno riassicurato tantissimo, nessun problema è un ringraziamento a Sebastian!",
    name: "Juan Lineo",
    time: "9 meses",
  },
  {
    quote:
      "Excelente Atención, muy atenta y explica minuciosamente, muy agradecida con la señorita Alessia Castillo 10 de 10 hicieron una excelente elección con su trabajadora.",
    name: "Diana Vanessa Gonzales",
    time: "8 meses",
  },
  {
    quote:
      "Muy buena organización y disponibilidad al cliente con la Srta. Alessia Castillo. 👍🏻",
    name: "Oscar Mogrovejo",
    time: "8 meses",
  },
  {
    quote:
      "Excelente servicio, hice el 730 con Manuel, un genio, excelente trato, excelente persona 10/10.",
    name: "Mayte Saravia",
    time: "1 año",
  },
  {
    quote:
      "Empresa excelente en gestiones, super eficientes y honestos, además de gran profesionalismo de su personal. La recomiendo 100%.",
    name: "Gladys Rodriguez Roncallo",
    time: "2 años",
  },
  {
    quote:
      "Excelente lugar, excelente servicio personalizado lo recomiendo.",
    name: "Steph",
    time: "1 año",
  },
  {
    quote: "Excelente atención.",
    name: "Willy Castillo",
    time: "5 meses",
  },
  {
    quote:
      "Sono molto professionali e gentili, sanno quello che fanno. Ogni richiesta viene spiegata bene e risolta. Metto 5 stelle.",
    name: "Heba Alen",
    time: "1 semana",
  },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="review-card__google-icon" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 001 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="review-card__star" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

export default function Testimonios() {
  const initRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = initRef.current;
    if (!init) return;

    const minScale = +(init.getAttribute("data-scale") ?? "0.45");
    const maxRotation = +(init.getAttribute("data-rotate") ?? "-8");

    const wrap = init.querySelector(
      "[data-overlap-slider-collection]"
    ) as HTMLElement;
    const slider = init.querySelector(
      "[data-overlap-slider-list]"
    ) as HTMLElement;
    const slides = [
      ...init.querySelectorAll("[data-overlap-slider-item]"),
    ] as HTMLElement[];

    if (!wrap || !slider || !slides.length) return;

    wrap.style.touchAction = "none";
    wrap.style.userSelect = "none";

    let spacing = 0;
    let maxDrag = 0;
    let dragX = 0;
    let draggableInstance: Draggable | null = null;

    function clamp(value: number) {
      if (maxDrag <= 0) return 0;
      return Math.min(Math.max(value, 0), maxDrag);
    }

    function update() {
      gsap.set(slider, { x: -dragX });

      slides.forEach((slide, i) => {
        const threshold = i * spacing;
        const local = Math.max(0, dragX - threshold);
        const t = spacing > 0 ? Math.min(local / spacing, 1) : 0;

        gsap.set(slide, {
          x: local,
          scale: 1 - (1 - minScale) * t,
          rotation: maxRotation * t,
          transformOrigin: "75% center",
        });
      });
    }

    function recalc() {
      if (!slides.length) return;

      const style = getComputedStyle(slides[0]);
      const gapRight = parseFloat(style.marginRight) || 0;
      const slideW = slides[0].offsetWidth;
      spacing = slideW + gapRight;
      maxDrag = spacing * (slides.length - 1);

      dragX = clamp(dragX);
      update();

      if (draggableInstance) {
        draggableInstance.applyBounds({ minX: -maxDrag, maxX: 0 });
      }
    }

    draggableInstance = Draggable.create(slider, {
      type: "x",
      bounds: { minX: -maxDrag, maxX: 0 },
      inertia: true,
      maxDuration: 1,
      snap: (raw: number) => {
        const d = clamp(-raw);
        const idx = spacing > 0 ? Math.round(d / spacing) : 0;
        return -idx * spacing;
      },
      onDrag() {
        dragX = clamp(-this.x);
        update();
      },
      onThrowUpdate() {
        dragX = clamp(-this.x);
        update();
      },
    })[0];

    const ro = new ResizeObserver(() => recalc());
    ro.observe(init);

    let active = false;
    let currentIndex = 0;

    function goToSlide(idx: number) {
      idx = Math.max(0, Math.min(idx, slides.length - 1));
      currentIndex = idx;
      const targetX = idx * spacing;

      gsap.to(
        { value: dragX },
        {
          value: targetX,
          duration: 0.35,
          ease: "power4.out",
          onUpdate() {
            dragX = (this.targets()[0] as { value: number }).value;
            gsap.set(slider, { x: -dragX });
            update();
          },
        }
      );
    }

    const io = new IntersectionObserver(
      (entries) => {
        active = entries[0].isIntersecting;
      },
      { threshold: 0.25 }
    );
    io.observe(init);

    wrap.setAttribute("role", "region");
    wrap.setAttribute("aria-roledescription", "carousel");
    wrap.setAttribute("aria-label", "Slider de reseñas");

    const onKey = (e: KeyboardEvent) => {
      if (!active) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToSlide(currentIndex - 1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToSlide(currentIndex + 1);
      }
    };
    window.addEventListener("keydown", onKey);

    recalc();

    return () => {
      draggableInstance?.kill();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <section id="testimonios" className="testimonios-section bg-white">
      <div className="testimonios-section__header">
        <h2 className="section-heading mb-4">
          Lo que dicen nuestros clientes
        </h2>
        <div className="testimonios-section__badge">
          <GoogleIcon />
          <span>Reseñas verificadas de Google</span>
          <span className="font-bold text-navy">5.0</span>
          <div className="testimonios-section__stars">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
        </div>
      </div>

      <div
        ref={initRef}
        data-overlap-slider-init
        data-scale="0.45"
        data-rotate="-8"
        className="overlapping-slider__wrap"
      >
        <div
          data-overlap-slider-collection
          className="overlapping-slider__collection"
        >
          <div
            data-overlap-slider-list
            className="overlapping-slider__list"
          >
            {testimonios.map((t) => (
              <div
                key={t.name}
                data-overlap-slider-item
                className="overlapping-slider__item"
              >
                <div className="review-card">
                  <div className="review-card__top">
                    <div className="review-card__stars-row">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                    <GoogleIcon />
                  </div>

                  <blockquote className="review-card__quote">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <div className="review-card__bottom">
                    <div className="review-card__avatar">
                      {t.name.charAt(0)}
                    </div>
                    <div className="review-card__info">
                      <span className="review-card__name">{t.name}</span>
                      <span className="review-card__time">
                        hace {t.time}
                      </span>
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
