# TestimonialsSlider.vue

**Ruta:** `src/components/TestimonialsSlider.vue`
**Tipo:** Vue 3 island — `client:visible`

---

## Qué hace

Carousel horizontal de tarjetas de testimonios. Usa SwiperJS con autoplay.

## Props

```ts
defineProps<{
  testimonials: TestimonialItem[]
}>()

interface TestimonialItem {
  card_type: 'quote' | 'photo'
  name: string
  role: string
  quote?: string
  avatar?: string
  photo?: string
}
```

## Tipos de tarjeta

### `quote` — Tarjeta de cita
- Fondo claro (`--z-slate-100`)
- Comillas gigantes en terracota
- Texto de la cita
- Avatar circular + nombre + rol

### `photo` — Tarjeta fotográfica
- Imagen a full (ratio 3:4 aprox.)
- Gradient overlay bottom-up
- Nombre + rol sobre la imagen
- Avatar circular en esquina

## Configuración SwiperJS

```js
modules: [Autoplay]
slidesPerView: 'auto'    // ancho automático por slide
spaceBetween: 12
loop: true
autoplay: { delay: 3500, disableOnInteraction: false }
grabCursor: true
```

Cada slide tiene `width: 300px` fijo via CSS.

## Datos

Cargados en `Testimonials.astro` (Astro, server-side):
1. Intenta `getTestimonials()` de Storyblok
2. Si falla o está vacío → usa `FALLBACK` array de 7 items

## Nota crítica de prop syntax

El prop debe pasarse con **sintaxis JSX** en Astro:
```astro
<!-- CORRECTO -->
<TestimonialsSlider testimonials={testimonials} client:visible />

<!-- INCORRECTO — pasa "testimonials" como string literal -->
<TestimonialsSlider :testimonials="testimonials" client:visible />
```
