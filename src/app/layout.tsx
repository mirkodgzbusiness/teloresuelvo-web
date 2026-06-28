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
  title: "Te Lo Resuelvo Viajes | Vuelos Lima-Milán, Madrid, Bogotá",
  description:
    "Agencia especializada en billetería aérea internacional. Vuelos entre Sudamérica y Europa con asesoría personalizada.",
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
    title: "Te Lo Resuelvo Viajes | Vuelos Lima-Milán, Madrid, Bogotá",
    description:
      "Agencia especializada en billetería aérea internacional. Vuelos entre Sudamérica y Europa con asesoría personalizada.",
    type: "website",
    locale: "es_ES",
    siteName: "Te Lo Resuelvo Viajes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Te Lo Resuelvo Viajes | Vuelos Lima-Milán, Madrid, Bogotá",
    description:
      "Agencia especializada en billetería aérea internacional. Vuelos entre Sudamérica y Europa con asesoría personalizada.",
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
