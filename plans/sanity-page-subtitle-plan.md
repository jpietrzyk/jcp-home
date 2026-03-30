# Plan: Use Sanity CMS for Page Subtitles

## Overview

Currently, the Home page and Music page have hardcoded subtitles/eyebrows:
- **HomePage**: Uses a fallback `eyebrow: "CMS-driven content"` when no CMS data is available
- **MusicPage**: Has hardcoded `"Interactive Music"` and does not use CMS at all

This plan outlines how to make these subtitles CMS-driven using Sanity.

## Current State Analysis

### HomePage (`dev/web/src/pages/HomePage.tsx`)
- Already uses `useCmsPage("home")` hook to fetch CMS data
- Displays `page.eyebrow` (line 30) and `page.subtitle` (line 38)
- Has fallback values when CMS is unavailable
- The eyebrow is currently mapped from `seoDescription` field in the CMS query

### MusicPage (`dev/web/src/pages/MusicPage.tsx`)
- Does NOT use CMS - completely hardcoded
- Has hardcoded `"Interactive Music"` on line 34
- No CMS integration at all

### Sanity Schema (`dev/sanity/schemaTypes/pageType.ts`)
- Has `subtitle` field (line 9)
- Does NOT have a dedicated `eyebrow` field
- Currently uses `seoDescription` as eyebrow in the query

### CMS Query (`dev/web/src/lib/cms/queries.ts`)
- Line 20: `"eyebrow": seoDescription` - maps seoDescription to eyebrow
- Line 19: `"subtitle": coalesce(subtitle, seoTitle)` - uses subtitle or falls back to seoTitle

## Implementation Plan

### Step 1: Add `eyebrow` Field to Sanity Page Schema

**File**: `dev/sanity/schemaTypes/pageType.ts`

Add a new `eyebrow` field to the page schema:

```typescript
defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
```

This will be placed after the `subtitle` field. The eyebrow is a short label that appears above the title (e.g., "CMS-driven content", "Interactive Music").

### Step 2: Update CMS Query to Fetch Eyebrow Field

**File**: `dev/web/src/lib/cms/queries.ts`

Update the `pageBySlugQuery` to fetch the `eyebrow` field directly instead of using `seoDescription`:

```typescript
export const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  "subtitle": coalesce(subtitle, seoTitle),
  eyebrow,
  body
}`;
```

### Step 3: Update MusicPage to Use CMS Data

**File**: `dev/web/src/pages/MusicPage.tsx`

Refactor MusicPage to use `useCmsPage` hook similar to HomePage:

1. Import `useCmsPage` hook
2. Add CMS data fetching with fallback values
3. Replace hardcoded "Interactive Music" with `page.eyebrow`
4. Replace hardcoded title and description with CMS data

```typescript
const { page, isLoading, error } = useCmsPage("music", {
  fallback: {
    title: "Music",
    slug: "music",
    subtitle: "Explore my experiments with Strudel, a JavaScript port of Tidal Cycles for live coding music.",
    eyebrow: "Interactive Music",
    bodyPlainText: "Add a Page document with slug 'music' in Sanity to manage this section.",
  },
});
```

### Step 4: Update HomePage Fallback (Optional)

**File**: `dev/web/src/pages/HomePage.tsx`

The fallback eyebrow "CMS-driven content" is already appropriate. No changes needed unless you want to update the fallback text.

### Step 5: Create Music Page in Sanity Studio

**Action**: Create a new Page document in Sanity Studio with:
- **Slug**: `music`
- **Title**: `Music`
- **Eyebrow**: `Interactive Music` (or customize as desired)
- **Subtitle**: Description of the music section
- **Body**: Optional rich text content

### Step 6: Update Documentation

**File**: `dev/sanity/README.md` or `dev/sanity/SETUP_GUIDE.md`

Add documentation about the new `eyebrow` field and how to use it for page subtitles.

## Files to Modify

1. `dev/sanity/schemaTypes/pageType.ts` - Add eyebrow field
2. `dev/web/src/lib/cms/queries.ts` - Update query to fetch eyebrow
3. `dev/web/src/pages/MusicPage.tsx` - Add CMS integration
4. Documentation files (optional)

## Benefits

1. **Content Flexibility**: Content editors can customize subtitles without code changes
2. **Consistency**: Both Home and Music pages use the same CMS-driven approach
3. **Maintainability**: Reduces hardcoded strings in the codebase
4. **SEO Friendly**: Eyebrow and subtitle can be optimized for SEO

## Testing Checklist

- [ ] Verify eyebrow field appears in Sanity Studio
- [ ] Test HomePage with CMS data (eyebrow and subtitle)
- [ ] Test HomePage fallback when CMS is unavailable
- [ ] Test MusicPage with CMS data (eyebrow and subtitle)
- [ ] Test MusicPage fallback when CMS is unavailable
- [ ] Verify both pages display correctly in light and dark themes
- [ ] Test responsive design on mobile and desktop

## Migration Notes

- Existing pages in Sanity will not have an `eyebrow` value until manually added
- The `seoDescription` field will no longer be used as eyebrow fallback
- Content editors should be informed about the new `eyebrow` field
