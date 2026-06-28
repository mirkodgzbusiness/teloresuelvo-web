"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  end: number;
  prefix: string;
  suffix: string;
  decimals: number;
  label: string;
}

const stats: Stat[] = [
  {
    end: 20,
    prefix: "+",
    suffix: "",
    decimals: 0,
    label: "Años de experiencia en billetería aérea",
  },
  {
    end: 7000,
    prefix: "+",
    suffix: "",
    decimals: 0,
    label: "Personas viajaron con nosotros",
  },
  {
    end: 4.9,
    prefix: "",
    suffix: "/5",
    decimals: 1,
    label: "Valoración de nuestros clientes",
  },
];

function formatNumber(value: number, decimals: number): string {
  if (decimals > 0) return value.toFixed(decimals);
  return Math.round(value).toLocaleString("es-ES");
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

      const counterEls = el.querySelectorAll<HTMLElement>("[data-counter]");
      counterEls.forEach((counterEl) => {
        const end = parseFloat(counterEl.dataset.counterEnd || "0");
        const decimals = parseInt(counterEl.dataset.counterDecimals || "0", 10);
        const prefix = counterEl.dataset.counterPrefix || "";
        const suffix = counterEl.dataset.counterSuffix || "";
        const obj = { value: 0 };

        ScrollTrigger.create({
          trigger: counterEl,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              value: end,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                counterEl.textContent = `${prefix}${formatNumber(obj.value, decimals)}${suffix}`;
              },
            });
          },
        });
      });
    }, el);

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

            <div className="grid grid-cols-3 gap-4 animate-in">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-light-bg rounded-2xl p-6 text-center border border-gray-100"
                >
                  <p
                    data-counter
                    data-counter-end={stat.end}
                    data-counter-decimals={stat.decimals}
                    data-counter-prefix={stat.prefix}
                    data-counter-suffix={stat.suffix}
                    className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-navy leading-none mb-3"
                  >
                    {stat.prefix}0{stat.suffix}
                  </p>
                  <p className="text-text-muted text-sm leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="animate-in">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-light-bg border border-gray-100">
              <Image
                src="/LogoTeLoResuelvoPNG (1).webp"
                alt="Equipo Te Lo Resuelvo Viajes"
                fill
                className="object-contain p-16 opacity-15"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-navy/10 flex items-center justify-center mb-4">
                  <svg
                    className="w-7 h-7 text-navy/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-navy/40 text-sm font-medium">
                  Foto del equipo próximamente
                </p>
                <p className="text-navy/25 text-xs mt-1">
                  Roberto: sube aquí una foto de tu equipo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
