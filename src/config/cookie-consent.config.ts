/**
 * Cookie consent config — copy this file to other client projects and edit values.
 */
export const cookieConsentConfig = {
  expiryDays: 180,

  siteName: "Te Lo Resuelvo Viajes",
  logoSrc: "/LogoTeLoResuelvoPNG (1).webp",
  logoAlt: "Te Lo Resuelvo Viajes",

  privacyPolicyUrl: "/privacy-policy",
  cookiePolicyUrl: "/cookie-policy",

  /** Set when you add GA4 — e.g. "G-XXXXXXXXXX" */
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",

  texts: {
    bannerTitle: "Ayúdanos a mejorar tu experiencia",
    bannerDescription:
      "Usamos cookies necesarias para que el sitio funcione y, con tu permiso, cookies analíticas para entender cómo se usa la web. Puedes aceptar todas, usar solo las necesarias o gestionar tus preferencias.",
    cookiePolicyLink: "Política de Cookies",
    acceptAll: "Aceptar todas las cookies",
    necessaryOnly: "Solo cookies necesarias",
    managePreferences: "Gestionar preferencias",
    preferencesTitle: "Preferencias de cookies",
    preferencesDescription:
      "Elige qué categorías quieres permitir. Las cookies necesarias no se pueden desactivar porque permiten funciones básicas del sitio.",
    savePreferences: "Guardar preferencias",
    necessaryLabel: "Necesarias",
    necessaryDescription:
      "Imprescindibles para la navegación y funciones básicas (por ejemplo, recordar tu elección de cookies).",
    analyticsLabel: "Analíticas",
    analyticsDescription:
      "Nos ayudan a medir visitas y mejorar el sitio (por ejemplo, Google Analytics).",
    marketingLabel: "Marketing",
    marketingDescription:
      "Permiten mostrar contenido o anuncios más relevantes en otras plataformas.",
    reopenLabel: "Cookies",
  },
} as const;
