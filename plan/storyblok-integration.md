# Plan — Conexión Storyblok

> Iniciar con: "Ejecuta el plan de storyblok-integration.md"

## Estado actual

El código ya está listo para recibir datos reales:
- `Work.astro` y `[slug].astro` → intentan Storyblok primero, fallback a mock ✓
- `src/lib/storyblok.ts` → cliente, tipos TS y funciones ya escritas ✓
- Token configurado en `.env` y Netlify (`STORYBLOK_TOKEN=3IwOdVbAwHoMZhBjKuxx6Qtt`) ✓
- `Team.astro` → aún hardcodeado, pendiente de conectar

Lo único que falta: crear los content types en el dashboard y poblar contenido.

---

## Paso 1 — Crear content types en Storyblok dashboard

Ir a **storyblok.com → Content Types → Add**.

### `project`
| Campo | Tipo | Notas |
|-------|------|-------|
| `title` | Text | requerido |
| `summary` | Textarea | max 160 chars, para cards y meta |
| `description` | Richtext | contenido completo |
| `cover_image` | Asset | ratio 16:9, min 1200px |
| `services` | Multi-option | opciones: `web_app` `mobile` `iot` `ux_ui` `saas` |
| `tech_stack` | Tags | ej: "Next.js", "Flutter" |
| `client_name` | Text | |
| `url` | Link | link al proyecto live |
| `featured` | Boolean | mostrar en home (Work section) |
| `published_at` | Datetime | para ordenar |

### `team_member`
| Campo | Tipo | Notas |
|-------|------|-------|
| `name` | Text | requerido |
| `role` | Text | ej: "Co-founder & CTO" |
| `bio` | Textarea | max 280 chars |
| `photo` | Asset | ratio 4:5, min 400px |
| `linkedin` | Link | |
| `order` | Number | para ordenar en la grid |

---

## Paso 2 — Crear carpetas en Content

En **Content → Add Folder**:
- `projects/` → aquí van los proyectos
- `team/` → aquí van los miembros del equipo

---

## Paso 3 — Subir contenido

1. Crear los proyectos en `projects/` con imágenes reales (reemplazar picsum)
2. Marcar `featured: true` en los que van al home (Work section)
3. Crear los miembros del equipo en `team/` con fotos reales

---

## Paso 4 — Actualizar `Team.astro`

Es el único componente que aún usa datos hardcodeados que deberían venir de Storyblok.

```typescript
// src/sections/Team.astro — reemplazar el array hardcodeado por:
import { getTeamMembers } from '../lib/storyblok';

let team = [];
try {
  const stories = await getTeamMembers();
  if (stories.length > 0) {
    team = stories.map(s => ({
      name: s.content.name,
      role: s.content.role,
      bio: s.content.bio,
      img: s.content.photo.filename,
    }));
  }
} catch {}

// Si team está vacío, usar el array hardcodeado actual como fallback
```

---

## Paso 5 — Verificar el build

```bash
pnpm run build
```

Si Storyblok tiene datos, el build los usa automáticamente.
Si no, sigue con mock data. Sin cambios de código necesarios para Work y proyectos.

---

## Orden del día

1. Crear los 2 content types en el dashboard (`project`, `team_member`)
2. Crear carpetas `projects/` y `team/`
3. Subir proyectos con imágenes reales
4. Subir team members con fotos reales
5. Correr `pnpm run build` y verificar que Work section usa datos reales
6. Actualizar `Team.astro` para usar `getTeamMembers()` (Paso 4)
7. Build final y verificar todas las páginas
