# NavMobile.vue

**Ruta:** `src/components/NavMobile.vue`
**Tipo:** Vue 3 island — `client:load`

---

## Qué hace

Menú hamburguesa para móvil. Solo visible en pantallas < `md` (768px). El botón se anima de ☰ a ✕ al abrirse.

## Props

```ts
defineProps<{
  links: { href: string; label: string }[]
}>()
```

Los links vienen desde `Header.astro`:
```js
[
  { href: '/#nosotros',  label: 'Nosotros' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#works',     label: 'Portafolio' },
  { href: '/#equipo',    label: 'Equipo' },
  { href: '/#contacto',  label: 'Contacto' },
]
```

## Estado

```ts
const open = ref(false)
```

## Comportamiento

- Click en hamburguesa → `open = !open`
- Click en cualquier link → `open = false` (cierra el menú)
- Overlay con `<Transition>` (enter/leave con opacity y translateX)
- Fondo oscuro semi-transparente sobre el contenido

## Animación hamburguesa → X

CSS transforms en las 3 líneas SVG del ícono cuando `open === true`.
