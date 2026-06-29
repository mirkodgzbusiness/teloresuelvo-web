import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { privacySections, siteLegal } from "@/content/legal";

export const metadata: Metadata = {
  title: "Política de Privacidad | Te Lo Resuelvo Viajes",
  description:
    "Información sobre cómo Te Lo Resuelvo Viajes trata sus datos personales.",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Política de Privacidad"
      lastUpdated={siteLegal.lastUpdated}
      intro={`En ${siteLegal.companyName} nos tomamos en serio la protección de sus datos personales. Esta política explica de forma clara qué información recopilamos cuando utiliza nuestra web o nos contacta por WhatsApp, correo o redes sociales, con qué finalidad la tratamos, durante cuánto tiempo la conservamos y cuáles son sus derechos según el Reglamento General de Protección de Datos (RGPD) y la normativa italiana aplicable.`}
      sections={privacySections}
    />
  );
}
