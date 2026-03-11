# Sanity Studio

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and fill in your values (do **not** commit `.env`):

```bash
cp .env.example .env
```

Set the following variables before running any deploy commands. The `sanity.cli.ts` file falls back to hardcoded defaults when these variables are missing, which will cause deployments to the wrong project:

- `SANITY_STUDIO_PROJECT_ID`
- `SANITY_STUDIO_DATASET`

3. Start studio:

```bash
npm run dev
```

4. Deploy schema updates:

```bash
npx sanity deploy
```

## Included schemas

- `post`
- `author`
- `tag`
- `page`
- `siteSettings`

## Page Field Mapping (Web)

The web app maps `page` documents by slug:

- `slug = home`
  - `title` -> Home main heading
  - `subtitle` (fallback: `seoTitle`) -> Home subtitle
  - `seoDescription` -> Home eyebrow text (small label above title)
  - `body` -> Home intro paragraph

- `slug = about`
  - `title` -> About heading
  - `body` -> About content

Notes:

- Blog list/detail comes from `post` documents.
- If CMS fetch fails, the web app shows fallback content and a warning message.
