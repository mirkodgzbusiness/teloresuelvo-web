@AGENTS.md

# Te Lo Resuelvo Viajes — Website

Travel agency website for Te Lo Resuelvo Viajes, based in Milan, Italy. Specializes in flights between South America and Europe.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + custom CSS in `globals.css`
- **Animations:** GSAP (ScrollTrigger, Observer, CustomEase, Draggable, InertiaPlugin, SplitText)
- **Fonts:** National2Condensed-Bold (headings, local), Figtree (body, Google Fonts)
- **Deployment:** Vercel — domain: teloresuelvo.it

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── contacto/page.tsx     # Contact page
│   ├── privacidad/page.tsx   # Privacy policy
│   ├── cookies/page.tsx      # Cookie policy
│   ├── layout.tsx            # Root layout (fonts, metadata, loading screen, cookie consent)
│   ├── globals.css           # All custom CSS (component styles, animations, responsive)
│   ├── opengraph-image.tsx   # OG image generation
│   ├── robots.ts             # robots.txt
│   └── sitemap.ts            # sitemap.xml
├── components/
│   ├── NavMultilevel.tsx      # Main navigation with dropdowns, scroll hide/show, mobile menu
│   ├── Hero.tsx               # Layered image slider hero (4 destinations)
│   ├── SocialProof.tsx        # Stats counters + company description
│   ├── ComoFunciona.tsx       # 3-step process section
│   ├── HighlightSection.tsx   # Text reveal with marker bars (SplitText)
│   ├── Rutas.tsx              # Flight route cards
│   ├── Testimonios.tsx        # Overlapping draggable slider (Google reviews)
│   ├── StickySteps.tsx        # Sticky scroll sections with images
│   ├── GrupoVIP.tsx           # WhatsApp VIP group CTA
│   ├── FAQ.tsx                # Accordion FAQ
│   ├── Footer.tsx             # Parallax reveal footer
│   ├── ContactContent.tsx     # Contact page content
│   ├── OpeningHours.tsx       # Business hours widget
│   ├── LoadingScreen.tsx      # 2s loading screen with logo
│   ├── WhatsAppFloat.tsx      # Floating WhatsApp button
│   ├── cookies/               # GDPR cookie consent system
│   └── legal/                 # Legal page layout
├── config/
│   └── cookie-consent.config.ts
├── content/
│   └── legal.ts               # Privacy + cookie policy content
└── lib/
    └── consent/               # Cookie consent storage utilities
```

## Key Patterns

### Navigation
- `NavMultilevel` accepts `transparent` prop — use `transparent` only on homepage (hero has dark background)
- Other pages: `<NavMultilevel />` (defaults to solid header with blur)
- Header hides on scroll down, reappears with blur on scroll up

### Styling
- All component CSS lives in `globals.css` using BEM-like class naming
- Tailwind used for utility classes in JSX
- Colors defined in `@theme inline` block (navy, whatsapp, page, text, etc.)
- **Never add letter-spacing to headings** — the condensed font doesn't need it
- Heading font is uppercase by default via global CSS rule

### Animations
- GSAP is the animation library for all interactive/scroll effects
- All `data-` attributes on slider/nav elements are essential for JS targeting — do not remove or rename them
- ScrollTrigger used for scroll-based reveals
- Observer used for swipe/drag in hero slider

### Pages
- Homepage: Nav with `transparent` prop → all sections → Footer
- Other pages: Nav without `transparent` → content → Footer
- Footer sits outside `data-main` wrapper for parallax effect
- Loading screen (production only) shows for 2s before content
- Cookie banner appears 3s after load (after loading screen finishes)

### Contact Info
- WhatsApp: +39 351 491 5445
- Location: Milan, Italy
- Social: Instagram, TikTok, Facebook (see `reference_social-links.md` in memory)

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint
```
