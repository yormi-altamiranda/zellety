# APIs y Librerías — Zellety

> Referencia de todas las APIs externas y librerías de terceros usadas en el proyecto.

---

## Storyblok CMS

**Paquete:** `@storyblok/astro`
**API:** Content Delivery v2 · Region: **EU**

### Configuración (`astro.config.mjs`)

```js
import storyblok from '@storyblok/astro'

storyblok({
  accessToken: import.meta.env.STORYBLOK_TOKEN,
  bridge: false,              // desactiva script CDN en producción
  apiOptions: { region: 'eu' },
})
```

### Variables de entorno

```env
STORYBLOK_TOKEN=3IwOdVbAwHoMZhBjKuxx6Qtt   # Content Delivery token
```

### Management API (solo scripts)

```env
SB_SPACE_ID=291639602104988
SB_MANAGEMENT_TOKEN=sb_pat_...
```

Usada en scripts de seed en `scripts/`. NO en el código del sitio.

### Webhook

- **ID:** `201754221537190`
- **URL:** `https://api.netlify.com/build_hooks/6a63f25b916759b5691e06e2`
- **Eventos:** `story.published`, `story.unpublished`, `story.deleted`, `story.moved`
- Dispara rebuild automático en Netlify al publicar contenido.

### Dominio de imágenes

```js
// astro.config.mjs
image: {
  domains: ['picsum.photos', 'fastly.picsum.photos', 'a.storyblok.com'],
}
```

### Patrón de fetching

```ts
// Todas las secciones siguen este patrón:
try {
  const data = await getXxx()  // intenta Storyblok
  if (!data || data.length === 0) throw new Error('empty')
  // usa data
} catch {
  // usa FALLBACK hardcoded
}
```

---

## GSAP (GreenSock Animation Platform)

**Paquete:** `gsap`
**Versión:** 3.12+
**Plugins usados:** `ScrollTrigger`

### Registro de plugins

```ts
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
```

### Configuración global ScrollTrigger

```ts
ScrollTrigger.defaults({
  start: 'top 85%',
  toggleActions: 'play none none none',
})
```

### Patrones de animación usados

```ts
// Título reveal (clipPath)
gsap.from('.title', {
  clipPath: 'inset(0 100% 0 0)',
  duration: 0.8,
  ease: 'power3.inOut',
  scrollTrigger: { trigger: '.title', start: 'top 85%' },
})

// Cards stagger
gsap.from('.card', {
  opacity: 0, y: 60,
  stagger: 0.1,
  duration: 0.6,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.cards-wrap', start: 'top 85%' },
})

// Counter animado
gsap.to(el, {
  textContent: targetValue,
  duration: 2,
  snap: { textContent: 1 },
  ease: 'power1.out',
  scrollTrigger: { trigger: el, start: 'top 85%' },
})
```

### Regla prefers-reduced-motion

```ts
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!prefersReduced) {
  // animaciones GSAP
} else {
  gsap.set(elements, { opacity: 1 }) // mostrar sin animación
}
```

---

## Lenis (Smooth Scroll)

**Paquete:** `lenis`
**Init:** `src/layouts/BaseLayout.astro` (script inline)

```ts
import Lenis from 'lenis'

const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
})

lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

// Desactivar si el usuario prefiere sin animaciones
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  lenis.destroy()
}
```

---

## SwiperJS

**Paquete:** `swiper`
**Usado en:** `TestimonialsSlider.vue`, `ToolsSlider.vue`

### TestimonialsSlider

```ts
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

// Config
modules: [Autoplay]
slidesPerView: 'auto'
spaceBetween: 12
loop: true
autoplay: { delay: 3500, disableOnInteraction: false }
grabCursor: true
```

### ToolsSlider

```ts
// Config — scroll continuo sin pausa
modules: [Autoplay]
slidesPerView: 'auto'
spaceBetween: 48
loop: true
speed: 5000
autoplay: { delay: 0, disableOnInteraction: false }
allowTouchMove: false
```

---

## UnoCSS

**Paquete:** `unocss`, `@unocss/astro`
**Config:** `uno.config.ts`

### Shortcuts definidos

```ts
shortcuts: {
  'container-site':  'max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]',
  'section-padding': 'py-[var(--space-24)]',
  'label-mono':      'font-mono text-xs tracking-widest uppercase',
  'btn-primary':     'bg-[var(--z-primary)] text-white font-body font-medium px-6 py-3 ...',
  'btn-ghost':       'border border-white/30 text-white font-body font-medium px-6 py-3 ...',
}
```

### Notas

- Usar utilities atómicas > `<style>` blocks cuando sea posible
- CSS custom (animaciones, transforms complejos) → `<style>` en el componente
- Tokens de color definidos en `styles/tokens.css` como CSS custom properties (no como config de UnoCSS)

---

## Iconify

**Paquete:** `@iconify/vue`
**Usada en:** `ToolsSlider.vue` (4 íconos)

```vue
<script setup>
import { Icon } from '@iconify/vue'
</script>

<template>
  <Icon icon="logos:vue" width="28" height="28" />
  <Icon icon="logos:react" width="28" height="28" />
  <Icon icon="logos:nestjs" width="28" height="28" />
  <Icon icon="logos:woocommerce-icon" width="28" height="28" />
</template>
```

---

## Netlify Forms

**Sin paquete** — funcionalidad nativa de Netlify.

### Requisito

El form debe estar en el **HTML estático generado por el build** (no generado por JS en runtime). Como Astro es SSG, esto se cumple automáticamente.

### Configuración

```html
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact" />
  <p class="hidden"><input name="bot-field" /></p>
  <!-- campos -->
</form>
```

### Submit via JS (ContactForm.vue)

```ts
const body = new URLSearchParams({
  'form-name': 'contact',
  name: form.name,
  email: form.email,
  service: form.service,
  message: form.message,
}).toString()

await fetch('/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body,
})
```

### Verificación

Después del primer deploy → Netlify Dashboard → Forms → "contact" debe aparecer listado.

---

## Scripts de seed (Storyblok Management API)

Scripts en `scripts/` para poblar Storyblok via Management API. Solo se corren manualmente, no son parte del build.

| Script | Qué hace |
|--------|---------|
| `seed-storyblok.mjs` | Crea content types base en Storyblok |
| `seed-home.mjs` | Puebla home-settings con datos iniciales |
| `seed-about.mjs` | Puebla sección About |
| `seed-hero-slides.mjs` | Crea slides del hero en home-settings |
| `seed-section-headers.mjs` | Crea `contact_marquee_item`, agrega campos de headers a home-settings |
| `seed-tools-block.mjs` | Crea `tool_item`, agrega `tool_list` a home-settings |
| `seed-tools-content.mjs` | Sube 16 SVGs al Asset Library y puebla tool_list |
| `seed-tools-text.mjs` | Actualiza textos de la sección Tools |

### Uso

```bash
node --env-file=.env scripts/seed-xxx.mjs
```

Requiere `SB_SPACE_ID` y `SB_MANAGEMENT_TOKEN` en `.env`.
