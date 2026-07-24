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
- [x] `Header.astro` — logo "Zellety" texto, nav, ThemeToggle, NavMobile móvil
- [x] `Footer.astro` — copyright + wordmark ZELLETY gigante

### Secciones Home (`/`)
- [x] Hero — slider 3 imágenes full-screen
- [x] Tools — grid 4×4 de 34 íconos (SVG locales + Iconify)
- [x] About — texto + counters GSAP animados
- [x] Services — lista horizontal, cada fila linkea a `/services#slug`
- [x] Work — grid 2 columnas staggered, datos con fallback a mock
- [x] Team — 3 miembros hardcodeados (pendiente Storyblok)
- [x] Testimonials — SwiperJS slider con 7 tarjetas mixtas
- [x] Contact — formulario Netlify Forms

### Páginas
- [x] `/services` — 5 servicios detallados con Lorem ipsum (placeholder Storyblok)
- [x] `/projects/[slug]` — detalle de proyecto, conectado a Storyblok con fallback

### CMS y datos
- [x] `lib/storyblok.ts` — cliente API + tipos TS + helper functions
- [x] `lib/mock-data.ts` — 6 proyectos de ejemplo
- [x] `Work.astro` — intenta Storyblok, fallback automático a mock
- [x] `[slug].astro` — getStaticPaths con Storyblok, fallback a mock + renderRichText
- [x] Token configurado en `.env` y Netlify env vars

### Responsive / móvil
- [x] Grids de 3 columnas (metadata hero) correctos en móvil
- [x] Footer info bar apilado en móvil
- [x] Card footer (label + título) apilado vertical en móvil

### Animaciones
- [x] GSAP scroll reveals en todas las secciones
- [x] Lenis smooth scroll
- [x] Marquees (Contact, Project detail, Services)
- [x] Animación de entrada Hero (título)

---

## ⬜ Pendiente

### Storyblok — prioridad inmediata
> Ver `plan/storyblok-integration.md` para el plan detallado

- [ ] Crear content type `project` en dashboard
- [ ] Crear content type `team_member` en dashboard
- [ ] Crear carpetas `projects/` y `team/` en Content
- [ ] Subir proyectos reales con imágenes reales
- [ ] Subir team members con fotos reales
- [ ] Conectar `Team.astro` a `getTeamMembers()`

### Contenido real
- [ ] Imágenes reales de proyectos (reemplazar picsum.photos)
- [ ] Fotos reales del equipo
- [ ] Copy real en `/services` (reemplazar Lorem ipsum vía Storyblok)

### Páginas pendientes
- [ ] `/projects` — grid completo con filtro por servicio (Vue island)

### Antes del launch
- [ ] Formulario de contacto verificado en Netlify dashboard
- [ ] Favicon + apple-touch-icon reales
- [ ] `og:image` real por página (1200×630)
- [ ] Schema.org: `Organization` en home + `CreativeWork` en proyectos
- [ ] Test completo en móvil real (iOS + Android)
- [ ] `pnpm run build` sin errores en producción
- [ ] Verificar `/sitemap-index.xml` y `robots.txt` en el build

---

## Archivos clave

| Archivo | Rol |
|---------|-----|
| `plan/storyblok-integration.md` | Plan conexión Storyblok (mañana) |
| `plan/netlify-deploy.md` | Checklist deploy + Netlify Forms |
| `src/lib/storyblok.ts` | Cliente CMS + tipos TS |
| `src/lib/mock-data.ts` | Datos temporales (reemplazar con Storyblok) |
| `src/styles/tokens.css` | Design tokens reales del proyecto |
