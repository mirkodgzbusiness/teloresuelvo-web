import type { Metadata } from "next";
import NavMultilevel from "@/components/NavMultilevel";
import Footer from "@/components/Footer";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Contacto | Te Lo Resuelvo Viajes",
  description:
    "Contáctanos por WhatsApp, redes sociales o visítanos en Milán. Te respondemos en menos de 5 minutos.",
};

export default function ContactoPage() {
  return (
    <>
      <NavMultilevel />
      <div data-main="" className="relative z-[2] bg-page">
        <ContactContent />
      </div>
      <Footer />
    </>
  );
}
