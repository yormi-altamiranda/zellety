# Zellety — zellety.com

## Stack
- AstroJS (framework base, SSG)
- VueJS 3 (islas reactivas con @astrojs/vue)
- Storyblok (headless CMS — proyectos, team, services)
- UnoCSS (atomic CSS + theming)
- Iconify (íconos on-demand)
- GSAP (animaciones hero y scroll)
- TypeScript

## Tipografía
- Display/títulos: Stack Sans Notch → var(--font-display)
- Body/UI: Inter → var(--font-body)

## Estructura de páginas
- / → Hero, About Us, Services, Work, Team, Contact (Netlify Form)
- /projects → grid de proyectos desde Storyblok
- /projects/[slug] → single proyecto

## Arquitectura src/
- components/ → Vue islands: ServiceCard, ProjectCard, ContactForm
- layouts/ → BaseLayout.astro, PageLayout.astro
- pages/ → index.astro, projects/index.astro, projects/[slug].astro
- sections/ → Hero.astro, About.astro, Services.astro, Work.astro, Team.astro
- lib/ → storyblok.ts (API client + tipos TypeScript)
- styles/ → uno.config.ts, tokens.css

## Variables de entorno
- STORYBLOK_TOKEN
- PUBLIC_SITE_URL=https://zellety.com

## Deploy
- GitHub → Netlify (build: npm run build, publish: dist)
- Netlify Forms para el formulario de contacto (data-netlify="true")
- Node 20

## Servicios de Zellety
1. Web App (Nuxt, Next, AstroJS)
2. App móvil (Flutter)
3. IoT / Domótica
4. UX/UI (Figma)
5. SaaS multi-tenant por suscripción

## Skills activos
- anthropics/skills/frontend-design
- vercel-labs/agent-skills/web-design-guidelines
- hyf0/vue-skills/vue-best-practices
- anthropics/skills/brand-guidelines
- coreyhaines31/marketingskills/seo-audit
```

---

**Opción B — prompt de inicio** (lo pegas directo en Claude Code al abrir el proyecto):
```
Eres el agente de desarrollo del sitio web de Zellety (zellety.com), una startup de diseño y desarrollo tech en Latinoamérica. El stack es AstroJS + VueJS 3 + Storyblok CMS + UnoCSS + Iconify + GSAP. Tipografía: Stack Sans Notch para títulos, Inter para body. Páginas: Home (Hero, About, Services, Work, Team, Contact con Netlify Forms), /projects (grid desde Storyblok), /projects/[slug] (single). Deploy en Netlify desde GitHub. Sigue la arquitectura definida en CLAUDE.md y aplica los skills de frontend-design, vue-best-practices y web-design-guidelines en cada componente que generes.