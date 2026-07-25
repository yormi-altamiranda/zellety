/**
 * seed-tools-block.mjs
 * Crea el bloque nestable `tool_item` y agrega el campo `tool_list`
 * a home_settings para gestionar el grid de herramientas desde Storyblok.
 *
 * Uso: node --env-file=.env scripts/seed-tools-block.mjs
 *
 * Después de correr: ve a Storyblok → Home Settings → Tool List
 * y agrega cada herramienta con su nombre + imagen (sube los SVG al asset library).
 */

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
  console.log('\n🚀  Creando bloque tool_item + campo tool_list…\n');

  // ── 1. Crear bloque nestable tool_item ────────────────────────────────────
  console.log('🧩  Creando bloque tool_item…');
  const { component: toolItemComp } = await req('POST', '/components/', {
    component: {
      name: 'tool_item',
      display_name: 'Herramienta',
      is_root: false,
      is_nestable: true,
      schema: {
        name: { type: 'text',  pos: 0, display_name: 'Nombre (ej: Next.js)', required: true },
        logo: { type: 'asset', pos: 1, display_name: 'Logo (SVG o PNG)',     required: true },
      },
    },
  });
  console.log(`    ✓ tool_item id=${toolItemComp.id}`);

  // ── 2. Agregar campo tool_list a home_settings ────────────────────────────
  console.log('📤  Actualizando schema home_settings…');
  const { component } = await req('GET', `/components/${COMPONENT_ID}/`);

  await req('PUT', `/components/${COMPONENT_ID}/`, {
    component: {
      name: component.name,
      display_name: component.display_name,
      schema: {
        ...component.schema,
        tool_list: {
          type: 'bloks',
          pos: 35,
          display_name: 'Herramientas — Grid de logos',
          required: true,
          restrict_components: true,
          component_whitelist: ['tool_item'],
        },
      },
      is_root: true,
      is_nestable: false,
    },
  });
  console.log('    ✓ Schema actualizado');

  console.log('\n✅  Listo.');
  console.log('   → Ve a Storyblok → Home Settings → Herramientas — Grid de logos');
  console.log('   → Agrega cada herramienta: nombre + sube el SVG al asset library\n');
}

main().catch(err => { console.error(err); process.exit(1); });
