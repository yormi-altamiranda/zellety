/**
 * seed-storyblok.mjs
 * Crea las carpetas y stories iniciales en Storyblok via Management API.
 *
 * Uso:
 *   node --env-file=.env scripts/seed-storyblok.mjs
 *
 * Requiere en .env:
 *   SB_SPACE_ID         = ID del space (Settings → General)
 *   SB_MANAGEMENT_TOKEN = Personal Access Token (My Account → Personal access tokens)
 *                         ⚠️  El STORYBLOK_TOKEN (Content Delivery) NO funciona aquí.
 */

const SPACE_ID = process.env.SB_SPACE_ID;
const TOKEN    = process.env.SB_MANAGEMENT_TOKEN;

if (!SPACE_ID || !TOKEN) {
  console.error('❌  Faltan variables de entorno. Añade al .env:');
  console.error('   SB_SPACE_ID=...');
  console.error('   SB_MANAGEMENT_TOKEN=...');
  process.exit(1);
}

const BASE = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;

const headers = {
  'Content-Type': 'application/json',
  Authorization: TOKEN,
};

// ── Helpers ───────────────────────────────────────────────────────────────────

async function request(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }

  if (!res.ok) {
    console.error(`❌  ${method} ${path} → ${res.status}`, json);
    if (res.status === 401) {
      console.error('\n⚠️  Token inválido. Necesitas un Personal Access Token (no el Content Delivery token).');
      console.error('   Ve a: My Account → Personal access tokens → Generate new token\n');
    }
    process.exit(1);
  }

  return json;
}

async function createFolder(name, slug, parentId = 0) {
  console.log(`📁  Creando carpeta "${name}"…`);
  const { story } = await request('POST', '/stories/', {
    story: {
      name,
      slug,
      is_folder: true,
      parent_id: parentId,
      default_root: '',
    },
  });
  console.log(`    ✓ id=${story.id}  slug=${story.full_slug}`);
  return story;
}

async function createStory(name, slug, parentId, component, content) {
  console.log(`📄  Creando story "${name}"…`);
  const { story } = await request('POST', '/stories/', {
    story: {
      name,
      slug,
      parent_id: parentId,
      content: { component, ...content },
    },
    publish: 1,
  });
  console.log(`    ✓ id=${story.id}  slug=${story.full_slug}`);
  return story;
}

// ── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  { name: 'Web App',         slug: 'web-app', short_desc: 'Corporativos, e-commerce y plataformas con Nuxt, Next y AstroJS. Rápidos, accesibles y optimizados.', icon: 'mdi:web',              order: 1 },
  { name: 'App Móvil',       slug: 'mobile',  short_desc: 'Aplicaciones nativas con Flutter. iOS y Android desde un solo codebase. Del prototipo al store.',       icon: 'mdi:cellphone',        order: 2 },
  { name: 'IoT / Domótica',  slug: 'iot',     short_desc: 'Automatización de hogares y oficinas. Sensores, dashboards y control remoto en tiempo real.',           icon: 'mdi:home-automation',  order: 3 },
  { name: 'UX/UI',           slug: 'ux-ui',   short_desc: 'Research, wireframes, prototipos y design systems en Figma. Cada pixel tiene un propósito.',            icon: 'mdi:pencil-ruler',     order: 4 },
  { name: 'SaaS',            slug: 'saas',    short_desc: 'Plataformas multi-tenant con billing, auth y dashboards. Del MVP al producto que escala.',              icon: 'mdi:cloud-outline',    order: 5 },
];

const TEAM = [
  {
    name: 'Miembro Equipo 1',
    slug: 'miembro-1',
    content: {
      name: 'Nombre Apellido',
      role: 'CEO & Co-founder',
      bio: 'Nuestro equipo de liderazgo está impulsado por una visión clara y un compromiso inquebrantable con la misión de Zellety.',
      photo: { filename: 'https://picsum.photos/seed/team-ceo/600/700', alt: 'CEO' },
      order: 1,
    },
  },
  {
    name: 'Miembro Equipo 2',
    slug: 'miembro-2',
    content: {
      name: 'Nombre Apellido',
      role: 'CTO & Co-founder',
      bio: 'Arquitecto de soluciones con más de 8 años construyendo plataformas para startups y empresas en LATAM.',
      photo: { filename: 'https://picsum.photos/seed/team-cto/600/700', alt: 'CTO' },
      order: 2,
    },
  },
  {
    name: 'Miembro Equipo 3',
    slug: 'miembro-3',
    content: {
      name: 'Nombre Apellido',
      role: 'Lead UX/UI Designer',
      bio: 'Diseñando experiencias que convierten. Research, prototipos y design systems que hablan el idioma del usuario.',
      photo: { filename: 'https://picsum.photos/seed/team-design/600/700', alt: 'Designer' },
      order: 3,
    },
  },
];

const PROJECTS = [
  {
    name: 'Tienda E-Commerce',
    slug: 'tienda-ecommerce',
    content: {
      title: 'Tienda E-Commerce',
      summary: 'Plataforma de comercio electrónico con más de 5,000 SKUs, pagos integrados y panel de administración personalizado.',
      description: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Desarrollamos una tienda online completa para una marca de moda latinoamericana. La plataforma incluye catálogo avanzado, carrito persistente, integración con MercadoPago y Stripe, panel de admin con métricas en tiempo real y sistema de gestión de inventario.' }] }] },
      cover_image: { filename: 'https://picsum.photos/seed/proj-ecommerce/1200/675', alt: 'Tienda E-Commerce' },
      services: ['web_app', 'ux_ui'],
      tech_stack: ['Next.js', 'Supabase', 'Stripe', 'MercadoPago', 'Figma'],
      client_name: 'ModaLatam',
      url: { url: 'https://modalatam.com', linktype: 'url', target: '_blank' },
      featured: true,
      published_at: '2024-03-12 00:00',
    },
  },
  {
    name: 'App Domótica',
    slug: 'app-domotica',
    content: {
      title: 'App Domótica',
      summary: 'Control de hogar inteligente para iOS y Android. Automatización de luces, clima y seguridad desde una sola app.',
      description: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Aplicación móvil para control de dispositivos IoT del hogar. Incluye paneles en tiempo real, automatizaciones programadas, notificaciones push y compatibilidad con Alexa y Google Home.' }] }] },
      cover_image: { filename: 'https://picsum.photos/seed/proj-iot/1200/675', alt: 'App Domótica' },
      services: ['mobile', 'iot'],
      tech_stack: ['Flutter', 'MQTT', 'Node.js', 'Firebase', 'Figma'],
      client_name: 'SmartHome MX',
      url: { url: 'https://smarthomemx.com', linktype: 'url', target: '_blank' },
      featured: true,
      published_at: '2024-01-08 00:00',
    },
  },
  {
    name: 'SaaS de Gestión',
    slug: 'saas-gestion',
    content: {
      title: 'SaaS de Gestión',
      summary: 'Plataforma multi-tenant para gestión de equipos y proyectos con billing integrado y dashboards en tiempo real.',
      description: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'SaaS B2B para equipos de producto. Incluye workspace multi-tenant, gestión de proyectos con kanban, time tracking, facturación automática con Stripe y onboarding guiado.' }] }] },
      cover_image: { filename: 'https://picsum.photos/seed/proj-saas/1200/675', alt: 'SaaS de Gestión' },
      services: ['saas', 'ux_ui'],
      tech_stack: ['Nuxt.js', 'Supabase', 'Stripe', 'Tailwind', 'Figma'],
      client_name: 'TeamFlow',
      url: { url: 'https://teamflow.app', linktype: 'url', target: '_blank' },
      featured: true,
      published_at: '2023-11-24 00:00',
    },
  },
  {
    name: 'Rediseño Fintech',
    slug: 'rediseno-fintech',
    content: {
      title: 'Rediseño Fintech',
      summary: 'Research, design system y prototipo interactivo completo para startup fintech de pagos en LATAM.',
      description: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Proyecto de UX/UI end-to-end para una fintech colombiana. Incluye investigación con usuarios, flujos, design system documentado en Figma y prototipo interactivo.' }] }] },
      cover_image: { filename: 'https://picsum.photos/seed/proj-fintech/1200/675', alt: 'Rediseño Fintech' },
      services: ['ux_ui'],
      tech_stack: ['Figma', 'FigJam', 'Maze', 'Lottie'],
      client_name: 'PagoCO',
      url: { url: 'https://pagoco.io', linktype: 'url', target: '_blank' },
      featured: false,
      published_at: '2023-09-05 00:00',
    },
  },
  {
    name: 'App Fitness',
    slug: 'app-fitness',
    content: {
      title: 'App Fitness',
      summary: 'Seguimiento de entrenamiento y nutrición para iOS y Android con planes personalizados generados por IA.',
      description: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Aplicación de fitness con seguimiento de rutinas, contador de calorías, integración con Apple Health y Google Fit, planes de entrenamiento con IA y comunidad social.' }] }] },
      cover_image: { filename: 'https://picsum.photos/seed/proj-fitness/1200/675', alt: 'App Fitness' },
      services: ['mobile', 'ux_ui'],
      tech_stack: ['Flutter', 'NestJS', 'PostgreSQL', 'OpenAI', 'Figma'],
      client_name: 'FitLatam',
      url: { url: 'https://fitlatam.app', linktype: 'url', target: '_blank' },
      featured: false,
      published_at: '2023-07-18 00:00',
    },
  },
  {
    name: 'Portal Corporativo',
    slug: 'portal-corporativo',
    content: {
      title: 'Portal Corporativo',
      summary: 'Sitio web corporativo con CMS headless, blog y landing pages optimizadas para conversión.',
      description: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Portal web para empresa de consultoría. Incluye home animado, blog con CMS Storyblok, landing pages A/B, formularios Netlify e integración con HubSpot.' }] }] },
      cover_image: { filename: 'https://picsum.photos/seed/proj-corporate/1200/675', alt: 'Portal Corporativo' },
      services: ['web_app', 'ux_ui'],
      tech_stack: ['AstroJS', 'Storyblok', 'UnoCSS', 'GSAP', 'Netlify'],
      client_name: 'ConsultaCorp',
      url: { url: 'https://consultacorp.com', linktype: 'url', target: '_blank' },
      featured: false,
      published_at: '2023-05-30 00:00',
    },
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🚀  Seeding Storyblok space ${SPACE_ID}\n`);

  // Carpetas
  const servicesFolder = await createFolder('Services', 'services');
  const teamFolder     = await createFolder('Team',     'team');
  const projectsFolder = await createFolder('Projects', 'projects');

  console.log('');

  // Servicios
  console.log('── Servicios ──');
  for (const s of SERVICES) {
    await createStory(s.name, s.slug, servicesFolder.id, 'service', {
      title:      s.name,
      slug:       s.slug,
      short_desc: s.short_desc,
      icon:       s.icon,
      order:      s.order,
    });
  }

  console.log('');

  // Equipo
  console.log('── Equipo ──');
  for (const m of TEAM) {
    await createStory(m.name, m.slug, teamFolder.id, 'team_member', m.content);
  }

  console.log('');

  // Proyectos
  console.log('── Proyectos ──');
  for (const p of PROJECTS) {
    await createStory(p.name, p.slug, projectsFolder.id, 'project', p.content);
  }

  console.log('\n✅  Seed completo.\n');
}

main().catch(err => { console.error(err); process.exit(1); });
