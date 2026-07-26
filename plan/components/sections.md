# Secciones — Astro Components

Todas las secciones son **Astro puro** (zero JS en cliente). El data fetching ocurre en build time (SSG). Cada sección usa el patrón: intenta Storyblok → si falla/vacío → usa fallback hardcoded.

---

## Hero

**Ruta:** `src/sections/Hero.astro`

Slider full-screen (100svh) con múltiples slides y transiciones automáticas.

### Datos (Storyblok)
`getHomeSettings()` → `story.content.slides[]` (array de `HeroSlide`)

### Estructura de un slide
```ts
interface HeroSlide {
  image?: { filename: string; alt?: string }
  headline: string        // "Diseñamos y construimos"
  headline_accent: string // "lo que imaginas." (color lime)
  subline: string         // Texto descriptivo derecha
  cta_1_text?: string
  cta_1_url?: string
  cta_2_text?: string
  cta_2_url?: string
}
```

### Comportamiento
- Imágenes como capas absolutas, `opacity` controlada via JS
- Overlays: oscurecedor + gradiente bottom-up
- Auto-avance cada 4500ms
- Dots de navegación: activo = barra 24×6px lime, inactivo = círculo 6px gris
- Subline en **todos** los slides (no solo el primero)
- Flecha scroll con animación bounce al fondo

### GSAP (entrada)
```
t=0.0s  .hero-headline → opacity 0→1 (0.7s power3.out)
t=0.3s  .hero-subline[slide-0] → opacity 0→1 (0.5s power2.out)
t=0.5s  .hero-ctas → opacity 0→1 (0.4s power2.out)
t=0.6s  #hero-scroll-arrow → opacity 0→0.75 (0.4s)
```

---

## About

**Ruta:** `src/sections/About.astro`

Sección "Quiénes somos" con texto y 3 contadores estadísticos animados.

### Datos
Hardcoded (no Storyblok). Texto, stats y CTAs están en el frontmatter del archivo.

### Layout
- 2 columnas desktop (lg:grid-cols-2)
- Columna izquierda: título 2 líneas (línea 2 en lime), 2 párrafos, CTA button
- Columna derecha: 3 stats con dividers

### Stats (animados con GSAP)
Cada stat: valor numérico (ej: 5), sufijo (ej: "+"), label descriptivo.

### GSAP
- Título: `clipPath inset(0 100%→0%)` — 0.8s power3.inOut
- Stats: `textContent` 0→valor — 2s power1.out, snap enteros
- Activados por ScrollTrigger (`start: 'top 85%'`)

---

## Services

**Ruta:** `src/sections/Services.astro`

Lista de 5 servicios con número secuencial y link a `/services`.

### Datos (Storyblok)
- Header: `getHomeSettings()` → `services_label`, `services_title_line1`, `services_title_line2`
- Servicios: `getServices()` → array de `Service`
- Fallback: 5 servicios hardcoded

### Estructura por servicio
```
/01  Web App          [descripción]  →
/02  App Móvil        [descripción]  →
/03  IoT / Domótica   [descripción]  →
/04  UX/UI            [descripción]  →
/05  SaaS             [descripción]  →
```

### Interacción
- Hover: número + título cambian a `var(--z-primary)` (terracota)
- Flecha `→` se traslada 4px a la derecha
- Link a `/services#[slug]`

### GSAP
- Cada fila: `opacity 0→1, translateY 30→0`, stagger 0.1s

---

## Work

**Ruta:** `src/sections/Work.astro`

Grid de proyectos destacados con cards de imagen.

### Datos (Storyblok)
- Header: `getHomeSettings()` → `work_label`, `work_title`, `work_subtitle`, `work_cta_text`, `work_cta_url`
- Proyectos: `getProjects(featured: true)` → máximo 6
- Fallback: `getFeaturedProjects()` de `mock-data.ts`

### Layout
- 2 columnas staggered: columna derecha con `mt-24` (offset visual)
- Cards: imagen 4:3, label de servicio (lime), título, hover scale

### GSAP
- Cards: `opacity 0→1, translateY 60→0`, stagger 0.1s, power2.out

---

## Team

**Ruta:** `src/sections/Team.astro`

Grid vertical del equipo con fotos y bios.

### Datos (Storyblok)
- Header: `getHomeSettings()` → `team_label`, `team_title_line1`, `team_title_line2`
- Miembros: `getTeamMembers()` → array ordenado por `order`
- Fallback: 3 miembros hardcoded con placeholders

### Layout por miembro
- Foto: aspect 4:5, `mix-blend-mode: luminosity` sobre fondo de color
- Info: bio, nombre, rol, links LinkedIn/GitHub
- Divider entre miembros

### Watermark
`TEAM` vertical, posición absoluta izquierda, solo desktop, font-display 12rem, opacity muy baja.

### GSAP
- Fotos + info: `opacity 0→1, translateY 40→0`, stagger 0.15s

---

## Tools

**Ruta:** `src/sections/Tools.astro`

Sección de herramientas con texto estadístico y banda inclinada de logos en movimiento continuo.

### Datos (Storyblok)
- Textos: `getHomeSettings()` → `tools_count`, `tools_subtitle`, `tools_description`
- Logos: `getHomeSettings()` → `tool_list[]` (array de `tool_item`)
- Fallback: 16 SVGs locales de `src/assets/icons/`

### Layout
- Texto en `container-site`: label, "34+" (grande), subtítulo terracota, descripción
- Banda inclinada **full-width** fuera del container: `rotateZ(-4deg)`, `width: calc(100% + 12vw)`, `margin-left: -6vw`
- Sección con `overflow: hidden` para recortar los extremos de la rotación

### Banda ticker (CSS puro)
- 3 filas: fila 1 y 3 → izquierda (22s/32s), fila 2 → derecha (28s)
- Items triplicados (`[...tools, ...tools, ...tools]`) para loop seamless
- `@keyframes ticker-left`: `translateX(0 → -33.333%)`
- Pause on hover: `.tools-band:hover .ticker-track { animation-play-state: paused }`
- Sin bordes primary — bordes sutiles entre filas con `rgba(255,255,255,0.05)`

### Mobile
- Rotación reducida: `rotateZ(-3deg)`, ancho `calc(100% + 8vw)`
- Logos e iconos más pequeños (22px vs 32px desktop)

### GSAP
- Solo anima el título "34+": `opacity 0→1, translateY 30→0` con ScrollTrigger
- La banda NO usa GSAP para entrada (siempre visible — evita race condition con Lenis)

---

## Testimonials

**Ruta:** `src/sections/Testimonials.astro`

Header + slider Vue de testimonios.

### Datos (Storyblok)
- Header: `getHomeSettings()` → `testimonials_label`, `testimonials_title`
- Slides: `getTestimonials()` → array ordenado por `order`
- Fallback: 7 testimonios hardcoded

### Componente Vue
```astro
<!-- CRÍTICO: sintaxis JSX, no Vue template -->
<TestimonialsSlider testimonials={testimonials} client:visible />
```

### GSAP
- Título: `clipPath inset(0 100%→0%)` — 0.8s power3.inOut

---

## Contact

**Ruta:** `src/sections/Contact.astro`

Formulario de contacto y marquee de datos de contacto.

### Datos (Storyblok)
`getHomeSettings()` → `contact_label`, `contact_title`, `contact_subtitle`, `contact_email`, `contact_zone`, `marquee_items[]`

Fallback: datos hardcoded + 3 items de marquee (Email, Llámanos, WhatsApp).

### Layout
- 2 columnas: izquierda (label, título, subtítulo, metadata email/zona), derecha (`ContactForm.vue`)
- Marquee inferior: N items × 3 repeticiones, 60px font-display uppercase, pause on hover

### Marquee
```css
@keyframes marquee-contact {
  from { transform: translateX(0) }
  to   { transform: translateX(-33.333%) }
}
```
Los items se duplican 3 veces → al completar un ciclo vuelve al inicio sin salto.
