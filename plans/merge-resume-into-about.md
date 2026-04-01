# Merge Resume into About Page

## Goal
Combine About and Resume pages into a single "About" page at `/about`. The About section (eyebrow + CMS body + Contact card) appears first, followed by the full Resume section below. Remove the standalone `/resume` route and nav entry.

## Changes

### 1. Rewrite `dev/web/src/pages/AboutPage.tsx`
- Import all resume components: `ResumeHeader`, `ResumeHero`, `ResumeJobExperience`, `ResumeEducation`, `ResumeVolunteer`, `ResumeProject`, `SectionHeading`, `AnimatedSection`, `PageTransition`
- Import `useResume` hook and `profile`
- Call both `useCmsPage("about", ...)` and `useResume()` hooks
- Keep existing About content (eyebrow + CMS card + Contact card) as first section
- Add full resume content below (ResumeHeader, ResumeHero, Experience, Education, Volunteer, Projects) — same structure as ResumePage
- Wrap everything in `<PageTransition>`
- Add loading/error states for the resume data portion

### 2. Update `dev/web/src/router.tsx`
- Remove `{ path: "resume", element: <ResumePage /> }` route entry
- Remove `ResumePage` import

### 3. Update `dev/web/src/layouts/MainLayout.tsx`
- Remove `{ to: "/resume", label: "Resume", icon: FileText }` from `links` array
- Remove `FileText` import from lucide-react
- Footer nav: change `["Resume", "Blog", "Music"]` to `["About", "Blog", "Music"]`

### 4. Delete `dev/web/src/pages/ResumePage.tsx`
- Content is now in AboutPage.tsx

### 5. Tests
- Resume component tests (6 files in `components/__tests__/resume/`) remain unchanged — components themselves aren't changing
- No existing AboutPage tests to update
- Check for any page-level tests referencing `/resume` route

## Not Changing
- CMS hooks (`useCmsPage`, `useResume`) — stay as-is
- CMS types, queries, API — no changes
- Resume sub-components — used as-is
- Sanity schemas — no changes
