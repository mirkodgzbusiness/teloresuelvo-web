"use client";

import Image from "next/image";
import HoverText from "@/components/HoverText";

const WHATSAPP_CTA_HREF =
  "https://wa.me/393514915445?text=Hola%20Te%20Lo%20Resuelvo%2C%20vi%20la%20p%C3%A1gina%20web%20y%20quiero%20cotizar%20un%20vuelo.%20%C2%BFMe%20podr%C3%ADan%20dar%20precios%20y%20disponibilidad%3F";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative" style={{ backgroundColor: "#0f3a6d" }}>
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="text-white space-y-12 sm:space-y-10">
          <div className="flex justify-between gap-12 max-lg:flex-col max-lg:gap-10">
            {/* Brand */}
            <div className="space-y-5">
              <a href="#" className="inline-block">
                <Image
                  src="/LogoTeLoResuelvoPNG (1).webp"
                  alt="Te Lo Resuelvo Viajes"
                  width={96}
                  height={96}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full"
                />
              </a>
              <p className="max-w-lg text-white !text-white leading-relaxed">
                Más de 25 años en biliettería aérea. Tu agencia de confianza
                para volar entre América y Europa. Comparamos tarifas entre +20
                aerolíneas, incluimos tu equipaje y te acompañamos hasta que
                aterrizas.
              </p>
            </div>

            {/* Link columns */}
            <div className="flex gap-12 sm:gap-16 lg:gap-16 max-sm:flex-col max-sm:gap-10 shrink-0">
              <div className="flex flex-col gap-4 sm:gap-5">
                <h3 className="text-white text-lg font-medium" style={{ textTransform: "none", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                  Destinos
                </h3>
                <div className="flex flex-col gap-3.5 text-white/80">
                  <a href={WHATSAPP_CTA_HREF} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">Lima</a>
                  <a href={WHATSAPP_CTA_HREF} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">Bogotá</a>
                  <a href={WHATSAPP_CTA_HREF} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">Guayaquil</a>
                  <a href={WHATSAPP_CTA_HREF} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">Buenos Aires</a>
                  <a href={WHATSAPP_CTA_HREF} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">São Paulo</a>
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:gap-5">
                <h3 className="text-white text-lg font-medium" style={{ textTransform: "none", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                  Ayuda
                </h3>
                <div className="flex flex-col gap-3.5 text-white/80">
                  <a href={WHATSAPP_CTA_HREF} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">Soporte al Cliente</a>
                  <a href="/privacy-policy" className="hover:text-white transition-colors duration-300">Política de Privacidad</a>
                  <a href="/cookie-policy" className="hover:text-white transition-colors duration-300">Política de Cookies</a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-0 sm:border-t-0">
            <span className="text-sm text-white leading-relaxed max-w-sm">
              © {new Date().getFullYear()}{" "}
              <a href="#" className="hover:text-white transition-colors duration-300">
                Te Lo Resuelvo Viajes
              </a>
              , hecho con cariño para que vueles tranquilo.
            </span>
            <div className="flex items-center gap-6 sm:gap-5">
              <a href="https://www.instagram.com/teloresuelvoviajes/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300" aria-label="Instagram">
                <InstagramIcon className="size-7" />
              </a>
              <a href="https://www.tiktok.com/@teloresuelvoviajes" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300" aria-label="TikTok">
                <TikTokIcon className="size-7" />
              </a>
              <a href="https://www.facebook.com/teloresuelvoIT" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300" aria-label="Facebook">
                <FacebookIcon className="size-7" />
              </a>
              <a href={WHATSAPP_CTA_HREF} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300" aria-label="Email">
                <MailIcon className="size-7" />
              </a>
            </div>
          </div>
        </div>

        {/* Big hover text — full width of footer content */}
        <div className="footer-hover-text">
          <HoverText />
        </div>
      </div>
    </footer>
  );
}
