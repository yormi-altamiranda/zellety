/**
 * mock-data.ts — Datos de ejemplo para desarrollo sin Storyblok token.
 * Misma shape que los content types definidos en lib/storyblok.ts.
 * Reemplazar por llamadas reales a Storyblok cuando el token esté disponible.
 */

export interface MockProject {
  title: string;
  slug: string;
  summary: string;
  description: string;
  cover_image: { filename: string; alt: string };
  services: ('web_app' | 'mobile' | 'iot' | 'ux_ui' | 'saas')[];
  tech_stack: string[];
  client_name: string;
  url: string;
  featured: boolean;
  published_at: string; // ISO 8601
  year: number;
  month: string;
  link: string;
}

export const mockProjects: MockProject[] = [
  {
    title: 'Tienda E-Commerce',
    slug: 'tienda-ecommerce',
    summary: 'Plataforma de comercio electrónico con más de 5,000 SKUs, pagos integrados y panel de administración personalizado.',
    description: 'Desarrollamos una tienda online completa para una marca de moda latinoamericana. La plataforma incluye catálogo avanzado, carrito persistente, integración con MercadoPago y Stripe, panel de admin con métricas en tiempo real y sistema de gestión de inventario.',
    cover_image: {
      filename: 'https://picsum.photos/seed/proj-ecommerce/800/500',
      alt: 'Tienda E-Commerce',
    },
    services: ['web_app', 'ux_ui'],
    tech_stack: ['Next.js', 'Supabase', 'Stripe', 'MercadoPago', 'Figma'],
    client_name: 'ModaLatam',
    url: 'https://modalatam.com',
    featured: true,
    published_at: '2024-03-12T00:00:00Z',
    year: 2024,
    month: 'Mar',
    link: '/projects/tienda-ecommerce',
  },
  {
    title: 'App Domótica',
    slug: 'app-domotica',
    summary: 'Control de hogar inteligente para iOS y Android. Automatización de luces, clima y seguridad desde una sola app.',
    description: 'Aplicación móvil para control de dispositivos IoT del hogar. Incluye paneles de control en tiempo real, automatizaciones programadas, notificaciones push, integración con sensores de temperatura/movimiento y compatibilidad con Alexa y Google Home.',
    cover_image: {
      filename: 'https://picsum.photos/seed/proj-iot/800/500',
      alt: 'App Domótica',
    },
    services: ['mobile', 'iot'],
    tech_stack: ['Flutter', 'MQTT', 'Node.js', 'Firebase', 'Figma'],
    client_name: 'SmartHome MX',
    url: 'https://smarthomemx.com',
    featured: true,
    published_at: '2024-01-08T00:00:00Z',
    year: 2024,
    month: 'Ene',
    link: '/projects/app-domotica',
  },
  {
    title: 'SaaS de Gestión',
    slug: 'saas-gestion',
    summary: 'Plataforma multi-tenant para gestión de equipos y proyectos con billing integrado y dashboards en tiempo real.',
    description: 'SaaS B2B para equipos de producto. Incluye workspace multi-tenant, gestión de proyectos con kanban, time tracking, reportes avanzados, facturación automática con Stripe y onboarding guiado. Arquitectura serverless con autoscaling.',
    cover_image: {
      filename: 'https://picsum.photos/seed/proj-saas/800/500',
      alt: 'SaaS de Gestión',
    },
    services: ['saas', 'ux_ui'],
    tech_stack: ['Nuxt.js', 'Supabase', 'Stripe', 'Tailwind', 'Figma'],
    client_name: 'TeamFlow',
    url: 'https://teamflow.app',
    featured: true,
    published_at: '2023-11-24T00:00:00Z',
    year: 2023,
    month: 'Nov',
    link: '/projects/saas-gestion',
  },
  {
    title: 'Rediseño Fintech',
    slug: 'rediseno-fintech',
    summary: 'Research, design system y prototipo interactivo completo para startup fintech de pagos en LATAM.',
    description: 'Proyecto de UX/UI end-to-end para una fintech colombiana. Incluye investigación con usuarios, definición de flujos, diseño de componentes, design system documentado en Figma, prototipo interactivo y handoff a desarrollo.',
    cover_image: {
      filename: 'https://picsum.photos/seed/proj-fintech/800/500',
      alt: 'Rediseño Fintech',
    },
    services: ['ux_ui'],
    tech_stack: ['Figma', 'FigJam', 'Maze', 'Lottie'],
    client_name: 'PagoCO',
    url: 'https://pagoco.io',
    featured: false,
    published_at: '2023-09-05T00:00:00Z',
    year: 2023,
    month: 'Sep',
    link: '/projects/rediseno-fintech',
  },
  {
    title: 'App Fitness',
    slug: 'app-fitness',
    summary: 'Seguimiento de entrenamiento y nutrición para iOS y Android con planes personalizados generados por IA.',
    description: 'Aplicación de fitness con seguimiento de rutinas, contador de calorías, integración con Apple Health y Google Fit, planes de entrenamiento generados con IA, comunidad social y challenges. Flutter con backend en NestJS.',
    cover_image: {
      filename: 'https://picsum.photos/seed/proj-fitness/800/500',
      alt: 'App Fitness',
    },
    services: ['mobile', 'ux_ui'],
    tech_stack: ['Flutter', 'NestJS', 'PostgreSQL', 'OpenAI', 'Figma'],
    client_name: 'FitLatam',
    url: 'https://fitlatam.app',
    featured: false,
    published_at: '2023-07-18T00:00:00Z',
    year: 2023,
    month: 'Jul',
    link: '/projects/app-fitness',
  },
  {
    title: 'Portal Corporativo',
    slug: 'portal-corporativo',
    summary: 'Sitio web corporativo con CMS headless, blog y landing pages optimizadas para conversión.',
    description: 'Portal web para empresa de consultoría con más de 200 empleados. Incluye home animado, secciones de servicios, blog con CMS (Storyblok), landing pages A/B, formularios con Netlify, integración con HubSpot y métricas de conversión.',
    cover_image: {
      filename: 'https://picsum.photos/seed/proj-corporate/800/500',
      alt: 'Portal Corporativo',
    },
    services: ['web_app', 'ux_ui'],
    tech_stack: ['AstroJS', 'Storyblok', 'UnoCSS', 'GSAP', 'Netlify'],
    client_name: 'ConsultaCorp',
    url: 'https://consultacorp.com',
    featured: false,
    published_at: '2023-05-30T00:00:00Z',
    year: 2023,
    month: 'May',
    link: '/projects/portal-corporativo',
  },
];

export const getFeaturedProjects = () => mockProjects.filter(p => p.featured);
export const getAllProjects      = () => mockProjects;
