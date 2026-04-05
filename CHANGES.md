# CHANGES.md — Registro de cambios de sesión

> Todos los cambios realizados sobre la base inicial del proyecto Zellety (web-zellety).

---

## 1. Fix: Proyectos invisibles en la sección Work

**Archivo:** `src/styles/base.css`

**Problema:** La clase `.hidden` tenía `display: none !important`, lo que impedía que `lg:block` pudiera mostrar el contenedor de proyectos en desktop. Ninguna versión (desktop ni mobile) era visible.

**Fix:**
```css
/* Antes */
.hidden { display: none !important; }

/* Después */
.hidden { display: none; }
```

---

## 2. Rediseño completo de la sección Work

**Archivo:** `src/sections/Work.astro`

**Cambios:**
- Cambiado de `getFeaturedProjects()` (3 proyectos) a `getAllProjects()` (6 proyectos)
- Eliminado el efecto fan/overlap de cards
- Nuevo diseño de cards: imagen landscape 560×360px + número `01`–`06` en lime + tech stack pills + título + descripción (2 líneas)
- Desktop: fila horizontal con pin scroll GSAP (se revelan al hacer scroll)
- Mobile: stack vertical con las 6 cards
- Animación entrada: `opacity + translateY` con stagger

**Mock images:** actualizadas a ratio landscape `800×500` en `src/lib/mock-data.ts`

---

## 3. Marquee de contacto

**Archivo:** `src/sections/Contact.astro`

**Cambios:**
- Reemplazado el marquee gigante `HOLA@ZELLETY.COM` por tres links de contacto
- **Contenido:** `EMAIL: INFO@ZELLETY.COM · LLÁMANOS: +58 000 000 000 · WHATSAPP: +58 000 000 000`
- Cada ítem es un `<a>` con su link (`mailto:`, `tel:`, `https://wa.me/`)
- **Fuente:** `font-display` (Stack Sans Notch) + `font-bold` + `uppercase`
- **Tamaño:** 60px
- **Efectos:**
  - Hover en el marquee → se pausa la animación
  - Hover en ítem individual → underline lime que se expande de izquierda a derecha (`width: 0 → 100%`, transition 0.3s)

---

## 4. Página de detalle de proyecto `/projects/[slug]`

**Archivo:** `src/pages/projects/[slug].astro`

**Rediseño completo** inspirado en referencia de template (museumofmoney / sav1n):

### Estructura de la página:
1. **Hero** — fondo midnight + dot grid, fecha en mono, título enorme uppercase, descripción centrada, botón "Vista previa en vivo" (blanco → lime en hover)
2. **Cover image** — full-width, 82vh, sin padding lateral
3. **Metadata grid** — 4 columnas con bordes: AÑO · CLIENTE · CATEGORÍA · STACK
4. **Secciones de contenido** — grid 1+3 cols: "Descripción" label izquierda, texto derecha; "Tecnologías" con pills
5. **MÁS PROYECTOS marquee** — texto grande scrolling con fade en bordes
6. **Grid 2 columnas** — otros proyectos con imagen, título, categoría y flecha animada en hover

**`getStaticPaths`** actualizado para usar `getAllProjects()` del mock data.

---

## 5. Hero — Slider full-screen

**Archivo:** `src/sections/Hero.astro`

**Rediseño completo:**
- 3 slides de fondo (imágenes full-screen `1920×1080`)
- Overlay doble: capa base `rgba(10,15,30,0.62)` + gradiente desde abajo `rgba(10,15,30,0.95→0%)`
- **Contenido siempre abajo** (`justify-end`, `padding-bottom: 80px`):
  - Izquierda: título + CTAs
  - Derecha: descripción + slide dots
- **Título:** `color: #ffffff` hardcoded (no cambia con el tema)
- **Descripción:** `color: rgba(255,255,255,0.65)` hardcoded
- **Slide dots:** pill lime activo, círculo blanco inactivo — clic cambia slide y reinicia timer
- **Auto-advance:** cada 4.5s con crossfade `opacity` de 1s
- **Flecha scroll:** SVG animado con `translateY 0→8px` bounce (1.6s ease-in-out infinite)
- Removido: label "DESIGN · DEV · LATAM"

---

## 6. Sección Testimonios

**Archivo nuevo:** `src/sections/Testimonials.astro`
**Registro en:** `src/pages/index.astro` (entre Team y Contact)

**Estructura:**
- Badge "TESTIMONIOS" con ícono estrella y borde lime sutil
- Titular con `font-display`, subtítulo y CTA "Trabajemos juntos" (botón lime)
- Grid 3 columnas (1 mobile, 2 tablet, 3 desktop) con 6 cards
- Cada card: avatar circular + ícono X/Twitter + 5 estrellas lime + quote + nombre · rol + empresa
- Scroll reveals: título con `clipPath`, cards con stagger `fadeInUp`

**6 testimonios de ejemplo incluidos** (placeholders para reemplazar con datos reales).

---

## 7. Header

**Archivo:** `src/components/Header.astro`

**Cambios:**
- Removido label "DESIGN · DEV · LATAM" del logo
- Logo restaurado a ícono Z + "ZELLETY"
- Nav links → `color` mediante clase `hdr-text` + CSS variable `--hdr-color`
- **Comportamiento de color por estado:**

| Estado | Fondo header | Color texto/iconos |
|--------|--------------|--------------------|
| Sin scroll (sobre hero) | Transparente | `#ffffff` |
| Scrolled — dark theme | `rgba(15,15,15,0.96)` | `#ffffff` |
| Scrolled — light theme | `rgba(239,239,239,0.96)` | `#0A0F1E` (negro) |

- ThemeToggle envuelto en `.hdr-toggle` para heredar el color del header

---

## 8. ThemeToggle

**Archivo:** `src/components/ThemeToggle.vue`

**Cambios:**
- Removido `border: 1px solid var(--z-midnight-700)` del botón
- Cambiado `color: var(--z-white)` → `color: inherit` para heredar `--hdr-color` del header

---

## 9. ToolsSlider — Iconos reales + título

**Archivo:** `src/components/ToolsSlider.vue`

**Cambios:**
- Importado `Icon` de `@iconify/vue`
- Reemplazado SVG placeholder (iniciales en círculo) por `<Icon :icon="tool.icon" />` usando los `simple-icons:xxx` ya definidos en el array `tools`
- Título: color lime (`var(--z-lime-400)`), `font-size: 1rem`, `letter-spacing: 0.22em`

**Para agregar/quitar herramientas** editar el array `tools` en líneas 8–27:
```ts
const tools = [
  { name: 'NombreHerramienta', icon: 'simple-icons:slug-del-icono' },
  // ...
]
```
Buscar slugs en: [simpleicons.org](https://simpleicons.org) o [icon-sets.iconify.design](https://icon-sets.iconify.design/simple-icons/)

---

## 10. Variables de entorno requeridas

```env
STORYBLOK_TOKEN=        # token preview o published de Storyblok
PUBLIC_SITE_URL=https://zellety.com
```

Configurar en Netlify: **Site settings → Environment variables**

---

## Deploy en Netlify

```bash
# 1. Build local (verificar sin errores)
pnpm run build

# 2. Commit y push
git add .
git commit -m "feat: ..."
git push origin main
```

**Configuración Netlify** (ya en `netlify.toml`):
- Build command: `pnpm run build`
- Publish directory: `dist`
- Node version: `20`
- PNPM version: `10`
- Cache headers para `/fonts/*`, `/_astro/*`, `/images/*`

---

## Pendiente (próximas sesiones)

- [ ] Conectar Storyblok cuando el token esté disponible (reemplazar mock data)
- [ ] Imágenes reales de proyectos (reemplazar picsum.photos)
- [ ] Fuente Stack Sans Notch self-hosted en `src/assets/fonts/`
- [ ] Verificar Netlify Forms en dashboard tras primer deploy
- [ ] Números reales de teléfono en Contact marquee
- [ ] Fotos reales de equipo y testimonios
