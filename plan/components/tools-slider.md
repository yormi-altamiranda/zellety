# ToolsSlider.vue

**Ruta:** `src/components/ToolsSlider.vue`
**Tipo:** Vue 3 island — `client:visible`

---

## Qué hace

Carrusel infinito de logos de herramientas tecnológicas. Desplazamiento automático constante sin pausa.

## Configuración SwiperJS

```js
modules: [Autoplay]
slidesPerView: 'auto'
spaceBetween: 48
loop: true
speed: 5000           // velocidad de transición (ms)
autoplay: {
  delay: 0,           // sin pausa entre slides
  disableOnInteraction: false
}
allowTouchMove: false // no arrastrable
```

## Herramientas incluidas (34 total)

**SVGs locales** (en `src/assets/icons/`):
WordPress, Astro, Next.js, Nuxt, Figma, VS Code, Cloudflare, Docker, Elementor, Git, GitLab, Google Cloud, Lovable, n8n, Netlify, Storybook, Affinity Designer, Affinity Photo, Affinity Publisher, Azure, Firebase, Flutter, PostgreSQL, Supabase, Webflow, AWS, Framer, GitHub, Vercel

**Iconify** (via `@iconify/vue`):
WooCommerce, Vue.js, React, NestJS

## Efecto visual

- Cada slide: logo en escala de grises con `opacity: 0.5`
- Hover: `opacity: 1`, sin escala de grises (`filter: none`)
- Mask-image en los bordes izquierdo/derecho para fade de entrada/salida

## Notas

- Este componente usa datos **hardcodeados** (no Storyblok) porque los íconos son estáticos
- La sección `Tools.astro` tiene su propio grid estático con datos de Storyblok — son componentes separados
- `ToolsSlider.vue` aparece como **cintillo** entre secciones (no como el grid 4×4)
