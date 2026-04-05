# Despliegue en Netlify

## netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  # Solo si se usa SPA mode — en SSG de Astro generalmente no se necesita
```

## .nvmrc

```
20
```

---

## Variables de entorno en Netlify

En el dashboard: **Site settings → Environment variables**

| Variable | Valor |
|----------|-------|
| `STORYBLOK_TOKEN` | Token de API (preview o published) |
| `PUBLIC_SITE_URL` | `https://zellety.com` |

---

## Netlify Forms

```html
<!-- En ContactForm.vue / Contact.astro -->
<form
  name="contact"
  method="POST"
  data-netlify="true"
  netlify-honeypot="bot-field"
>
  <input type="hidden" name="form-name" value="contact" />
  <p class="hidden"><input name="bot-field" /></p>

  <input type="text"  name="name"    required />
  <input type="email" name="email"   required />
  <select            name="service"  required>
    <option value="web_app">Web App</option>
    <option value="mobile">App Móvil</option>
    <option value="iot">IoT / Domótica</option>
    <option value="ux_ui">UX/UI</option>
    <option value="saas">SaaS</option>
  </select>
  <textarea          name="message"  required></textarea>

  <button type="submit">Enviar</button>
</form>
```

- Validación client-side en `ContactForm.vue` (Vue island)
- Feedback visual: loading → success / error
- Honeypot anti-spam: campo `bot-field` oculto

---

## Checklist de deploy

```
□ STORYBLOK_TOKEN configurado en Netlify env vars
□ PUBLIC_SITE_URL configurado en Netlify env vars
□ Build command: npm run build
□ Publish directory: dist
□ NODE_VERSION: 20 (en netlify.toml o .nvmrc)
□ netlify.toml en la raíz del repo
□ Netlify Forms: el form con data-netlify="true" aparece en el dashboard
□ Preview deploys habilitados para PRs
□ Sitemap: verificar que /sitemap-index.xml existe en el build
□ robots.txt: verificar que existe en /dist
□ Favicon + apple-touch-icon presentes
□ Headers de cache configurados para /assets/*
□ npm run build sin errores antes de hacer push
□ Test manual: preloader → home → scroll → proyecto → contacto
```

---

## GitHub → Netlify (CI/CD)

1. Conectar repo en Netlify: **Add new site → Import from Git**
2. Branch de producción: `main`
3. Preview deploys automáticos para cada PR
4. Build triggers: push a `main` o PR contra `main`

---

## SEO — Checklist antes de lanzar

```
□ <title> único por página
□ <meta name="description"> por página (max 160 chars)
□ og:title, og:description, og:image (1200x630) por página
□ og:image default de Zellety para páginas sin imagen específica
□ <link rel="canonical"> con PUBLIC_SITE_URL
□ lang="es-419" en <html>
□ Schema.org Organization en home
□ Schema.org CreativeWork en páginas de proyecto
□ @astrojs/sitemap instalado y configurado
□ robots.txt generado por Astro
```
