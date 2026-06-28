# Te Lo Resuelvo Viajes — Website

Sitio web de la agencia de billetería aérea internacional (Sudamérica ↔ Europa).

**Producción:** [teloresuelvo.it](https://teloresuelvo.it)

## Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- React 19
- [Tailwind CSS](https://tailwindcss.com) v4
- [GSAP](https://gsap.com) — animaciones, scroll y transiciones del hero, secciones sticky, highlights, etc.

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Estructura principal

| Ruta | Descripción |
|------|-------------|
| `/` | Landing principal |
| `/contacto` | Página de contacto |
| `/privacidad` | Política de privacidad |
| `/cookies` | Política de cookies |

El sitemap y robots se generan en `src/app/sitemap.ts` y `src/app/robots.ts`.

## Variables de entorno (opcionales)

```env
NEXT_PUBLIC_SITE_URL=https://teloresuelvo.it
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Deploy

Pensado para [Vercel](https://vercel.com). Conectar el repo y desplegar; el dominio de producción es `teloresuelvo.it`.
