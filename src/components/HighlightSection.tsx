"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const WHATSAPP_CTA_HREF =
  "https://wa.me/393514915445?text=Hola%20Te%20Lo%20Resuelvo%2C%20vi%20la%20p%C3%A1gina%20web%20y%20quiero%20cotizar%20un%20vuelo.%20%C2%BFMe%20podr%C3%ADan%20dar%20precios%20y%20disponibilidad%3F";

interface HighlightSectionProps {
  headline: string;
  subtitle?: string;
  showCta?: boolean;
  markerColor?: string;
  markerDirection?: "left" | "right" | "up" | "down";
}

export default function HighlightSection({
  headline,
  subtitle,
  showCta = false,
  markerColor = "#25D366",
  markerDirection = "right",
}: HighlightSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headlineRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const extras = section.querySelectorAll(".highlight-animate-in");

    let split: ReturnType<typeof SplitText.create> | null = null;
    let timeline: gsap.core.Timeline | null = null;
    let headlineTrigger: ScrollTrigger | null = null;

    const revealExtras = () => {
      gsap.set(extras, { opacity: 1, y: 0 });
    };

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(el, { autoAlpha: 1 });
        revealExtras();
        return;
      }

      const directionMap: Record<string, { prop: string; origin: string }> = {
        right: { prop: "scaleX", origin: "right center" },
        left: { prop: "scaleX", origin: "left center" },
        up: { prop: "scaleY", origin: "center top" },
        down: { prop: "scaleY", origin: "center bottom" },
      };

      const dirConfig = directionMap[markerDirection];

      try {
        split = SplitText.create(el, {
          type: "lines",
          linesClass: "highlight-marker-line",
          autoSplit: true,
          onSplit(self: { lines: Element[] }) {
            timeline?.kill();
            headlineTrigger?.kill();
            el.querySelectorAll(".highlight-marker-bar").forEach((bar) =>
              bar.remove()
            );

            const lines = self.lines;
            const tl = gsap.timeline({ paused: true });

            lines.forEach((line, i) => {
              gsap.set(line, { position: "relative", overflow: "hidden" });

              const bar = document.createElement("div");
              bar.className = "highlight-marker-bar";
              Object.assign(bar.style, {
                backgroundColor: markerColor,
                transformOrigin: dirConfig.origin,
              });
              line.appendChild(bar);

              tl.to(
                bar,
                {
                  [dirConfig.prop]: 0,
                  duration: 0.6,
                  ease: "power3.inOut",
                },
                i * 0.1
              );
            });

            gsap.set(el, { autoAlpha: 1 });

            headlineTrigger = ScrollTrigger.create({
              trigger: el,
              start: "top 90%",
              once: true,
              onEnter: () => tl.play(),
            });

            timeline = tl;
          },
        });
      } catch {
        gsap.set(el, { autoAlpha: 1 });
      }

      if (extras.length) {
        gsap.from(extras, {
          opacity: 0,
          y: 20,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        });
      }
    }, section);

    return () => {
      timeline?.kill();
      headlineTrigger?.kill();
      split?.revert();
      ctx.revert();
    };
  }, [markerColor, markerDirection]);

  return (
    <section ref={sectionRef} className="highlight-section">
      <div className="highlight-section__inner">
        <h2
          ref={headlineRef}
          data-highlight-marker-reveal
          data-marker-direction={markerDirection}
          className="highlight-section__title"
        >
          {headline}
        </h2>

        {subtitle && (
          <p className="highlight-section__subtitle highlight-animate-in">
            {subtitle}
          </p>
        )}

        {showCta && (
          <div className="highlight-section__cta highlight-animate-in">
            <a
              href={WHATSAPP_CTA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="highlight-section__cta-button"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="highlight-section__cta-icon"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Cotizar mi vuelo ahora
            </a>
            <p className="highlight-section__cta-note highlight-animate-in">
              WhatsApp directo — respondemos en menos de 5 minutos
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
