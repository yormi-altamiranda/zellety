/**
 * seed-tools-content.mjs
 * Sube los 16 SVGs al Asset Library de Storyblok y puebla tool_list
 * en la story home-settings.
 *
 * Uso: node --env-file=.env scripts/seed-tools-content.mjs
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const ICONS = resolve(__dir, '../src/assets/icons');

const SPACE_ID      = process.env.SB_SPACE_ID;
const TOKEN         = process.env.SB_MANAGEMENT_TOKEN;
const HOME_STORY_ID = '201712628570439';

if (!SPACE_ID || !TOKEN) { console.error('❌  Faltan SB_SPACE_ID / SB_MANAGEMENT_TOKEN'); process.exit(1); }

const BASE    = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;
const headers = { 'Content-Type': 'application/json', Authorization: TOKEN };

async function req(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) { console.error(`❌  ${method} ${path} → ${res.status}`, JSON.stringify(json)); process.exit(1); }
  return json;
}

// ── Herramientas a subir (nombre + archivo SVG local) ─────────────────────────
const TOOLS = [
  { name: 'Next.js',    file: 'nextjs_icon_dark.svg' },
  { name: 'Nuxt',       file: 'nuxt.svg' },
  { name: 'Astro',      file: 'astro-icon-dark.svg' },
  { name: 'Flutter',    file: 'flutter.svg' },
  { name: 'Figma',      file: 'figma.svg' },
  { name: 'Supabase',   file: 'supabase.svg' },
  { name: 'Firebase',   file: 'firebase.svg' },
  { name: 'Docker',     file: 'docker.svg' },
  { name: 'GitHub',     file: 'github_dark.svg' },
  { name: 'Vercel',     file: 'vercel_dark.svg' },
  { name: 'AWS',        file: 'aws_dark.svg' },
  { name: 'Cloudflare', file: 'cloudflare.svg' },
  { name: 'PostgreSQL', file: 'postgresql.svg' },
  { name: 'Netlify',    file: 'netlify.svg' },
  { name: 'Framer',     file: 'framer_dark.svg' },
  { name: 'n8n',        file: 'n8n.svg' },
];

// ── Subir un SVG al Asset Library ─────────────────────────────────────────────
async function uploadAsset(filename, filePath) {
  const fileBuffer = readFileSync(filePath);
  const fileSize   = fileBuffer.length;

  // 1. Solicitar URL firmada
  const signed = await req('POST', '/assets/', {
    filename,
    size: fileSize,
    content_type: 'image/svg+xml',
  });

  // 2. Subir el archivo a S3 via multipart
  const form = new FormData();
  for (const [key, val] of Object.entries(signed.fields ?? {})) {
    form.append(key, val);
  }
  form.append('file', new Blob([fileBuffer], { type: 'image/svg+xml' }), filename);

  const s3Res = await fetch(signed.post_url, { method: 'POST', body: form });
  if (!s3Res.ok && s3Res.status !== 204) {
    console.error(`❌  S3 upload failed for ${filename}: ${s3Res.status}`);
    process.exit(1);
  }

  // 3. Confirmar subida
  await fetch(`${BASE}/assets/${signed.id}/finish_upload`, { headers: { Authorization: TOKEN } });

  // pretty_url viene como "//a.storyblok.com/..." → agregar https:
  const cdnUrl = signed.pretty_url.startsWith('//')
    ? `https:${signed.pretty_url}`
    : signed.pretty_url;

  return { id: signed.id, public_url: cdnUrl };
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🚀  Subiendo SVGs al Asset Library de Storyblok…\n');

  const uploadedTools = [];

  for (const tool of TOOLS) {
    const filePath = resolve(ICONS, tool.file);
    process.stdout.write(`   ⬆  ${tool.name} (${tool.file})… `);
    const asset = await uploadAsset(tool.file, filePath);
    uploadedTools.push({ name: tool.name, url: asset.public_url });
    console.log(`✓ ${asset.public_url}`);
  }

  console.log('\n📝  Actualizando home-settings con tool_list…');

  // Obtener story actual
  const { story } = await req('GET', `/stories/${HOME_STORY_ID}/`);

  // Construir tool_list con los assets subidos
  const tool_list = uploadedTools.map(t => ({
    _uid: crypto.randomUUID(),
    component: 'tool_item',
    name: t.name,
    logo: { filename: t.url, alt: t.name },
  }));

  // Actualizar story
  await req('PUT', `/stories/${HOME_STORY_ID}/`, {
    story: {
      name: story.name,
      slug: story.slug,
      content: { ...story.content, tool_list },
    },
    publish: 1,
  });

  console.log(`   ✓ tool_list actualizado con ${tool_list.length} herramientas`);
  console.log('\n✅  Listo. Rebuild en Netlify disparado por el webhook.\n');
}

main().catch(err => { console.error(err); process.exit(1); });
