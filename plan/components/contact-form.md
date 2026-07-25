# ContactForm.vue

**Ruta:** `src/components/ContactForm.vue`
**Tipo:** Vue 3 island — `client:visible`

---

## Qué hace

Formulario de contacto con validación client-side, integrado con Netlify Forms.

## Campos

| Campo | Tipo | Validación |
|-------|------|------------|
| `name` | text | Requerido |
| `email` | email | Requerido + formato email |
| `service` | select | Requerido |
| `message` | textarea | Requerido |
| `bot-field` | text (hidden) | Honeypot anti-spam |

## Opciones de servicio

- Web App
- App Móvil
- IoT / Domótica
- UX/UI
- SaaS

## Estado reactivo

```ts
const form = reactive({ name: '', email: '', service: '', message: '' })
const errors = reactive({ name: '', email: '', service: '', message: '' })
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
```

## Flujo de envío

1. Validación client-side (si falla → muestra errores inline, no envía)
2. `status = 'loading'` → botón muestra spinner
3. `fetch` POST a Netlify Forms (application/x-www-form-urlencoded)
4. Éxito → `status = 'success'` → modal de confirmación con ✓
5. Error → `status = 'error'` → mensaje de error

## Netlify Forms

El form tiene `data-netlify="true"` y `name="contact"`. Netlify detecta el form en el build HTML estático y crea el endpoint automáticamente.

```html
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact" />
```

## Notas

- El submit hace `fetch` (no recarga la página)
- La serialización es `application/x-www-form-urlencoded` (requerido por Netlify Forms)
- Verificar en Netlify dashboard → Forms que el form "contact" aparece tras el primer deploy
