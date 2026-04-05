<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  links: { href: string; label: string }[]
}>()

const isOpen = ref(false)
const toggle = () => { isOpen.value = !isOpen.value }
const close  = () => { isOpen.value = false }
</script>

<template>
  <div class="md:hidden">
    <!-- Hamburger button -->
    <button
      @click="toggle"
      :aria-expanded="isOpen"
      aria-label="Abrir menú"
      class="w-10 h-10 flex flex-col items-center justify-center gap-[5px] focus-ring rounded-sm"
    >
      <span
        class="block w-5 h-[2px] bg-white transition-all duration-300 origin-center"
        :class="isOpen ? 'rotate-45 translate-y-[7px]' : ''"
      />
      <span
        class="block w-5 h-[2px] bg-white transition-all duration-300"
        :class="isOpen ? 'opacity-0' : ''"
      />
      <span
        class="block w-5 h-[2px] bg-white transition-all duration-300 origin-center"
        :class="isOpen ? '-rotate-45 -translate-y-[7px]' : ''"
      />
    </button>

    <!-- Overlay menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <nav
        v-if="isOpen"
        class="fixed inset-x-0 top-16 z-40 bg-[var(--z-midnight-950)] border-b border-[var(--z-midnight-800)] px-[clamp(1rem,4vw,2rem)] py-6 flex flex-col gap-1"
        aria-label="Menú móvil"
      >
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          @click="close"
          class="block py-3 font-body text-base text-[var(--z-slate-300)] hover:text-[var(--z-white)] border-b border-[var(--z-midnight-800)] last:border-0 transition-colors"
        >
          {{ link.label }}
        </a>
        <a
          href="/#contacto"
          @click="close"
          class="btn-primary mt-4 justify-center text-sm"
        >
          Contáctanos
        </a>
      </nav>
    </Transition>
  </div>
</template>
