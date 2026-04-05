import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import UnoCSS from 'unocss/astro';
import sitemap from '@astrojs/sitemap';
import { storyblok } from '@storyblok/astro';
import { loadEnv } from 'vite';

const env = loadEnv('', process.cwd(), 'STORYBLOK');

export default defineConfig({
  site: 'https://zellety.com',
  image: {
    domains: ['picsum.photos', 'fastly.picsum.photos'],
  },
  integrations: [
    vue(),
    UnoCSS({ injectReset: true }),
    sitemap(),
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      bridge: false,
      components: {
        // Registrar componentes Storyblok aquí cuando se creen
        // project: 'components/storyblok/ProjectPage',
        // team_member: 'components/storyblok/TeamMember',
        // service: 'components/storyblok/Service',
      },
      apiOptions: {
        region: 'us',
      },
    }),
  ],
  vite: {
    optimizeDeps: {
      include: ['gsap', 'lenis'],
    },
  },
});
