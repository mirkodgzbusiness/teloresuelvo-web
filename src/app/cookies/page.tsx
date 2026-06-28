import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";
import { cookieSections, siteLegal } from "@/content/legal";

export const metadata: Metadata = {
  title: "Política de Cookies | Te Lo Resuelvo Viajes",
  description:
    "Información sobre las cookies utilizadas en el sitio web de Te Lo Resuelvo Viajes.",
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title="Política de Cookies"
      lastUpdated={siteLegal.lastUpdated}
      intro="Esta política describe qué cookies utiliza este sitio web, con qué finalidad y cómo puede gestionarlas."
      sections={cookieSections}
    />
  );
}
