# JCP Logo Component - Implementation Plan

## Overview
Create a `JcpLogo` React component from the existing `jcp-logo.svg` asset, with theme-aware colors (light/dark mode). Replace the plain text "jcp.home" in the sidebar header and footer with this component.

---

## Current State
- `dev/web/src/assets/jcp-logo.svg` exists as an SVG template with JSX-style `{ink}`, `{accent}`, `{warm}` fill variables — not valid SVG markup, needs conversion to a React component
- Sidebar header (`dev/web/src/layouts/MainLayout.tsx:83-88`) renders `<Link>jcp.home</Link>` as plain text
- Footer brand section (`dev/web/src/layouts/MainLayout.tsx:162-167`) renders the same `<Link>jcp.home</Link>` as plain text
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

### Step 1: Add logo color tokens to `@theme`
**File:** `dev/web/src/styles/index.css`

Add `@theme` tokens so logo colors stay in sync with the theme:
- `--color-logo-ink` / `--color-logo-ink-dark`
- `--color-logo-accent` / `--color-logo-accent-dark`
- `--color-logo-warm` / `--color-logo-warm-dark`

### Step 2: Create `JcpLogo` component
**File:** `dev/web/src/components/JcpLogo.tsx`

Convert the SVG template to a proper React component:

```tsx
import * as React from "react";

type JcpLogoProps = React.SVGProps<SVGSVGElement>;
```

- Inline SVG (not `<img>` src) so colors can be dynamic
- Use token-based Tailwind classes on each element for color switching:
  - `ink` elements: `fill-logo-ink dark:fill-logo-ink-dark`
  - `accent` elements: `fill-logo-accent dark:fill-logo-accent-dark` (stroke for the wave path)
  - `warm` elements: `fill-logo-warm dark:fill-logo-warm-dark`
- Accepts `React.SVGProps<SVGSVGElement>` — defaults to `aria-hidden="true"` (decorative), removes `aria-hidden` when caller provides `aria-label` or `aria-labelledby`
- Accept `className` prop for sizing/positioning control
- Remove `width`/`height` attributes — use `viewBox` only, let CSS control size via className

### Step 3: Update `MainLayout.tsx` sidebar header
**File:** `dev/web/src/layouts/MainLayout.tsx`

Replace the text link in `SidebarHeader` with logo link including hover/focus styles:
```tsx
<Link
  to="/"
  aria-label="JCP Home"
  className="inline-flex items-center px-1.5 py-1 rounded-md hover:bg-stone-100/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2 focus-visible:ring-offset-light-100 dark:hover:bg-stone-800/60 dark:focus-visible:ring-offset-dark-900"
>
  <JcpLogo className="h-8 w-auto" aria-hidden="true" />
</Link>
```

### Step 4: Update `MainLayout.tsx` footer brand
**File:** `dev/web/src/layouts/MainLayout.tsx`

Same treatment in the footer brand section with identical hover/focus styles.

### Step 5: Add test for `JcpLogo`
**File:** `dev/web/src/components/__tests__/JcpLogo.test.tsx`

Tests:
- Renders SVG element with `role="img"`
- Defaults to `aria-hidden="true"` when no label provided
- Removes `aria-hidden` when `aria-label` is provided
- Removes `aria-hidden` when `aria-labelledby` is provided
- Applies custom className
- Renders all logo elements (3 text elements, wave path, dot circle)
- Uses token-based fill classes (`fill-logo-ink`, `dark:fill-logo-ink-dark`, etc.)

---

## Files Changed

| File | Action |
|------|--------|
| `dev/web/src/styles/index.css` | **Edit** — Add 6 logo color `@theme` tokens |
| `dev/web/src/components/JcpLogo.tsx` | **New** — Logo component |
| `dev/web/src/layouts/MainLayout.tsx` | **Edit** — Import + replace 2 text links with styled logo links |
| `dev/web/src/components/__tests__/JcpLogo.test.tsx` | **New** — Tests |
| `dev/web/src/assets/jcp-logo.svg` | **Keep** — As design reference (not imported at runtime) |

## Key Decisions
1. **Inline SVG component** — not an `<img>` tag, so Tailwind `dark:` variant works directly on SVG elements
2. **Token-based colors** — logo colors defined as `@theme` tokens (`--color-logo-*`) rather than hardcoded hex values, staying in sync with the theme
3. **`React.SVGProps<SVGSVGElement>`** — full SVG prop support, defaults to decorative (`aria-hidden`), caller decides accessible name
4. **Dark mode colors** as specified: ink `#dde4ee`, warm `#6a9bc4`, accent `#c4956a`
5. **Light mode colors** derived from existing theme: ink matches body text `#3d3833`, accent matches `--color-accent-muted`, warm matches `--color-accent-primary`
6. **Hover/focus styles** on the wrapping `<Link>` — `inline-flex items-center` layout, subtle background on hover, visible focus ring for keyboard navigation
7. **Keep the SVG file** in assets as design reference, but the component is self-contained
