# Layouts

---

## BaseLayout

**Ruta:** `src/layouts/BaseLayout.astro`

Layout maestro. Toda página del sitio lo usa (directamente o via PageLayout).

### Props

```ts
interface Props {
  title: string
  description?: string
  ogImage?: string
  canonical?: string
  darkHero?: boolean   // true en home → body.dark-hero → header texto blanco al inicio
}
```

### Estructura

```html
<html lang="es-419">
  <head>
    <!-- Anti-FOUC: lee localStorage ANTES de pintar -->
    <script>
      const t = localStorage.getItem('zellety-theme')
      if (t === 'dark') document.documentElement.dataset.theme = 'dark'
    </script>

    <!-- Meta / SEO -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="..." />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonical} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:locale" content="es_419" />
    <meta property="og:site_name" content="Zellety" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    ...

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>

  <body class:list={[darkHero && 'dark-hero']}>
    <Header />
    <slot />
    <Footer />
  </body>
</html>
```

### Lenis + GSAP (script inline)

```ts
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({ duration: 1.2, smoothWheel: true })

lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

// Respeta preferencia del usuario
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  lenis.destroy()
}
```

### Tema dark/light

El CSS en `tokens.css` define variables para ambos modos:
```css
:root { --z-bg: #ffffff; --z-text: #191919; ... }
[data-theme="dark"] { --z-bg: #1c1814; --z-text: #f7f3ea; ... }
```

---

## PageLayout

**Ruta:** `src/layouts/PageLayout.astro`

Envuelve BaseLayout con un `<main>` centrado con padding. Usado en páginas internas (no en Home que maneja su propio layout).

### Props

Mismas que BaseLayout (`title`, `description`, `ogImage`, `canonical`).

### Estructura

```astro
<BaseLayout {title} {description} {ogImage} {canonical}>
  <main class="container-site py-24">
    <slot />
  </main>
</BaseLayout>
```

### Uso

```astro
---
import PageLayout from '../layouts/PageLayout.astro'
---
<PageLayout title="Proyectos — Zellety">
  <!-- contenido de la página -->
</PageLayout>
```
