# APIs y Librerías — Instalación y Configuración

## Variables de entorno

```env
# .env.local (no commitear)
STORYBLOK_TOKEN=         # API token preview o published
PUBLIC_SITE_URL=https://zellety.com
```

Crear `.env.example` en el repo con las keys vacías.

---

## Storyblok (CMS Headless)

### Instalación

```bash
npm install @storyblok/astro
```

### Configuración en `astro.config.ts`

```ts
import storyblok from '@storyblok/astro'

export default defineConfig({
  integrations: [
    storyblok({
      accessToken: import.meta.env.STORYBLOK_TOKEN,
      apiOptions: { region: 'us' }, // o 'eu' según el space
    }),
  ],
})
```

### Cliente y tipos — `src/lib/storyblok.ts`

```ts
import StoryblokClient from 'storyblok-js-client'

const Storyblok = new StoryblokClient({
  accessToken: import.meta.env.STORYBLOK_TOKEN,
  cache: { clear: 'auto', type: 'memory' },
})

// Helper functions
export async function getFeaturedProjects() { /* ... */ }
export async function getProjects() { /* ... */ }
export async function getTeamMembers() { /* ... */ }
export async function getServices() { /* ... */ }
```

### Content Types

#### `project`
| Campo | Tipo | Requerido |
|-------|------|-----------|
| title | text | ✓ |
| slug | text | ✓ |
| summary | textarea | ✓ — max 160 chars |
| description | richtext | ✓ |
| cover_image | asset | ✓ — 16:9, min 1200px |
| gallery | multi-asset | |
| services | multi-option | ✓ — web_app, mobile, iot, ux_ui, saas |
| tech_stack | tags | |
| client_name | text | |
| client_logo | asset | |
| url | link | |
| featured | boolean | |
| published_at | datetime | ✓ |

#### `team_member`
| Campo | Tipo | Requerido |
|-------|------|-----------|
| name | text | ✓ |
| role | text | ✓ |
| bio | textarea | ✓ — max 280 chars |
| photo | asset | ✓ — 1:1, min 400px |
| linkedin | link | |
| github | link | |
| order | number | ✓ |

#### `service`
| Campo | Tipo | Requerido |
|-------|------|-----------|
| title | text | ✓ |
| slug | text | ✓ |
| short_desc | textarea | ✓ — max 120 chars |
| long_desc | richtext | |
| icon | text | ✓ — nombre Iconify ej: "mdi:web" |
| order | number | ✓ |

> Sin `STORYBLOK_TOKEN`: usar `src/lib/mock-data.ts` con la misma shape para desarrollo local.

---

## SwiperJS (Carrusel de herramientas)

### Instalación

```bash
npm install swiper
```

### Uso en el cintillo de logos (ToolsSlider)

```vue
<!-- components/ToolsSlider.vue — client:visible -->
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
</script>

<template>
  <Swiper
    :modules="[Autoplay]"
    :slides-per-view="'auto'"
    :space-between="40"
    :loop="true"
    :autoplay="{ delay: 0, disableOnInteraction: false }"
    :speed="3000"
  >
    <SwiperSlide v-for="tool in tools" :key="tool.name">
      <img :src="tool.icon" :alt="tool.name" />
    </SwiperSlide>
  </Swiper>
</template>
```

> Alternativa más liviana: marquee CSS puro (ver `CLAUDE.md §9.6`) — preferirla si no se necesita interacción touch.

---

## Iconos — Iconify + svgl.app

### Instalación

```bash
npm install @iconify/vue
```

### Uso en Vue

```vue
<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <Icon icon="mdi:web" class="text-lime-400 text-2xl" />
</template>
```

### Logos de herramientas (desde svgl.app)

Para el cintillo/carrusel de tools, usar SVGs de [svgl.app](https://svgl.app/):

| Herramienta | Slug en svgl |
|-------------|-------------|
| WordPress | wordpress |
| WooCommerce | woocommerce |
| Elementor | elementor |
| Webflow | webflow |
| AstroJS | astro |
| VueJS | vue |
| ReactJS | react |
| NextJS | nextjs |
| NuxtJS | nuxt |
| NestJS | nestjs |
| Supabase | supabase |
| PostgreSQL | postgresql |
| Netlify | netlify |
| Vercel | vercel |
| Cloudflare | cloudflare |
| Google Cloud | google-cloud |
| Figma | figma |
| Flutter | flutter |

Descargar SVGs y guardar en `src/assets/icons/tools/`. No usar CDN en producción.

---

## Fuentes — Stack Sans Notch (self-hosted)

1. Descargar archivos de fuente (.woff2 mínimo) → `src/assets/fonts/`
2. Declarar en `src/styles/base.css`:

```css
@font-face {
  font-family: 'Stack Sans Notch';
  src: url('/fonts/stack-sans-notch-700.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

@font-face {
  font-family: 'Stack Sans Notch';
  src: url('/fonts/stack-sans-notch-600.woff2') format('woff2');
  font-weight: 600;
  font-display: swap;
}
```

3. **Geist Mono**: disponible en Google Fonts o via `npm install geist`

```bash
npm install geist
```

```ts
// astro.config.ts o BaseLayout.astro
import { GeistMono } from 'geist/font/mono'
```

---

## GSAP (Animaciones)

```bash
npm install gsap
```

Plugins a registrar en `src/lib/animations.ts`:

```ts
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Observer } from 'gsap/Observer'

gsap.registerPlugin(ScrollTrigger, SplitText, Observer)
```

> SplitText requiere licencia GSAP Club. Verificar antes de usar en producción.

---

## Lenis (Smooth Scroll)

```bash
npm install lenis
```

Inicializar en `src/lib/lenis.ts` e importar en `BaseLayout.astro`. Ver `CLAUDE.md §9.1` para configuración completa.
