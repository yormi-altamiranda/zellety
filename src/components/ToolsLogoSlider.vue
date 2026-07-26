<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  tools: { name: string; logo: string }[];
}>();

// Agrupar logos de 4 en 4 (2×2 por slide)
const slides = computed(() => {
  const groups: { name: string; logo: string }[][] = [];
  for (let i = 0; i < props.tools.length; i += 4) {
    groups.push(props.tools.slice(i, i + 4));
  }
  return groups;
});

const current = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;
let paused = false;

function next() {
  current.value = (current.value + 1) % slides.value.length;
}

function goTo(i: number) {
  current.value = i;
}

onMounted(() => {
  timer = setInterval(() => {
    if (!paused) next();
  }, 2800);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <div
    class="tools-logo-slider"
    style="position: relative;"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
  >
    <!-- Slide viewport -->
    <div class="slider-box">
      <Transition name="logo-fade" mode="out-in">
        <div :key="current" class="slide-grid">
          <div
            v-for="tool in slides[current]"
            :key="tool.name"
            class="logo-cell"
          >
            <img
              :src="tool.logo"
              :alt="tool.name"
              class="logo-img"
            />
            <span class="logo-name">{{ tool.name }}</span>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Dots -->
    <div style="display: flex; gap: 0.5rem; margin-top: 1.25rem;">
      <button
        v-for="(_, i) in slides"
        :key="i"
        :aria-label="`Slide ${i + 1}`"
        @click="goTo(i)"
        style="
          border: none;
          cursor: pointer;
          border-radius: 2px;
          height: 3px;
          padding: 0;
          background: var(--z-midnight-700);
          transition: background 0.3s ease, width 0.3s ease;
        "
        :style="i === current
          ? 'width: 40px; background: var(--z-primary);'
          : 'width: 24px; background: var(--z-midnight-700);'"
      />
    </div>
  </div>
</template>

<style scoped>
.logo-fade-enter-active {
  transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.logo-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.logo-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.logo-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
