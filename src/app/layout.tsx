import type { Metadata } from "next";
import localFont from "next/font/local";
import { Figtree } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/cookies/CookieConsent";
import Analytics from "@/components/cookies/Analytics";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const nationalCondensed = localFont({
  src: [
    {
      path: "../../public/fonts/National2Condensed-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-heading",
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://teloresuelvo.it"),
  title: "Te Lo Resuelvo Viajes | Agenzia Viaggi a Milano — Vuelos Sudamérica y Europa",
  description:
    "Agenzia di viaggio a Milano specializzata in voli tra Sud America ed Europa. Vuelos al mejor precio entre Lima, Bogotá, Guayaquil, Buenos Aires y Europa. Equipaje incluido, asesoría personalizada y respuesta por WhatsApp en menos de 5 minutos. Más de 25 años de experiencia.",
  keywords: [
    "agenzia viaggi Milano",
    "agenzia di viaggio a Milano",
    "agencia de viajes Milán",
    "Te Lo Resuelvo Viajes",
    "vuelos baratos Sudamérica Europa",
    "voli Sud America Europa",
    "vuelos Lima Milán",
    "vuelos Bogotá Madrid",
    "vuelos Guayaquil Europa",
    "biglietteria aerea Milano",
    "billetería aérea",
    "vuelos con equipaje incluido",
    "vuelos latinos en Europa",
    "voli economici Milano Lima",
    "voli economici Milano Bogotà",
  ],
  icons: {
    icon: [
      {
        url: "/favicon-512x512px.webp",
        type: "image/webp",
        sizes: "512x512",
      },
    ],
    apple: "/favicon-512x512px.webp",
    shortcut: "/favicon-512x512px.webp",
  },
  openGraph: {
    title: "Te Lo Resuelvo Viajes | Agenzia Viaggi a Milano — Voli Sud America Europa",
    description:
      "Agenzia di viaggio a Milano. Trovamos il volo perfetto per te — al miglior prezzo, con bagaglio incluso e senza sorprese. Confrontiamo +20 compagnie aeree e rispondiamo su WhatsApp in pochi minuti.",
    type: "website",
    locale: "es_ES",
    siteName: "Te Lo Resuelvo Viajes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Te Lo Resuelvo Viajes | Agenzia Viaggi a Milano — Voli Sud America Europa",
    description:
      "Agenzia di viaggio a Milano. Trovamos il volo perfetto per te — al miglior prezzo, con bagaglio incluso e senza sorprese. Confrontiamo +20 compagnie aeree e rispondiamo su WhatsApp in pochi minuti.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${nationalCondensed.variable} ${figtree.variable} antialiased`}
    >
      <body className="min-h-screen bg-page text-text font-medium">
        <CookieConsent>
          {children}
          <WhatsAppFloat />
        </CookieConsent>
        <Analytics />
      </body>
    </html>
  );
}
