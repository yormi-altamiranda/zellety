# CLAUDE.md — Zellety (zellety.com)

> Fuente de verdad del proyecto. Lee este archivo antes de generar cualquier código.

## 1. Qué es Zellety

Startup de diseño y desarrollo tech en Latinoamérica. Sitio web corporativo que presenta servicios, proyectos y equipo. Tono: profesional pero cercano, técnico sin ser intimidante. Audiencia: founders, CTOs y equipos de producto en LATAM que buscan un partner técnico.

## 2. Stack

| Capa         | Tecnología                          | Versión  |
|-------------|-------------------------------------|----------|
| Framework   | AstroJS (SSG)                       | 5.x      |
| Islands     | Vue 3 (`@astrojs/vue`)              | 3.5+     |
| CMS         | Storyblok (headless)                | API v2   |
| Styling     | UnoCSS (atomic)                     | latest   |
| Icons       | Iconify (`@iconify/vue`)            | latest   |
| Animations  | GSAP + ScrollTrigger + SplitText    | 3.12+    |
| Smooth scroll | Lenis (`lenis`)                   | latest   |
| Language    | TypeScript strict                   | 5.x      |
| Runtime     | Node 20                             |          |
| Deploy      | Netlify (GitHub → build → dist)     |          |

### Dependencias de animación (npm)
```
gsap (con plugins: ScrollTrigger, SplitText, Observer)
lenis (smooth scroll — reemplaza scroll nativo)
```

## 3. Variables de entorno

```env
STORYBLOK_TOKEN=         # API token (preview o published)
PUBLIC_SITE_URL=https://zellety.com
```

## 4. Design tokens

### 4.1 Colores

```
// Primary — Midnight
--z-midnight-950: #0A0F1E;   // fondos hero, footer, nav
--z-midnight-900: #141B33;   // hover sobre midnight
--z-midnight-800: #1E2847;   // bordes sobre midnight
--z-midnight-700: #2A365C;   // texto secundario sobre midnight

// Accent — Electric Lime
--z-lime-400: #BFFF0A;       // CTAs, badges, highlights
--z-lime-500: #A8E600;       // hover sobre lime
--z-lime-600: #8FCC00;       // active/pressed
--z-lime-700: #6B9900;       // texto sobre fondo lime (WCAG AA)

// Surface — Slate
--z-slate-50:  #F7F8FA;      // fondo claro general
--z-slate-100: #E8EBF0;      // fondo tarjetas
--z-slate-300: #C9CED8;      // texto muted
--z-slate-500: #6B7280;      // texto secundario

// Texto
--z-white: #FFFFFF;           // texto principal sobre midnight
--z-black: #0A0F1E;          // texto principal sobre fondos claros (usa midnight, no negro puro)

// Semánticos
--z-success: #10B981;
--z-warning: #F59E0B;
--z-error:   #EF4444;
--z-info:    #3B82F6;
```

### 4.2 Tipografía

```
--font-display: 'Stack Sans Notch', sans-serif;   // h1-h3, hero, nav brand
--font-body: 'Inter', sans-serif;                  // body, UI, párrafos

// Escala (mobile → desktop)
--text-hero:    clamp(2.5rem, 5vw, 4.5rem) / 1.05  font-display  700
--text-h1:      clamp(2rem, 3.5vw, 3rem)   / 1.1   font-display  700
--text-h2:      clamp(1.5rem, 2.5vw, 2rem) / 1.2   font-display  600
--text-h3:      clamp(1.25rem, 2vw, 1.5rem)/ 1.3   font-display  600
--text-body:    1rem / 1.6                           font-body     400
--text-small:   0.875rem / 1.5                       font-body     400
--text-caption:  0.75rem / 1.4                       font-body     500
```

### 4.3 Spacing

```
// Basado en 4px grid
--space-1: 0.25rem;    // 4px
--space-2: 0.5rem;     // 8px
--space-3: 0.75rem;    // 12px
--space-4: 1rem;       // 16px
--space-6: 1.5rem;     // 24px
--space-8: 2rem;       // 32px
--space-12: 3rem;      // 48px
--space-16: 4rem;      // 64px
--space-24: 6rem;      // 96px
--space-32: 8rem;      // 128px — secciones hero
```

### 4.4 Layout

```
--max-width: 1280px;
--container-padding: clamp(1rem, 4vw, 2rem);
--border-radius-sm: 4px;
--border-radius-md: 8px;
--border-radius-lg: 16px;
--border-radius-full: 9999px;

// Breakpoints (mobile-first)
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

## 5. Arquitectura de carpetas

```
src/
├── components/          # Vue islands (interactivos, con estado)
│   ├── ServiceCard.vue
│   ├── ProjectCard.vue
│   ├── ContactForm.vue
│   └── NavMobile.vue
├── sections/            # Astro components (estáticos, sin JS en cliente)
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
│   ├── projects/
│   │   ├── index.astro
│   │   └── [slug].astro
├── lib/
│   ├── storyblok.ts      # Cliente API + tipos TS
│   └── animations.ts     # Helpers GSAP reutilizables
├── styles/
│   ├── tokens.css        # Custom properties del punto 4
│   └── base.css          # Reset + global styles
├── assets/
│   └── fonts/            # Stack Sans Notch (self-hosted)
└── uno.config.ts         # Shortcuts, theme, presets
```

### Reglas de arquitectura

- **sections/** = Astro components puros. NO Vue. Solo markup + props + slots. Se renderizan en build, zero JS al cliente.
- **components/** = Vue islands. Usa `client:visible` o `client:idle`. Solo cuando hay interactividad real (forms, toggles, hover effects complejos, estado).
- **Nunca** `client:load` salvo el nav móvil.
- Un componente Vue que no tiene `ref()`, `computed()`, ni eventos → debería ser una section Astro.
- Imágenes: usar `<Image>` de `astro:assets` con `loading="lazy"` y `decoding="async"`. Formatos: WebP con fallback.

## 6. Storyblok — Content Types

### 6.1 `project`

| Campo          | Tipo           | Requerido | Notas                              |
|---------------|----------------|-----------|-------------------------------------|
| title         | text           | ✓         |                                     |
| slug          | text           | ✓         | URL-safe, auto-generado             |
| summary       | textarea       | ✓         | max 160 chars, para cards y meta    |
| description   | richtext       | ✓         | contenido completo del proyecto     |
| cover_image   | asset (image)  | ✓         | ratio 16:9, min 1200px wide         |
| gallery       | multi-asset    |           | imágenes adicionales                |
| services      | multi-option   | ✓         | web_app, mobile, iot, ux_ui, saas   |
| tech_stack    | tags           |           | ej: "Vue", "Flutter", "Supabase"    |
| client_name   | text           |           |                                     |
| client_logo   | asset (image)  |           | SVG preferido                       |
| url           | link           |           | link al proyecto live               |
| featured      | boolean        |           | mostrar en home (Work section)      |
| published_at  | datetime       | ✓         | para ordenar                        |

### 6.2 `team_member`

| Campo        | Tipo          | Requerido | Notas                    |
|-------------|---------------|-----------|---------------------------|
| name        | text          | ✓         |                           |
| role        | text          | ✓         | ej: "Co-founder & CTO"   |
| bio         | textarea      | ✓         | max 280 chars             |
| photo       | asset (image) | ✓         | ratio 1:1, min 400px     |
| linkedin    | link          |           |                           |
| github      | link          |           |                           |
| order       | number        | ✓         | para ordenar en la grid   |

### 6.3 `service`

| Campo        | Tipo          | Requerido | Notas                         |
|-------------|---------------|-----------|--------------------------------|
| title       | text          | ✓         | ej: "Web App Development"     |
| slug        | text          | ✓         |                                |
| short_desc  | textarea      | ✓         | max 120 chars, para cards      |
| long_desc   | richtext      |           | para página detalle si existe  |
| icon        | text          | ✓         | nombre Iconify: "mdi:web"      |
| order       | number        | ✓         |                                |

### 6.4 TypeScript types (generar en `lib/storyblok.ts`)

```typescript
interface Project {
  title: string;
  slug: string;
  summary: string;
  description: ISbRichtext;
  cover_image: AssetStoryblok;
  gallery?: AssetStoryblok[];
  services: ('web_app' | 'mobile' | 'iot' | 'ux_ui' | 'saas')[];
  tech_stack?: string[];
  client_name?: string;
  client_logo?: AssetStoryblok;
  url?: LinkStoryblok;
  featured: boolean;
  published_at: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: AssetStoryblok;
  linkedin?: LinkStoryblok;
  github?: LinkStoryblok;
  order: number;
}

interface Service {
  title: string;
  slug: string;
  short_desc: string;
  long_desc?: ISbRichtext;
  icon: string;
  order: number;
}
```

## 7. Servicios de Zellety

1. **Web App** — Nuxt, Next, AstroJS. Sites corporativos, e-commerce, plataformas.
2. **App Móvil** — Flutter. iOS y Android desde un solo codebase.
3. **IoT / Domótica** — Automatización de hogares y oficinas inteligentes.
4. **UX/UI** — Diseño en Figma. Research, wireframes, prototipos, design systems.
5. **SaaS** — Plataformas multi-tenant por suscripción. Billing, auth, dashboards.

## 8. Páginas y secciones

### Home (`/`)

| Sección   | Contenido                                       | Source     |
|----------|--------------------------------------------------|------------|
| Hero     | Headline + subline + CTA "Hablemos"              | Hardcoded  |
| About    | Quiénes somos, propuesta de valor                 | Hardcoded  |
| Services | Grid de 5 ServiceCards                            | Storyblok  |
| Work     | 3-4 ProjectCards (featured: true)                 | Storyblok  |
| Team     | Grid de TeamMemberCards                           | Storyblok  |
| Contact  | Netlify Form (nombre, email, mensaje, servicio)   | Hardcoded  |

### Projects (`/projects`)

Grid con todos los proyectos. Filtro por servicio (Vue island). Paginación si >12.

### Project Detail (`/projects/[slug]`)

Cover image full-width, título, descripción richtext, tech stack pills, galería, link al proyecto live, CTA para contacto.

## 9. Motion Design System

Referencias de estilo: museumofmoney.com, sav1n.com, good-fella.com.
Dark-first, scroll-driven, animaciones orquestadas. Cada efecto tiene un propósito narrativo.

### 9.1 Smooth Scroll (Lenis)

```typescript
// lib/lenis.ts — inicializar en BaseLayout.astro
import Lenis from 'lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
});

// Integrar con GSAP ScrollTrigger
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
ScrollTrigger.defaults({ scroller: document.body });

// Respetar preferencia de usuario
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  lenis.destroy();
}
```

### 9.2 Preloader

Inspiración: sav1n.com — counter animado + brand reveal.

```
Secuencia:
1. Fondo midnight-950, counter numérico 0 → 100 (font-display, ~2.5s, ease: power2.inOut)
2. Al llegar a 100: counter hace scale(1.2) → fade out
3. Logo "ZELLETY" se revela con clipPath: inset(0 100% 0 0) → inset(0 0% 0 0) (0.8s)
4. Pausa 0.3s
5. Preloader se desliza hacia arriba con translateY(-100%) (0.6s, ease: power3.inOut)
6. Hero entra con su propia secuencia

Implementación:
- Componente Astro: Preloader.astro (NO Vue island — no necesita reactividad)
- GSAP timeline con label "preloader"
- Se destruye del DOM al completar (element.remove())
- Cookie/sessionStorage para skip en repeat visits (solo muestra logo 0.5s)
```

### 9.3 Hero — Entrada orquestada

```
Timeline "hero" (empieza tras preloader):

t=0.0s  Nav: opacity 0→1, translateY(-20px→0) (0.4s)
t=0.1s  Headline: SplitText por línea, cada línea:
        - clipPath: inset(100% 0 0 0) → inset(0% 0 0 0)
        - translateY(40px→0)
        - stagger: 0.12s entre líneas
        - duration: 0.6s, ease: power3.out
t=0.5s  Subline: opacity 0→1, translateY(20px→0) (0.4s)
t=0.7s  CTA button: opacity 0→1, translateY(20px→0) (0.4s)
t=0.9s  Decorativo: glow lime aparece con scale(0.8→1) + opacity (0.6s)

Background:
- Gradient radial sutil de lime (opacity 0.08) que se mueve lento con mousemove
- O partículas geométricas mínimas (opcional, solo desktop)
```

### 9.4 Scroll Reveals — Secciones

```
Configuración global ScrollTrigger:
- start: "top 85%"
- end: "top 20%"
- scrub: false (triggered, no scrubbed)
- toggleActions: "play none none none"
- Stagger base: 0.08s

Patrones por tipo de elemento:

SECTION TITLE:
  clipPath: inset(0 100% 0 0) → inset(0 0% 0 0)
  duration: 0.8s
  ease: power3.inOut

SECTION SUBTITLE/PARAGRAPH:
  opacity: 0→1, translateY(30px→0)
  duration: 0.5s, delay: 0.2s

CARDS (ServiceCard, ProjectCard, TeamCard):
  opacity: 0→1, translateY(60px→0)
  stagger: 0.1s
  duration: 0.6s
  ease: power2.out

IMAGES:
  scale: 1.1→1 dentro de container con overflow:hidden
  opacity: 0→1
  duration: 0.8s
  ease: power2.out

HORIZONTAL LINE / DIVIDER:
  scaleX: 0→1, transformOrigin: "left center"
  duration: 0.6s
```

### 9.5 Project Cards — Hover interactivo

```
Inspiración: sav1n.com — video preview on hover.

Default state:
  - Cover image visible
  - Título y tech stack visibles

Hover (desktop):
  - Cover image scale(1.05) con transition 0.4s
  - Overlay gradient (midnight → transparent, bottom-up) intensifica
  - Si hay video preview: crossfade image→video (autoplay, muted, loop)
  - Título translateY(-8px)
  - CTA arrow aparece con opacity + translateX

Implementación:
  - Vue island: ProjectCard.vue (client:visible)
  - Video se carga lazy (solo en hover con IntersectionObserver + mouseenter)
  - Fallback para mobile: tap para expandir, no hover
```

### 9.6 Marquee infinito

```
Uso: logos de tech stack o de clientes, entre secciones.

CSS puro (no GSAP para esto):
  - Duplicar contenido para loop seamless
  - animation: marquee Xs linear infinite
  - Velocidad: ~40px/s (ajustar X según ancho del contenido)
  - pause on hover: animation-play-state: paused
  - Gradient fade en los bordes (mask-image)

Estructura:
  <div class="marquee-track">
    <div class="marquee-content">...items...</div>
    <div class="marquee-content" aria-hidden="true">...items duplicados...</div>
  </div>
```

### 9.7 Custom Cursor (solo desktop)

```
Inspiración: good-fella.com — dot que reacciona a contexto.

Default: círculo 8px, borde lime, fondo transparente
Hover interactivo: scale(3), fondo lime con opacity 0.15, mix-blend-mode: difference
Hover CTA: scale(5), texto "Ver" o "→" dentro del cursor
Click: scale rápido 0.8→1

Implementación:
- Componente Astro con JS vanilla (NO Vue — no necesita reactividad)
- position: fixed, pointer-events: none
- Movimiento con GSAP.quickTo() para smoothing
- Se oculta en mobile: @media (hover: none) { display: none }
- data-cursor="grow" en elementos interactivos para trigger
```

### 9.8 Page Transitions

```
Inspiración: good-fella.com — fade entre rutas.

Usando View Transitions API de Astro:
- Wrapper div con fade out (opacity 1→0, 0.3s) + slide up leve
- Nueva página fade in (opacity 0→1, 0.3s) + slide down leve

astro.config:
  experimental: { viewTransitions: true }

En BaseLayout.astro:
  <ViewTransitions />

Fallback para browsers sin soporte: corte directo sin animación.
```

### 9.9 Números animados (counters)

```
Uso: About section (años de experiencia, proyectos completados, etc.)

Implementación con GSAP:
  - ScrollTrigger: animar al entrar en viewport
  - gsap.to(element, { textContent: targetNumber, duration: 2, snap: { textContent: 1 } })
  - Ease: power1.out
  - Formato: Intl.NumberFormat para separadores de miles
```

### 9.10 Performance Rules

```
OBLIGATORIO en toda animación:
- will-change: agregar al START de la animación, REMOVER al completar (onComplete callback)
- Preferir transform y opacity (composited properties) sobre width/height/top/left
- prefers-reduced-motion: @media query + GSAP matchMedia → disable ALL animations
- No GSAP scrub en mobile (causa jank con touch scroll)
- ScrollTrigger.refresh() en window resize y después de lazy load de imágenes
- Videos de preview: max 720p, formato WebM con fallback MP4, preload="none"
- Lenis: destruir en cleanup del componente / route change
- Target: 60fps constante en mid-range Android (test con Chrome DevTools throttle 4x)
```

## 10. SEO y meta

```
- Cada página: <title>, <meta description>, og:title, og:description, og:image
- og:image: 1200x630, generada por página (o default de Zellety)
- Sitemap: generado por @astrojs/sitemap
- robots.txt: generado por Astro
- Schema.org: Organization en home, CreativeWork en projects
- Canonical URLs con PUBLIC_SITE_URL
- Idioma: es-419 (español latinoamericano)
```

## 11. Formulario de contacto

```html
<!-- Netlify Forms -->
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact" />
  <p class="hidden"><input name="bot-field" /></p>
  <!-- campos: name, email, service (select), message -->
</form>
```

- Validación client-side con Vue (island `ContactForm.vue`)
- Feedback visual en submit (loading → success/error)
- Honeypot para spam

## 12. Convenciones de código

### General
- TypeScript strict en todo el proyecto
- Nombres de archivos: kebab-case (`project-card.vue`, `hero-section.astro`)
- Componentes Vue: PascalCase en imports (`import ProjectCard from ...`)
- Props: siempre tipadas con `defineProps<T>()`
- No `any`. Si no puedes tipar algo, usa `unknown` y haz type narrowing.

### UnoCSS
- Usar shortcuts para patrones repetidos (definir en `uno.config.ts`)
- Preferir utilities atómicas sobre `<style>` blocks
- Cuando se necesite CSS custom (animaciones GSAP), usar `<style scoped>` en Vue o `<style>` en Astro
- El theming va en `tokens.css` como custom properties, no como config de UnoCSS

### Vue
- Composition API exclusivamente (`<script setup lang="ts">`)
- No Options API, no mixins, no `this`
- Reactive state: `ref()` para primitivos, `reactive()` para objetos
- `computed()` para valores derivados
- `watch()` solo cuando necesites side effects, no para transformar data
- Emits tipados con `defineEmits<T>()`

### Astro
- Frontmatter para data fetching y lógica de build
- `getStaticPaths()` para rutas dinámicas de Storyblok
- `Astro.props` tipado con interfaces
- `<slot>` para composición en layouts

## 13. Deploy checklist

```
□ STORYBLOK_TOKEN configurado en Netlify env vars
□ Build command: npm run build
□ Publish directory: dist
□ Node version: 20 (en .nvmrc o netlify.toml)
□ Netlify Forms: verificar que el form con data-netlify="true" aparece en el dashboard
□ Redirects: _redirects file si se necesitan
□ Headers: _headers file para cache de assets estáticos
□ Preview deploys: habilitados para PRs
```

## 14. Referencias visuales

| Sitio | Qué tomar | Qué NO tomar |
|-------|-----------|--------------|
| museumofmoney.com | Preloader con counter, horizontal scroll exhibits, marquee de imágenes, sticky sections, tono playful | El mini-juego, la paleta dorada, la densidad de contenido |
| sav1n.com | Counter preloader, blob SVG morph, video hover en cards, numbered sections (01-04), parallax, magnetic cursor | El layout demasiado portfolio personal, la tipografía serif |
| good-fella.com | Dark theme + accent, scroll animations orquestadas, ASCII aesthetic, custom cursor, Lenis smooth scroll, monospace accents | El estilo demasiado minimalista/developer, la falta de color |

### Estilo resultante para Zellety
- **Dark-first** con midnight como fondo dominante
- **Accent lime agresivo** en CTAs, highlights y hover states
- **Scroll storytelling** — cada sección se revela como un acto narrativo
- **Monospace como acento** — usar para labels, counters, metadata (font-mono en UnoCSS)
- **Numbered sections** — "01 / WEB APP", "02 / MOBILE" para servicios
- **Video previews** en project cards (hover desktop)
- **Generoso con el whitespace** — no llenar todo, dejar respirar

## 15. Plan de ejecución — Fases

### Fase 1 — Scaffold + Configuración base

**Prompt:** "Ejecuta la Fase 1 del CLAUDE.md"

Tareas:
1. `npm create astro@latest` con template minimal + TypeScript strict
2. Instalar integraciones: `@astrojs/vue`, `@astrojs/sitemap`, `unocss`, `@unocss/astro`
3. Instalar dependencias: `gsap`, `lenis`, `@iconify/vue`, `@storyblok/astro`
4. Crear estructura de carpetas según sección 5 (components/, sections/, layouts/, lib/, styles/, assets/)
5. Configurar `uno.config.ts` con shortcuts, theme extend con los tokens de la sección 4
6. Crear `styles/tokens.css` con todas las custom properties de la sección 4 (colores, tipografía, spacing, layout)
7. Crear `styles/base.css` con reset + global styles (dark background midnight, font-body, etc.)
8. Crear `BaseLayout.astro` con: html lang="es-419", fonts, meta viewport, tokens.css, base.css, slot
9. Crear `PageLayout.astro` con: BaseLayout + container max-width + slot
10. Crear `.nvmrc` con `20` y `netlify.toml` con build config
11. Crear `astro.config.ts` con todas las integraciones configuradas
12. Verificar que `npm run dev` arranca sin errores

**Entregable:** Proyecto que compila, dev server corriendo, estructura vacía lista.

---

### Fase 2 — Storyblok schemas + cliente TypeScript

**Prompt:** "Ejecuta la Fase 2 del CLAUDE.md"

Tareas:
1. Crear `lib/storyblok.ts` con el cliente API y los tipos TypeScript de la sección 6.4
2. Crear helper functions: `getProjects()`, `getFeaturedProjects()`, `getTeamMembers()`, `getServices()`
3. Crear `lib/types.ts` si se necesita separar interfaces compartidas
4. Configurar `@storyblok/astro` en `astro.config.ts` con el token de entorno
5. Crear archivo `.env.example` con las variables de la sección 3
6. Crear las páginas placeholder: `pages/index.astro`, `pages/projects/index.astro`, `pages/projects/[slug].astro`
7. En `[slug].astro` implementar `getStaticPaths()` consumiendo Storyblok
8. Verificar que el fetch a Storyblok funciona (o documentar que necesita el token real)

**Entregable:** Cliente tipado funcional, páginas que renderizan data de Storyblok (o placeholders tipados).

**Nota:** Si no tienes el STORYBLOK_TOKEN aún, crear mock data local en `lib/mock-data.ts` con la misma shape que los tipos, para poder desarrollar sin el CMS.

---

### Fase 3 — Home: secciones + animaciones

**Prompt:** "Ejecuta la Fase 3 del CLAUDE.md"

Tareas:
1. Crear `Preloader.astro` con la secuencia de la sección 9.2 (counter + logo reveal + slide up)
2. Crear `lib/lenis.ts` con smooth scroll según sección 9.1
3. Crear `lib/animations.ts` con helpers GSAP reutilizables:
   - `revealText(element)` — SplitText + clipPath reveal
   - `fadeInUp(elements, stagger)` — fade + translateY
   - `revealLine(element)` — scaleX horizontal line
   - `animateCounter(element, target)` — número counter
4. Crear `sections/Hero.astro` con la timeline de la sección 9.3
5. Crear `sections/About.astro` con counters animados (sección 9.9)
6. Crear `components/ServiceCard.vue` (client:visible) con numbered layout "01 / WEB APP"
7. Crear `sections/Services.astro` con grid de ServiceCards
8. Crear `components/ProjectCard.vue` (client:visible) con hover interactivo (sección 9.5)
9. Crear `sections/Work.astro` con ProjectCards featured
10. Crear `sections/Team.astro` con grid de team members
11. Crear `components/ContactForm.vue` (client:visible) con Netlify Forms (sección 11)
12. Crear `sections/Contact.astro`
13. Crear custom cursor (sección 9.7) en BaseLayout
14. Crear marquee component (sección 9.6) para tech stack
15. Ensamblar todo en `pages/index.astro` con scroll reveals (sección 9.4)

**Entregable:** Home page completa con todas las secciones, animaciones funcionando, dark theme.

---

### Fase 4 — Páginas dinámicas de proyectos

**Prompt:** "Ejecuta la Fase 4 del CLAUDE.md"

Tareas:
1. Crear `pages/projects/index.astro` con grid de todos los proyectos
2. Crear filtro por servicio como Vue island (client:idle)
3. Implementar paginación si hay >12 proyectos
4. Crear `pages/projects/[slug].astro` con:
   - Cover image full-width con parallax
   - Título + metadata (client, tech stack pills, fecha)
   - Richtext renderizado desde Storyblok
   - Galería de imágenes
   - Link al proyecto live
   - CTA para contacto al final
5. Scroll reveals en ambas páginas
6. Page transitions con View Transitions API (sección 9.8)
7. Breadcrumbs o back navigation

**Entregable:** Flujo completo /projects → /projects/[slug] con datos de Storyblok y transiciones.

---

### Fase 5 — Polish, SEO y deploy

**Prompt:** "Ejecuta la Fase 5 del CLAUDE.md"

Tareas:
1. SEO: implementar todo lo de la sección 10 (meta tags, OG, sitemap, robots.txt, Schema.org)
2. Responsive: revisar todas las secciones en 640px, 768px, 1024px, 1280px
3. Performance:
   - Lighthouse score >90 en todas las categorías
   - Imágenes en WebP con `<Image>` de Astro
   - Fonts con font-display: swap
   - GSAP: verificar reglas de la sección 9.10
   - prefers-reduced-motion: verificar que todas las animaciones se desactivan
4. Netlify config: `_redirects`, `_headers` (cache de assets), netlify.toml final
5. Verificar Netlify Forms funciona en deploy
6. Favicon + apple-touch-icon
7. 404 page custom
8. Verificar con `npm run build` que el SSG genera todas las páginas
9. Test manual del flujo completo: preloader → home → scroll → project → contact

**Entregable:** Sitio listo para producción, deployable a Netlify.

---

### Orden y reglas de ejecución

- Ejecutar en orden: Fase 1 → 2 → 3 → 4 → 5. No saltar fases.
- Cada fase debe compilar sin errores antes de pasar a la siguiente.
- Si una fase necesita algo de una fase posterior (ej: data de Storyblok en Fase 3), usar mock data.
- Hacer `git commit` al completar cada fase con mensaje: "feat: complete phase X — [descripción]"

## 16. Prompt de inicio (para Claude Code)
> Eres el agente de desarrollo de zellety.com. Antes de generar cualquier código, lee CLAUDE.md completo. Sigue la arquitectura, tokens de diseño, schemas de Storyblok y convenciones definidas ahí. Si algo no está cubierto en CLAUDE.md, pregunta antes de asumir.