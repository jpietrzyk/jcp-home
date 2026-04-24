# jcp haven

Personal homepage and portfolio — [jcp-haven.cc](https://jcp-haven.cc)

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About |
| `/blog` | Blog list |
| `/blog/:slug` | Blog post |
| `/contact` | Contact |
| `/music` | Music |
| `/projects` | Projects |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite 5 |
| Styling | Tailwind CSS 4, Radix UI (shadcn-style), Framer Motion |
| Routing | React Router 7 |
| CMS | Sanity v3 (Content Lake API) |
| Hosting | Netlify (static SPA) |
| Testing | Vitest, Testing Library |

**Runtime:** Node >= 20.19.0, npm >= 9.0.0

## Project Structure

```
dev/
  web/        # Frontend (React + Vite)
  sanity/     # Sanity Studio + schemas
netlify.toml  # Netlify build config
```

## Development

```bash
npm run install:all    # Install all dependencies (root + web + sanity)
npm run dev            # Start web dev server
npm run dev:all        # Start web + sanity dev servers concurrently
npm run build          # Production build
npm run lint           # Lint (ESLint)
npm run typecheck      # Typecheck web + sanity
npm run test           # Run tests (vitest watch mode)
npm run test:run       # Run tests once
npm run test:coverage  # Tests with coverage
```

## Environment Variables

Required for Sanity integration:

| Variable | Description |
|----------|-------------|
| `SANITY_STUDIO_PROJECT_ID` | Sanity project ID |
| `SANITY_STUDIO_DATASET` | Sanity dataset (e.g. `production`) |
