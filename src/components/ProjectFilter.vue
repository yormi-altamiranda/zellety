<script setup lang="ts">
import { ref, computed } from 'vue';

interface DisplayProject {
  title: string;
  summary: string;
  link: string;
  cover_image: { filename: string; alt: string };
  services: string[];
  tech_stack: string[];
}

const props = defineProps<{
  projects: DisplayProject[];
}>();

const SERVICE_LABELS: Record<string, string> = {
  web_app: 'Web App',
  mobile: 'App Móvil',
  iot: 'IoT',
  ux_ui: 'UX/UI',
  saas: 'SaaS',
};

// Collect only services that exist in the project list
const availableServices = computed(() => {
  const set = new Set<string>();
  props.projects.forEach(p => p.services.forEach(s => set.add(s)));
  return ['web_app', 'mobile', 'iot', 'ux_ui', 'saas'].filter(s => set.has(s));
});

const activeFilter = ref<string | null>(null);

const filteredProjects = computed(() =>
  activeFilter.value === null
    ? props.projects
    : props.projects.filter(p => p.services.includes(activeFilter.value!))
);

function setFilter(service: string | null) {
  activeFilter.value = service;
}
</script>

<template>
  <!-- Filtros -->
  <div class="filter-bar" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 4rem;">
    <button
      class="filter-btn"
      :class="{ active: activeFilter === null }"
      :aria-pressed="activeFilter === null"
      @click="setFilter(null)"
    >
      Todos
    </button>
    <button
      v-for="svc in availableServices"
      :key="svc"
      class="filter-btn"
      :class="{ active: activeFilter === svc }"
      :aria-pressed="activeFilter === svc"
      @click="setFilter(svc)"
    >
      {{ SERVICE_LABELS[svc] ?? svc }}
    </button>
  </div>

  <!-- Conteo -->
  <p class="count-label" style="font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--z-slate-500); margin-bottom: 2.5rem;">
    {{ filteredProjects.length }} {{ filteredProjects.length === 1 ? 'proyecto' : 'proyectos' }}
  </p>

  <!-- Grid -->
  <TransitionGroup
    tag="div"
    name="cards"
    class="projects-grid"
    style="display: grid; grid-template-columns: repeat(1, 1fr); gap: 4rem 1.25rem;"
  >
    <a
      v-for="(p, i) in filteredProjects"
      :key="p.link"
      :href="p.link"
      class="project-card"
      :aria-label="p.title"
      :style="`--i: ${i};`"
    >
      <!-- Imagen -->
      <div class="card-img-wrap" style="overflow: hidden; margin-bottom: 1rem; aspect-ratio: 4/3;">
        <img
          :src="p.cover_image.filename"
          :alt="p.cover_image.alt"
          class="card-img"
          :loading="i < 2 ? 'eager' : 'lazy'"
          decoding="async"
          style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);"
        />
      </div>
      <!-- Info -->
      <div style="border-top: 1px solid var(--z-midnight-800); padding-top: 1rem;">
        <p class="card-services" style="font-family: var(--font-body); font-weight: 500; color: var(--z-lime-400); margin-bottom: 0.5rem; font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase;">
          {{ p.services.map(s => SERVICE_LABELS[s] ?? s).join(' | ') }}
        </p>
        <h2 class="card-title" style="font-family: var(--font-display); font-weight: 700; color: var(--z-white); font-size: clamp(1.25rem, 2.5vw, 1.6rem); letter-spacing: -0.01em; line-height: 1.2; margin-bottom: 0.5rem; transition: color 0.2s;">
          {{ p.title }}
        </h2>
        <p style="font-family: var(--font-body); color: var(--z-slate-300); font-size: 0.9rem; line-height: 1.6;">
          {{ p.summary }}
        </p>
      </div>
    </a>
  </TransitionGroup>

  <!-- Empty state -->
  <div v-if="filteredProjects.length === 0" style="padding: 5rem 0; text-align: center;">
    <p style="font-family: var(--font-mono); color: var(--z-slate-500); font-size: 0.85rem; letter-spacing: 0.1em;">
      // SIN RESULTADOS
    </p>
  </div>
</template>

<style scoped>
.filter-btn {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.5rem 1.25rem;
  background: transparent;
  color: var(--z-slate-300);
  border: 1px solid var(--z-midnight-800);
  cursor: pointer;
  transition: color 0.2s, background 0.2s, border-color 0.2s;
  outline: none;
}
.filter-btn:hover {
  color: var(--z-white);
  border-color: var(--z-slate-500);
}
.filter-btn.active {
  background: var(--z-lime-400);
  color: var(--z-black);
  border-color: var(--z-lime-400);
}
.filter-btn:focus-visible {
  outline: 2px solid var(--z-lime-400);
  outline-offset: 2px;
}

.project-card:hover .card-img {
  transform: scale(1.05);
}
.project-card:hover .card-title {
  color: var(--z-lime-400);
}
.project-card {
  display: block;
  text-decoration: none;
}

/* Grid responsive */
@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

/* TransitionGroup */
.cards-enter-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.cards-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
  position: absolute;
}
.cards-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.cards-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.cards-move {
  transition: transform 0.4s ease;
}
</style>
