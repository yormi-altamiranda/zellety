# CustomCursor.astro

**Ruta:** `src/components/CustomCursor.astro`
**Montado en:** `BaseLayout.astro` — primer elemento dentro de `<body>`

Cursor personalizado para desktop. Reemplaza el cursor nativo con un punto terracota animado que reacciona al contexto del elemento bajo el mouse.

---

## Comportamiento

| Estado | Tamaño | Apariencia |
|--------|--------|------------|
| Default | 20×20px | Círculo `#cc6949` (terracota), `opacity: 1` |
| Hover en link/botón | 72×72px | Mismo color, `opacity: 0.82`, transición CSS |
| Click (mousedown) | scale 0.72 | Encoge suavemente |
| Release (mouseup) | scale 1 | Vuelve con efecto elástico |
| Fuera de ventana | `opacity: 0` | Invisible |

---

## Implementación

### HTML
```html
<div id="z-cursor" aria-hidden="true"></div>
```

### CSS global (`is:global`)
```css
@media (hover: hover) {
  body { cursor: none; }
  input, textarea, select { cursor: none; }
}
```
Solo oculta el cursor nativo en dispositivos con hover real (no touch).

### Posicionamiento (GSAP)
```js
gsap.set(cursor, { xPercent: -50, yPercent: -50 }); // centrar en el punto
const xTo = gsap.quickTo(cursor, 'x', { duration: 0.45, ease: 'power3' });
const yTo = gsap.quickTo(cursor, 'y', { duration: 0.45, ease: 'power3' });

window.addEventListener('mousemove', (e) => {
  cursor.classList.add('is-visible');
  xTo(e.clientX);
  yTo(e.clientY);
});
```
`gsap.quickTo` crea un tween reutilizable de alta performance para suavizar el movimiento sin crear nuevos tweens en cada frame.

### Detección de elementos interactivos
```js
document.addEventListener('mouseover', (e) => {
  const el = e.target.closest('a, button, [role="button"], [data-cursor]');
  if (el) cursor.classList.add('is-link');
});
document.addEventListener('mouseout', (e) => {
  const el = e.target.closest('a, button, [role="button"], [data-cursor]');
  if (el) cursor.classList.remove('is-link');
});
```
Usa `closest()` para capturar clicks en elementos hijos (ej: `<span>` dentro de `<a>`).

### Click
```js
document.addEventListener('mousedown', () => {
  gsap.to(cursor, { scale: 0.72, duration: 0.1, ease: 'power2.in', overwrite: 'auto' });
});
document.addEventListener('mouseup', () => {
  gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' });
});
```
**IMPORTANTE:** usar `overwrite: 'auto'` (NO `true`). Con `overwrite: true` se cancelan todos los tweens del elemento incluyendo `x` e `y`, congelando el cursor en su posición.

---

## Mobile / touch
```css
@media (hover: none) {
  #z-cursor { display: none; }
}
```
El componente no monta la lógica JS si `(hover: none)` — cero overhead en touch.

---

## Extensión con `data-cursor`
Cualquier elemento puede activar el estado expandido agregando el atributo:
```html
<div data-cursor>Elemento custom</div>
```

---

## Bugs conocidos / resueltos

| Bug | Causa | Fix |
|-----|-------|-----|
| Cursor se congela al hacer click | `overwrite: true` cancelaba tweens `x`/`y` del quickTo | Cambiar a `overwrite: 'auto'` |
