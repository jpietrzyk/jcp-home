# Resume Page Redesign - Implementation Plan

## Overview
Redesign the Resume page from a plain card-list layout into a visually polished, sectioned layout with a hero-style intro, reusable components, icons, and scroll animations.

---

## Current State
- Single 331-line `ResumePage.tsx` with all sections inline
- Plain `Card` wrappers for every section
- No animations (unlike HomePage/AboutPage which use `AnimatedSection`)
- No icons — just text labels
- Skills and bio are separate cards
- Work experience is a single card with border-left timeline

## Target Layout (top to bottom)

```
┌──────────────────────────────────────────────┐
│  ResumeHeader                                │
│  Name · Title/Specialization                 │
│  Location (icon) · Email (icon) · Links      │
│  [CV EN] [CV PL]                            │
└──────────────────────────────────────────────┘

┌──────────────────────────────────────────────┐
│  Hero Section (single visual block)          │
│                                              │
│  Bio text (large, lead paragraph)            │
│  ────────────────────────────                │
│  Skills badges (flex-wrap chips)             │
└──────────────────────────────────────────────┘

  Work Experience (section title with icon)
  ┌──────────────────────────────────────┐
  │  <ResumeJobExperience />             │
  │  Position · Company · Location       │
  │  Period (with calendar icon)         │
  │  • Achievement 1                     │
  │  • Achievement 2                     │
  └──────────────────────────────────────┘
  ┌──────────────────────────────────────┐
  │  <ResumeJobExperience />             │
  │  ...                                 │
  └──────────────────────────────────────┘

  Education (section title with icon)
  ┌──────────────────────────────────────┐
  │  School · Degree · Year              │
  └──────────────────────────────────────┘

  Volunteer Experience (section title with icon)
  ┌──────────────────────────────────────┐
  │  Role · Organization · Period        │
  └──────────────────────────────────────┘

  Projects (section title with icon)
  ┌──────────────────────────────────────┐
  │  Project · Tech tags · Link          │
  └──────────────────────────────────────┘
```

---

## Implementation Steps

### Step 1: Create `SectionHeading` component
**File:** `src/components/resume/SectionHeading.tsx`

A reusable section title component with an icon and decorative styling.

```tsx
interface SectionHeadingProps {
  icon: LucideIcon;
  title: string;
  className?: string;
}
```

- Icon on the left, title text, optional subtle decorative line/border
- Uses the existing warm stone/amber color palette
- Consistent spacing below

### Step 2: Create `ResumeHeader` component
**File:** `src/components/resume/ResumeHeader.tsx`

Top section with basic info — name, title, location, contact, and CV download.

```tsx
interface ResumeHeaderProps {
  name: string;
  title: string;
  contactData?: ContactData;
  cvLinks?: { label: string; href: string }[];
}
```

- Large name (text-4xl / text-5xl), bold
- Title/specialization below in accent color (amber/stone-500)
- Location with `MapPin` icon, email with `Mail` icon, LinkedIn/GitHub with brand SVGs
- All inline/horizontal layout on desktop, stacked on mobile
- CV download buttons at the bottom of this section
- Wrapped in a `Card` with subtle background

### Step 3: Create `ResumeHero` component (Bio + Skills combined)
**File:** `src/components/resume/ResumeHero.tsx`

A hero-style visual block that combines bio and skills into one cohesive section.

```tsx
interface ResumeHeroProps {
  bio?: string;
  skills?: string[];
}
```

- Bio displayed as large lead text (`text-lg` or `text-xl`, relaxed leading)
- Horizontal divider or spacing
- Skills as flex-wrapped badges below — same chip style as current but with refined styling
- Entire section in a single `Card` with slightly different background treatment (e.g., `bg-gradient-to-br` subtle gradient or accent border-left)
- Use `AnimatedText` for the bio or `AnimatedSection` for the whole block

### Step 4: Create `ResumeJobExperience` component
**File:** `src/components/resume/ResumeJobExperience.tsx`

Reusable, self-contained component for a single job position.

```tsx
interface ResumeJobExperienceProps {
  position: string;
  company: string;
  location?: string;
  employmentType?: string;
  startDate: string;
  endDate?: string | null;
  isCurrent?: boolean;
  achievements?: string[];
}
```

- Visually distinct card/bordered block per position
- Header row: position (bold) + formatted date range with `Calendar` icon
- Sub-row: company name, location with `MapPin` icon, employment type badge
- Achievements list with check marks or bullet points
- Subtle accent styling (e.g., left border in accent color, or top border)
- This component will also be reusable for volunteer experience with a wrapper

### Step 5: Create `ResumeEducation` component
**File:** `src/components/resume/ResumeEducation.tsx`

```tsx
interface ResumeEducationProps {
  school: string;
  degree?: string;
  field?: string;
  graduationYear?: string;
  grade?: string;
}
```

- School name prominent, degree + field below
- Graduation year with `GraduationCap` icon, grade badge
- Wrapped in a Card or styled block

### Step 6: Create `ResumeProject` component
**File:** `src/components/resume/ResumeProject.tsx`

```tsx
interface ResumeProjectProps {
  name: string;
  description?: string;
  url?: string;
  technologies?: string[];
  startDate?: string;
  endDate?: string;
}
```

- Project name + date range
- Description paragraph
- Technology tags (same chip style as skills)
- External link with `ExternalLink` icon

### Step 7: Create `ResumeVolunteer` component
**File:** `src/components/resume/ResumeVolunteer.tsx`

```tsx
interface ResumeVolunteerProps {
  organization: string;
  role: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}
```

- Similar visual style to `ResumeJobExperience` but simpler (role + org + description)
- `Heart` or `Users` icon for the section heading

### Step 8: Refactor `ResumePage.tsx`
**File:** `src/pages/ResumePage.tsx`

Assemble the page using the new components:

1. Import all new components
2. Wrap the page in `PageTransition` (consistent with other pages)
3. Render order:
   - `ResumeHeader` — name, title, contact, CV links
   - `AnimatedSection` → `ResumeHero` — bio + skills
   - `AnimatedSection` → `SectionHeading` ("Work Experience") + map of `ResumeJobExperience`
   - `AnimatedSection` → `SectionHeading` ("Education") + `ResumeEducation`
   - `AnimatedSection` → `SectionHeading` ("Volunteer Experience") + map of `ResumeVolunteer`
   - `AnimatedSection` → `SectionHeading` ("Projects") + map of `ResumeProject`
4. Each section gets staggered animation delay via `AnimatedSection`
5. Remove old inline section code

---

## Lucide Icons to Use

| Purpose | Icon |
|---------|------|
| Location | `MapPin` |
| Email | `Mail` |
| Phone | `Phone` |
| Calendar/Date | `Calendar` or `CalendarDays` |
| Work Experience section | `Briefcase` |
| Education section | `GraduationCap` |
| Volunteer section | `Heart` or `Users` |
| Projects section | `FolderOpen` or `Code` |
| Skills section | `Sparkles` or `Wrench` |
| External link | `ExternalLink` |
| CV download | `Download` or `FileText` |

LinkedIn and GitHub will remain as inline SVGs (lucide doesn't have brand icons).

---

## File Structure

```
src/components/resume/
  SectionHeading.tsx
  ResumeHeader.tsx
  ResumeHero.tsx
  ResumeJobExperience.tsx
  ResumeEducation.tsx
  ResumeVolunteer.tsx
  ResumeProject.tsx
src/pages/
  ResumePage.tsx          (refactored)
```

---

## Key Design Decisions

1. **Flat component directory** (`src/components/resume/`) — follows project convention where components are in `src/components/`, grouped by feature in a subdirectory
2. **Named exports** (not default) — consistent with all existing components
3. **`AnimatedSection` wrapper** on each section — consistent with HomePage/AboutPage patterns
4. **`PageTransition`** wrapper on the whole page — for route transition consistency
5. **Existing types reused** — `Experience`, `ContactData`, `Education`, `Project`, `VolunteerExperience` from `src/lib/cms/types.ts` — no type changes needed
6. **Tailwind-only styling** — no new CSS, using the existing warm stone/amber palette
7. **No new dependencies** — `lucide-react` already installed, `framer-motion` already installed

---

## Implementation Order

1. `SectionHeading` — foundational, used by all sections
2. `ResumeHeader` — top of page
3. `ResumeHero` — bio + skills hero block
4. `ResumeJobExperience` — most complex reusable component
5. `ResumeEducation`
6. `ResumeVolunteer`
7. `ResumeProject`
8. `ResumePage.tsx` refactor — assemble everything
9. Visual testing and polish
