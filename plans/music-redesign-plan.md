# Music Page Redesign - Implementation Plan

## Overview
Redesign the Music page into distinct visual sections with clear hierarchy: a CMS-managed intro, a standalone tracks grid, and a dedicated Strudel player workspace.

---

## Current State

**File:** `dev/web/src/pages/MusicPage.tsx` (116 lines)

Everything is crammed into a single `Card`:
1. Page title + subtitle (from CMS)
2. "About Strudel" hardcoded info box
3. Track selector grid
4. Strudel player iframe

Problems:
- No visual separation between sections
- "About Strudel" text is hardcoded, not editable
- No loading/error state for CMS content (unlike HomePage/AboutPage)
- CMS `body` rich text is never rendered
- Track selector and player lack distinct section headings

## Target Layout

```
┌──────────────────────────────────────────────┐
│  Intro Section (CMS-managed)                 │
│  Eyebrow                                     │
│  Title                                       │
│  Subtitle                                    │
│  Rich text body (from Sanity)                │
│  ── About Strudel box (inside CMS body) ──   │
│  Link to strudel.cc                          │
└──────────────────────────────────────────────┘

  Tracks (section heading with icon)
  ┌──────────┐ ┌──────────┐ ┌──────────┐
  │ Track 1  │ │ Track 2  │ │ Track 3  │
  │ desc     │ │ desc     │ │ desc     │
  │ [▶ Play] │ │ [▶ Play] │ │ [▶ Play] │
  └──────────┘ └──────────┘ └──────────┘

  Play & Modify (section heading with icon)
  ┌──────────────────────────────────────────────┐
│  Track title + description                    │
│  BPM badge · Open in Strudel.cc link          │
│  ┌──────────────────────────────────────────┐ │
│  │  Strudel iframe                          │ │
│  └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

---

## Implementation Steps

### Step 1: Update `MusicPage.tsx` to render CMS body content
**File:** `dev/web/src/pages/MusicPage.tsx`

Refactor the page into 3 distinct sections:

1. **Intro section** — use `CmsPageContent` to render the CMS `body` rich text (like HomePage/AboutPage do), including loading/error states
2. **Tracks section** — `SectionHeading` with `Music` icon + `TrackSelector` in its own visual block
3. **Player section** — `SectionHeading` with `Wand2` or `Play` icon + track info + `StrudelPlayer`

Remove the hardcoded "About Strudel" box — this content moves to Sanity as part of the page body.

Update the CMS fallback to include a rich `bodyPlainText` with the About Strudel text, so the page still looks good without Sanity configured.

Destructure and use `isLoading`/`error` from `useCmsPage` (currently ignored).

### Step 2: Update CMS fallback content
**File:** `dev/web/src/pages/MusicPage.tsx`

Replace the placeholder fallback with meaningful content that includes the About Strudel explanation:

```ts
fallback: {
  title: "Music",
  slug: "music",
  subtitle: "Explore my experiments with Strudel...",
  eyebrow: "Interactive Music",
  bodyPlainText: "Strudel is a JavaScript implementation of Tidal Cycles...",
}
```

### Step 3: No changes to `TrackSelector.tsx`
The component already works well as a standalone section. It has its own heading ("Select a Track") but the new layout will remove that internal heading in favor of the `SectionHeading` component — OR keep it and remove the `SectionHeading` for this section (the card grid + its own heading is sufficient).

**Decision**: Remove the internal `<h3>Select a Track</h3>` from `TrackSelector` since the page will provide a `SectionHeading` above it. This makes `TrackSelector` a pure presentational grid.

### Step 4: No changes to `StrudelPlayer.tsx`
The player component works as-is. The page will wrap it in a `Card` with a section heading.

### Step 5: Update existing tests
**File:** `dev/web/src/pages/__tests__/MusicPage.test.tsx`

Update the "renders about strudel section" test since the About Strudel content is now part of CMS body text rather than a hardcoded box. Add tests for section headings.

---

## Detailed Component Changes

### `dev/web/src/pages/MusicPage.tsx`

```
Imports to add:
  - AnimatedSection (already imported)
  - CmsPageContent (new)
  - SectionHeading (new)
  - Music, Code/Wand2 from lucide-react (new)

Remove:
  - Hardcoded "About Strudel" div block (lines 62-84)
```

New render structure:
```tsx
<PageTransition>
  <section className="space-y-10">
    {/* Eyebrow */}
    {page.eyebrow && <AnimatedSection>...</AnimatedSection>}

    {/* Intro — CMS content */}
    <AnimatedSection>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{page.title}</CardTitle>
          <p>{page.subtitle}</p>
        </CardHeader>
        <CardContent>
          <CmsPageContent
            error={error}
            isLoading={isLoading}
            body={page.body}
            bodyPlainText={page.bodyPlainText}
            richTextClassName="prose max-w-2xl text-stone-600 dark:text-stone-400 dark:prose-invert"
            hideFirstHeadingMatching={page.title}
          />
        </CardContent>
      </Card>
    </AnimatedSection>

    {/* Tracks section */}
    <AnimatedSection>
      <SectionHeading icon={Music} title="Tracks" />
      <TrackSelector
        tracks={tracks}
        selectedTrackId={selectedTrack?.id ?? ""}
        onSelect={handleSelect}
        onPlay={handlePlay}
      />
    </AnimatedSection>

    {/* Player section */}
    {selectedTrack && (
      <AnimatedSection>
        <SectionHeading icon={Wand2} title="Play & Modify" />
        <Card>
          <CardContent className="p-5 md:p-6 space-y-4">
            <div ref={editorRef} className="scroll-mt-4 space-y-3">
              <h3>{selectedTrack.title}</h3>
              <p>{selectedTrack.description}</p>
              <StrudelPlayer code={selectedTrack.code} bpm={selectedTrack.bpm} />
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>
    )}
  </section>
</PageTransition>
```

### `dev/web/src/components/TrackSelector.tsx`

Remove the internal heading (lines 19-22):
```tsx
// Remove:
<h3 className="text-lg font-semibold ...">Select a Track</h3>
```

The wrapping `div` remains as `<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">`.

---

## Lucide Icons

| Section | Icon |
|---------|------|
| Tracks section heading | `Music` |
| Play & Modify section heading | `Wand2` |

---

## Files Changed

| File | Action |
|------|--------|
| `dev/web/src/pages/MusicPage.tsx` | **Edit** — Refactor into 3 sections, add CmsPageContent, add PageTransition, remove hardcoded About Strudel |
| `dev/web/src/components/TrackSelector.tsx` | **Edit** — Remove internal "Select a Track" heading |
| `dev/web/src/pages/__tests__/MusicPage.test.tsx` | **Edit** — Update About Strudel test, add section heading tests |

No new components or files needed. No Sanity schema changes (the page type already supports `body` rich text).

---

## Key Decisions

1. **About Strudel moves to Sanity** — as part of the page `body` rich text, fully editable via CMS
2. **`CmsPageContent` for intro** — matches HomePage/AboutPage pattern, adds loading/error states
3. **`SectionHeading` reuse** — uses the same component from the resume redesign for consistency
4. **`PageTransition` wrapper** — consistent with other pages (was missing)
5. **TrackSelector heading removed** — the page provides the section heading, component becomes a pure grid
6. **No new Sanity schema** — the generic `page` type already has `body` (Portable Text), just needs content authored in Sanity Studio
7. **Fallback includes About Strudel text** — page looks good even without Sanity configured

---

## Implementation Order

1. Remove heading from `TrackSelector`
2. Refactor `MusicPage` into 3 sections with CMS body rendering
3. Update tests
4. Build and verify
