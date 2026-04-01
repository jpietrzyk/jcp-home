# Plan: Redesign Music Page — Hero Header & Compact Track Selector

## Summary
1. **Hero header**: Replace the current Card-based intro with a hero-style Card matching the `ResumeHeader` pattern — big bold title, styled subtitle, no CMS content body.
2. **Compact track selector**: Move the play button inline next to track title, tags on the next line, description below — removing the centered bottom play button and empty space.
3. **Extract `PageHero` component**: Create a shared component used by both the Music hero and `ResumeHeader`.

## Steps

### 1. Create shared `PageHero` component
**File:** `dev/web/src/components/PageHero.tsx` (new)

Extract the shared hero pattern into a reusable component:
```tsx
interface PageHeroProps {
  title: string;
  subtitle?: string | null;
  children?: React.ReactNode;  // slot for extra content (contact links, CV buttons, etc.)
  className?: string;
}

export function PageHero({ title, subtitle, children, className }: PageHeroProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-lg md:text-xl text-amber-700 dark:text-amber-400 font-medium">
                {subtitle}
              </p>
            )}
          </div>
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
```

### 2. Refactor `ResumeHeader` to use `PageHero`
**File:** `dev/web/src/components/resume/ResumeHeader.tsx`

- Wrap the existing content in `PageHero` with `title={name}` and `subtitle={title}`
- The contact data links and CV buttons go into the `children` slot
- Remove the Card/CardContent imports from ResumeHeader (delegated to PageHero)
- Keep the custom icons and contact/CV rendering logic

### 3. Redesign MusicPage hero header
**File:** `dev/web/src/pages/MusicPage.tsx`

Replace the current Card+CmsPageContent intro with:
```tsx
<PageHero title={page.title} subtitle={page.subtitle} />
```

- Remove `CmsPageContent` rendering from the hero
- Remove unused imports: `CmsPageContent`, `CardHeader`, `CardTitle`
- Keep `useCmsPage` for `eyebrow`, `title`, and `subtitle`
- Keep eyebrow rendering as-is

### 4. Compact TrackSelector cards
**File:** `dev/web/src/components/TrackSelector.tsx`

Layout per card — play + title inline, tags below, description at bottom:
```
CardContent p-3:
  Row 1:  [▶ small play btn] [Track Title]
  Row 2:  [tag] [tag] [120 BPM]
  Row 3:  [description text, smaller]
```

Specific changes:
- Remove `CardHeader`, `CardTitle` imports
- Single `CardContent` with tighter padding (`p-3` or `p-4`):
  - Row 1: Small play button (~h-7 w-7, no rounded-full) inline with track title
  - Row 2: Tags + BPM pills below title
  - Row 3: Description text in small font
- Remove `flex flex-col flex-1` + centered bottom play button area
- Card height shrinks from ~3 zones to compact rows

### 5. Add `PageHero.test.tsx`
**File:** `dev/web/src/components/__tests__/PageHero.test.tsx` (new)

Basic tests:
- Renders title
- Renders subtitle when provided
- Does not render subtitle when null/undefined
- Renders children slot

### 6. Update `MusicPage.test.tsx`
**File:** `dev/web/src/pages/__tests__/MusicPage.test.tsx`

- Remove "renders CMS body content via CmsPageContent" test (no longer rendered)
- Title is now an h1 inside PageHero — verify `getByText("Music")` still works
- Track title assertion should still work (text content unchanged, just layout shifted)

### 7. Update `ResumeHeader.test.tsx`
**File:** `dev/web/src/components/__tests__/resume/ResumeHeader.test.tsx`

- Existing tests should continue passing since the visual output is the same
- Verify after refactor that name/title/contact/CV assertions still hold

## Files changed
1. `dev/web/src/components/PageHero.tsx` — **new** shared hero component
2. `dev/web/src/components/resume/ResumeHeader.tsx` — refactor to use PageHero
3. `dev/web/src/pages/MusicPage.tsx` — use PageHero, remove CMS body
4. `dev/web/src/components/TrackSelector.tsx` — compact inline layout
5. `dev/web/src/components/__tests__/PageHero.test.tsx` — **new** tests
6. `dev/web/src/pages/__tests__/MusicPage.test.tsx` — remove CMS body test
7. `dev/web/src/components/__tests__/resume/ResumeHeader.test.tsx` — verify after refactor

## Execution order
1. Create `PageHero` component + tests
2. Refactor `ResumeHeader` to use it + verify tests
3. Update `MusicPage` to use `PageHero` + update tests
4. Redesign `TrackSelector` compact layout
5. Full test suite + typecheck
