/**
 * seed-hero-slides.mjs
 * Crea el bloque `hero_slide`, actualiza home_settings con campo Bloks
 * y siembra 2 slides de ejemplo.
 *
 * Uso: node --env-file=.env scripts/seed-hero-slides.mjs
 */

import { randomUUID } from 'crypto';

const SPACE_ID      = process.env.SB_SPACE_ID;
const TOKEN         = process.env.SB_MANAGEMENT_TOKEN;
const HOME_COMP_ID  = '201712625766383'; // home_settings
const HOME_STORY_ID = '201712628570439'; // home-settings story

if (!SPACE_ID || !TOKEN) { console.error('❌  Faltan vars'); process.exit(1); }

const BASE    = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;
const headers = { 'Content-Type': 'application/json', Authorization: TOKEN };

async function req(method, path, body) {
  const res = await fetch(`${BASE}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const json = await res.json();
  if (!res.ok) { console.error(`❌  ${method} ${path} → ${res.status}`, JSON.stringify(json)); process.exit(1); }
  return json;
}

async function main() {
  console.log('\n🚀  Configurando Hero Slides dinámicos…\n');

  // ── 1. Crear bloque nestable hero_slide ──────────────────────────────────
  console.log('🧩  Creando bloque hero_slide…');
  const { component: heroSlideComp } = await req('POST', '/components/', {
    component: {
      name: 'hero_slide',
      display_name: 'Hero Slide',
      is_root: false,
      is_nestable: true,
      schema: {
        image:           { type: 'asset',    pos: 0, display_name: 'Imagen de fondo' },
        headline:        { type: 'text',     pos: 1, display_name: 'Título principal' },
        headline_accent: { type: 'text',     pos: 2, display_name: 'Título — parte en color (lime)' },
        subline:         { type: 'textarea', pos: 3, display_name: 'Subtítulo' },
        cta_1_text:      { type: 'text',     pos: 4, display_name: 'CTA 1 — Texto' },
        cta_1_url:       { type: 'text',     pos: 5, display_name: 'CTA 1 — URL' },
        cta_2_text:      { type: 'text',     pos: 6, display_name: 'CTA 2 — Texto (opcional)' },
        cta_2_url:       { type: 'text',     pos: 7, display_name: 'CTA 2 — URL (opcional)' },
      },
    },
  });
  console.log(`    ✓ id=${heroSlideComp.id}`);

  // ── 2. Actualizar schema de home_settings ────────────────────────────────
  console.log('📤  Actualizando schema home_settings…');
  const { component: homeComp } = await req('GET', `/components/${HOME_COMP_ID}/`);

  // Quitar campos individuales del hero, agregar campo bloks "slides"
  const oldHeroKeys = [
    'hero_headline','hero_headline_accent','hero_subline',
    'hero_slides','hero_cta_1_text','hero_cta_1_url','hero_cta_2_text','hero_cta_2_url',
  ];
  const cleanSchema = Object.fromEntries(
    Object.entries(homeComp.schema).filter(([k]) => !oldHeroKeys.includes(k))
  );

  const newSchema = {
    slides: {
      type: 'bloks',
      pos: 0,
      display_name: 'Slides del Hero',
      restrict_components: true,
      component_whitelist: ['hero_slide'],
    },
    ...cleanSchema,
  };

  await req('PUT', `/components/${HOME_COMP_ID}/`, {
    component: {
      name: homeComp.name,
      display_name: homeComp.display_name,
      schema: newSchema,
      is_root: true,
      is_nestable: false,
    },
  });
  console.log('    ✓ Schema actualizado');

  // ── 3. Actualizar story con slides iniciales ─────────────────────────────
  console.log('📤  Actualizando story home-settings con 2 slides…');
  const { story } = await req('GET', `/stories/${HOME_STORY_ID}/`);

  // Quitar campos viejos del hero del content
  const cleanContent = Object.fromEntries(
    Object.entries(story.content).filter(([k]) => !oldHeroKeys.includes(k))
  );

  const slides = [
    {
      component: 'hero_slide',
      _uid: randomUUID(),
      image:           { filename: 'https://picsum.photos/seed/zellety-slide-1/1920/1080', alt: 'Diseño y Desarrollo Zellety' },
      headline:        'Diseñamos y construimos',
      headline_accent: 'lo que imaginas.',
      subline:         'Tu partner técnico en LATAM para Web Apps, Mobile, IoT, UX/UI y SaaS. Transformamos ideas en productos que escalan.',
      cta_1_text:      'Hablemos',
      cta_1_url:       '/#contacto',
      cta_2_text:      'Ver Trabajos',
      cta_2_url:       '/#works',
    },
    {
      component: 'hero_slide',
      _uid: randomUUID(),
      image:           { filename: 'https://picsum.photos/seed/zellety-slide-2/1920/1080', alt: 'Mobile y IoT LATAM' },
      headline:        'Del concepto al',
      headline_accent: 'producto final.',
      subline:         'Desarrollamos apps móviles, plataformas SaaS y soluciones IoT que resuelven problemas reales.',
      cta_1_text:      'Nuestros proyectos',
      cta_1_url:       '/projects',
      cta_2_text:      '',
      cta_2_url:       '',
    },
  ];

  await req('PUT', `/stories/${HOME_STORY_ID}/`, {
    story: {
      ...story,
      content: { ...cleanContent, slides },
    },
    publish: 1,
  });
  console.log('    ✓ Story actualizada con 2 slides');

  console.log('\n✅  Listo. Agrega/elimina slides desde Storyblok → Home Settings → Slides del Hero.\n');
}

main().catch(err => { console.error(err); process.exit(1); });
