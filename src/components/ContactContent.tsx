"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import OpeningHours from "@/components/OpeningHours";

const WHATSAPP_CTA_HREF =
  "https://wa.me/393514915445?text=Hola%20Te%20Lo%20Resuelvo%2C%20vi%20la%20p%C3%A1gina%20web%20y%20quiero%20cotizar%20un%20vuelo.%20%C2%BFMe%20podr%C3%ADan%20dar%20precios%20y%20disponibilidad%3F";

const contactMethods = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    label: "WhatsApp",
    detail: "+39 351 491 5445",
    sublabel: "Respondemos en menos de 5 minutos",
    href: WHATSAPP_CTA_HREF,
    accent: "bg-whatsapp/10 text-whatsapp",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    label: "Instagram",
    detail: "@teloresuelvoviajes",
    sublabel: "Síguenos para ofertas y tips",
    href: "https://www.instagram.com/teloresuelvoviajes/",
    accent: "bg-pink-500/10 text-pink-500",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9a6.33 6.33 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.43 6.3 6.3 0 001.88-4.49V9.4a8.16 8.16 0 004.78 1.53V7.5a4.85 4.85 0 01-1.08-.81z" />
      </svg>
    ),
    label: "TikTok",
    detail: "@teloresuelvoviajes",
    sublabel: "Contenido sobre vuelos y viajes",
    href: "https://www.tiktok.com/@teloresuelvoviajes",
    accent: "bg-black/10 text-navy",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    label: "Facebook",
    detail: "Te Lo Resuelvo IT",
    sublabel: "Nuestra comunidad",
    href: "https://www.facebook.com/teloresuelvoIT",
    accent: "bg-blue-600/10 text-blue-600",
  },
];

export default function ContactContent() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".contact-animate"), {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="contact-page">
      <div className="contact-page__inner">
        <div className="contact-animate contact-page__header">
          <h1 className="contact-page__title font-display">
            Hablemos de tu vuelo
          </h1>
          <p className="contact-page__intro">
            Escríbenos por WhatsApp y te respondemos al instante. También puedes
            seguirnos en redes o visitarnos en Milán.
          </p>
        </div>

        <div className="contact-page__grid">
          {contactMethods.map((method) => (
            <a
              key={method.label}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-animate contact-card group"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${method.accent}`}
              >
                {method.icon}
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-navy text-lg">
                  {method.label}
                </span>
                <span className="text-text text-base">{method.detail}</span>
                <span className="text-text-muted text-sm">
                  {method.sublabel}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="contact-animate contact-page__hours">
          <OpeningHours />
        </div>

        <div className="contact-animate contact-office">
          <div className="contact-office__grid">
            <div className="contact-office__content">
              <h2 className="contact-office__title font-display">
                Nuestra oficina
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-5 h-5 text-navy mt-0.5 shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-navy text-base">
                      Milán, Italia
                    </p>
                    <p className="text-text-muted text-sm">
                      Te Lo Resuelvo Viajes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-5 h-5 text-navy mt-0.5 shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-navy text-base">
                      +39 351 491 5445
                    </p>
                    <p className="text-text-muted text-sm">
                      WhatsApp disponible 7 días
                    </p>
                  </div>
                </div>
              </div>
              <a
                href="https://maps.app.goo.gl/tvtxrxareqma2F4s5"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-office__maps-link"
              >
                Ver en Google Maps
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  className="w-4 h-4"
                  stroke="currentColor"
                >
                  <path
                    d="M9.334 12.667L14 8l-4.666-4.667"
                    strokeMiterlimit="10"
                  />
                  <path d="M14 8H1.334" strokeMiterlimit="10" />
                </svg>
              </a>
            </div>
            <div className="contact-office__map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.1!2d9.2211755!3d45.4896717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDI5JzIyLjgiTiA5wrAxMyUyNy4wIkU!5e0!3m2!1ses!2sit!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Te Lo Resuelvo Viajes"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
