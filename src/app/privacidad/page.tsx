import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { privacySections, siteLegal } from "@/content/legal";

export const metadata: Metadata = {
  title: "Política de Privacidad | Te Lo Resuelvo Viajes",
  description:
    "Información sobre cómo Te Lo Resuelvo Viajes trata sus datos personales.",
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <LegalPageLayout
      title="Política de Privacidad"
      lastUpdated={siteLegal.lastUpdated}
      intro={`En ${siteLegal.companyName} nos tomamos en serio la protección de sus datos. Esta política explica qué información recopilamos, para qué la usamos y cuáles son sus derechos.`}
      sections={privacySections}
    />
  );
}
