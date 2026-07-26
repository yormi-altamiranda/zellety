# Zellety — Sitio Web Corporativo

Sitio web de [Zellety](https://zellety.com), startup de diseño y desarrollo tech en Latinoamérica.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | AstroJS 5.x (SSG) |
| Islands | Vue 3 (`@astrojs/vue`) |
| CMS | Storyblok (headless, región EU) |
| Estilos | UnoCSS (atomic) |
| Animaciones | GSAP + ScrollTrigger |
| Scroll suave | Lenis |
| Carousel | SwiperJS |
| Íconos | Iconify (`@iconify/vue`) |
| Lenguaje | TypeScript strict |
| Deploy | Netlify (GitHub → build → dist) |

---

## Estructura del proyecto

```
web-zellety/
├── src/
│   ├── components/              # Componentes reutilizables
│   │   ├── Header.astro             Header fijo, scroll shrink, nav
│   │   ├── Footer.astro             Wordmark ZELLETY animada con GSAP
│   │   ├── CustomCursor.astro       Cursor personalizado desktop (GSAP quickTo)
│   │   ├── ThemeToggle.vue          Toggle dark/light mode
│   │   ├── NavMobile.vue            Menú hamburguesa móvil
│   │   ├── ContactForm.vue          Formulario + Netlify Forms
│   │   ├── TestimonialsSlider.vue   Carousel SwiperJS testimonios
│   │   ├── ToolsSlider.vue          Carrusel infinito de logos (34 íconos)
│   │   └── ProjectFilter.vue        Filtro por servicio en /projects
│   │
│   ├── sections/                # Secciones Astro puro (zero JS cliente)
│   │   ├── Hero.astro               Slider full-screen dinámico
│   │   ├── About.astro              Quiénes somos + counters GSAP
│   │   ├── Services.astro           Lista 5 servicios numerados
│   │   ├── Work.astro               Grid proyectos destacados
│   │   ├── Team.astro               Grid equipo + watermark
│   │   ├── Tools.astro              Banda inclinada rotateZ(-4deg) con ticker CSS
│   │   ├── Testimonials.astro       Slider testimonios (SwiperJS island)
│   │   └── Contact.astro            Form + marquee dinámico
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro         HTML base, SEO, Lenis, GSAP, CustomCursor
│   │   └── PageLayout.astro         BaseLayout + container centrado
│   │
│   ├── pages/
│   │   ├── index.astro              Home (/)
│   │   ├── services.astro           Servicios (/services)
│   │   └── projects/
│   │       ├── index.astro          Grid proyectos con filtro (/projects)
│   │       └── [slug].astro         Detalle proyecto (/projects/[slug])
│   │
│   ├── lib/
│   │   ├── storyblok.ts             Cliente API + tipos TS + helpers
│   │   └── mock-data.ts             Datos de ejemplo (fallback Storyblok)
│   │
│   ├── styles/
│   │   ├── tokens.css               Design tokens (colores, tipografía, spacing)
│   │   └── base.css                 Reset + estilos globales + botones CTA slide
│   │
│   └── assets/
│       ├── fonts/                   Fuentes self-hosted
│       └── icons/                   SVGs de herramientas (34 íconos)
│
├── scripts/                     # Seeds Storyblok (Management API)
│   ├── seed-content.mjs             Proyectos, equipo, servicios, testimonios
│   ├── seed-storyblok.mjs
│   ├── seed-home.mjs
│   ├── seed-hero-slides.mjs
│   ├── seed-section-headers.mjs
│   ├── seed-tools-block.mjs
│   └── seed-tools-content.mjs
│
├── plan/                        # Documentación técnica
│   ├── STATUS.md                    Estado del proyecto y checklist
│   ├── mcp-tools.md                 MCPs usados en desarrollo
│   ├── apis-libraries.md            APIs y librerías de terceros
│   ├── config-sb.md                 Configuración Storyblok
│   ├── netlify-deploy.md            Checklist deploy
│   ├── storyblok-integration.md     Plan integración CMS
│   └── components/                  Documentación por componente
│       ├── README.md                    Índice
│       ├── custom-cursor.md             CustomCursor — GSAP quickTo, overwrite:'auto'
│       ├── header.md
│       ├── footer.md
│       ├── theme-toggle.md
│       ├── nav-mobile.md
│       ├── contact-form.md
│       ├── testimonials-slider.md
│       ├── tools-slider.md
│       ├── sections.md                  Todas las secciones Astro
│       ├── layouts.md
│       └── lib.md
│
├── public/                      # Assets estáticos
├── uno.config.ts                # Config UnoCSS + shortcuts
├── astro.config.mjs             # Config Astro + integraciones
├── netlify.toml                 # Build config, Node 20, cache headers
└── .env                         # Variables de entorno (no commitear)
```

---

## Componentes clave

### `CustomCursor.astro`
Cursor personalizado solo desktop (`@media (hover: hover)`). Punto terracota 20px que expande a 72px al hover sobre `a`, `button`, `[role="button"]` o `[data-cursor]`. Movimiento suavizado con `gsap.quickTo`. **Importante:** usa `overwrite: 'auto'` en click — con `true` se cancelan los tweens de posición y el cursor se congela.

### `Tools.astro`
Banda inclinada `rotateZ(-4deg)` full-width con tres filas de ticker CSS puro. Logos triplicados para loop seamless. Fondo siempre `#0A0F1E` independiente del tema (dark island intencional). Sin GSAP de entrada — la banda siempre es visible para evitar race condition con Lenis.

### `Footer.astro`
Wordmark ZELLETY animada con `gsap.set({y:0, yPercent:110})` + `gsap.to({yPercent:0})` al entrar al viewport. El patrón set+to es crítico: sin el set previo, GSAP mezcla pixels del CSS matrix con yPercent y la animación resulta en 0→0 (invisible).

### `base.css` — Botones CTA
Efecto slide overlay: gradient 200% de ancho + `background-position` transition. `.btn-primary` (lime→negro), `.btn-ghost` (transparente→lime). La flecha `span[aria-hidden]` se desplaza 5px al hover.

---

## Comandos

```bash
# Desarrollo
pnpm dev

# Build producción
pnpm run build

# Preview del build
pnpm preview

# Seeds Storyblok (requiere SB_SPACE_ID y SB_MANAGEMENT_TOKEN en .env)
node --env-file=.env scripts/seed-content.mjs
```

---

## Variables de entorno

```env
# .env (no commitear)
STORYBLOK_TOKEN=          # Content Delivery API token (lectura)
PUBLIC_SITE_URL=          # URL pública (ej: https://zellety.com)

# Solo para scripts de seed (no necesario en Netlify)
SB_SPACE_ID=
SB_MANAGEMENT_TOKEN=
```

---

## Deploy

- **Plataforma:** Netlify
- **Trigger:** Push a `main` → build automático
- **Build command:** `pnpm run build`
- **Publish directory:** `dist`
- **Node version:** 20 (configurado en `netlify.toml`)
- **Rebuild por CMS:** Webhook Storyblok → `https://api.netlify.com/build_hooks/6a63f25b916759b5691e06e2`

---

## Storyblok — Contenido administrable

```
home-settings (story única)
  ├── slides[]              → Hero section
  ├── services_*/work_*/team_*/testimonials_*/contact_* → headers de sección
  ├── marquee_items[]       → Marquee de contacto
  └── tool_list[]           → Logos en Tools section

Carpetas con stories propias:
  projects/     → Work section + /projects + /projects/[slug]
  team/         → Team section
  services/     → Services section
  testimonials/ → Testimonials section
```

Todo el fetching ocurre en **build time** (SSG). Cada sección tiene fallback hardcoded si Storyblok falla o está vacío.

---

## Motion Design

| Efecto | Implementación |
|--------|---------------|
| Smooth scroll | Lenis en BaseLayout, conectado a GSAP via `lenis.on('scroll', ScrollTrigger.update)` |
| Scroll reveals | GSAP ScrollTrigger `start: 'top 85%'`, `scrub: false` |
| Custom cursor | `gsap.quickTo` para x/y, CSS transition para size, `overwrite:'auto'` en click |
| Tools ticker | CSS `@keyframes` puro — 3 filas, velocidades distintas (22s / 28s / 32s) |
| Footer wordmark | `gsap.set(yPercent:110)` + `gsap.to(yPercent:0)` con ScrollTrigger |
| Botones CTA | CSS gradient 200% + `background-position` transition |
| Counters | `gsap.to(textContent)` con `snap: {textContent: 1}` |
| Hero entrada | Timeline GSAP: headline → subline → CTAs → scroll arrow |

---

## Documentación técnica

Ver carpeta `plan/` para detalles:

| Archivo | Contenido |
|---------|-----------|
| [`plan/STATUS.md`](plan/STATUS.md) | Estado completo, checklist y bugs resueltos |
| [`plan/mcp-tools.md`](plan/mcp-tools.md) | MCPs usados en desarrollo (Playwright, Claude Code) |
| [`plan/components/README.md`](plan/components/README.md) | Índice de todos los componentes |
| [`plan/components/custom-cursor.md`](plan/components/custom-cursor.md) | CustomCursor — implementación y gotchas |
| [`plan/components/sections.md`](plan/components/sections.md) | Todas las secciones Astro — datos, layout, GSAP |
| [`plan/apis-libraries.md`](plan/apis-libraries.md) | APIs y librerías de terceros |
| [`plan/config-sb.md`](plan/config-sb.md) | Configuración Storyblok |
| [`plan/netlify-deploy.md`](plan/netlify-deploy.md) | Checklist deploy |
