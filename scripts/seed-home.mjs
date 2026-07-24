/**
 * seed-home.mjs
 * Crea los content types `home_settings` y `testimonial` en Storyblok,
 * y siembra el contenido inicial del hero y los testimonios.
 *
 * Uso: node --env-file=.env scripts/seed-home.mjs
 */

const SPACE_ID = process.env.SB_SPACE_ID;
const TOKEN    = process.env.SB_MANAGEMENT_TOKEN;

if (!SPACE_ID || !TOKEN) {
  console.error('❌  Faltan SB_SPACE_ID o SB_MANAGEMENT_TOKEN en .env');
  process.exit(1);
}

const BASE = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;
const headers = { 'Content-Type': 'application/json', Authorization: TOKEN };

async function req(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method, headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) { console.error(`❌  ${method} ${path} → ${res.status}`, json); process.exit(1); }
  return json;
}

// ── Crear component schema ─────────────────────────────────────────────────

async function createComponent(name, displayName, schema, isRoot = true) {
  console.log(`🧩  Creando component "${name}"…`);
  const { component } = await req('POST', '/components/', {
    component: { name, display_name: displayName, schema, is_root: isRoot, is_nestable: !isRoot },
  });
  console.log(`    ✓ id=${component.id}`);
  return component;
}

// ── Crear story ────────────────────────────────────────────────────────────

async function createFolder(name, slug) {
  console.log(`📁  Carpeta "${name}"…`);
  const { story } = await req('POST', '/stories/', {
    story: { name, slug, is_folder: true, parent_id: 0, default_root: '' },
  });
  console.log(`    ✓ id=${story.id}`);
  return story;
}

async function createStory(name, slug, parentId, component, content) {
  console.log(`📄  Story "${name}"…`);
  const { story } = await req('POST', '/stories/', {
    story: { name, slug, parent_id: parentId, content: { component, ...content } },
    publish: 1,
  });
  console.log(`    ✓ slug=${story.full_slug}`);
  return story;
}

// ── Schemas ────────────────────────────────────────────────────────────────

const HOME_SCHEMA = {
  hero_headline:        { type: 'text',       pos: 0,  display_name: 'Título principal' },
  hero_headline_accent: { type: 'text',       pos: 1,  display_name: 'Título — parte en color (lime)' },
  hero_subline:         { type: 'textarea',   pos: 2,  display_name: 'Subtítulo' },
  hero_slides:          { type: 'multiasset', pos: 3,  display_name: 'Imágenes de fondo (slides)' },
  hero_cta_1_text:      { type: 'text',       pos: 4,  display_name: 'CTA 1 — Texto' },
  hero_cta_1_url:       { type: 'text',       pos: 5,  display_name: 'CTA 1 — URL' },
  hero_cta_2_text:      { type: 'text',       pos: 6,  display_name: 'CTA 2 — Texto' },
  hero_cta_2_url:       { type: 'text',       pos: 7,  display_name: 'CTA 2 — URL' },
};

const TESTIMONIAL_SCHEMA = {
  card_type: {
    type: 'option', pos: 0, display_name: 'Tipo de tarjeta',
    options: [{ name: 'Quote (texto)', value: 'quote' }, { name: 'Photo (imagen)', value: 'photo' }],
  },
  name:   { type: 'text',     pos: 1, display_name: 'Nombre' },
  role:   { type: 'text',     pos: 2, display_name: 'Rol / Empresa' },
  quote:  { type: 'textarea', pos: 3, display_name: 'Testimonio (solo para Quote)' },
  avatar: { type: 'asset',    pos: 4, display_name: 'Avatar (imagen circular)' },
  photo:  { type: 'asset',    pos: 5, display_name: 'Foto de fondo (solo para Photo)' },
  order:  { type: 'number',   pos: 6, display_name: 'Orden' },
};

// ── Data inicial ───────────────────────────────────────────────────────────

const HOME_CONTENT = {
  hero_headline:        'Diseñamos y construimos',
  hero_headline_accent: 'lo que imaginas.',
  hero_subline:         'Tu partner técnico en LATAM para Web Apps, Mobile, IoT, UX/UI y SaaS. Transformamos ideas en productos que escalan.',
  hero_slides:          [
    { filename: 'https://picsum.photos/seed/zellety-slide-1/1920/1080', alt: 'Diseño y Desarrollo Zellety — Web Apps' },
    { filename: 'https://picsum.photos/seed/zellety-slide-2/1920/1080', alt: 'Mobile y IoT LATAM' },
    { filename: 'https://picsum.photos/seed/zellety-slide-3/1920/1080', alt: 'UX/UI y SaaS' },
  ],
  hero_cta_1_text: 'Hablemos',
  hero_cta_1_url:  '/#contacto',
  hero_cta_2_text: 'Ver Trabajos',
  hero_cta_2_url:  '/#works',
};

const TESTIMONIALS = [
  {
    name: 'Carlos Mendoza', slug: 'carlos-mendoza',
    content: {
      card_type: 'quote', name: 'Carlos Mendoza', role: 'CEO · FinTech Andina',
      quote: 'Zellety transformó nuestra plataforma por completo. El equipo entendió nuestras necesidades desde el día uno y entregó un producto que superó todas las expectativas.',
      avatar: { filename: 'https://picsum.photos/seed/av1/80/80', alt: 'Carlos Mendoza' },
      order: 1,
    },
  },
  {
    name: 'Valeria Torres', slug: 'valeria-torres',
    content: {
      card_type: 'quote', name: 'Valeria Torres', role: 'CPO · Novatech MX',
      quote: 'La calidad del diseño UX/UI fue impresionante. Cada pantalla está pensada con detalle. Nuestros usuarios notaron el cambio de inmediato y el NPS subió 40 puntos.',
      avatar: { filename: 'https://picsum.photos/seed/av2/80/80', alt: 'Valeria Torres' },
      order: 2,
    },
  },
  {
    name: 'Diego Ramírez', slug: 'diego-ramirez',
    content: {
      card_type: 'photo', name: 'Diego Ramírez', role: 'CTO · SmartHome CO',
      photo: { filename: 'https://picsum.photos/seed/ph1/400/520', alt: 'Diego Ramírez' },
      avatar: { filename: 'https://picsum.photos/seed/diego/40/40', alt: 'Diego Ramírez' },
      order: 3,
    },
  },
  {
    name: 'Sofía Gutiérrez', slug: 'sofia-gutierrez',
    content: {
      card_type: 'quote', name: 'Sofía Gutiérrez', role: 'Founder · EduLab AR',
      quote: 'No solo construyeron lo que pedimos, sino que propusieron mejoras que ni habíamos contemplado. El resultado es un producto del que estamos muy orgullosos.',
      avatar: { filename: 'https://picsum.photos/seed/av4/80/80', alt: 'Sofía Gutiérrez' },
      order: 4,
    },
  },
  {
    name: 'Andrés Peña', slug: 'andres-pena',
    content: {
      card_type: 'photo', name: 'Andrés Peña', role: 'Head of Product · TeamFlow',
      photo: { filename: 'https://picsum.photos/seed/ph2/400/520', alt: 'Andrés Peña' },
      avatar: { filename: 'https://picsum.photos/seed/andres/40/40', alt: 'Andrés Peña' },
      order: 5,
    },
  },
  {
    name: 'Mariana López', slug: 'mariana-lopez',
    content: {
      card_type: 'quote', name: 'Mariana López', role: 'Marketing Director · ModaLatam',
      quote: 'Nuestra tienda e-commerce pasó de ser un sitio básico a una plataforma de alto rendimiento. Las ventas online aumentaron un 80% en tres meses.',
      avatar: { filename: 'https://picsum.photos/seed/av6/80/80', alt: 'Mariana López' },
      order: 6,
    },
  },
  {
    name: 'Ricardo Silva', slug: 'ricardo-silva',
    content: {
      card_type: 'photo', name: 'Ricardo Silva', role: 'CEO · Inversa',
      photo: { filename: 'https://picsum.photos/seed/ph3/400/520', alt: 'Ricardo Silva' },
      avatar: { filename: 'https://picsum.photos/seed/ricardo/40/40', alt: 'Ricardo Silva' },
      order: 7,
    },
  },
];

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🚀  Seed home + testimonials — space ${SPACE_ID}\n`);

  // 1. Crear content types
  console.log('── Content types ──');
  await createComponent('home_settings', 'Home Settings', HOME_SCHEMA);
  await createComponent('testimonial',   'Testimonial',   TESTIMONIAL_SCHEMA);

  console.log('');

  // 2. Story home-settings (sin carpeta, en raíz)
  console.log('── Home Settings ──');
  await createStory('Home Settings', 'home-settings', 0, 'home_settings', HOME_CONTENT);

  console.log('');

  // 3. Carpeta + testimonios
  console.log('── Testimonials ──');
  const folder = await createFolder('Testimonials', 'testimonials');
  for (const t of TESTIMONIALS) {
    await createStory(t.name, t.slug, folder.id, 'testimonial', t.content);
  }

  console.log('\n✅  Seed completo.\n');
}

main().catch(err => { console.error(err); process.exit(1); });
