# Documentación de Componentes — Zellety

> Índice de todos los componentes, secciones y layouts del proyecto.

---

## Componentes Astro (UI global)

| Archivo | Descripción |
|---------|-------------|
| [`Header.astro`](./header.md) | Header fijo con nav, ThemeToggle y NavMobile |
| [`Footer.astro`](./footer.md) | Footer con wordmark gigante ZELLETY animado |
| [`CustomCursor.astro`](./custom-cursor.md) | Cursor personalizado desktop — punto terracota con GSAP |

## Componentes Vue (islands interactivos)

| Archivo | Descripción |
|---------|-------------|
| [`ThemeToggle.vue`](./theme-toggle.md) | Toggle dark/light mode |
| [`NavMobile.vue`](./nav-mobile.md) | Menú hamburguesa para móvil |
| [`ContactForm.vue`](./contact-form.md) | Formulario de contacto con validación |
| [`TestimonialsSlider.vue`](./testimonials-slider.md) | Carousel SwiperJS de testimonios |
| [`ToolsSlider.vue`](./tools-slider.md) | Carrusel infinito de logos de herramientas |
| [`ProjectFilter.vue`](./project-filter.md) | Filtro de proyectos por servicio (`/projects`) |

## Secciones Astro (zero JS cliente)

| Archivo | Descripción |
|---------|-------------|
| [`Hero.astro`](./sections.md#hero) | Slider full-screen con slides dinámicos |
| [`About.astro`](./sections.md#about) | Quiénes somos + counters animados |
| [`Services.astro`](./sections.md#services) | Lista de 5 servicios |
| [`Work.astro`](./sections.md#work) | Grid de proyectos |
| [`Team.astro`](./sections.md#team) | Grid del equipo |
| [`Tools.astro`](./sections.md#tools) | Grid 4×4 de herramientas |
| [`Testimonials.astro`](./sections.md#testimonials) | Slider de testimonios |
| [`Contact.astro`](./sections.md#contact) | Formulario + marquee |

## Layouts

| Archivo | Descripción |
|---------|-------------|
| [`BaseLayout.astro`](./layouts.md#baselayout) | HTML base, meta, SEO, Lenis, GSAP |
| [`PageLayout.astro`](./layouts.md#pagelayout) | BaseLayout + container centrado |

## Librería

| Archivo | Descripción |
|---------|-------------|
| [`storyblok.ts`](./lib.md#storyblok) | Cliente API + tipos TypeScript + helpers |
| [`mock-data.ts`](./lib.md#mock-data) | Datos de ejemplo (fallback Storyblok) |
