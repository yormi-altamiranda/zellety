# MCP Tools — Herramientas de desarrollo usadas

Registro de los MCP (Model Context Protocol) servers utilizados durante el desarrollo de Zellety para debugging, inspección y automatización.

---

## Playwright MCP

**Uso:** Inspección de la UI en browser headless durante desarrollo.

### Para qué se usó
- Tomar screenshots del sitio en localhost para verificar cambios visuales
- Ejecutar JavaScript en el contexto del browser (`browser_evaluate`) para inspeccionar estilos computados, dimensiones de elementos y estado GSAP
- Depurar animaciones que no disparaban (ScrollTrigger, opacity, transform)
- Navegar a secciones específicas y verificar comportamiento responsive

### Comandos más usados
```
browser_navigate      → navegar a localhost:4321
browser_take_screenshot → captura PNG del viewport actual
browser_evaluate      → ejecutar JS en el contexto de la página
browser_snapshot      → dump del árbol de accesibilidad (YAML)
```

### Archivos temporales generados
- `.playwright-mcp/*.png` — screenshots temporales
- `.playwright-mcp/*.yml` — snapshots de accesibilidad
- `.playwright-mcp/*.log` — logs de consola

**Estos archivos están en `.gitignore` y se borran al terminar la sesión.**

### Casos de debugging resueltos con Playwright

| Problema | Cómo se diagnosticó |
|----------|---------------------|
| Footer wordmark invisible | `browser_evaluate` reveló `inline_transform: "translate(0px, 257.4px)"` — GSAP tenía `y` en pixels, `yPercent` no animaba |
| Cursor congelado | Screenshot + evaluate mostraron que `overwrite:true` mataba los tweens de posición |
| Tools band invisible | `getBoundingClientRect()` mostró `opacity: 1` pero `h: 325px` vs wrap `h: 180px` — la banda estaba siendo recortada por `overflow:hidden` |
| Botones CTA sin efecto hover | Computed styles confirmaron `background-image: linear-gradient(...)`, `background-position: 0% 50%` — el CSS estaba correcto, efecto es hover-only |

---

## Claude Code (CLI)

**Uso:** Agente principal de desarrollo — edición de código, refactoring, debugging.

### Capacidades utilizadas
- Lectura y edición de archivos (`Read`, `Edit`, `Write`)
- Búsqueda en el codebase (`Glob`, `Grep`)
- Ejecución de comandos shell (`Bash`) — git, curl, node scripts
- Gestión de memoria persistente entre sesiones (`MEMORY.md`)

---

## Storyblok Management API (via curl/scripts)

No es un MCP pero se usó directamente para:
- Verificar si las stories ya existían antes de re-ejecutar seeds
- Consultar cantidad de items en cada carpeta (`projects/`, `team/`, `services/`, `testimonials/`)

```bash
curl -s "https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories/?starts_with=projects/" \
  -H "Authorization: ${SB_MANAGEMENT_TOKEN}"
```

---

## Nota sobre WordPress Studio MCP

Durante el desarrollo se intentó usar el MCP de WordPress Studio para inspección visual, pero fue descartado a favor del Playwright MCP que da acceso directo al browser con más control sobre el DOM y los estilos computados.
