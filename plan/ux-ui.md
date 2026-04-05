# UX/UI — Design Tokens, Fuentes y UnoCSS

## Colores

```css
/* Primary — Midnight */
--z-midnight-950: #0A0F1E;   /* fondos hero, footer, nav */
--z-midnight-900: #141B33;   /* hover sobre midnight */
--z-midnight-800: #1E2847;   /* bordes sobre midnight */
--z-midnight-700: #2A365C;   /* texto secundario sobre midnight */

/* Accent — Electric Lime */
--z-lime-400: #BFFF0A;       /* CTAs, badges, highlights */
--z-lime-500: #A8E600;       /* hover sobre lime */
--z-lime-600: #8FCC00;       /* active/pressed */
--z-lime-700: #6B9900;       /* texto sobre fondo lime (WCAG AA) */

/* Surface — Slate */
--z-slate-50:  #F7F8FA;      /* fondo claro general */
--z-slate-100: #E8EBF0;      /* fondo tarjetas */
--z-slate-300: #C9CED8;      /* texto muted */
--z-slate-500: #6B7280;      /* texto secundario */

/* Texto */
--z-white: #FFFFFF;           /* texto principal sobre midnight */
--z-black: #0A0F1E;          /* texto principal sobre fondos claros */

/* Semánticos */
--z-success: #10B981;
--z-warning: #F59E0B;
--z-error:   #EF4444;
--z-info:    #3B82F6;
```

> Paleta base: rojo/midnight como primary, blanco y gris para texto, dark para fondo.
> Ver `pallete.jpg` en la raíz para referencia visual.

---

## Fuentes

| Uso | Fuente | Peso |
|-----|--------|------|
| Títulos (h1–h3), hero, nav brand | **Stack Sans Notch** | 600, 700 |
| Body, párrafos, UI | **Inter** | 400, 500 |
| Labels, counters, metadata (acento mono) | **Geist Mono** | 400 |

```css
--font-display: 'Stack Sans Notch', sans-serif;
--font-body: 'Inter', sans-serif;
--font-mono: 'Geist Mono', monospace;
```

### Escala tipográfica (mobile → desktop)

```css
--text-hero:    clamp(2.5rem, 5vw, 4.5rem);   /* line-height: 1.05 / weight: 700 */
--text-h1:      clamp(2rem, 3.5vw, 3rem);      /* line-height: 1.1  / weight: 700 */
--text-h2:      clamp(1.5rem, 2.5vw, 2rem);    /* line-height: 1.2  / weight: 600 */
--text-h3:      clamp(1.25rem, 2vw, 1.5rem);   /* line-height: 1.3  / weight: 600 */
--text-body:    1rem;                           /* line-height: 1.6  / weight: 400 */
--text-small:   0.875rem;                       /* line-height: 1.5  / weight: 400 */
--text-caption: 0.75rem;                        /* line-height: 1.4  / weight: 500 */
```

### Self-hosting Stack Sans Notch

- Archivos en `src/assets/fonts/`
- Declarar con `@font-face` en `styles/base.css`
- `font-display: swap` obligatorio

---

## Spacing (4px grid)

```css
--space-1:  0.25rem;   /*  4px */
--space-2:  0.5rem;    /*  8px */
--space-3:  0.75rem;   /* 12px */
--space-4:  1rem;      /* 16px */
--space-6:  1.5rem;    /* 24px */
--space-8:  2rem;      /* 32px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-24: 6rem;      /* 96px */
--space-32: 8rem;      /* 128px — secciones hero */
```

---

## Layout

```css
--max-width: 1280px;
--container-padding: clamp(1rem, 4vw, 2rem);
--border-radius-sm:   4px;
--border-radius-md:   8px;
--border-radius-lg:   16px;
--border-radius-full: 9999px;
```

**Breakpoints (mobile-first):** `sm: 640px` · `md: 768px` · `lg: 1024px` · `xl: 1280px`

---

## UnoCSS — Configuración y convenciones

### Archivo `uno.config.ts`

- Extender el theme con los tokens de color y tipografía de arriba
- Definir shortcuts para patrones repetidos (ej: `btn-primary`, `section-title`, `container`)
- Presets: `@unocss/preset-uno`, `@unocss/preset-typography`

```ts
// uno.config.ts (estructura base)
import { defineConfig, presetUno, presetTypography } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetTypography()],
  theme: {
    colors: {
      midnight: { 950: '#0A0F1E', 900: '#141B33', 800: '#1E2847', 700: '#2A365C' },
      lime:     { 400: '#BFFF0A', 500: '#A8E600', 600: '#8FCC00', 700: '#6B9900' },
      slate:    { 50: '#F7F8FA', 100: '#E8EBF0', 300: '#C9CED8', 500: '#6B7280' },
    },
    fontFamily: {
      display: ['Stack Sans Notch', 'sans-serif'],
      body:    ['Inter', 'sans-serif'],
      mono:    ['Geist Mono', 'monospace'],
    },
  },
  shortcuts: {
    'btn-primary':    'bg-lime-400 text-midnight-950 font-body font-500 px-6 py-3 rounded-full hover:bg-lime-500 transition-colors',
    'section-title':  'font-display font-700 text-white',
    'container':      'max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]',
    'text-muted':     'text-slate-300',
    'label-mono':     'font-mono text-lime-400 text-sm uppercase tracking-wider',
  },
})
```

### Reglas de uso

- Preferir utilities atómicas sobre `<style>` blocks
- El theming va en `styles/tokens.css` como CSS custom properties, **no** solo como config de UnoCSS
- Para animaciones GSAP usar `<style scoped>` en Vue o `<style>` en Astro
- `font-mono` para: labels de sección ("01 / WEB APP"), counters, metadata, tech stack pills

---

## Motion Design — Referencia rápida

Ver sección completa en `CLAUDE.md §9`. Resumen de principios:

- **Dark-first** — midnight como fondo dominante
- **Accent lime agresivo** — CTAs, highlights, hover states
- **Scroll storytelling** — cada sección se revela como un acto narrativo
- **Generoso con el whitespace** — no llenar todo

Animaciones clave: Preloader counter → Hero orquestado → Scroll reveals → Marquee → Custom cursor
