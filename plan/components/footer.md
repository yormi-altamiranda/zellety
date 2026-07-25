# Footer.astro

**Ruta:** `src/components/Footer.astro`
**Tipo:** Astro component (estático, zero JS)

---

## Qué hace

Footer del sitio con barra de info y wordmark gigante decorativo.

## Estructura

```
<footer>
  <!-- Barra superior -->
  <div> "Diseñado por Zellety" | "Copyright © {year} Zellety..." </div>

  <!-- Wordmark gigante -->
  <div style="font-size: 19.5vw"> ZELLETY </div>
</footer>
```

## Notas

- Año calculado dinámicamente en el frontmatter: `new Date().getFullYear()`
- Wordmark tiene `overflow: hidden` para que se corte en el borde inferior — efecto visual intencional
- Fondo: `var(--z-midnight-950)` (#0A0F1E)
- Texto: `var(--z-white)` (#FFFFFF)
