# JCP Logo Component - Implementation Plan

## Overview
Create a `JcpLogo` React component from the existing `jcp-logo.svg` asset, with theme-aware colors (light/dark mode). Replace the plain text "jcp.home" in the sidebar header and footer with this component.

---

## Current State
- `dev/web/src/assets/jcp-logo.svg` exists as an SVG template with JSX-style `{ink}`, `{accent}`, `{warm}` fill variables — not valid SVG markup, needs conversion to a React component
- Sidebar header (`MainLayout.tsx:83-88`) renders `<Link>jcp.home</Link>` as plain text
- Footer brand section (`MainLayout.tsx:162-167`) renders the same `<Link>jcp.home</Link>` as plain text
- The project uses Tailwind dark mode (`dark` class on `<html>`), not CSS custom properties for theme switching

## SVG Analysis
The logo has 3 color roles:
- **ink** — main text fill ("jcp", "haven")
- **accent** — dash separator + decorative wave stroke
- **warm** — small decorative dot

### Color Values

| Role | Light mode | Dark mode |
|------|-----------|-----------|
| ink | `#3d3833` (warm dark brown) | `#dde4ee` |
| warm | `#d4a574` (accent-primary) | `#6a9bc4` |
| accent | `#a67c52` (accent-muted) | `#c4956a` |

---

## Implementation Steps

### Step 1: Create `JcpLogo` component
**File:** `src/components/JcpLogo.tsx`

Convert the SVG template to a proper React component:

```tsx
interface JcpLogoProps {
  className?: string;
}
```

- Inline SVG (not `<img>` src) so colors can be dynamic
- Use Tailwind `dark:` classes on each element for color switching:
  - `ink` elements: `fill-stone-800 dark:fill-[#dde4ee]`
  - `accent` elements: `fill-accent-muted dark:fill-[#c4956a]` (stroke for the wave path)
  - `warm` elements: `fill-accent-primary dark:fill-[#6a9bc4]`
- Set `aria-label="jcp.home"` and `role="img"` for accessibility
- Accept `className` prop for sizing/positioning control
- Remove `width`/`height` attributes — use `viewBox` only, let CSS control size via className

### Step 2: Update `MainLayout.tsx` sidebar header
**File:** `src/layouts/MainLayout.tsx`

Replace the text link in `SidebarHeader` (lines 83-88):
```tsx
// Before:
<Link className="text-lg font-semibold ..." to="/">
  jcp.home
</Link>

// After:
<Link to="/" aria-label="Home">
  <JcpLogo className="h-8 w-auto" />
</Link>
```

### Step 3: Update `MainLayout.tsx` footer brand
**File:** `src/layouts/MainLayout.tsx`

Replace the text link in the footer brand section (lines 162-167):
```tsx
// Before:
<Link className="text-lg font-semibold ..." to="/">
  jcp.home
</Link>

// After:
<Link to="/" aria-label="Home">
  <JcpLogo className="h-8 w-auto" />
</Link>
```

### Step 4: Add test for `JcpLogo`
**File:** `src/components/__tests__/JcpLogo.test.tsx`

Basic tests:
- Renders SVG element
- Contains accessible label
- Applies custom className
- Renders all logo elements (text paths, wave, dot)

---

## Files Changed

| File | Action |
|------|--------|
| `src/components/JcpLogo.tsx` | **New** — Logo component |
| `src/layouts/MainLayout.tsx` | **Edit** — Import + replace 2 text links |
| `src/components/__tests__/JcpLogo.test.tsx` | **New** — Tests |
| `src/assets/jcp-logo.svg` | **Keep** — As design reference (not imported at runtime) |

## Key Decisions
1. **Inline SVG component** — not an `<img>` tag, so Tailwind `dark:` variant works directly on SVG elements
2. **No CSS custom properties** — the project uses Tailwind's `dark:` class strategy, not CSS vars for theme colors, so Tailwind classes are the idiomatic approach
3. **Dark mode colors** as specified: ink `#dde4ee`, warm `#6a9bc4`, accent `#c4956a`
4. **Light mode colors** derived from existing theme: ink matches body text `#3d3833`, accent matches `--color-accent-muted`, warm matches `--color-accent-primary`
5. **Keep the SVG file** in assets as design reference, but the component is self-contained
