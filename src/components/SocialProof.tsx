"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function initNumberOdometer() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const initFlag = "data-odometer-initialized";

  const defaults = {
    duration: 1,
    ease: "power3.out",
    elementStagger: 0.1,
    digitStagger: 0.04,
    revealDuration: 0.5,
    revealEase: "power2.out",
    triggerStart: "top 80%",
    staggerOrder: "left",
    digitCycles: 2,
  };

  function getLineHeightRatio(el: Element) {
    const cs = getComputedStyle(el);
    const lh = cs.lineHeight;
    if (lh === "normal") return 1.2;
    return parseFloat(lh) / parseFloat(cs.fontSize);
  }

  interface Segment {
    type: "digit" | "static";
    char: string;
    startDigit?: number;
    hidden?: boolean;
  }

  function parseSegments(text: string): Segment[] {
    return [...text].map((char) => ({
      type: /\d/.test(char) ? "digit" : "static",
      char,
    }));
  }

  function mapStartDigits(segments: Segment[], startValue: number): Segment[] {
    const digitSlots = segments.filter((s) => s.type === "digit");
    const padded = String(Math.floor(Math.abs(startValue)))
      .padStart(digitSlots.length, "0")
      .slice(-digitSlots.length);
    let di = 0;
    return segments.map((s) =>
      s.type === "digit" ? { ...s, startDigit: parseInt(padded[di++], 10) } : s
    );
  }

  function markHiddenSegments(segments: Segment[], startValue: number): Segment[] {
    const totalDigits = segments.filter((s) => s.type === "digit").length;
    const absStart = Math.floor(Math.abs(startValue));
    const startDigitCount = absStart === 0 ? 1 : String(absStart).length;
    const leadingZeros = Math.max(0, totalDigits - startDigitCount);
    if (leadingZeros === 0) return segments;
    let digitsSeen = 0;
    let firstDigitSeen = false;
    let prevDigitHidden = false;
    return segments.map((seg) => {
      if (seg.type === "digit") {
        firstDigitSeen = true;
        const hidden = digitsSeen < leadingZeros;
        prevDigitHidden = hidden;
        digitsSeen++;
        return { ...seg, hidden };
      }
      const hidden = firstDigitSeen && prevDigitHidden;
      return { ...seg, hidden };
    });
  }

  function shouldGrow(el: Element, hasExplicitStart: boolean, startValue: number, segments: Segment[]) {
    if (el.hasAttribute("data-odometer-grow")) {
      return el.getAttribute("data-odometer-grow") !== "false";
    }
    if (!hasExplicitStart) return false;
    const absStart = Math.floor(Math.abs(startValue));
    const startDigitCount = absStart === 0 ? 1 : String(absStart).length;
    const endDigitCount = segments.filter((s) => s.type === "digit").length;
    return startDigitCount < endDigitCount;
  }

  function buildRollerDOM(el: Element, segments: Segment[], step: number, grow: boolean) {
    (el as HTMLElement).innerHTML = "";
    (el as HTMLElement).style.height = "";
    const rollers: { roller: HTMLElement; targetPos: number }[] = [];
    const revealEls: HTMLElement[] = [];
    const totalCells = 10 * defaults.digitCycles;
    segments.forEach((seg) => {
      if (seg.type === "static") {
        const span = document.createElement("span");
        span.setAttribute("data-odometer-part", "static");
        span.style.height = step + "em";
        span.style.lineHeight = String(step);
        span.textContent = seg.char;
        el.appendChild(span);
        if (grow && seg.hidden) {
          gsap.set(span, { opacity: 0 });
          revealEls.push(span);
        }
        return;
      }
      const mask = document.createElement("span");
      mask.setAttribute("data-odometer-part", "mask");
      mask.style.height = step + "em";
      mask.style.lineHeight = String(step);
      const roller = document.createElement("span");
      roller.setAttribute("data-odometer-part", "roller");
      roller.style.lineHeight = String(step);
      const digits: number[] = [];
      for (let d = 0; d < totalCells; d++) digits.push(d % 10);
      roller.textContent = digits.join("\n");
      mask.appendChild(roller);
      el.appendChild(mask);
      const startDigit = seg.startDigit || 0;
      const isReveal = grow && seg.hidden;
      gsap.set(roller, { y: isReveal ? step + "em" : -startDigit * step + "em" });
      const endDigit = parseInt(seg.char, 10);
      const targetPos = endDigit > startDigit ? endDigit : 10 + endDigit;
      rollers.push({ roller, targetPos });
      if (isReveal) revealEls.push(mask);
    });
    return { rollers, revealEls };
  }

  function cleanupElement(el: Element, originalText: string) {
    (el as HTMLElement).style.overflow = "";
    (el as HTMLElement).style.height = "";
    const digits = [...originalText].filter((c) => /\d/.test(c));
    let di = 0;
    el.querySelectorAll('[data-odometer-part="mask"]').forEach((mask) => {
      const roller = mask.querySelector('[data-odometer-part="roller"]');
      if (roller) roller.remove();
      mask.textContent = digits[di++] || "";
      (mask as HTMLElement).style.opacity = "";
      (mask as HTMLElement).style.overflow = "";
    });
    el.querySelectorAll('[data-odometer-part="static"]').forEach((stat) => {
      (stat as HTMLElement).style.opacity = "";
    });
  }

  function applyStaggerOrder<T>(items: T[], order: string): T[] {
    const arr = [...items];
    if (order === "right") return arr.reverse();
    return arr;
  }

  document.querySelectorAll("[data-odometer-group]").forEach((group) => {
    if (group.hasAttribute(initFlag)) return;
    group.setAttribute(initFlag, "");

    const elements = Array.from(group.querySelectorAll("[data-odometer-element]"));
    if (!elements.length || prefersReducedMotion) return;

    const staggerOrder = group.getAttribute("data-odometer-stagger-order") || defaults.staggerOrder;
    const triggerStart = group.getAttribute("data-odometer-trigger-start") || defaults.triggerStart;
    const elementStagger = parseFloat(group.getAttribute("data-odometer-stagger") || "") || defaults.elementStagger;

    const elementData = elements.map((el) => {
      const originalText = (el as HTMLElement).textContent?.trim() || "";
      const hasExplicitStart = el.hasAttribute("data-odometer-start");
      const startValue = parseFloat(el.getAttribute("data-odometer-start") || "") || 0;
      const duration = parseFloat(el.getAttribute("data-odometer-duration") || "") || defaults.duration;
      const step = getLineHeightRatio(el);

      let segments = parseSegments(originalText);
      segments = mapStartDigits(segments, startValue);
      segments = markHiddenSegments(segments, startValue);

      const grow = shouldGrow(el, hasExplicitStart, startValue, segments);
      const { rollers, revealEls } = buildRollerDOM(el, segments, step, grow);

      const fontSize = parseFloat(getComputedStyle(el).fontSize);
      const revealData = revealEls.map((revealEl) => {
        const widthEm = revealEl.offsetWidth / fontSize;
        gsap.set(revealEl, { width: 0, overflow: "hidden" });
        return { el: revealEl, widthEm };
      });

      return { el, rollers, duration, step, revealData, originalText };
    });

    const ordered = applyStaggerOrder(elementData, staggerOrder);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: group,
        start: triggerStart,
        once: true,
      },
      onComplete() {
        elementData.forEach(({ el, originalText }) => {
          cleanupElement(el, originalText);
        });
      },
    });

    ordered.forEach((data, orderIdx) => {
      const { rollers, duration, revealData } = data;
      const offset = orderIdx * elementStagger;

      revealData.forEach(({ el: revEl, widthEm }) => {
        tl.to(revEl, {
          width: widthEm + "em",
          opacity: 1,
          duration: defaults.revealDuration,
          ease: defaults.revealEase,
        }, offset);
      });

      rollers.forEach(({ roller, targetPos }, digitIdx) => {
        const reversedIdx = rollers.length - 1 - digitIdx;
        tl.to(roller, {
          y: -targetPos * data.step + "em",
          duration,
          ease: defaults.ease,
          force3D: true,
        }, offset + reversedIdx * defaults.digitStagger);
      });
    });
  });
}

export default function SocialProof() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".animate-in"), {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
    }, el);

    initNumberOdometer();

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Left column */}
          <div className="space-y-8">
            <div className="space-y-5 animate-in">
              <h2 className="section-heading mb-4">
                <span className="text-gradient">Resultados reales,</span>{" "}
                clientes tranquilos
              </h2>
              <p className="text-text text-base leading-relaxed max-w-lg">
                No somos una web automática. Llevamos más de 20 años en el mundo
                de la billetería aérea: buscamos, comparamos y negociamos el
                mejor vuelo para ti. También formamos a quienes quieren aprender
                este oficio con criterio real de agencia.
              </p>
            </div>

            {/* Odometer stats bar */}
            <div
              data-odometer-group
              data-odometer-trigger-start="top 85%"
              className="odometer-stats animate-in"
            >
              <div className="odometer-stats__item">
                <p className="odometer-stats__label">Años de experiencia</p>
                <p
                  data-odometer-element
                  data-odometer-duration="2"
                  className="odometer-stats__number"
                >
                  +20
                </p>
                <p className="odometer-stats__desc">En billetería aérea</p>
              </div>
              <div className="odometer-stats__divider" />
              <div className="odometer-stats__item">
                <p className="odometer-stats__label">Clientes satisfechos</p>
                <p
                  data-odometer-element
                  data-odometer-duration="2.5"
                  data-odometer-start="0"
                  className="odometer-stats__number"
                >
                  +7.000
                </p>
                <p className="odometer-stats__desc">Personas viajaron con nosotros</p>
              </div>
              <div className="odometer-stats__divider" />
              <div className="odometer-stats__item">
                <p className="odometer-stats__label">Valoración Google</p>
                <p
                  data-odometer-element
                  data-odometer-duration="2"
                  className="odometer-stats__number"
                >
                  4.9/5
                </p>
                <p className="odometer-stats__desc">De nuestros clientes</p>
              </div>
            </div>
          </div>

          {/* Right column — Instagram */}
          <div className="animate-in">
            <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white" style={{ maxHeight: "660px" }}>
              <iframe
                src="https://www.instagram.com/p/DVqGsXTiBE5/embed/captioned/"
                width="100%"
                height="900"
                frameBorder="0"
                scrolling="no"
                allowTransparency
                allow="encrypted-media"
                loading="lazy"
                title="Te Lo Resuelvo Viajes — Instagram"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
