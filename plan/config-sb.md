# Storyblok — Configuración de Block Library

> Referencia para crear los content types en el dashboard de Storyblok.
> Space region: **EU** · API: `https://api.eu.storyblok.com`

---

## Tipos de field disponibles

| Ícono | Type en UI | Usar para |
|-------|-----------|-----------|
| T | **Text** | Textos cortos, slugs, nombres |
| ¶ | **Textarea** | Textos medianos sin formato (bio, summary) |
| ≡ | **Richtext** | Contenido HTML enriquecido (body, descripciones largas) |
| # | **Number** | Orden, cantidades |
| ✓ | **Boolean** | Flags (featured, active) |
| 📅 | **Date/Time** | Fechas de publicación |
| 🖼 | **Asset** | Una sola imagen o archivo |
| 🖼🖼 | **Multi-Assets** | Galería de imágenes |
| 🔗 | **Link** | URLs internas o externas |
| ○ | **Option** | Select simple (una opción) |
| ☑ | **Multi-Options** | Select múltiple (varias opciones) |
| □ | **Blocks** | Componentes anidados (Nestable blocks) |
| ⊞ | **Table** | Tablas de datos |
| Custom | **Custom** | Campos personalizados |

---

## Block: `project` — Content type

| Field name | Type | Notas |
|-----------|------|-------|
| `title` | Text | Requerido |
| `slug` | Text | Requerido — URL-safe, ej: `plataforma-saas` |
| `summary` | Textarea | Requerido — máx 160 chars, para cards y meta |
| `description` | Richtext | Requerido — contenido completo del proyecto |
| `cover_image` | Asset | Requerido — ratio 16:9, mín 1200px |
| `gallery` | Multi-Assets | Imágenes adicionales del proyecto |
| `services` | Multi-Options | Opciones: `web_app`, `mobile`, `iot`, `ux_ui`, `saas` |
| `tech_stack` | Multi-Options | Opciones: `Vue`, `React`, `Flutter`, `TypeScript`, `Supabase`, `PostgreSQL`, `Next.js`, `Nuxt`, `Node.js`, `Firebase`, `AWS`, `Figma`, etc. |
| `client_name` | Text | Nombre del cliente |
| `client_logo` | Asset | SVG preferido |
| `url` | Link | Link al proyecto live |
| `featured` | Boolean | `true` = mostrar en sección Work del home |
| `published_at` | Date/Time | Requerido — para ordenar cronológicamente |

---

## Block: `team_member` — Content type

| Field name | Type | Notas |
|-----------|------|-------|
| `name` | Text | Requerido |
| `role` | Text | Requerido — ej: `Co-founder & CTO` |
| `bio` | Textarea | Requerido — máx 280 chars |
| `photo` | Asset | Requerido — ratio 1:1, mín 400px |
| `linkedin` | Link | URL completa |
| `github` | Link | URL completa |
| `order` | Number | Requerido — define el orden en la grilla |

---

## Block: `service` — Content type

| Field name | Type | Notas |
|-----------|------|-------|
| `title` | Text | Requerido — ej: `Web App Development` |
| `slug` | Text | Requerido — ej: `web-app` |
| `short_desc` | Textarea | Requerido — máx 120 chars, para cards |
| `long_desc` | Richtext | Para página detalle (opcional) |
| `icon` | Text | Requerido — nombre Iconify, ej: `mdi:web` |
| `order` | Number | Requerido — define el orden en la grilla |

---

## Configuración en `astro.config.mjs`

```js
storyblok({
  accessToken: env.STORYBLOK_TOKEN,
  bridge: false,
  apiOptions: {
    region: 'eu',   // ← IMPORTANTE: el space está en EU
  },
})
```

## Dominio de imágenes

Agregar `a.storyblok.com` en `astro.config.mjs`:
```js
image: {
  domains: ['picsum.photos', 'fastly.picsum.photos', 'a.storyblok.com'],
}
```

---

## Orden de creación en el dashboard

1. Ir a **Block Library** en el sidebar
2. Click **New Block** → elegir **Content type block**
3. Crear en este orden: `service` → `team_member` → `project`
4. Después de crear los blocks, ir a **Content** y crear Stories usando cada block como content type

---

## Stories a crear en Content

| Folder | Story name | Block type | Slug |
|--------|-----------|------------|------|
| `services/` | Web App | service | `web-app` |
| `services/` | App Móvil | service | `mobile` |
| `services/` | IoT / Domótica | service | `iot` |
| `services/` | UX/UI | service | `ux-ui` |
| `services/` | SaaS | service | `saas` |
| `team/` | [Nombre] | team_member | `[nombre]` |
| `projects/` | [Proyecto] | project | `[slug]` |
