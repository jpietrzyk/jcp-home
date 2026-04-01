# Blog Page Redesign Plan

## Goal
Redesign `BlogListPage` to match the style of Music and About pages — add hero section with CMS body content, card-styled post previews with animations, and fix the "Draft" issue.

---

## 1. Fix "Draft" Status Displayed Under Every Post Title

**Root cause:** `BlogListPage.tsx:40` renders `{post.publishedAt ?? "Draft"}`. When `publishedAt` is null (never set), it shows "Draft". The schema has a separate `isDraft` boolean for draft control, so `publishedAt` should always have a value.

**Fix (two-part):**

**A. Sanity schema** (`dev/sanity/schemaTypes/postType.ts`):
- Add `initialValue: () => new Date().toISOString()` to the `publishedAt` field
- This ensures new posts automatically get today's date, while authors can still change it manually

**B. Blog page** (`dev/web/src/pages/BlogListPage.tsx`):
- Format the date using `toLocaleDateString()` instead of displaying raw ISO string
- Remove the `?? "Draft"` fallback — `publishedAt` will always be set for new posts (existing posts without a date will just not show a date line)

---

## 2. Add Hero Section to Blog Page

**What:** Wrap the page in `PageTransition`, display an eyebrow, and render a `PageHero` with `CmsPageContent` for the blog page body — matching `MusicPage` pattern.

**Files to modify:**
- `dev/web/src/pages/BlogListPage.tsx` — restructure the entire component

**Pattern to follow** (from `MusicPage.tsx`):
```
<PageTransition>
  <section className="space-y-10">
    {page.eyebrow ? <AnimatedSection>...</AnimatedSection> : null}
    <AnimatedSection delay={0.1}>
      <PageHero title={page.title} subtitle={page.subtitle}>
        <CmsPageContent ... />
      </PageHero>
    </AnimatedSection>
    {/* Posts section below */}
  </section>
</PageTransition>
```

**New imports needed:**
- `PageTransition` from `../components/PageTransition`
- `AnimatedSection` from `../components/AnimatedSection`
- `PageHero` from `../components/PageHero`
- `CmsPageContent` from `../components/CmsPageContent`

---

## 3. Card-Style Blog Post Previews

**What:** Redesign each blog post preview to look like `ProjectCard` — with cover image, title, excerpt, date, tags. Each card wrapped in `AnimatedSection` with staggered delays.

**Files to modify:**
- `dev/web/src/pages/BlogListPage.tsx` — render posts as styled cards

**Current state:** Posts rendered as a flat `<ul>` with basic `Card`/`CardHeader`/`CardContent`.
**Target state:** Grid layout (`grid grid-cols-1 md:grid-cols-2`) similar to `ProjectsPage`, each card with:
- Cover image (if available from schema — `coverImage` field exists in `postType`)
- Title with link
- Formatted date
- Excerpt text

**GROQ query update** in `dev/web/src/lib/cms/queries.ts`:
- Add `coverImage` to `postsQuery` to fetch the image for each post

**Type update** in `dev/web/src/lib/cms/types.ts`:
- Add `coverImageUrl?: string | null` to `PostSummary` type

**API update** in `dev/web/src/lib/cms/api.ts`:
- Map `coverImage` to a URL via `sanityImageUrl` in `getPosts()`

**Fallback data update** in `dev/web/src/lib/cms/api.ts`:
- Add `coverImageUrl: null` to fallback posts

---

## Files Modified (Summary)

| File | Change |
|---|---|
| `dev/sanity/schemaTypes/postType.ts` | Add `initialValue: () => new Date().toISOString()` to `publishedAt` field |
| `dev/web/src/pages/BlogListPage.tsx` | Full redesign: PageTransition, PageHero, CmsPageContent, AnimatedSection, card grid, date formatting, remove "Draft" fallback |
| `dev/web/src/lib/cms/queries.ts` | Add `coverImage` to `postsQuery` |
| `dev/web/src/lib/cms/types.ts` | Add `coverImageUrl` to `PostSummary` |
| `dev/web/src/lib/cms/api.ts` | Map coverImage to URL in `getPosts()` |

---

## Implementation Order

1. Update `postType.ts` — add `initialValue` to `publishedAt`
2. Update `types.ts` — add `coverImageUrl` to `PostSummary`
3. Update `queries.ts` — add `coverImage` to `postsQuery`
4. Update `api.ts` — map `coverImage` → URL, update fallback data
5. Rewrite `BlogListPage.tsx` — full redesign with hero, cards, animations, date formatting
