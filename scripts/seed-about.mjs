/**
 * seed-about.mjs
 * Agrega los campos de la sección About al content type home_settings
 * y actualiza la story home-settings con el contenido inicial.
 *
 * Uso: node --env-file=.env scripts/seed-about.mjs
 */

const SPACE_ID      = process.env.SB_SPACE_ID;
const TOKEN         = process.env.SB_MANAGEMENT_TOKEN;
const COMPONENT_ID  = '201712625766383'; // home_settings

if (!SPACE_ID || !TOKEN) {
  console.error('❌  Faltan SB_SPACE_ID o SB_MANAGEMENT_TOKEN en .env');
  process.exit(1);
}

const BASE    = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;
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

async function main() {
  console.log('\n🚀  Actualizando home_settings con campos About…\n');

  // 1. Obtener schema actual de home_settings
  console.log('📥  Leyendo schema actual…');
  const { component } = await req('GET', `/components/${COMPONENT_ID}/`);
  const currentSchema = component.schema;
  console.log(`    ✓ Campos existentes: ${Object.keys(currentSchema).length}`);

  // 2. Nuevos campos About (se agregan al schema existente)
  const aboutFields = {
    about_title_line1: { type: 'text',     pos: 10, display_name: 'About — Título línea 1' },
    about_title_line2: { type: 'text',     pos: 11, display_name: 'About — Título línea 2 (en color)' },
    about_text_1:      { type: 'textarea', pos: 12, display_name: 'About — Párrafo 1' },
    about_text_2:      { type: 'textarea', pos: 13, display_name: 'About — Párrafo 2' },
    about_cta_text:    { type: 'text',     pos: 14, display_name: 'About — CTA Texto' },
    about_cta_url:     { type: 'text',     pos: 15, display_name: 'About — CTA URL' },
    about_stat_1_value:  { type: 'number', pos: 16, display_name: 'Stat 1 — Número' },
    about_stat_1_suffix: { type: 'text',   pos: 17, display_name: 'Stat 1 — Sufijo (ej: +)' },
    about_stat_1_label:  { type: 'text',   pos: 18, display_name: 'Stat 1 — Etiqueta' },
    about_stat_2_value:  { type: 'number', pos: 19, display_name: 'Stat 2 — Número' },
    about_stat_2_suffix: { type: 'text',   pos: 20, display_name: 'Stat 2 — Sufijo' },
    about_stat_2_label:  { type: 'text',   pos: 21, display_name: 'Stat 2 — Etiqueta' },
    about_stat_3_value:  { type: 'number', pos: 22, display_name: 'Stat 3 — Número' },
    about_stat_3_suffix: { type: 'text',   pos: 23, display_name: 'Stat 3 — Sufijo' },
    about_stat_3_label:  { type: 'text',   pos: 24, display_name: 'Stat 3 — Etiqueta' },
  };

  // 3. Actualizar el component con el schema combinado
  console.log('📤  Actualizando schema…');
  await req('PUT', `/components/${COMPONENT_ID}/`, {
    component: {
      name: component.name,
      display_name: component.display_name,
      schema: { ...currentSchema, ...aboutFields },
      is_root: true,
      is_nestable: false,
    },
  });
  console.log('    ✓ Schema actualizado');

  // 4. Obtener la story home-settings para actualizar su contenido
  console.log('📥  Leyendo story home-settings…');
  const { story } = await req('GET', '/stories/?starts_with=home-settings&per_page=1');
  // Buscar por slug
  const allStories = await req('GET', '/stories/?per_page=100');
  const homeStory = allStories.stories.find(s => s.slug === 'home-settings');
  if (!homeStory) { console.error('❌  Story home-settings no encontrada'); process.exit(1); }
  console.log(`    ✓ id=${homeStory.id}`);

  // 5. Actualizar la story con los campos About
  console.log('📤  Actualizando contenido de home-settings…');
  await req('PUT', `/stories/${homeStory.id}/`, {
    story: {
      ...homeStory,
      content: {
        ...homeStory.content,
        about_title_line1:  'Expertos en',
        about_title_line2:  'lo que importa.',
        about_text_1:       'Somos un equipo de diseñadores y desarrolladores en LATAM apasionados por construir productos digitales que resuelven problemas reales. Trabajamos como una extensión de tu equipo, desde el concepto hasta el deployment.',
        about_text_2:       'No solo escribimos código; entendemos tu negocio, tu audiencia y tus objetivos para construir soluciones que escalan.',
        about_cta_text:     'Trabajemos juntos',
        about_cta_url:      '/#contacto',
        about_stat_1_value:  5,
        about_stat_1_suffix: '+',
        about_stat_1_label:  'Años de experiencia',
        about_stat_2_value:  30,
        about_stat_2_suffix: '+',
        about_stat_2_label:  'Proyectos entregados',
        about_stat_3_value:  20,
        about_stat_3_suffix: '+',
        about_stat_3_label:  'Clientes satisfechos',
      },
    },
    publish: 1,
  });
  console.log('    ✓ Contenido actualizado y publicado');

  console.log('\n✅  Listo.\n');
}

main().catch(err => { console.error(err); process.exit(1); });
