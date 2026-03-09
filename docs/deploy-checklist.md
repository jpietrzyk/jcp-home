# Netlify Deployment Checklist (Vite + Sanity)

## 1. Preconditions

- [ ] `dev/web` project builds locally.
- [ ] Sanity project exists and has content (`post`, `page`, `author`, `tag`, `siteSettings`).
- [ ] GitHub repository connected and pushed.

## 2. Netlify site setup

- [ ] Create a new Netlify site from Git.
- [ ] Select repository and branch.
- [ ] Configure base directory: `dev/web`.
- [ ] Configure build command: `npm run build`.
- [ ] Configure publish directory: `dist`.

## 3. Environment variables (Netlify UI)

- [ ] `VITE_SANITY_PROJECT_ID`
- [ ] `VITE_SANITY_DATASET` (for example `production`)
- [ ] `VITE_SANITY_API_VERSION` (for example `2025-01-01`)
- [ ] `VITE_SANITY_USE_CDN` (`true` for production read performance)

Optional:

- [ ] `SANITY_READ_TOKEN` if you need private/draft access.

## 4. Build and routing behavior

- [ ] Trigger first deploy and verify build logs are clean.
- [ ] Open deployed URL and test routes:
  - [ ] `/`
  - [ ] `/about`
  - [ ] `/resume`
  - [ ] `/blog`
  - [ ] `/blog/:slug`
- [ ] Add SPA fallback redirect if direct route refresh returns 404.

Example `_redirects` file for SPA fallback:

```txt
/*    /index.html   200
```

## 5. CMS update workflow

- [ ] In Netlify, create an Incoming Webhook (build hook).
- [ ] In Sanity, configure webhook on content publish/update.
- [ ] Point Sanity webhook URL to Netlify build hook.
- [ ] Publish a test post and confirm a new deploy starts.

## 6. Domain and HTTPS

- [ ] Add custom domain.
- [ ] Verify DNS records.
- [ ] Confirm automatic SSL/HTTPS is active.

## 7. Final production checks

- [ ] SEO metadata renders correctly (title/description/Open Graph).
- [ ] `robots.txt` and `sitemap.xml` strategy defined.
- [ ] Lighthouse checks done on homepage and blog post page.
- [ ] 404 page works for unknown routes.
- [ ] Analytics added (optional: Plausible or Umami).

## 8. Rollback and safety

- [ ] Confirm Netlify deploy history is visible.
- [ ] Confirm you can restore a previous healthy deploy.
- [ ] Keep env vars documented outside source control.
