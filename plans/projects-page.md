# Plan: Projects Page

## Overview
Add a standalone Projects page (`/projects`) that fetches project data from Sanity and displays them as cards using a reusable `ProjectCard` component.

---

## Step 1: Create Sanity Document Type `showcaseProject`

**File:** `dev/sanity/schemaTypes/showcaseProjectType.ts`

Create a new **document type** (not object) with fields:
- `title` (string, required) - Project name
- `slug` (slug, required, source: title)
- `slogan` (string) - Short tagline
- `description` (text, rows: 4) - Full description
- `thumbnail` (image, hotspot: true) - Thumb image
- `url` (url) - External project link
- `tags` (array of strings) - Technologies / tags
- `featured` (boolean, default: false) - Pin to top
- `order` (number) - Manual sort order
- `isDraft` (boolean, default: false)

Register in `dev/sanity/schemaTypes/index.ts` — import and add to `schemaTypes` array.

---

## Step 2: Install `@sanity/image-url` in web app

```bash
cd dev/web && npm install @sanity/image-url
```

Create **image URL builder utility:** `dev/web/src/lib/cms/sanityImage.ts`

```ts
import createImageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './sanity.client';

const builder = sanityClient
  ? createImageUrlBuilder({ projectId: sanityClient.config().projectId, dataset: sanityClient.config().dataset })
  : null;

export function sanityImageUrl(source: any) {
  return builder?.image(source);
}
```

---

## Step 3: Add TypeScript Types

**File:** `dev/web/src/lib/cms/types.ts` — add:

```ts
export type ShowcaseProject = {
  title: string;
  slug: string;
  slogan?: string;
  description?: string;
  thumbnailUrl?: string;
  url?: string;
  tags?: string[];
  featured?: boolean;
  order?: number;
};

export type SanityShowcaseProject = {
  title: string;
  slug: string;
  slogan?: string;
  description?: string;
  thumbnail?: { asset: { _ref: string }; hotspot?: any; crop?: any };
  url?: string;
  tags?: string[];
  featured?: boolean;
  order?: number;
};
```

---

## Step 4: Add GROQ Query

**File:** `dev/web/src/lib/cms/queries.ts` — add:

```ts
export const showcaseProjectsQuery = `*[_type == "showcaseProject" && (!defined(isDraft) || isDraft == false)] | order(featured desc, order asc, _createdAt desc){
  title,
  "slug": slug.current,
  slogan,
  description,
  thumbnail,
  url,
  tags,
  featured,
  order
}`;
```

---

## Step 5: Add API Function

**File:** `dev/web/src/lib/cms/api.ts` — add `getShowcaseProjects()`:

- Fetch with `showcaseProjectsQuery`
- Transform each `SanityShowcaseProject` → `ShowcaseProject` (use `sanityImageUrl` to build `thumbnailUrl` with `.width(600).height(400).fit('crop').url()`)
- Include fallback data (1 sample project)
- Export the function

---

## Step 6: Create `useCmsProjects` Hook

**File:** `dev/web/src/lib/cms/useCmsProjects.ts`

Follow existing pattern (`useCmsPosts.ts`):
- Use `useCmsResource` generic hook
- Call `getShowcaseProjects()` as fetcher
- Export `{ projects, isLoading, error }`

---

## Step 7: Create `ProjectCard` Reusable Component

**File:** `dev/web/src/components/ProjectCard.tsx`

Props: `ShowcaseProject & { className?: string }`

Layout:
- `Card` component wrapper (consistent with rest of app)
- Thumbnail image at top (full width, aspect ratio ~3/2, object-cover)
- Card body: title (h3), slogan (subtitle text), description (truncated to ~3 lines via `line-clamp-3`)
- Tags/technologies as badges (matching resume project pattern: `bg-stone-100 dark:bg-stone-800 rounded-md px-2 py-0.5 text-xs`)
- External link button at bottom (if url present)
- If `featured`, add a subtle visual indicator (e.g. accent border or badge)

Use `lucide-react` icons: `ExternalLink`, `Code`, `Star` (for featured).
Use `AnimatedSection` wrapper for scroll-reveal animation.

---

## Step 8: Create `ProjectsPage`

**File:** `dev/web/src/pages/ProjectsPage.tsx`

Follow `BlogListPage` pattern:
- Use `useCmsPage("projects", ...)` for page header (title, eyebrow, subtitle)
- Use `useCmsProjects()` for project list
- Loading/error states
- Render `ProjectCard` components in a responsive grid (`grid grid-cols-1 md:grid-cols-2 gap-6`)
- Wrap each card in `AnimatedSection` with staggered delay
- Empty state message

---

## Step 9: Register Route & Navigation

**File:** `dev/web/src/router.tsx`:
- Import `ProjectsPage`
- Add route: `{ path: "projects", element: <ProjectsPage /> }`

**File:** `dev/web/src/layouts/MainLayout.tsx`:
- Add `FolderKanban` (or `Layers`) icon import from lucide-react
- Add `{ to: "/projects", label: "Projects", icon: FolderKanban }` to `links` array (after Resume, before Blog)

---

## Step 10: Write Tests

**File:** `dev/web/src/components/__tests__/ProjectCard.test.tsx`
- Renders title, slogan, description, tags, link
- Handles missing optional fields
- Featured indicator renders when `featured: true`

**File:** `dev/web/src/pages/__tests__/ProjectsPage.test.tsx`
- Renders page header
- Renders project cards from mock data
- Shows loading state
- Shows empty state

---

## Files Changed Summary

| Action | File |
|--------|------|
| **NEW** | `dev/sanity/schemaTypes/showcaseProjectType.ts` |
| **EDIT** | `dev/sanity/schemaTypes/index.ts` |
| **NEW** | `dev/web/src/lib/cms/sanityImage.ts` |
| **EDIT** | `dev/web/src/lib/cms/types.ts` |
| **EDIT** | `dev/web/src/lib/cms/queries.ts` |
| **EDIT** | `dev/web/src/lib/cms/api.ts` |
| **NEW** | `dev/web/src/lib/cms/useCmsProjects.ts` |
| **NEW** | `dev/web/src/components/ProjectCard.tsx` |
| **NEW** | `dev/web/src/pages/ProjectsPage.tsx` |
| **EDIT** | `dev/web/src/router.tsx` |
| **EDIT** | `dev/web/src/layouts/MainLayout.tsx` |
| **NEW** | `dev/web/src/components/__tests__/ProjectCard.test.tsx` |
| **NEW** | `dev/web/src/pages/__tests__/ProjectsPage.test.tsx` |
| **INSTALL** | `@sanity/image-url` in `dev/web` |

---

## Implementation Order

1. Sanity schema (step 1) — enables content creation in Studio
2. Image URL utility (step 2) — needed before API layer
3. Types (step 3) — foundation for everything else
4. Query + API + hook (steps 4–6) — data layer
5. ProjectCard component (step 7) — reusable building block
6. ProjectsPage (step 8) — assembles everything
7. Routing + navigation (step 9) — makes page accessible
8. Tests (step 10) — verify correctness
