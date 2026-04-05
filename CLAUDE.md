Think before acting. Read existing files before writing code.
Be concise in output but thorough in reasoning.
Prefer editing over rewriting whole files.
Do not re-read files you have already read unless the file may have changed.
Test your code before declaring done.
No sycophantic openers or closing fluff.
Keep solutions simple and direct.
User instructions always override this file.

# CLAUDE.md — Zellety (zellety.com)

> Fuente de verdad del proyecto. Lee este archivo antes de generar cualquier código.

## Archivos de referencia detallada

| Tema | Archivo |
|------|---------|
| Colores, fuentes, UnoCSS | `plan/ux-ui.md` |
| Vue islands — instalación y convenciones | `plan/vue-islands.md` |
| Storyblok, SwiperJS, Iconify, Fonts, GSAP, Lenis | `plan/apis-libraries.md` |
| Netlify deploy, Forms, SEO checklist | `plan/netlify-deploy.md` |

---

## 1. Qué es Zellety

Startup de diseño y desarrollo tech en Latinoamérica. Sitio web corporativo que presenta servicios, proyectos y equipo. Tono: profesional pero cercano, técnico sin ser intimidante. Audiencia: founders, CTOs y equipos de producto en LATAM que buscan un partner técnico.

---

## 2. Stack

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | AstroJS (SSG) | 5.x |
| Islands | Vue 3 (`@astrojs/vue`) | 3.5+ |
| CMS | Storyblok (headless) | API v2 |
| Styling | UnoCSS (atomic) | latest |
| Icons | Iconify (`@iconify/vue`) | latest |
| Animations | GSAP + ScrollTrigger + SplitText | 3.12+ |
| Smooth scroll | Lenis | latest |
| Carousel | SwiperJS | latest |
| Language | TypeScript strict | 5.x |
| Runtime | Node 20 | |
| Deploy | Netlify (GitHub → build → dist) | |

---

## 3. Arquitectura de carpetas

```
src/
├── components/          # Vue islands (interactivos, con estado)
│   ├── ServiceCard.vue
│   ├── ProjectCard.vue
│   ├── ContactForm.vue
│   ├── ToolsSlider.vue  # SwiperJS carousel
│   └── NavMobile.vue
├── sections/            # Astro components (estáticos, zero JS cliente)
│   ├── Hero.astro
│   ├── About.astro
│   ├── Services.astro
│   ├── Work.astro
│   ├── Team.astro
│   └── Contact.astro
├── layouts/
│   ├── BaseLayout.astro  # <html>, meta, fonts, nav, footer
│   └── PageLayout.astro  # BaseLayout + container + slot
├── pages/
│   ├── index.astro
│   └── projects/
│       ├── index.astro
│       └── [slug].astro
├── lib/
│   ├── storyblok.ts      # Cliente API + tipos TS
│   ├── animations.ts     # Helpers GSAP reutilizables
│   └── lenis.ts          # Smooth scroll setup
├── styles/
│   ├── tokens.css        # CSS custom properties (ver plan/ux-ui.md)
│   └── base.css          # Reset + global styles + @font-face
├── assets/
│   ├── fonts/            # Stack Sans Notch (self-hosted)
│   └── icons/tools/      # SVGs de herramientas (svgl.app)
└── uno.config.ts
```

### Reglas de arquitectura

- **sections/** = Astro puro. NO Vue. Zero JS al cliente.
- **components/** = Vue islands. `client:visible` o `client:idle`. Solo con interactividad real.
- **Nunca** `client:load` salvo NavMobile.
- Vue sin `ref()`, `computed()` ni eventos → convertir a Astro.
- Imágenes: `<Image>` de `astro:assets`, `loading="lazy"`, `decoding="async"`, WebP.

---

## 4. Servicios de Zellety

1. **Web App** — Nuxt, Next, AstroJS. Sites corporativos, e-commerce, plataformas.
2. **App Móvil** — Flutter. iOS y Android desde un solo codebase.
3. **IoT / Domótica** — Automatización de hogares y oficinas inteligentes.
4. **UX/UI** — Diseño en Figma. Research, wireframes, prototipos, design systems.
5. **SaaS** — Plataformas multi-tenant por suscripción. Billing, auth, dashboards.

---

## 5. Páginas y secciones

### Home (`/`)

| Sección | Contenido | Source |
|---------|-----------|--------|
| Hero | Headline + subline + CTA "Hablemos" | Hardcoded |
| Tools Slider | Cintillo de logos de herramientas (SwiperJS) | Hardcoded |
| About | Quiénes somos + counters animados | Hardcoded |
| Services | Grid de 5 ServiceCards numeradas | Storyblok |
| Work | 3-4 ProjectCards (featured: true) | Storyblok |
| Team | Grid de TeamMemberCards | Storyblok |
| Contact | Netlify Form | Hardcoded |

### Projects (`/projects`)
Grid con todos los proyectos. Filtro por servicio (Vue island). Paginación si >12.

### Project Detail (`/projects/[slug]`)
Cover image full-width, título, richtext, tech stack pills, galería, link live, CTA contacto.

---

## 6. Motion Design System

Referencias: museumofmoney.com · sav1n.com · good-fella.com

### Principios
- Dark-first — midnight como fondo dominante
- Accent lime agresivo — CTAs, highlights, hover states
- Scroll storytelling — cada sección se revela como un acto narrativo
- Monospace como acento — labels, counters, metadata
- Numbered sections — "01 / WEB APP", "02 / MOBILE"
- Generoso con el whitespace

### 6.1 Smooth Scroll (Lenis) — ver `plan/apis-libraries.md`

```typescript
// lib/lenis.ts
import Lenis from 'lenis'
const lenis = new Lenis({ duration: 1.2, smoothWheel: true })
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) lenis.destroy()
```

### 6.2 Preloader

Secuencia: counter 0→100 (2.5s) → scale + fade out → logo ZELLETY reveal clipPath → slide up translateY(-100%).
- Astro component (no Vue). GSAP timeline. Se destruye del DOM. sessionStorage para skip en repeat visits.

### 6.3 Hero — Entrada orquestada

```
t=0.0s  Nav: opacity 0→1, translateY(-20→0) (0.4s)
t=0.1s  Headline: SplitText por línea, clipPath inset(100%→0%) + translateY(40→0), stagger 0.12s
t=0.5s  Subline: opacity 0→1, translateY(20→0) (0.4s)
t=0.7s  CTA: opacity 0→1, translateY(20→0) (0.4s)
t=0.9s  Glow lime: scale(0.8→1) + opacity (0.6s)
```

### 6.4 Scroll Reveals

```
SECTION TITLE:     clipPath inset(0 100%→0%) — 0.8s ease:power3.inOut
PARAGRAPH:         opacity 0→1, translateY(30→0) — 0.5s delay:0.2s
CARDS:             opacity 0→1, translateY(60→0) — stagger 0.1s, 0.6s ease:power2.out
IMAGES:            scale(1.1→1) + opacity — 0.8s ease:power2.out
DIVIDER:           scaleX(0→1), transformOrigin:left — 0.6s
```

ScrollTrigger: `start: "top 85%"` · `scrub: false` · `toggleActions: "play none none none"`

### 6.5 Custom Cursor (desktop only)

Astro component, JS vanilla, `GSAP.quickTo()`. Default: 8px círculo borde lime. Hover: scale(3) lime bg. CTA: scale(5) con texto. `@media (hover: none) { display: none }`.

### 6.6 Marquee de herramientas

CSS puro — duplicar contenido, `animation: marquee linear infinite`, pause on hover, mask-image en bordes. Ver `plan/apis-libraries.md` para SwiperJS como alternativa.

### 6.7 Performance (obligatorio)

- `will-change`: agregar al START, remover en `onComplete`
- Solo `transform` y `opacity` (composited)
- `prefers-reduced-motion`: deshabilitar TODO con GSAP matchMedia
- Sin GSAP scrub en mobile
- `ScrollTrigger.refresh()` en resize y lazy load
- Videos: max 720p, WebM + MP4 fallback, `preload="none"`

---

## 7. Convenciones de código

- TypeScript strict, sin `any`
- Archivos: kebab-case (`project-card.vue`)
- Imports Vue: PascalCase (`import ProjectCard from ...`)
- Props: `defineProps<T>()` · Emits: `defineEmits<T>()`
- Vue: Composition API únicamente (`<script setup lang="ts">`)
- Astro: frontmatter para data fetching, `Astro.props` tipado

Ver detalles en `plan/vue-islands.md` y `plan/ux-ui.md`.

---

## 8. Referencias visuales

| Sitio | Tomar | No tomar |
|-------|-------|----------|
| museumofmoney.com | Preloader counter, marquee, sticky sections | Mini-juego, paleta dorada |
| sav1n.com | Counter preloader, video hover cards, numbered sections | Layout personal, serif |
| good-fella.com | Dark + accent, scroll animations, custom cursor, Lenis | Demasiado minimalista |

---

## 9. Plan de ejecución — Fases

### Fase 1 — Scaffold + Configuración base
`npm create astro@latest` minimal + TS strict → instalar integraciones y deps → crear estructura de carpetas → configurar `uno.config.ts`, `tokens.css`, `base.css`, `BaseLayout.astro`, `PageLayout.astro`, `.nvmrc`, `netlify.toml`, `astro.config.ts` → verificar `npm run dev`.

### Fase 2 — Storyblok + cliente TypeScript
`lib/storyblok.ts` con tipos + helpers (`getProjects`, `getFeaturedProjects`, `getTeamMembers`, `getServices`) → `.env.example` → páginas placeholder → `getStaticPaths()` en `[slug].astro` → mock data si no hay token.

### Fase 3 — Home: secciones + animaciones
`Preloader.astro` → `lib/lenis.ts` → `lib/animations.ts` (helpers GSAP) → todas las sections y components → custom cursor → marquee/ToolsSlider → ensamblar `pages/index.astro`.

### Fase 4 — Páginas de proyectos
`/projects` con filtro Vue island → `/projects/[slug]` con cover parallax, richtext, galería, CTA → scroll reveals → View Transitions API.

### Fase 5 — Polish, SEO y deploy
Meta tags + OG + Schema.org → responsive todos los breakpoints → Lighthouse >90 → `netlify.toml` final → Netlify Forms verificado → favicon → 404 → `npm run build` sin errores.

**Regla:** Ejecutar en orden. Cada fase compila antes de pasar a la siguiente. `git commit` al completar cada fase.

---

## 10. Prompt de inicio

> Eres el agente de desarrollo de zellety.com. Antes de generar cualquier código, lee CLAUDE.md completo y los archivos en `plan/` relevantes a la tarea. Sigue la arquitectura, tokens de diseño, schemas de Storyblok y convenciones definidas ahí. Si algo no está cubierto, pregunta antes de asumir.
