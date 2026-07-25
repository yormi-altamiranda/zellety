# Librería — src/lib/

---

## storyblok.ts

**Ruta:** `src/lib/storyblok.ts`

Cliente API de Storyblok con tipos TypeScript y funciones de fetching.

### Tipos primitivos

```ts
AssetStoryblok     // { filename, alt, id, ... }
LinkStoryblok      // { url, target, linktype, ... }
ISbRichtext        // nodo de richtext recursivo
StoryblokStory<T>  // wrapper genérico { id, slug, content: T, ... }
```

### Content types

```ts
Project       // Proyecto: title, slug, cover_image, services[], tech_stack[], featured
TeamMember    // Miembro: name, role, bio, photo, linkedin, github, order
Service       // Servicio: title, slug, short_desc, icon, order
Testimonial   // Testimonio: card_type, name, role, quote?, avatar?, photo?, order
HomeSettings  // Config del home: slides[], todos los headers de sección, tool_list[]
```

### Nestable blocks

```ts
HeroSlide          // Slide del hero: image, headline, headline_accent, subline, ctas
ToolItem           // Herramienta: name, logo (AssetStoryblok)
ContactMarqueeItem // Item marquee: label, value, url
```

### Funciones de fetching

| Función | Descripción |
|---------|-------------|
| `getProjects(featured?)` | Todos los proyectos. Si `featured=true` → solo destacados |
| `getProject(slug)` | Un proyecto por slug. Retorna `null` si no existe |
| `getTeamMembers()` | Todos los miembros ordenados por `order` |
| `getServices()` | Todos los servicios ordenados por `order` |
| `getProjectSlugs()` | Solo slugs (para `getStaticPaths()`) |
| `getHomeSettings()` | Story `home-settings` completa. Retorna `null` si falla |
| `getTestimonials()` | Todos los testimonios ordenados por `order` |

### Configuración API

```ts
version: import.meta.env.DEV ? 'draft' : 'published'
// DEV → draft (ve cambios sin publicar)
// PROD → published (solo contenido publicado)
```

Space region: **EU** (`apiOptions: { region: 'eu' }` en `astro.config.mjs`)

### Helper: getImageUrl

```ts
getImageUrl(asset: AssetStoryblok, options?: { width?, height?, smart? }): string
// Agrega transformaciones de imagen Storyblok
// Ejemplo: getImageUrl(cover, { width: 1200, height: 630, smart: true })
// → "https://a.storyblok.com/f/.../m/1200x630/smart"
```

### SERVICE_LABELS

```ts
const SERVICE_LABELS: Record<ServiceSlug, string> = {
  web_app: 'Web App',
  mobile:  'App Móvil',
  iot:     'IoT / Domótica',
  ux_ui:   'UX/UI',
  saas:    'SaaS',
}
```

---

## mock-data.ts

**Ruta:** `src/lib/mock-data.ts`

Datos de ejemplo que se usan como fallback cuando Storyblok no está disponible o no tiene datos.

### Proyectos mock (6 total)

| Slug | Título | Servicios | Featured |
|------|--------|-----------|---------|
| `tienda-e-commerce` | Tienda E-Commerce | web_app, ux_ui | true |
| `app-domotica` | App Domótica | mobile, iot | true |
| `saas-gestion` | SaaS de Gestión | saas, web_app | true |
| `rediseno-fintech` | Rediseño Fintech | ux_ui, web_app | true |
| `app-fitness` | App Fitness | mobile, ux_ui | false |
| `portal-corporativo` | Portal Corporativo | web_app | false |

Imágenes: `picsum.photos` con seeds para reproducibilidad.

### Funciones exportadas

```ts
getFeaturedProjects(): MockProject[]  // Solo featured = true
getAllProjects(): MockProject[]        // Todos
```

### Cuándo se usa

- `Work.astro` → si `getProjects(featured: true)` falla o retorna vacío
- `[slug].astro` → si `getProject(slug)` retorna `null`
- `projects/index.astro` → si `getProjects()` falla o retorna vacío

### TODO

Reemplazar con datos reales en Storyblok → el mock se vuelve irrelevante automáticamente.
