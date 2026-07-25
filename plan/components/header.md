# Header.astro

**Ruta:** `src/components/Header.astro`
**Tipo:** Astro component (estático) con dos Vue islands embebidos

---

## Qué hace

Header fijo en la parte superior del sitio. Cambia de color según scroll y tema activo.

## Comportamiento

| Estado | Fondo | Texto |
|--------|-------|-------|
| Default (sin scroll) | Transparente | `#191919` (light) / `#ffffff` (dark o `body.dark-hero`) |
| Scrolled > 20px | `rgba(204, 105, 73, 0.95)` terracota | `#ffffff` |
| Scrolled + dark mode | `rgba(204, 105, 73, 0.95)` terracota | `#ffffff` |

Al hacer scroll también **reduce altura** del inner div de `h-16/md:h-20` a `3rem`.

## Estructura

```
<header #site-header>
  <div #site-header-inner>
    Logo (Zellety)
    Nav desktop (hidden md:flex) → links a anchors del home
    ThemeToggle (hidden md:flex)         ← Vue island client:load
    [Mobile] ThemeToggle + NavMobile     ← Vue islands client:load
  </div>
</header>
```

## Links de navegación

```js
{ href: '/#nosotros',  label: 'Nosotros' }
{ href: '/#servicios', label: 'Servicios' }
{ href: '/#works',     label: 'Portafolio' }
{ href: '/#equipo',    label: 'Equipo' }
{ href: '/#contacto',  label: 'Contacto' }
```

## CSS variables

- `--hdr-color` → color de texto del header (hereda texto y ThemeToggle)
- `.hdr-text` → elementos de texto (logo, nav links)
- `.hdr-toggle` → wrapper de ThemeToggle y NavMobile

## Scroll JS (vanilla, inline)

```js
const onScroll = () => {
  if (window.scrollY > 20) header.classList.add('is-scrolled')
  else header.classList.remove('is-scrolled')
}
window.addEventListener('scroll', onScroll, { passive: true })
```

## Notas importantes

- **No usar `focus-ring`** en links del header — UnoCSS genera borde azul en `:focus`. El `base.css` maneja `:focus-visible` con terracota.
- `client:load` permitido aquí (excepción a la regla) para ThemeToggle y NavMobile porque son críticos para el layout.
