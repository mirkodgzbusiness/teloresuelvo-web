import type { Metadata } from "next";
import localFont from "next/font/local";
import { Figtree } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/cookies/CookieConsent";
import Analytics from "@/components/cookies/Analytics";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import LoadingScreen from "@/components/LoadingScreen";

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
  title: "Te Lo Resuelvo Viajes | Vuelos baratos entre Sudamérica y Europa",
  description:
    "Vuelos al mejor precio entre Lima, Bogotá, Guayaquil, Buenos Aires y Europa. Equipaje incluido, asesoría personalizada y respuesta por WhatsApp en menos de 5 minutos. +500 pasajeros ya volaron con nosotros.",
  keywords: [
    "vuelos baratos",
    "vuelos Sudamérica Europa",
    "vuelos Lima Milán",
    "vuelos Bogotá Madrid",
    "vuelos Guayaquil",
    "agencia de viajes",
    "billetería aérea",
    "Te Lo Resuelvo",
    "vuelos con equipaje incluido",
    "vuelos latinos en Europa",
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
    title: "Te Lo Resuelvo Viajes | Vuelos baratos entre Sudamérica y Europa",
    description:
      "Encontramos el vuelo perfecto para ti — al mejor precio, con equipaje incluido y sin sorpresas. Comparamos +20 aerolíneas y te respondemos por WhatsApp en minutos.",
    type: "website",
    locale: "es_ES",
    siteName: "Te Lo Resuelvo Viajes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Te Lo Resuelvo Viajes | Vuelos baratos entre Sudamérica y Europa",
    description:
      "Encontramos el vuelo perfecto para ti — al mejor precio, con equipaje incluido y sin sorpresas. Comparamos +20 aerolíneas y te respondemos por WhatsApp en minutos.",
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
        {process.env.NODE_ENV === "production" && <LoadingScreen />}
        <CookieConsent>
          {children}
          <WhatsAppFloat />
        </CookieConsent>
        <Analytics />
      </body>
    </html>
  );
}
