# Vue Islands — Instalación y Convenciones

## Instalación

```bash
npx astro add vue
# instala @astrojs/vue + vue automáticamente
```

Configura en `astro.config.ts`:

```ts
import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'

export default defineConfig({
  integrations: [vue()],
})
```

---

## Cuándo usar Vue vs Astro

| Tipo | Usar |
|------|------|
| Markup estático, sin estado | `.astro` en `sections/` |
| Interactividad real (form, toggle, hover con estado) | `.vue` en `components/` |
| Un Vue que no tiene `ref()`, `computed()` ni eventos | Convertir a `.astro` |

### Directivas de hidratación

| Directiva | Cuándo |
|-----------|--------|
| `client:visible` | ProjectCard, ServiceCard — hidratar al entrar en viewport |
| `client:idle` | Filtros, tabs — hidratar cuando el browser está idle |
| `client:load` | **Solo** NavMobile — requiere interacción inmediata |
| `client:only="vue"` | Componentes que no tienen SSR válido |

**Nunca** usar `client:load` salvo el nav móvil.

---

## Componentes Vue del proyecto

```
src/components/
├── ServiceCard.vue      # client:visible — numbered layout "01 / WEB APP"
├── ProjectCard.vue      # client:visible — hover con video preview
├── ContactForm.vue      # client:visible — Netlify Forms + validación
├── NavMobile.vue        # client:load   — menú hamburguesa
└── ProjectFilter.vue    # client:idle   — filtro por servicio en /projects
```

---

## Convenciones Vue (Composition API)

```vue
<script setup lang="ts">
// Siempre: Composition API + TypeScript strict
import { ref, computed, watch, onMounted } from 'vue'

// Props siempre tipadas
const props = defineProps<{
  title: string
  featured?: boolean
}>()

// Emits tipados
const emit = defineEmits<{
  selected: [id: string]
}>()

// ref() para primitivos
const isHovered = ref(false)

// reactive() para objetos con múltiples campos relacionados
// computed() para valores derivados
// watch() solo para side effects, no para transformar data
</script>
```

**Prohibido:** Options API, mixins, `this`, `any`.
Si no puedes tipar algo: usa `unknown` + type narrowing.

---

## Integración con GSAP en Vue islands

```vue
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'

const cardRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from(cardRef.value, { opacity: 0, y: 60, duration: 0.6 })
  }, cardRef.value!)
})

onUnmounted(() => {
  ctx.revert() // cleanup obligatorio
})
</script>
```

---

## Convenciones de archivos

- Nombres: `kebab-case` → `project-card.vue`, `contact-form.vue`
- Imports en Astro: PascalCase → `import ProjectCard from '@/components/ProjectCard.vue'`
- Un componente por archivo, sin excepciones
