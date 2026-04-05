<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import { Icon } from '@iconify/vue'
import 'swiper/css'

import astroUrl    from '../assets/icons/astro-icon-dark.svg?url'
import figmaUrl    from '../assets/icons/figma.svg?url'
import nextjsUrl   from '../assets/icons/nextjs_icon_dark.svg?url'
import nuxtUrl     from '../assets/icons/nuxt.svg?url'
import vscodeUrl   from '../assets/icons/vscode.svg?url'
import wordpressUrl from '../assets/icons/wordpress.svg?url'

type SvgTool  = { name: string; kind: 'svg';  src: string }
type IconTool = { name: string; kind: 'icon'; icon: string }
type Tool = SvgTool | IconTool

const tools: Tool[] = [
  { name: 'WordPress',    kind: 'svg',  src: wordpressUrl },
  { name: 'AstroJS',      kind: 'svg',  src: astroUrl },
  { name: 'Next.js',      kind: 'svg',  src: nextjsUrl },
  { name: 'Nuxt.js',      kind: 'svg',  src: nuxtUrl },
  { name: 'Figma',        kind: 'svg',  src: figmaUrl },
  { name: 'VS Code',      kind: 'svg',  src: vscodeUrl },
  { name: 'WooCommerce',  kind: 'icon', icon: 'simple-icons:woocommerce' },
  { name: 'Elementor',    kind: 'icon', icon: 'simple-icons:elementor' },
  { name: 'Webflow',      kind: 'icon', icon: 'simple-icons:webflow' },
  { name: 'Vue.js',       kind: 'icon', icon: 'simple-icons:vuedotjs' },
  { name: 'React',        kind: 'icon', icon: 'simple-icons:react' },
  { name: 'NestJS',       kind: 'icon', icon: 'simple-icons:nestjs' },
  { name: 'Supabase',     kind: 'icon', icon: 'simple-icons:supabase' },
  { name: 'PostgreSQL',   kind: 'icon', icon: 'simple-icons:postgresql' },
  { name: 'Netlify',      kind: 'icon', icon: 'simple-icons:netlify' },
  { name: 'Vercel',       kind: 'icon', icon: 'simple-icons:vercel' },
  { name: 'Cloudflare',   kind: 'icon', icon: 'simple-icons:cloudflare' },
  { name: 'Google Cloud', kind: 'icon', icon: 'simple-icons:googlecloud' },
  { name: 'Flutter',      kind: 'icon', icon: 'simple-icons:flutter' },
]
</script>

<template>
  <section class="py-[var(--space-12)] bg-[var(--z-midnight-900)] border-y border-[var(--z-midnight-800)] overflow-hidden">

    <Swiper
      :modules="[Autoplay]"
      :slides-per-view="'auto'"
      :space-between="52"
      :loop="true"
      :autoplay="{ delay: 0, disableOnInteraction: false }"
      :speed="5000"
      :allow-touch-move="false"
      class="tools-swiper"
    >
      <SwiperSlide
        v-for="tool in tools"
        :key="tool.name"
        class="!w-auto"
      >
        <div class="tool-item flex items-center justify-center px-3 py-1" :aria-label="tool.name">
          <!-- SVG local -->
          <img
            v-if="tool.kind === 'svg'"
            :src="tool.src"
            :alt="tool.name"
            width="36"
            height="36"
            class="tool-img block object-contain"
            style="width:36px; height:36px;"
          />
          <!-- Iconify -->
          <span v-else class="tool-icon-wrap flex items-center justify-center" aria-hidden="true">
            <Icon :icon="tool.icon" width="34" height="34" />
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

:deep(.swiper-wrapper) {
  transition-timing-function: linear !important;
}

/* Hover: opacidad para SVGs locales */
.tool-img {
  opacity: 0.45;
  transition: opacity 0.3s ease;
}
.tool-item:hover .tool-img {
  opacity: 1;
}

/* Hover: color lime para Iconify */
.tool-icon-wrap {
  color: var(--z-slate-500);
  transition: color 0.3s ease;
}
.tool-item:hover .tool-icon-wrap {
  color: var(--z-lime-400);
}
</style>
