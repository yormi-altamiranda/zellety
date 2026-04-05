<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import { Icon } from '@iconify/vue'
import 'swiper/css'

import astroUrl             from '../assets/icons/astro-icon-dark.svg?url'
import figmaUrl             from '../assets/icons/figma.svg?url'
import nextjsUrl            from '../assets/icons/nextjs_icon_dark.svg?url'
import nuxtUrl              from '../assets/icons/nuxt.svg?url'
import vscodeUrl            from '../assets/icons/vscode.svg?url'
import wordpressUrl         from '../assets/icons/wordpress.svg?url'
import cloudflareUrl        from '../assets/icons/cloudflare.svg?url'
import dockerUrl            from '../assets/icons/docker.svg?url'
import elementorUrl         from '../assets/icons/elementor.svg?url'
import gitUrl               from '../assets/icons/git.svg?url'
import gitlabUrl            from '../assets/icons/gitlab.svg?url'
import googleCloudUrl       from '../assets/icons/google-cloud.svg?url'
import lovableUrl           from '../assets/icons/lovable.svg?url'
import n8nUrl               from '../assets/icons/n8n.svg?url'
import netlifyUrl           from '../assets/icons/netlify.svg?url'
import storybookUrl         from '../assets/icons/storybook.svg?url'
import affinityDesignerUrl  from '../assets/icons/affinity_designer.svg?url'
import affinityPhotoUrl     from '../assets/icons/affinity_photo.svg?url'
import affinityPublisherUrl from '../assets/icons/affinity_publisher.svg?url'
import awsUrl               from '../assets/icons/aws_dark.svg?url'
import azureUrl             from '../assets/icons/azure.svg?url'
import framerUrl            from '../assets/icons/framer_dark.svg?url'
import githubUrl            from '../assets/icons/github_dark.svg?url'
import vercelUrl            from '../assets/icons/vercel_dark.svg?url'
import firebaseUrl          from '../assets/icons/firebase.svg?url'
import flutterUrl           from '../assets/icons/flutter.svg?url'
import postgresqlUrl        from '../assets/icons/postgresql.svg?url'
import supabaseUrl          from '../assets/icons/supabase.svg?url'
import webflowUrl           from '../assets/icons/webflow.svg?url'

type SvgTool  = { name: string; kind: 'svg';  src: string }
type IconTool = { name: string; kind: 'icon'; icon: string }
type Tool = SvgTool | IconTool

const tools: Tool[] = [
  { name: 'WordPress',          kind: 'svg',  src: wordpressUrl },
  { name: 'AstroJS',            kind: 'svg',  src: astroUrl },
  { name: 'Next.js',            kind: 'svg',  src: nextjsUrl },
  { name: 'Nuxt.js',            kind: 'svg',  src: nuxtUrl },
  { name: 'Figma',              kind: 'svg',  src: figmaUrl },
  { name: 'VS Code',            kind: 'svg',  src: vscodeUrl },
  { name: 'Cloudflare',         kind: 'svg',  src: cloudflareUrl },
  { name: 'Docker',             kind: 'svg',  src: dockerUrl },
  { name: 'Elementor',          kind: 'svg',  src: elementorUrl },
  { name: 'Git',                kind: 'svg',  src: gitUrl },
  { name: 'GitLab',             kind: 'svg',  src: gitlabUrl },
  { name: 'Google Cloud',       kind: 'svg',  src: googleCloudUrl },
  { name: 'Lovable',            kind: 'svg',  src: lovableUrl },
  { name: 'n8n',                kind: 'svg',  src: n8nUrl },
  { name: 'Netlify',            kind: 'svg',  src: netlifyUrl },
  { name: 'Storybook',          kind: 'svg',  src: storybookUrl },
  { name: 'Affinity Designer',  kind: 'svg',  src: affinityDesignerUrl },
  { name: 'Affinity Photo',     kind: 'svg',  src: affinityPhotoUrl },
  { name: 'Affinity Publisher', kind: 'svg',  src: affinityPublisherUrl },
  { name: 'Azure',              kind: 'svg',  src: azureUrl },
  { name: 'Firebase',           kind: 'svg',  src: firebaseUrl },
  { name: 'Flutter',            kind: 'svg',  src: flutterUrl },
  { name: 'PostgreSQL',         kind: 'svg',  src: postgresqlUrl },
  { name: 'Supabase',           kind: 'svg',  src: supabaseUrl },
  { name: 'Webflow',            kind: 'svg',  src: webflowUrl },
  { name: 'AWS',                kind: 'svg',  src: awsUrl },
  { name: 'Framer',             kind: 'svg',  src: framerUrl },
  { name: 'GitHub',             kind: 'svg',  src: githubUrl },
  { name: 'Vercel',             kind: 'svg',  src: vercelUrl },
  { name: 'WooCommerce',        kind: 'icon', icon: 'simple-icons:woocommerce' },
  { name: 'Vue.js',             kind: 'icon', icon: 'simple-icons:vuedotjs' },
  { name: 'React',              kind: 'icon', icon: 'simple-icons:react' },
  { name: 'NestJS',             kind: 'icon', icon: 'simple-icons:nestjs' },
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
