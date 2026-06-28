/**
 * Legal page content — replace sections with text from CookieYes generator
 * or your lawyer. Keep structure; update copy only.
 */
export const siteLegal = {
  companyName: "Te Lo Resuelvo Viajes",
  email: "info@teloresuelvoviajes.com",
  privacyEmail: "info@teloresuelvoviajes.com",
  phone: "+39 351 491 5445",
  website: "teloresuelvo.it",
  lastUpdated: "28 de junio de 2026",
  /** TODO: complete with legal entity name, VAT, registered address */
  legalEntity: "[Razón social / nombre legal de la empresa]",
  vat: "[Partita IVA / CIF]",
  address: "[Dirección fiscal completa]",
};

export const privacySections = [
  {
    title: "1. Responsable del tratamiento",
    paragraphs: [
      `El responsable del tratamiento de sus datos personales es ${siteLegal.legalEntity}, con domicilio en ${siteLegal.address}. Puede contactarnos en ${siteLegal.email} o en el teléfono ${siteLegal.phone}.`,
    ],
  },
  {
    title: "2. Datos que recopilamos",
    paragraphs: [
      "A través de esta web y nuestros canales de contacto podemos tratar: nombre, teléfono, correo electrónico, datos de viaje (origen, destino, fechas, número de pasajeros), datos de facturación y, cuando sea necesario para emitir billetes, datos de documentos de identidad o pasaporte.",
      "También recopilamos datos técnicos de navegación (dirección IP, tipo de dispositivo, navegador) y cookies según se describe en nuestra Política de Cookies.",
    ],
  },
  {
    title: "3. Finalidades y base legal",
    paragraphs: [
      "Gestionar consultas y cotizaciones de vuelos (ejecución de medidas precontractuales y contrato).",
      "Emitir y gestionar reservas de billetes aéreos (contrato).",
      "Atención al cliente por WhatsApp, email o teléfono (contrato e interés legítimo).",
      "Cumplir obligaciones legales y fiscales (obligación legal).",
      "Análisis estadístico de la web, solo con su consentimiento (consentimiento).",
      "Comunicaciones comerciales o acceso al Grupo VIP de ofertas, solo con su consentimiento (consentimiento).",
    ],
  },
  {
    title: "4. Destinatarios",
    paragraphs: [
      "Podemos comunicar datos a aerolíneas, proveedores de pago, asesoría contable, proveedores de hosting (Vercel) y plataformas de mensajería como WhatsApp (Meta). Algunos de estos proveedores pueden estar fuera del Espacio Económico Europeo.",
    ],
  },
  {
    title: "5. Conservación",
    paragraphs: [
      "Conservamos los datos de consultas comerciales mientras dure la relación y durante los plazos necesarios para atender reclamaciones. Los datos fiscales y contables se conservan durante los plazos legalmente exigidos.",
    ],
  },
  {
    title: "6. Sus derechos",
    paragraphs: [
      "Puede ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a " +
        siteLegal.privacyEmail +
        ". También puede retirar su consentimiento en cualquier momento sin afectar a la licitud del tratamiento previo.",
      "Tiene derecho a presentar una reclamación ante la autoridad de control competente (en Italia: Garante per la protezione dei dati personali; en España: AEPD).",
    ],
  },
  {
    title: "7. Menores",
    paragraphs: [
      "Nuestros servicios no están dirigidos a menores de 16 años. No recopilamos conscientemente datos de menores sin el consentimiento de sus tutores.",
    ],
  },
  {
    title: "8. Cambios",
    paragraphs: [
      "Podemos actualizar esta política. La fecha de la última revisión se indica al inicio del documento.",
    ],
  },
];

export const cookieSections = [
  {
    title: "1. ¿Qué son las cookies?",
    paragraphs: [
      "Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Permiten recordar preferencias, medir el uso del sitio o mostrar contenido personalizado.",
    ],
  },
  {
    title: "2. ¿Quién utiliza las cookies?",
    paragraphs: [
      `Este sitio web es operado por ${siteLegal.companyName}. Algunas cookies son propias y otras son de terceros (por ejemplo, Google si activa analítica).`,
    ],
  },
  {
    title: "3. Tipos de cookies que utilizamos",
    paragraphs: [
      "Necesarias: imprescindibles para el funcionamiento del sitio y para recordar su elección sobre cookies. No requieren consentimiento.",
      "Analíticas: nos ayudan a entender cómo se usa la web (por ejemplo, Google Analytics). Solo se activan si usted las acepta.",
      "Marketing: permiten medir campañas o mostrar anuncios relevantes. Solo se activan si usted las acepta.",
    ],
  },
  {
    title: "4. Cookies concretas en este sitio",
    paragraphs: [
      "tlr_cookie_consent — propia — guarda sus preferencias de cookies — hasta 180 días — necesaria.",
      "Cookies técnicas de Vercel/Next.js — sesión — necesarias para la entrega del sitio.",
      "Si acepta analíticas: cookies de Google Analytics (_ga, _ga_*, etc.) — analíticas — según configuración de Google.",
    ],
  },
  {
    title: "5. Cómo gestionar las cookies",
    paragraphs: [
      "Puede aceptar, rechazar o configurar las cookies desde el banner al entrar en la web o desde el botón «Cookies» en la esquina de la pantalla.",
      "También puede eliminar o bloquear cookies desde la configuración de su navegador. Tenga en cuenta que desactivar cookies necesarias puede afectar al funcionamiento del sitio.",
    ],
  },
  {
    title: "6. Más información",
    paragraphs: [
      `Para más detalles sobre el tratamiento de datos personales, consulte nuestra Política de Privacidad. Contacto: ${siteLegal.email}.`,
    ],
  },
];
