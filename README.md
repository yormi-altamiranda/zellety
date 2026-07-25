# Zellety — Sitio Web Corporativo

Sitio web de [Zellety](https://zellety.com), startup de diseño y desarrollo tech en Latinoamérica.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | AstroJS 5.x (SSG) |
| Islands | Vue 3 (`@astrojs/vue`) |
| CMS | Storyblok (headless, region EU) |
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
│   ├── components/          # Vue islands (interactivos, con estado)
│   │   ├── Header.astro         Header fijo con nav, ThemeToggle, NavMobile
│   │   ├── Footer.astro         Footer con wordmark ZELLETY
│   │   ├── ThemeToggle.vue      Toggle dark/light mode
│   │   ├── NavMobile.vue        Menú hamburguesa móvil
│   │   ├── ContactForm.vue      Formulario + Netlify Forms
│   │   ├── TestimonialsSlider.vue  Carousel SwiperJS testimonios
│   │   └── ToolsSlider.vue      Carrusel infinito de logos
│   │
│   ├── sections/            # Astro puro (zero JS cliente)
│   │   ├── Hero.astro           Slider full-screen dinámico
│   │   ├── About.astro          Quiénes somos + counters
│   │   ├── Services.astro       Lista 5 servicios
│   │   ├── Work.astro           Grid proyectos destacados
│   │   ├── Team.astro           Grid equipo
│   │   ├── Tools.astro          Grid 4×4 herramientas
│   │   ├── Testimonials.astro   Slider testimonios
│   │   └── Contact.astro        Form + marquee contacto
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro     HTML base, SEO, Lenis, GSAP
│   │   └── PageLayout.astro     BaseLayout + container centrado
│   │
│   ├── pages/
│   │   ├── index.astro          Home (/)
│   │   ├── services.astro       Servicios (/services)
│   │   └── projects/
│   │       ├── index.astro      Grid proyectos (/projects)
│   │       └── [slug].astro     Detalle proyecto (/projects/[slug])
│   │
│   ├── lib/
│   │   ├── storyblok.ts         Cliente API + tipos TS + helpers
│   │   └── mock-data.ts         Datos de ejemplo (fallback)
│   │
│   ├── styles/
│   │   ├── tokens.css           Design tokens (colores, tipografía, spacing)
│   │   └── base.css             Reset + estilos globales + @font-face
│   │
│   └── assets/
│       ├── fonts/               Fuentes self-hosted
│       └── icons/               SVGs de herramientas (34 íconos)
│
├── scripts/                 # Seeds Storyblok (Management API)
│   ├── seed-storyblok.mjs
│   ├── seed-home.mjs
│   ├── seed-hero-slides.mjs
│   ├── seed-section-headers.mjs
│   ├── seed-tools-block.mjs
│   └── seed-tools-content.mjs
│
├── plan/                    # Documentación del proyecto
│   ├── STATUS.md                Estado actual y checklist
│   ├── apis-libraries.md        APIs y librerías de terceros
│   ├── config-sb.md             Configuración Storyblok
│   ├── netlify-deploy.md        Deploy y Netlify Forms
│   ├── storyblok-integration.md Plan integración CMS
│   └── components/              Documentación de componentes
│       ├── README.md                Índice
│       ├── header.md
│       ├── footer.md
│       ├── theme-toggle.md
│       ├── nav-mobile.md
│       ├── contact-form.md
│       ├── testimonials-slider.md
│       ├── tools-slider.md
│       ├── sections.md
│       ├── layouts.md
│       └── lib.md
│
├── public/                  # Assets estáticos
├── uno.config.ts            # Config UnoCSS
├── astro.config.mjs         # Config Astro + integraciones
├── netlify.toml             # Config Netlify (build, cache, Node 20)
└── .env                     # Variables de entorno (no commitear)
```

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
node --env-file=.env scripts/seed-xxx.mjs
```

---

## Variables de entorno

```env
# .env (no commitear)
STORYBLOK_TOKEN=          # Content Delivery API token
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
- **Rebuild por CMS:** Webhook Storyblok → Netlify build hook (ID: 201754221537190)

---

## Documentación

Ver carpeta `plan/` para documentación detallada:

- [`plan/STATUS.md`](plan/STATUS.md) — Estado del proyecto y checklist pre-launch
- [`plan/components/`](plan/components/README.md) — Documentación de cada componente
- [`plan/apis-libraries.md`](plan/apis-libraries.md) — APIs y librerías de terceros
- [`plan/config-sb.md`](plan/config-sb.md) — Configuración Storyblok
- [`plan/netlify-deploy.md`](plan/netlify-deploy.md) — Checklist deploy

---

## Arquitectura de datos

```
Storyblok CMS (fuente de verdad)
  └─ getHomeSettings()   → slides, headers de sección, tool_list, marquee
  └─ getServices()       → 5 servicios
  └─ getProjects()       → proyectos (featured=true para home)
  └─ getTeamMembers()    → miembros del equipo
  └─ getTestimonials()   → testimonios

Fallback (si Storyblok falla o está vacío)
  └─ mock-data.ts        → proyectos de ejemplo
  └─ Arrays hardcoded    → datos por defecto en cada sección
```

Todo el fetching ocurre en **build time** (SSG). El sitio se genera como HTML estático → performance óptima y zero JS server-side en runtime.
