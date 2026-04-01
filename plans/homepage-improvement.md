# Homepage Improvement Plan

## Goal
Restructure `HomePage.tsx` from a single card to a multi-section landing page with hero, blog posts, music tracks, and projects sections — using reusable widget components where possible.

---

## Step 1: Create `HomeHeroSection` component

**New file:** `dev/web/src/components/HomeHeroSection.tsx`

Extract the hero logic from `HomePage.tsx` into a dedicated component:
- Uses `PageHero` (already exists) for the card wrapper
- Shows CMS eyebrow, title, subtitle from Sanity "home" page
- Renders `CmsPageContent` for the rich text body
- Displays contact info links (location, email, LinkedIn, GitHub) from `profile`
- Action buttons: "About Me" (→ `/about`) and "Read Blog" (→ `/blog`)
- Remove "View Resume" button (redundant with About)

This replaces the inline card + contact + buttons currently in `HomePage.tsx`.

---

## Step 2: Create `HomeBlogSection` component

**New file:** `dev/web/src/components/HomeBlogSection.tsx`

A section showing the 2 newest blog posts:
- Section heading with `Newspaper` icon and "Latest Posts" title
- Uses `useCmsPosts()` hook to fetch all posts, slices to `posts.slice(0, 2)`
- Reuses existing `PostCard` component in a 2-column grid
- Loading/error states
- "View all posts" link button → `/blog`
- Each card wrapped in `AnimatedSection`

---

## Step 3: Create `HomeMusicSection` component

**New file:** `dev/web/src/components/HomeMusicSection.tsx`

A section showcasing 1–2 tracks:
- Section heading with `Music` icon and "Music" title
- Imports tracks from `content/tracks`
- Shows first 2 tracks in a compact card layout (not full TrackSelector/StrudelPlayer — too heavy for homepage)
- Each track card shows: title, description, and a "Play on Music page" link → `/music`
- Optionally could embed a mini StrudelPlayer for 1 featured track, but links to `/music` are simpler and more performant for the homepage

---

## Step 4: Create `HomeProjectsSection` component

**New file:** `dev/web/src/components/HomeProjectsSection.tsx`

A section titled "Selected Projects":
- Section heading with appropriate icon (e.g., `FolderOpen`) and "Selected Projects" title
- Uses `useCmsProjects()` hook
- Shows projects in a grid using existing `ProjectCard` component (or a simplified version)
- Empty state: "Coming soon" message when no projects exist
- "View all projects" link → `/projects`

---

## Step 5: Rewrite `HomePage.tsx`

Assemble all sections:
```
<PageTransition>
  <section className="space-y-12">
    <HomeHeroSection />
    <HomeBlogSection />
    <HomeMusicSection />
    <HomeProjectsSection />
  </section>
</PageTransition>
```

Each section component handles its own data fetching internally (following the existing pattern from `BlogListPage`, `MusicPage`, etc.).

---

## Files to create
| # | File | Purpose |
|---|------|---------|
| 1 | `dev/web/src/components/HomeHeroSection.tsx` | Hero with CMS content + CTA buttons |
| 2 | `dev/web/src/components/HomeBlogSection.tsx` | 2 newest blog posts |
| 3 | `dev/web/src/components/HomeMusicSection.tsx` | 1–2 track previews |
| 4 | `dev/web/src/components/HomeProjectsSection.tsx` | Selected projects (empty state) |

## Files to modify
| # | File | Change |
|---|------|--------|
| 1 | `dev/web/src/pages/HomePage.tsx` | Replace inline content with section components + `PageTransition` |

## Existing components reused
- `PageHero` — hero card wrapper
- `CmsPageContent` — rich text rendering
- `PostCard` — blog post cards
- `ProjectCard` — project cards
- `SectionHeading` — section headings with icons
- `AnimatedSection` — scroll animations
- `PageTransition` — page enter/exit animation

---

## Design decisions to confirm

1. **Music section**: Compact track cards with "Listen" links to `/music` page, OR embed a mini Strudel player inline? (Recommending compact cards for performance)
2. **Project section empty state**: "Coming soon" text or a more styled placeholder card?
3. **Section order**: Hero → Blog → Music → Projects (as described), or different order?
