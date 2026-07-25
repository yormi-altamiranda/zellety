/**
 * seed-section-headers.mjs
 * Agrega campos de encabezado de sección + marquesina de contacto a home_settings.
 * Todos los campos son requeridos. Sin booleanos.
 * Uso: node --env-file=.env scripts/seed-section-headers.mjs
 */

import { randomUUID } from 'crypto';

const SPACE_ID      = process.env.SB_SPACE_ID;
const TOKEN         = process.env.SB_MANAGEMENT_TOKEN;
const COMPONENT_ID  = '201712625766383'; // home_settings
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
  console.log('\n🚀  Agregando encabezados de sección + marquesina…\n');

  // ── 1. Crear bloque nestable contact_marquee_item ─────────────────────────
  console.log('🧩  Creando bloque contact_marquee_item…');
  const { component: marqueeItemComp } = await req('POST', '/components/', {
    component: {
      name: 'contact_marquee_item',
      display_name: 'Marquesina — Ítem',
      is_root: false,
      is_nestable: true,
      schema: {
        label: { type: 'text', pos: 0, display_name: 'Etiqueta (ej: Email, WhatsApp)', required: true },
        value: { type: 'text', pos: 1, display_name: 'Texto visible (ej: hola@zellety.com)', required: true },
        url:   { type: 'text', pos: 2, display_name: 'URL (ej: mailto:..., tel:..., https://wa.me/...)', required: true },
      },
    },
  });
  console.log(`    ✓ contact_marquee_item id=${marqueeItemComp.id}`);

  // ── 2. Actualizar schema de home_settings ─────────────────────────────────
  console.log('📤  Actualizando schema home_settings con nuevos campos…');
  const { component } = await req('GET', `/components/${COMPONENT_ID}/`);

  const newFields = {
    // Services
    services_label:       { type: 'text', pos: 40, display_name: 'Servicios — Label', required: true },
    services_title_line1: { type: 'text', pos: 41, display_name: 'Servicios — Título línea 1', required: true },
    services_title_line2: { type: 'text', pos: 42, display_name: 'Servicios — Título línea 2', required: true },

    // Work
    work_label:      { type: 'text',     pos: 43, display_name: 'Trabajos — Label', required: true },
    work_title:      { type: 'text',     pos: 44, display_name: 'Trabajos — Título', required: true },
    work_subtitle:   { type: 'textarea', pos: 45, display_name: 'Trabajos — Subtítulo', required: true },
    work_cta_text:   { type: 'text',     pos: 46, display_name: 'Trabajos — Texto CTA', required: true },
    work_cta_url:    { type: 'text',     pos: 47, display_name: 'Trabajos — URL CTA', required: true },

    // Team
    team_label:       { type: 'text', pos: 48, display_name: 'Equipo — Label', required: true },
    team_title_line1: { type: 'text', pos: 49, display_name: 'Equipo — Título línea 1', required: true },
    team_title_line2: { type: 'text', pos: 50, display_name: 'Equipo — Título línea 2', required: true },

    // Testimonials
    testimonials_label: { type: 'text', pos: 51, display_name: 'Testimonios — Label', required: true },
    testimonials_title: { type: 'text', pos: 52, display_name: 'Testimonios — Título', required: true },

    // Contact
    contact_label:    { type: 'text',     pos: 53, display_name: 'Contacto — Label', required: true },
    contact_title:    { type: 'text',     pos: 54, display_name: 'Contacto — Título', required: true },
    contact_subtitle: { type: 'textarea', pos: 55, display_name: 'Contacto — Subtítulo', required: true },
    contact_email:    { type: 'text',     pos: 56, display_name: 'Contacto — Email visible', required: true },
    contact_zone:     { type: 'text',     pos: 57, display_name: 'Contacto — Zona horaria', required: true },

    // Marquee
    marquee_items: {
      type: 'bloks',
      pos: 58,
      display_name: 'Marquesina — Ítems',
      required: true,
      restrict_components: true,
      component_whitelist: ['contact_marquee_item'],
    },
  };

  await req('PUT', `/components/${COMPONENT_ID}/`, {
    component: {
      name: component.name,
      display_name: component.display_name,
      schema: { ...component.schema, ...newFields },
      is_root: true,
      is_nestable: false,
    },
  });
  console.log('    ✓ Schema actualizado');

  // ── 3. Actualizar story con valores por defecto ───────────────────────────
  console.log('📤  Actualizando story home-settings con valores por defecto…');
  const { story } = await req('GET', `/stories/${HOME_STORY_ID}/`);

  const marqueeItems = [
    {
      component: 'contact_marquee_item',
      _uid: randomUUID(),
      label: 'Email:',
      value: 'info@zellety.com',
      url:   'mailto:info@zellety.com',
    },
    {
      component: 'contact_marquee_item',
      _uid: randomUUID(),
      label: 'Llámanos:',
      value: '+58 000 000 000',
      url:   'tel:+58000000000',
    },
    {
      component: 'contact_marquee_item',
      _uid: randomUUID(),
      label: 'WhatsApp:',
      value: '+58 000 000 000',
      url:   'https://wa.me/580000000000',
    },
  ];

  await req('PUT', `/stories/${HOME_STORY_ID}/`, {
    story: {
      ...story,
      content: {
        ...story.content,
        services_label:       '//SERVICIOS',
        services_title_line1: 'Nuestros',
        services_title_line2: 'servicios',
        work_label:           '//TRABAJOS',
        work_title:           'Proyectos Seleccionados',
        work_subtitle:        'Una selección de trabajos que reflejan nuestro proceso, criterio y capacidad técnica.',
        work_cta_text:        'Ver todos los proyectos →',
        work_cta_url:         '/projects',
        team_label:           '//Nuestro equipo',
        team_title_line1:     'Team',
        team_title_line2:     'members',
        testimonials_label:   '//TESTIMONIOS',
        testimonials_title:   'Confiado por expertos.',
        contact_label:        '//CONTACTO',
        contact_title:        'Hablemos.',
        contact_subtitle:     '¿Tienes un proyecto en mente? Escríbenos y te respondemos en menos de 24 horas.',
        contact_email:        'hola@zellety.com',
        contact_zone:         'UTC-3 a UTC-6 · LATAM',
        marquee_items:        marqueeItems,
      },
    },
    publish: 1,
  });
  console.log('    ✓ Story actualizada con valores por defecto');

  console.log('\n✅  Listo. Edita los encabezados desde Storyblok → Home Settings.\n');
}

main().catch(err => { console.error(err); process.exit(1); });
