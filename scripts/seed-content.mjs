/**
 * seed-content.mjs
 * Sube proyectos, equipo, servicios y testimonios a Storyblok.
 * Uso: node --env-file=.env scripts/seed-content.mjs
 */

const SPACE_ID = process.env.SB_SPACE_ID;
const TOKEN    = process.env.SB_MANAGEMENT_TOKEN;

if (!SPACE_ID || !TOKEN) {
  console.error('❌  Faltan SB_SPACE_ID o SB_MANAGEMENT_TOKEN en .env');
  process.exit(1);
}

const BASE    = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;
const HEADERS = { 'Content-Type': 'application/json', Authorization: TOKEN };

async function req(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: HEADERS,
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) {
    console.error(`❌  ${method} ${path} → ${res.status}`, JSON.stringify(json).slice(0, 300));
    return null;
  }
  return json;
}

// Crea o devuelve ID de una carpeta (story con is_folder: true)
async function ensureFolder(name, slug, parentId = 0) {
  const list = await req('GET', `/stories/?with_slug=${slug}`);
  if (list?.stories?.length > 0) {
    const folder = list.stories[0];
    console.log(`  📁  Carpeta existente: ${slug} (id: ${folder.id})`);
    return folder.id;
  }
  const res = await req('POST', '/stories/', {
    story: { name, slug, is_folder: true, parent_id: parentId },
  });
  if (!res) return 0;
  console.log(`  📁  Carpeta creada: ${slug} (id: ${res.story.id})`);
  return res.story.id;
}

// Crea una story y la publica
async function createStory(name, slug, content, parentId = 0) {
  const res = await req('POST', '/stories/', {
    story: { name, slug, content, parent_id: parentId },
    publish: 1,
  });
  if (res) console.log(`  ✅  ${res.story.full_slug}`);
  return res;
}

// Richtext mínimo válido para Storyblok
function richtext(text) {
  return {
    type: 'doc',
    content: [{
      type: 'paragraph',
      content: [{ type: 'text', text }],
    }],
  };
}

// ── DATOS ────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    name: 'Tienda E-Commerce',
    slug: 'tienda-ecommerce',
    content: {
      component: 'project',
      title: 'Tienda E-Commerce',
      summary: 'Plataforma de comercio electrónico con más de 5,000 SKUs, pagos integrados y panel de administración personalizado.',
      description: richtext('Desarrollamos una tienda online completa para una marca de moda latinoamericana. La plataforma incluye catálogo avanzado, carrito persistente, integración con MercadoPago y Stripe, panel de admin con métricas en tiempo real y sistema de gestión de inventario.'),
      cover_image: { filename: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80', alt: 'Tienda E-Commerce' },
      services: ['web_app', 'ux_ui'],
      tech_stack: ['Next.js', 'Supabase', 'Stripe', 'MercadoPago', 'Figma'],
      client_name: 'ModaLatam',
      url: { url: 'https://modalatam.com', linktype: 'url' },
      featured: true,
      published_at: '2024-03-12T00:00:00.000Z',
    },
  },
  {
    name: 'App Domótica',
    slug: 'app-domotica',
    content: {
      component: 'project',
      title: 'App Domótica',
      summary: 'Control de hogar inteligente para iOS y Android. Automatización de luces, clima y seguridad desde una sola app.',
      description: richtext('Aplicación móvil para control de dispositivos IoT del hogar. Incluye paneles de control en tiempo real, automatizaciones programadas, notificaciones push, integración con sensores de temperatura/movimiento y compatibilidad con Alexa y Google Home.'),
      cover_image: { filename: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', alt: 'App Domótica' },
      services: ['mobile', 'iot'],
      tech_stack: ['Flutter', 'MQTT', 'Node.js', 'Firebase', 'Figma'],
      client_name: 'SmartHome MX',
      url: { url: 'https://smarthomemx.com', linktype: 'url' },
      featured: true,
      published_at: '2024-01-08T00:00:00.000Z',
    },
  },
  {
    name: 'SaaS de Gestión',
    slug: 'saas-gestion',
    content: {
      component: 'project',
      title: 'SaaS de Gestión',
      summary: 'Plataforma multi-tenant para gestión de equipos y proyectos con billing integrado y dashboards en tiempo real.',
      description: richtext('SaaS B2B para equipos de producto. Incluye workspace multi-tenant, gestión de proyectos con kanban, time tracking, reportes avanzados, facturación automática con Stripe y onboarding guiado. Arquitectura serverless con autoscaling.'),
      cover_image: { filename: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80', alt: 'SaaS de Gestión' },
      services: ['saas', 'ux_ui'],
      tech_stack: ['Nuxt.js', 'Supabase', 'Stripe', 'Tailwind', 'Figma'],
      client_name: 'TeamFlow',
      url: { url: 'https://teamflow.app', linktype: 'url' },
      featured: true,
      published_at: '2023-11-24T00:00:00.000Z',
    },
  },
  {
    name: 'Rediseño Fintech',
    slug: 'rediseno-fintech',
    content: {
      component: 'project',
      title: 'Rediseño Fintech',
      summary: 'Research, design system y prototipo interactivo completo para startup fintech de pagos en LATAM.',
      description: richtext('Proyecto de UX/UI end-to-end para una fintech colombiana. Incluye investigación con usuarios, definición de flujos, diseño de componentes, design system documentado en Figma, prototipo interactivo y handoff a desarrollo.'),
      cover_image: { filename: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80', alt: 'Rediseño Fintech' },
      services: ['ux_ui'],
      tech_stack: ['Figma', 'FigJam', 'Maze', 'Lottie'],
      client_name: 'PagoCO',
      url: { url: 'https://pagoco.io', linktype: 'url' },
      featured: false,
      published_at: '2023-09-05T00:00:00.000Z',
    },
  },
  {
    name: 'App Fitness',
    slug: 'app-fitness',
    content: {
      component: 'project',
      title: 'App Fitness',
      summary: 'Seguimiento de entrenamiento y nutrición para iOS y Android con planes personalizados generados por IA.',
      description: richtext('Aplicación de fitness con seguimiento de rutinas, contador de calorías, integración con Apple Health y Google Fit, planes de entrenamiento generados con IA, comunidad social y challenges. Flutter con backend en NestJS.'),
      cover_image: { filename: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80', alt: 'App Fitness' },
      services: ['mobile', 'ux_ui'],
      tech_stack: ['Flutter', 'NestJS', 'PostgreSQL', 'OpenAI', 'Figma'],
      client_name: 'FitLatam',
      url: { url: 'https://fitlatam.app', linktype: 'url' },
      featured: false,
      published_at: '2023-07-18T00:00:00.000Z',
    },
  },
  {
    name: 'Portal Corporativo',
    slug: 'portal-corporativo',
    content: {
      component: 'project',
      title: 'Portal Corporativo',
      summary: 'Sitio web corporativo con CMS headless, blog y landing pages optimizadas para conversión.',
      description: richtext('Portal web para empresa de consultoría con más de 200 empleados. Incluye home animado, secciones de servicios, blog con CMS (Storyblok), landing pages A/B, formularios con Netlify, integración con HubSpot y métricas de conversión.'),
      cover_image: { filename: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80', alt: 'Portal Corporativo' },
      services: ['web_app', 'ux_ui'],
      tech_stack: ['AstroJS', 'Storyblok', 'UnoCSS', 'GSAP', 'Netlify'],
      client_name: 'ConsultaCorp',
      url: { url: 'https://consultacorp.com', linktype: 'url' },
      featured: false,
      published_at: '2023-05-30T00:00:00.000Z',
    },
  },
];

const TEAM = [
  {
    name: 'CEO & Co-founder',
    slug: 'ceo-co-founder',
    content: {
      component: 'team_member',
      name: 'Nombre Apellido',
      role: 'CEO & Co-founder',
      bio: 'Lidera la visión y estrategia de Zellety. Más de 10 años construyendo productos digitales en LATAM con startups y corporativos.',
      photo: { filename: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', alt: 'CEO' },
      linkedin: { url: 'https://linkedin.com', linktype: 'url' },
      order: 1,
    },
  },
  {
    name: 'CTO & Co-founder',
    slug: 'cto-co-founder',
    content: {
      component: 'team_member',
      name: 'Nombre Apellido',
      role: 'CTO & Co-founder',
      bio: 'Arquitecto de soluciones con más de 8 años construyendo plataformas para startups y empresas en LATAM.',
      photo: { filename: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80', alt: 'CTO' },
      linkedin: { url: 'https://linkedin.com', linktype: 'url' },
      github:   { url: 'https://github.com', linktype: 'url' },
      order: 2,
    },
  },
  {
    name: 'Lead UX/UI Designer',
    slug: 'lead-ux-designer',
    content: {
      component: 'team_member',
      name: 'Nombre Apellido',
      role: 'Lead UX/UI Designer',
      bio: 'Diseñando experiencias que convierten. Research, prototipos y design systems que hablan el idioma del usuario.',
      photo: { filename: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80', alt: 'Designer' },
      linkedin: { url: 'https://linkedin.com', linktype: 'url' },
      order: 3,
    },
  },
];

const SERVICES = [
  {
    name: 'Web App',
    slug: 'web-app',
    content: {
      component: 'service',
      title: 'Web App',
      slug: 'web_app',
      short_desc: 'Corporativos, e-commerce y plataformas con Nuxt, Next y AstroJS. De la idea al deployment en semanas.',
      icon: 'mdi:web',
      order: 1,
    },
  },
  {
    name: 'App Móvil',
    slug: 'app-movil',
    content: {
      component: 'service',
      title: 'App Móvil',
      slug: 'mobile',
      short_desc: 'Aplicaciones nativas con Flutter. iOS y Android desde un solo codebase. Sin comprometer la velocidad.',
      icon: 'mdi:cellphone',
      order: 2,
    },
  },
  {
    name: 'IoT / Domótica',
    slug: 'iot-domotica',
    content: {
      component: 'service',
      title: 'IoT / Domótica',
      slug: 'iot',
      short_desc: 'Automatización de hogares y oficinas inteligentes. Integramos sensores, actuadores y control remoto en tiempo real.',
      icon: 'mdi:home-automation',
      order: 3,
    },
  },
  {
    name: 'UX/UI',
    slug: 'ux-ui',
    content: {
      component: 'service',
      title: 'UX/UI',
      slug: 'ux_ui',
      short_desc: 'Research, wireframes, prototipos y design systems en Figma. Cada píxel tiene un por qué.',
      icon: 'mdi:pencil-ruler',
      order: 4,
    },
  },
  {
    name: 'SaaS',
    slug: 'saas',
    content: {
      component: 'service',
      title: 'SaaS',
      slug: 'saas',
      short_desc: 'Plataformas multi-tenant con billing, auth y dashboards. Del MVP al WP si el producto que escala.',
      icon: 'mdi:cloud-outline',
      order: 5,
    },
  },
];

const TESTIMONIALS = [
  {
    name: 'Carlos Mendoza — CEO FinTech Andina',
    slug: 'carlos-mendoza',
    content: {
      component: 'testimonial',
      card_type: 'quote',
      name: 'Carlos Mendoza',
      role: 'CEO · FinTech Andina',
      quote: 'Zellety transformó nuestra plataforma por completo. El equipo entendió nuestras necesidades desde el día uno y entregó un producto que superó todas las expectativas.',
      avatar: { filename: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80', alt: 'Carlos Mendoza' },
      order: 1,
    },
  },
  {
    name: 'Valeria Torres — CPO Novatech MX',
    slug: 'valeria-torres',
    content: {
      component: 'testimonial',
      card_type: 'quote',
      name: 'Valeria Torres',
      role: 'CPO · Novatech MX',
      quote: 'La calidad del diseño UX/UI fue impresionante. Cada pantalla está pensada con detalle. Nuestros usuarios notaron el cambio de inmediato y el NPS subió 40 puntos.',
      avatar: { filename: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80', alt: 'Valeria Torres' },
      order: 2,
    },
  },
  {
    name: 'Diego Ramírez — CTO SmartHome CO',
    slug: 'diego-ramirez',
    content: {
      component: 'testimonial',
      card_type: 'photo',
      name: 'Diego Ramírez',
      role: 'CTO · SmartHome CO',
      photo:  { filename: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80', alt: 'Diego Ramírez' },
      avatar: { filename: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&q=80', alt: 'Diego Ramírez' },
      order: 3,
    },
  },
  {
    name: 'Sofía Gutiérrez — Founder EduLab AR',
    slug: 'sofia-gutierrez',
    content: {
      component: 'testimonial',
      card_type: 'quote',
      name: 'Sofía Gutiérrez',
      role: 'Founder · EduLab AR',
      quote: 'No solo construyeron lo que pedimos, sino que propusieron mejoras que ni habíamos contemplado. El resultado es un producto del que estamos muy orgullosos.',
      avatar: { filename: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&q=80', alt: 'Sofía Gutiérrez' },
      order: 4,
    },
  },
  {
    name: 'Andrés Peña — Head of Product TeamFlow',
    slug: 'andres-pena',
    content: {
      component: 'testimonial',
      card_type: 'photo',
      name: 'Andrés Peña',
      role: 'Head of Product · TeamFlow',
      photo:  { filename: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', alt: 'Andrés Peña' },
      avatar: { filename: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80', alt: 'Andrés Peña' },
      order: 5,
    },
  },
  {
    name: 'Mariana López — Marketing Director ModaLatam',
    slug: 'mariana-lopez',
    content: {
      component: 'testimonial',
      card_type: 'quote',
      name: 'Mariana López',
      role: 'Marketing Director · ModaLatam',
      quote: 'Nuestra tienda e-commerce pasó de ser un sitio básico a una plataforma de alto rendimiento. Las ventas online aumentaron un 80% en tres meses.',
      avatar: { filename: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80', alt: 'Mariana López' },
      order: 6,
    },
  },
  {
    name: 'Ricardo Silva — CEO Inversa',
    slug: 'ricardo-silva',
    content: {
      component: 'testimonial',
      card_type: 'photo',
      name: 'Ricardo Silva',
      role: 'CEO · Inversa',
      photo:  { filename: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&q=80', alt: 'Ricardo Silva' },
      avatar: { filename: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=80&q=80', alt: 'Ricardo Silva' },
      order: 7,
    },
  },
];

// ── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🚀  Seeding Storyblok content…\n');

  // ── Proyectos ─────────────────────────────────────────────────────────────
  console.log('📦  PROYECTOS');
  const projectsFolderId = await ensureFolder('Projects', 'projects');
  for (const p of PROJECTS) {
    await createStory(p.name, p.slug, p.content, projectsFolderId);
    await new Promise(r => setTimeout(r, 300)); // rate limit
  }

  // ── Equipo ────────────────────────────────────────────────────────────────
  console.log('\n👥  EQUIPO');
  const teamFolderId = await ensureFolder('Team', 'team');
  for (const m of TEAM) {
    await createStory(m.name, m.slug, m.content, teamFolderId);
    await new Promise(r => setTimeout(r, 300));
  }

  // ── Servicios ─────────────────────────────────────────────────────────────
  console.log('\n⚙️   SERVICIOS');
  const servicesFolderId = await ensureFolder('Services', 'services');
  for (const s of SERVICES) {
    await createStory(s.name, s.slug, s.content, servicesFolderId);
    await new Promise(r => setTimeout(r, 300));
  }

  // ── Testimonios ───────────────────────────────────────────────────────────
  console.log('\n💬  TESTIMONIOS');
  const testimonialsFolderId = await ensureFolder('Testimonials', 'testimonials');
  for (const t of TESTIMONIALS) {
    await createStory(t.name, t.slug, t.content, testimonialsFolderId);
    await new Promise(r => setTimeout(r, 300));
  }

  console.log('\n✅  ¡Seed completo!\n');
}

main().catch(e => { console.error(e); process.exit(1); });
