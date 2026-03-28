/**
 * storyblok.ts — Cliente API y tipos TypeScript
 * Docs: https://www.storyblok.com/docs/api/content-delivery/v2
 */
import { useStoryblokApi } from '@storyblok/astro';

// ── Tipos primitivos de Storyblok ────────────────────────────────────────────

export interface AssetStoryblok {
  id?: number;
  alt?: string;
  name?: string;
  focus?: string;
  title?: string;
  filename: string;
  copyright?: string;
  fieldtype?: string;
}

export interface LinkStoryblok {
  id?: string;
  url: string;
  target?: '_self' | '_blank';
  linktype?: 'url' | 'story' | 'asset' | 'email';
  cached_url?: string;
}

export interface ISbRichtext {
  type: string;
  content?: ISbRichtext[];
  marks?: ISbRichtext[];
  attrs?: Record<string, unknown>;
  text?: string;
}

// ── Content Types ────────────────────────────────────────────────────────────

export type ServiceSlug = 'web_app' | 'mobile' | 'iot' | 'ux_ui' | 'saas';

export interface Project {
  title: string;
  slug: string;
  summary: string;
  description: ISbRichtext;
  cover_image: AssetStoryblok;
  gallery?: AssetStoryblok[];
  services: ServiceSlug[];
  tech_stack?: string[];
  client_name?: string;
  client_logo?: AssetStoryblok;
  url?: LinkStoryblok;
  featured: boolean;
  published_at: string;
  component: 'project';
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: AssetStoryblok;
  linkedin?: LinkStoryblok;
  github?: LinkStoryblok;
  order: number;
  component: 'team_member';
}

export interface Service {
  title: string;
  slug: string;
  short_desc: string;
  long_desc?: ISbRichtext;
  icon: string;
  order: number;
  component: 'service';
}

// ── Story wrapper ────────────────────────────────────────────────────────────

export interface StoryblokStory<T> {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  full_slug: string;
  content: T;
  published_at: string | null;
  created_at: string;
  tag_list: string[];
}

// ── Funciones de fetching ────────────────────────────────────────────────────

/**
 * Obtiene todos los proyectos.
 * @param featured - Si es true, filtra solo proyectos destacados para el home.
 */
export async function getProjects(featured?: boolean): Promise<StoryblokStory<Project>[]> {
  const storyblok = useStoryblokApi();

  const params: Record<string, unknown> = {
    version: (import.meta.env.DEV ? 'draft' : 'published') as 'draft' | 'published',
    content_type: 'project',
    sort_by: 'content.published_at:desc',
    per_page: 100,
  };

  if (featured) {
    params.filter_query = {
      featured: { in: 'true' },
    };
  }

  const { data } = await storyblok.get('cdn/stories', params);
  return data.stories as StoryblokStory<Project>[];
}

/**
 * Obtiene un proyecto por slug.
 */
export async function getProject(slug: string): Promise<StoryblokStory<Project> | null> {
  try {
    const storyblok = useStoryblokApi();
    const { data } = await storyblok.get(`cdn/stories/projects/${slug}`, {
      version: (import.meta.env.DEV ? 'draft' : 'published') as 'draft' | 'published',
    });
    return data.story as StoryblokStory<Project>;
  } catch {
    return null;
  }
}

/**
 * Obtiene todos los miembros del equipo ordenados por `order`.
 */
export async function getTeamMembers(): Promise<StoryblokStory<TeamMember>[]> {
  const storyblok = useStoryblokApi();
  const { data } = await storyblok.get('cdn/stories', {
    version: (import.meta.env.DEV ? 'draft' : 'published') as 'draft' | 'published',
    content_type: 'team_member',
    sort_by: 'content.order:asc',
    per_page: 50,
  });
  return data.stories as StoryblokStory<TeamMember>[];
}

/**
 * Obtiene todos los servicios ordenados por `order`.
 */
export async function getServices(): Promise<StoryblokStory<Service>[]> {
  const storyblok = useStoryblokApi();
  const { data } = await storyblok.get('cdn/stories', {
    version: (import.meta.env.DEV ? 'draft' : 'published') as 'draft' | 'published',
    content_type: 'service',
    sort_by: 'content.order:asc',
    per_page: 20,
  });
  return data.stories as StoryblokStory<Service>[];
}

/**
 * Obtiene los slugs de todos los proyectos para getStaticPaths().
 */
export async function getProjectSlugs(): Promise<string[]> {
  const storyblok = useStoryblokApi();
  const { data } = await storyblok.get('cdn/stories', {
    version: (import.meta.env.DEV ? 'draft' : 'published') as 'draft' | 'published',
    content_type: 'project',
    per_page: 100,
  });
  return (data.stories as StoryblokStory<Project>[]).map((s) => s.slug);
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Convierte el filename de un asset Storyblok a una URL optimizada.
 * Agrega transformaciones de imagen si se proveen dimensiones.
 */
export function getImageUrl(
  asset: AssetStoryblok,
  options?: { width?: number; height?: number; smart?: boolean }
): string {
  if (!asset?.filename) return '';

  let url = asset.filename;

  if (options) {
    const { width = 0, height = 0, smart = true } = options;
    url = `${url}/m/${width}x${height}${smart ? '/smart' : ''}`;
  }

  return url;
}

/**
 * Labels legibles para los slugs de servicios.
 */
export const SERVICE_LABELS: Record<ServiceSlug, string> = {
  web_app: 'Web App',
  mobile: 'App Móvil',
  iot: 'IoT / Domótica',
  ux_ui: 'UX/UI',
  saas: 'SaaS',
};
