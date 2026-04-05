<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

// Iconify icons de simple-icons para cada herramienta
// Reemplazar por SVGs descargados de svgl.app cuando estén disponibles
const tools: { name: string; icon: string }[] = [
  { name: 'WordPress',    icon: 'simple-icons:wordpress' },
  { name: 'WooCommerce',  icon: 'simple-icons:woocommerce' },
  { name: 'Elementor',    icon: 'simple-icons:elementor' },
  { name: 'Webflow',      icon: 'simple-icons:webflow' },
  { name: 'AstroJS',      icon: 'simple-icons:astro' },
  { name: 'Vue.js',       icon: 'simple-icons:vuedotjs' },
  { name: 'React',        icon: 'simple-icons:react' },
  { name: 'Next.js',      icon: 'simple-icons:nextdotjs' },
  { name: 'Nuxt.js',      icon: 'simple-icons:nuxtdotjs' },
  { name: 'NestJS',       icon: 'simple-icons:nestjs' },
  { name: 'Supabase',     icon: 'simple-icons:supabase' },
  { name: 'PostgreSQL',   icon: 'simple-icons:postgresql' },
  { name: 'Netlify',      icon: 'simple-icons:netlify' },
  { name: 'Vercel',       icon: 'simple-icons:vercel' },
  { name: 'Cloudflare',   icon: 'simple-icons:cloudflare' },
  { name: 'Google Cloud', icon: 'simple-icons:googlecloud' },
  { name: 'Figma',        icon: 'simple-icons:figma' },
  { name: 'Flutter',      icon: 'simple-icons:flutter' },
]
</script>

<template>
  <section class="py-[var(--space-12)] bg-[var(--z-midnight-900)] border-y border-[var(--z-midnight-800)] overflow-hidden">

    <p class="label-mono text-center mb-8 text-[var(--z-slate-500)]">TECNOLOGÍAS QUE USAMOS</p>

    <Swiper
      :modules="[Autoplay]"
      :slides-per-view="'auto'"
      :space-between="48"
      :loop="true"
      :autoplay="{ delay: 0, disableOnInteraction: false, reverseDirection: false }"
      :speed="4000"
      :allow-touch-move="false"
      class="tools-swiper"
    >
      <SwiperSlide
        v-for="tool in tools"
        :key="tool.name"
        class="!w-auto"
      >
        <div class="flex items-center gap-3 px-4 py-2 group">
          <!-- Icon placeholder — sustituir por SVG de svgl.app -->
          <span
            class="w-7 h-7 flex items-center justify-center text-[var(--z-slate-500)] group-hover:text-[var(--z-lime-400)] transition-colors duration-300"
            aria-hidden="true"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" opacity="0.3"/>
              <text x="12" y="16" text-anchor="middle" font-size="10" fill="currentColor" font-family="monospace">
                {{ tool.name.slice(0,2).toUpperCase() }}
              </text>
            </svg>
          </span>
          <span
            class="font-mono text-sm text-[var(--z-slate-500)] group-hover:text-[var(--z-white)] transition-colors duration-300 whitespace-nowrap"
          >
            {{ tool.name }}
          </span>
        </div>
      </SwiperSlide>
    </Swiper>

  </section>
</template>

<style scoped>
.tools-swiper {
  mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
}

/* Override swiper transition to linear for continuous scroll */
:deep(.swiper-wrapper) {
  transition-timing-function: linear !important;
}
</style>
