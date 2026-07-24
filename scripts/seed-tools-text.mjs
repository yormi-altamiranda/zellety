/**
 * seed-tools-text.mjs
 * Agrega los campos de texto de la sección Tools a home_settings.
 * Uso: node --env-file=.env scripts/seed-tools-text.mjs
 */

const SPACE_ID     = process.env.SB_SPACE_ID;
const TOKEN        = process.env.SB_MANAGEMENT_TOKEN;
const COMPONENT_ID = '201712625766383'; // home_settings

if (!SPACE_ID || !TOKEN) { console.error('❌  Faltan vars'); process.exit(1); }

const BASE    = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;
const headers = { 'Content-Type': 'application/json', Authorization: TOKEN };

async function req(method, path, body) {
  const res = await fetch(`${BASE}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const json = await res.json();
  if (!res.ok) { console.error(`❌  ${res.status}`, json); process.exit(1); }
  return json;
}

async function main() {
  console.log('\n🚀  Agregando campos Tools a home_settings…\n');

  // 1. Schema actual
  const { component } = await req('GET', `/components/${COMPONENT_ID}/`);

  // 2. Nuevos campos
  const newFields = {
    tools_count:       { type: 'text',     pos: 30, display_name: 'Tools — Número destacado (ej: 34+)' },
    tools_subtitle:    { type: 'text',     pos: 31, display_name: 'Tools — Subtítulo' },
    tools_description: { type: 'textarea', pos: 32, display_name: 'Tools — Párrafo descriptivo' },
  };

  // 3. Actualizar schema
  await req('PUT', `/components/${COMPONENT_ID}/`, {
    component: {
      name: component.name,
      display_name: component.display_name,
      schema: { ...component.schema, ...newFields },
      is_root: true,
      is_nestable: false,
    },
  });
  console.log('✓ Schema actualizado');

  // 4. Actualizar story
  const { stories } = await req('GET', '/stories/?per_page=100');
  const homeStory = stories.find(s => s.slug === 'home-settings');
  if (!homeStory) { console.error('❌  Story home-settings no encontrada'); process.exit(1); }

  await req('PUT', `/stories/${homeStory.id}/`, {
    story: {
      ...homeStory,
      content: {
        ...homeStory.content,
        tools_count:       '34+',
        tools_subtitle:    'Herramientas que dominamos',
        tools_description: 'Trabajamos con el ecosistema moderno de desarrollo y diseño. Cada herramienta está elegida por su impacto, confiabilidad y velocidad de entrega.',
      },
    },
    publish: 1,
  });
  console.log('✓ Story actualizada\n✅  Listo.\n');
}

main().catch(err => { console.error(err); process.exit(1); });
