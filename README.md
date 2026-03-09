# Concept

This should be concept of my home page

## Details

I want to build a personal homepage with:

- Static pages: About me, Resume, Contact
- Dynamic content: Blog posts

Planned frontend stack:

- React
- Vite
- Tailwind CSS
- shadcn/ui

## Short Tech Brief

### 1. Do you need SSR?

For your use case, SSR is optional and usually not required.

- If content updates are not real-time and SEO is handled via pre-rendered HTML, use static generation.
- Vite-based React app can work very well for a personal site + blog when data is fetched from a headless CMS at build time or client side.
- Use SSR only if you need highly dynamic per-request rendering (e.g., personalized pages, auth-based content, complex server logic).

Recommendation: Start without SSR.

### 2. Hosting: Netlify vs Vercel

Both are good choices. Main differences:

- Vercel:
	- Excellent DX for frontend projects.
	- Best fit when using Next.js/SSR-heavy apps.
	- Great preview deployments and edge features.
- Netlify:
	- Very strong for static/Vite sites.
	- Built-in forms, redirects, and simple serverless functions.
	- Usually straightforward for content-driven personal pages.

Recommendation for your current stack (React + Vite): Netlify is slightly simpler, Vercel is equally valid.

### 3. Content management options

You are considering Contentful. It is solid, but there are alternatives depending on priorities.

- Contentful:
	- Mature, reliable, great editor UX.
	- Strong API and localization support.
	- Can be expensive as usage grows.
- Sanity:
	- Very flexible content modeling.
	- Excellent real-time editing experience.
	- Great developer ergonomics.
- Strapi:
	- Self-hosted/open source option.
	- Full control over backend and data.
	- More maintenance overhead.
- Ghost:
	- Great if blog is central and you want ready-made publishing features.
	- Less flexible for complex, custom content models than headless-first CMS options.

Recommendation:

- Best all-around for a personal site + blog: Sanity or Contentful.
- If you want fastest setup with polished editorial UI: Contentful.
- If you want flexibility and cost control for long-term growth: Sanity.

### 4. Suggested architecture

- Frontend: React + Vite + Tailwind + shadcn/ui
- Hosting: Netlify (or Vercel)
- CMS: Sanity (preferred) or Contentful
- Content flow: CMS -> API fetch at build time (or incremental updates) -> deployed static frontend

### 5. Final recommendation (simple and scalable)

Start with:

- React + Vite + Tailwind + shadcn/ui
- Netlify hosting
- Sanity CMS
- No SSR initially

You can migrate later to Next.js + SSR only if your requirements become strongly dynamic.

## 6. MVP Architecture + Content Model

### Architecture (MVP)

```mermaid
flowchart LR
		A[Sanity Studio\nContent Editing] --> B[Sanity Content Lake API]
		B --> C[Vite Build Process]
		C --> D[Static Assets\nHTML/CSS/JS]
		D --> E[Netlify CDN]
		E --> F[Visitors]

		G[GitHub Repo] --> C
		H[Netlify Build Hook\n(Optional)] --> C
```

Notes:

- Primary mode: static generation at build time.
- Content changes trigger a new deploy via webhook/build hook.
- Optional client-side fetch can be used for non-critical dynamic widgets.

### Suggested content model

Core document types:

- `post`
	- `title` (string)
	- `slug` (slug)
	- `excerpt` (text)
	- `coverImage` (image)
	- `publishedAt` (datetime)
	- `updatedAt` (datetime)
	- `author` (reference -> `author`)
	- `tags` (array of reference -> `tag`)
	- `body` (rich text/portable text)
	- `seoTitle` (string)
	- `seoDescription` (text)
	- `canonicalUrl` (url, optional)
	- `isDraft` (boolean)
- `author`
	- `name` (string)
	- `slug` (slug)
	- `avatar` (image)
	- `bio` (text)
	- `socialLinks` (object)
- `tag`
	- `name` (string)
	- `slug` (slug)
	- `description` (text)
- `page`
	- `title` (string)
	- `slug` (slug)
	- `body` (rich text)
	- `seoTitle` (string)
	- `seoDescription` (text)
- `siteSettings`
	- `siteName` (string)
	- `siteUrl` (url)
	- `defaultSeoImage` (image)
	- `mainNavigation` (array of links)
	- `socialLinks` (object)

Route mapping:

- `/` -> Home (`page` or hardcoded + latest `post`)
- `/about` -> `page` with slug `about`
- `/resume` -> `page` with slug `resume`
- `/blog` -> post list from `post`
- `/blog/:slug` -> single `post`

## 7. Setup Plan (Day 1 to First Deploy)

### Day 1: Project bootstrap

1. Create app with Vite (React + TS preferred).
2. Install and configure Tailwind CSS.
3. Initialize shadcn/ui and add base components.
4. Set up routing (`react-router-dom`) for `/`, `/about`, `/resume`, `/blog`, `/blog/:slug`.
5. Push initial repo to GitHub.

### Day 2: CMS foundation

1. Create Sanity project and dataset.
2. Define schemas: `post`, `author`, `tag`, `page`, `siteSettings`.
3. Add initial content: 2 posts, About page, Resume page, site settings.
4. Create read-only API token (only if required by your fetch strategy).

### Day 3: Frontend data integration

1. Add Sanity client SDK and query layer.
2. Build blog list and blog detail pages from CMS data.
3. Build static pages (`about`, `resume`) from `page` type.
4. Add basic SEO metadata handling (title, description, Open Graph image).

### Day 4: Polish and production readiness

1. Add markdown/rich text rendering styles.
2. Add 404 page and loading/error states.
3. Optimize images and set caching headers where relevant.
4. Add analytics (optional): Plausible or Umami.

### Day 5: Deploy

1. Connect GitHub repo to Netlify.
2. Configure environment variables (`SANITY_PROJECT_ID`, `SANITY_DATASET`, token if needed).
3. Set build command and output directory.
4. Configure build hook/webhook for CMS updates.
5. Deploy and verify pages, metadata, and sitemap/robots.

Definition of done:

- Pages live: Home, About, Resume, Blog List, Blog Post.
- New post in CMS can appear after deploy trigger.
- Lighthouse scores are acceptable for performance and SEO.

## 8. Alternative Path: Same Frontend + Contentful

If you pick Contentful instead of Sanity, keep frontend and hosting unchanged.

### What changes

- CMS platform changes from Sanity to Contentful.
- Query layer changes to Contentful SDK/GraphQL Content API.
- Webhook setup changes to Contentful -> Netlify deploy hook.

### Recommended Contentful setup

- Content types:
	- `blogPost` (title, slug, excerpt, heroImage, publishDate, body, author, tags, SEO fields)
	- `author` (name, bio, avatar, social links)
	- `tag` (name, slug)
	- `page` (title, slug, body, SEO fields)
	- `siteSettings` (site metadata, nav, social links)
- Environments:
	- `master` for production
	- `staging` for testing content changes

### Delivery/API choice

- Use GraphQL Content API if you prefer typed query results and selective fields.
- Use REST Delivery API if you want straightforward SDK usage.

### Environment variables example

- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ENVIRONMENT`
- `CONTENTFUL_DELIVERY_TOKEN`
- `CONTENTFUL_PREVIEW_TOKEN` (optional, preview mode)

### Pros and cons vs Sanity

- Contentful pros:
	- Strong editorial interface and workflow tooling.
	- Mature enterprise integrations and roles.
- Contentful cons:
	- Pricing can increase earlier with usage.
	- Less flexible real-time customization than Sanity Studio.

When to choose Contentful:

- You value polished editor experience and structured workflows over maximum schema/studio customization.
