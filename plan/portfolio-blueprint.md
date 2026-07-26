# Blueprint — Portafolio Personal

> Plano de arquitectura basado en el stack de Zellety para aplicar en un portafolio personal.
> Stack: AstroJS 5.x (SSG) + Vue 3 islands + Storyblok CMS + UnoCSS + GSAP + Lenis + Netlify

---

## 1. Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Home — hero, about, skills, projects destacados, services, contact |
| `/projects` | Grid completo de proyectos con filtro por categoría |
| `/projects/[slug]` | Detalle de proyecto — cover, descripción richtext, tech stack, link live |
| `/services` | Servicios ofrecidos con descripción larga |
| `/about` | Bio extendida, experiencia, educación, timeline |

---

## 2. Storyblok — Content Types

### `portfolio_settings` (story única, slug: `portfolio-settings`)
Controla todos los textos editables de la home y datos globales.

```
hero_headline        text       "Hola, soy [Nombre]"
hero_accent          text       "Diseñador & Desarrollador"
hero_subline         textarea   Descripción breve
hero_cta_text        text       "Ver proyectos"
hero_cta_url         text       "/projects"
hero_image           asset      Foto personal o ilustración
about_title          text
about_body           richtext   Bio corta (home)
about_cta_text       text
skills_label         text       "//SKILLS"
skills_title         text       "Herramientas que uso"
skills_list[]        tool_item  (nestable — mismo schema que Zellety)
services_label       text
services_title       text
contact_label        text
contact_email        text
contact_title        text
contact_subtitle     text
marquee_items[]      contact_marquee_item  (mismo schema que Zellety)
```

### `project` (carpeta: `projects/`)
```
title            text
slug             text           (auto, URL-safe)
summary          textarea       max 160 chars — para cards y meta
description      richtext       contenido completo
cover_image      asset          ratio 16:9, min 1200px
gallery[]        multi-asset    imágenes adicionales
category         option         web_app | mobile | ux_ui | branding | other
tech_stack[]     tags           ej: "Vue", "Figma", "Supabase"
client_name      text           (opcional)
url              link           link al proyecto live
case_study_url   link           link a caso de estudio (opcional)
featured         boolean        mostrar en home
published_at     datetime
```

### `service` (carpeta: `services/`)
```
title        text
slug         text
short_desc   textarea    max 120 chars — para cards
long_desc    richtext    para página /services detallada
icon         text        nombre Iconify: "mdi:web"
order        number
```

### `experience` (carpeta: `experience/`) — opcional
```
company      text
role         text
period       text        "2022 — Presente"
description  textarea
logo         asset
order        number
```

---

## 3. Nestable Blocks (reusar los de Zellety)

| Block | Uso |
|-------|-----|
| `tool_item` | Skills / herramientas con logo + nombre |
| `contact_marquee_item` | Items del marquee de contacto |

---

## 4. Funciones Storyblok (`lib/storyblok.ts`)

```typescript
getPortfolioSettings()    // → home-settings story
getProjects(options?)     // → todos los proyectos, optional: { featured, category }
getFeaturedProjects()     // → proyectos con featured: true
getProjectBySlug(slug)    // → proyecto individual
getServices()             // → servicios ordenados por order
getExperience()           // → experiencia ordenada por order (opcional)
```

---

## 5. Secciones Home (`sections/`)

### `Hero.astro`
- Foto personal (asset Storyblok) como fondo o al lado
- Headline + accent + subline desde `portfolio_settings`
- CTA → `/projects`
- GSAP entrada: headline clipPath reveal → subline fade → CTA

### `About.astro`
- Texto desde `portfolio_settings.about_body` (richtext)
- Foto opcional
- CTA → `/about`
- GSAP: clipPath reveal en título, fade en párrafo

### `Skills.astro`
- Banda inclinada (mismo patrón Tools de Zellety)
- `rotateZ(-4deg)`, 3 filas ticker CSS
- Logos desde `portfolio_settings.skills_list[]`
- Fondo `#0A0F1E` fijo (dark island)

### `Projects.astro` (home — solo featured)
- Grid 2 columnas staggered (mismo patrón Work de Zellety)
- Cards: cover image 16:9, categoría, título, tech pills
- Hover: scale imagen
- Link → `/projects/[slug]`
- CTA "Ver todos" → `/projects`

### `Services.astro`
- Lista numerada `/01 /02 /03...` (mismo patrón Services de Zellety)
- Hover: número + título cambian a color primary
- Link → `/services#[slug]`

### `Contact.astro`
- Form (Netlify Forms)
- Marquee inferior con email, redes, etc.

---

## 6. Componentes Vue (islands)

| Componente | Client | Función |
|-----------|--------|---------|
| `ContactForm.vue` | `client:visible` | Formulario con validación |
| `ProjectFilter.vue` | `client:idle` | Filtro por categoría en `/projects` |
| `ThemeToggle.vue` | `client:idle` | Dark/light mode |
| `NavMobile.vue` | `client:load` | Menú hamburguesa |

---

## 7. Páginas dinámicas

### `/projects/[slug].astro`
```astro
export async function getStaticPaths() {
  const projects = await getProjects();
  return projects.map(p => ({
    params: { slug: p.slug },
    props: { project: p },
  }));
}
```
Contenido: hero cover full-width, metadata (cliente, tech stack pills, link live), richtext, galería, marquee "MÁS PROYECTOS", CTA contacto.

### `/projects/index.astro`
Grid con todos los proyectos + `ProjectFilter.vue` para filtrar por `category`.

### `/services.astro`
Acordeón o grid con `long_desc` de cada servicio (richtext).

---

## 8. Motion — Patrones a reutilizar de Zellety

| Efecto | Origen en Zellety | Copiar de |
|--------|-------------------|-----------|
| Custom cursor | `CustomCursor.astro` | Copiar tal cual |
| Smooth scroll (Lenis) | `BaseLayout.astro` | Copiar bloque `<script>` |
| Scroll reveals | Cada sección | `gsap.from(el, { opacity:0, y:30, scrollTrigger })` |
| Skills ticker | `Tools.astro` | Copiar CSS + estructura |
| Footer wordmark | `Footer.astro` | `gsap.set(yPercent:110)` + `gsap.to(yPercent:0)` |
| Botones CTA | `base.css` | Copiar `.btn-primary` y `.btn-ghost` |
| Counters | `About.astro` | `gsap.to(el, { textContent: N, snap: {textContent:1} })` |

**Regla crítica cursor:** `overwrite: 'auto'` (nunca `true`) en los tweens de click.
**Regla crítica footer:** siempre `gsap.set` antes del `gsap.to` para yPercent.

---

## 9. Estilos

Copiar de Zellety:
- `styles/tokens.css` → cambiar paleta de colores a la tuya
- `styles/base.css` → reutilizar completo (reset, botones, marquee)
- `uno.config.ts` → reutilizar shortcuts, cambiar colores

Paleta sugerida para portafolio personal: elige 1 accent color y ajusta `--z-primary`.

---

## 10. Deploy checklist

```
□ Crear repo en GitHub
□ pnpm create astro@latest — template minimal + TypeScript strict
□ Instalar: @astrojs/vue, unocss, @unocss/astro, gsap, lenis, @storyblok/astro, @iconify/vue
□ Copiar tokens.css, base.css, uno.config.ts de Zellety y adaptar
□ Crear space en Storyblok (región EU)
□ Crear content types (portfolio_settings, project, service)
□ Crear nestable blocks (tool_item, contact_marquee_item)
□ Crear story portfolio-settings y poblarla
□ STORYBLOK_TOKEN en .env y Netlify env vars
□ PUBLIC_SITE_URL en Netlify env vars
□ Ejecutar seeds si es necesario
□ Configurar webhook Storyblok → Netlify build hook
□ Push main → verificar deploy en Netlify
□ Verificar formulario en Netlify Forms dashboard
```

---

## 11. Estructura de carpetas recomendada

```
web-portfolio/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── CustomCursor.astro      ← copiar de Zellety
│   │   ├── ThemeToggle.vue
│   │   ├── NavMobile.vue
│   │   ├── ContactForm.vue
│   │   └── ProjectFilter.vue
│   ├── sections/
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Skills.astro            ← basado en Tools.astro de Zellety
│   │   ├── Projects.astro          ← basado en Work.astro de Zellety
│   │   ├── Services.astro
│   │   └── Contact.astro
│   ├── layouts/
│   │   └── BaseLayout.astro        ← copiar de Zellety y adaptar
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── services.astro
│   │   └── projects/
│   │       ├── index.astro
│   │       └── [slug].astro
│   ├── lib/
│   │   └── storyblok.ts            ← adaptar de Zellety
│   └── styles/
│       ├── tokens.css
│       └── base.css
├── scripts/
│   └── seed-content.mjs
└── plan/
    └── STATUS.md
```
