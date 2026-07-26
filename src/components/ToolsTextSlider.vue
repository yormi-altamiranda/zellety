<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const slides = [
  {
    label: '// HERRAMIENTAS',
    stat: '34+',
    title: 'Herramientas que dominamos',
    description: 'Trabajamos con el ecosistema moderno de desarrollo y diseño. Cada herramienta está elegida por su impacto, confiabilidad y velocidad de entrega.',
  },
  {
    label: '// PROYECTOS',
    stat: '50+',
    title: 'Proyectos entregados',
    description: 'De MVPs a plataformas enterprise, construimos productos con impacto real en el mercado latinoamericano.',
  },
  {
    label: '// EXPERIENCIA',
    stat: '5+',
    title: 'Años en el mercado',
    description: 'Desde startups en fase seed hasta corporativos regionales, conocemos cada etapa del camino.',
  },
  {
    label: '// SERVICIOS',
    stat: '5',
    title: 'Verticales de servicio',
    description: 'Web app, móvil, IoT, UX/UI y SaaS — todo bajo un mismo techo, con un equipo que entiende tu negocio.',
  },
];

const current = ref(0);
const visible = ref(true);
let timer: ReturnType<typeof setInterval> | null = null;
let paused = false;

function next() {
  visible.value = false;
  setTimeout(() => {
    current.value = (current.value + 1) % slides.length;
    visible.value = true;
  }, 350);
}

function startTimer() {
  timer = setInterval(() => {
    if (!paused) next();
  }, 4000);
}

function goTo(i: number) {
  if (i === current.value) return;
  visible.value = false;
  setTimeout(() => {
    current.value = i;
    visible.value = true;
  }, 350);
}

onMounted(() => startTimer());
onUnmounted(() => { if (timer) clearInterval(timer); });
</script>

<template>
  <div
    class="tools-text-slider"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
  >
    <Transition name="slide-up" mode="out-in">
      <div :key="current" class="slide-content">
        <p class="label-mono" style="color: var(--z-lime-400); margin-bottom: 1.5rem;">
          {{ slides[current].label }}
        </p>

        <p
          class="font-display font-bold"
          style="
            font-size: clamp(3.5rem, 7vw, 7rem);
            line-height: 0.95;
            letter-spacing: -0.03em;
            color: var(--z-white);
            margin-bottom: 1.25rem;
          "
        >
          {{ slides[current].stat }}
        </p>

        <p
          class="font-display font-semibold"
          style="
            font-size: clamp(1.2rem, 2vw, 1.5rem);
            line-height: 1.3;
            color: var(--z-white);
            margin-bottom: 1.25rem;
          "
        >
          {{ slides[current].title }}
        </p>

        <p
          class="font-body"
          style="
            font-size: 1.125rem;
            line-height: 1.75;
            max-width: 380px;
            color: var(--z-slate-300);
          "
        >
          {{ slides[current].description }}
        </p>
      </div>
    </Transition>

    <!-- Dots -->
    <div style="display: flex; gap: 0.5rem; margin-top: 2.5rem;">
      <button
        v-for="(_, i) in slides"
        :key="i"
        class="dot"
        :class="{ active: i === current }"
        @click="goTo(i)"
        :aria-label="`Slide ${i + 1}`"
      />
    </div>
  </div>
</template>

<style scoped>
.slide-up-enter-active {
  transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.slide-up-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(28px);
}
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}

.dot {
  width: 28px;
  height: 3px;
  border: none;
  cursor: pointer;
  border-radius: 2px;
  background: var(--z-midnight-700);
  transition: background 0.3s ease, width 0.3s ease;
  padding: 0;
}
.dot.active {
  background: var(--z-lime-400);
  width: 48px;
}
</style>
