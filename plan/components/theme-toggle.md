# ThemeToggle.vue

**Ruta:** `src/components/ThemeToggle.vue`
**Tipo:** Vue 3 island — `client:load`

---

## Qué hace

Botón que alterna entre modo claro y oscuro. Persiste la preferencia en `localStorage`.

## Estado

```ts
const isDark = ref(false) // default: light mode

onMounted(() => {
  // Lee el tema activo al montar el componente
  isDark.value = document.documentElement.dataset.theme === 'dark'
})
```

## Lógica del toggle

```ts
function toggle() {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.dataset.theme = theme
  localStorage.setItem('zellety-theme', theme)
}
```

## Íconos

- **Light (isDark = false):** Ícono sol ☀️ (SVG inline)
- **Dark (isDark = true):** Ícono luna 🌙 (SVG inline)

## Anti-FOUC

El tema inicial se aplica **antes de que Vue monte** mediante un script inline en `BaseLayout.astro`:

```html
<script>
  const t = localStorage.getItem('zellety-theme')
  if (t === 'dark') document.documentElement.dataset.theme = 'dark'
</script>
```

Si el usuario no tiene preferencia guardada → no se aplica ningún `data-theme` → modo claro (default en CSS).

## Notas importantes

- `isDark` arranca en `false` (no `true`) — el estado real se lee en `onMounted`
- La condición es `=== 'dark'` (no `!== 'light'`), para evitar falsos positivos cuando no hay preferencia guardada
- Color heredado del parent via `color: inherit` — el Header lo controla con `--hdr-color`
