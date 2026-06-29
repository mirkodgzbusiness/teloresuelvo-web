import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { cookieSections, siteLegal } from "@/content/legal";

export const metadata: Metadata = {
  title: "Política de Cookies | Te Lo Resuelvo Viajes",
  description:
    "Información sobre las cookies utilizadas en el sitio web de Te Lo Resuelvo Viajes.",
  robots: { index: true, follow: true },
};

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="Política de Cookies"
      lastUpdated={siteLegal.lastUpdated}
      intro={`Esta política describe qué cookies y tecnologías similares utiliza el sitio web ${siteLegal.website}, operado por ${siteLegal.companyName}, con qué finalidad, durante cuánto tiempo y cómo puede gestionarlas usted en cualquier momento.`}
      sections={cookieSections}
    />
  );
}
