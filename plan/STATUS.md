# Estado del proyecto — Zellety

> Última actualización: Julio 2026

---

## ✅ Completado

### Base y configuración
- [x] AstroJS 5.x + Vue 3 + UnoCSS + GSAP + Lenis
- [x] Design tokens: colores, tipografía, spacing en `tokens.css`
- [x] Fuentes: Geist (display + body) + Geist Mono (mono)
- [x] Color primario: terracota `#cc6949` — fondo blanco `#ffffff`
- [x] Tema dark/light con anti-FOUC
- [x] Border-radius 0 global (estilo cuadrado)
- [x] Focus/active outline fix para móvil

### Layout
- [x] `BaseLayout.astro` + Lenis smooth scroll + GSAP ScrollTrigger
- [x] `Header.astro` — logo, nav, ThemeToggle, NavMobile
  - [x] Scroll: bg terracota `rgba(204,105,73,0.95)` + texto blanco + shrink a 3rem
  - [x] Dark mode scrolled: mismo efecto terracota
  - [x] Fix focus ring azul en nav links (eliminada clase `focus-ring`)
- [x] `ThemeToggle.vue` — fix: `isDark = ref(false)`, lee `dataset.theme === 'dark'`
- [x] `Footer.astro` — copyright + wordmark ZELLETY gigante

### Secciones Home (`/`)
- [x] Hero — slider dinámico desde Storyblok (`slides[]` en home-settings), 3 slides seed
- [x] Tools — grid 4×4 logos desde Storyblok `tool_list` (fallback: 16 SVGs locales)
- [x] About — texto + counters GSAP animados
- [x] Services — lista horizontal, header editable desde Storyblok (label, title_line1, title_line2)
- [x] Work — grid staggered, header editable (label, title, subtitle, cta_text, cta_url), datos con fallback a mock
- [x] Team — 3 miembros, watermark TEAM, header editable (label, title_line1, title_line2)
- [x] Testimonials — SwiperJS slider con 7 tarjetas, header editable, fix prop syntax JSX
- [x] Contact — formulario Netlify Forms + marquee dinámico N items desde Storyblok

### Páginas
- [x] `/services` — 5 servicios detallados
- [x] `/projects/[slug]` — detalle de proyecto, conectado a Storyblok con fallback
- [ ] `/projects` — grid completo con filtro por servicio (Vue island) ← **pendiente**

### CMS — Storyblok
- [x] `lib/storyblok.ts` — cliente API + tipos TS + helpers
- [x] `lib/mock-data.ts` — 6 proyectos de ejemplo (fallback)
- [x] Token configurado en `.env` y Netlify env vars
- [x] Content types creados: `project`, `team_member`, `service`, `testimonial`, `home_settings`
- [x] Nestable blocks creados: `hero_slide`, `contact_marquee_item`, `tool_item`
- [x] `home-settings` story poblada: slides, section headers, marquee_items (3 seed)
- [x] `getHomeSettings()` usado en: Hero, Services, Work, Team, Testimonials, Contact, Tools
- [x] Seeds disponibles: `seed-section-headers.mjs`, `seed-tools-block.mjs`
- [x] Webhook manual: configurar en Storyblok Settings → `https://api.netlify.com/build_hooks/6a63f25b916759b5691e06e2`

### Animaciones
- [x] GSAP scroll reveals en todas las secciones
- [x] Lenis smooth scroll
- [x] Marquees (Contact, Project detail, Services)
- [x] Animación de entrada Hero (título)

### Responsive / móvil
- [x] Grids de 3 columnas (metadata hero) correctos en móvil
- [x] Footer info bar apilado en móvil
- [x] Card footer (label + título) apilado vertical en móvil

---

## ⬜ Pendiente

### Storyblok — contenido real
- [ ] Poblar `tool_list` en dashboard (subir logos al Asset Library o usar URLs externas)
- [ ] Crear Stories reales en `services/` (reemplazar Lorem ipsum)
- [ ] Crear Stories reales en `team/` con fotos reales
- [ ] Crear Stories reales en `projects/` con imágenes reales
- [x] Webhook Storyblok → Netlify configurado (ID: 201754221537190, activo)

### Contenido real
- [ ] Imágenes reales de proyectos (reemplazar picsum.photos)
- [ ] Fotos reales del equipo
- [ ] Copy real en servicios

### Páginas pendientes
- [ ] `/projects` — grid completo con filtro por servicio (Vue island)

### Antes del launch
- [ ] Formulario de contacto verificado en Netlify dashboard
- [ ] Favicon + apple-touch-icon reales
- [ ] `og:image` real por página (1200×630)
- [ ] Schema.org: `Organization` en home + `CreativeWork` en proyectos
- [ ] Test completo en móvil real (iOS + Android)
- [ ] `pnpm run build` limpio en producción
- [ ] Verificar `/sitemap-index.xml` y `robots.txt` en el build

---

## Archivos clave

| Archivo | Rol |
|---------|-----|
| `plan/storyblok-integration.md` | Plan conexión Storyblok |
| `plan/netlify-deploy.md` | Checklist deploy + Netlify Forms |
| `plan/config-sb.md` | Config completa `@storyblok/astro` |
| `src/lib/storyblok.ts` | Cliente CMS + tipos TS |
| `src/lib/mock-data.ts` | Datos temporales (reemplazar con Storyblok) |
| `src/styles/tokens.css` | Design tokens del proyecto |
| `scripts/seed-section-headers.mjs` | Seed campos de texto de secciones en home-settings |
| `scripts/seed-tools-block.mjs` | Seed block `tool_item` en home-settings |

---

## Bugs resueltos

| Bug | Causa | Fix |
|-----|-------|-----|
| Testimonials no aparecían | `:testimonials="testimonials"` en Astro → string literal | Cambiar a `testimonials={testimonials}` (JSX) |
| Dark mode icono incorrecto | `ref(true)` + `!== 'light'` siempre true | `ref(false)` + `=== 'dark'` |
| Borde azul en nav links | Clase `focus-ring` UnoCSS genera ring azul en `:focus` | Quitar `focus-ring` del header |
