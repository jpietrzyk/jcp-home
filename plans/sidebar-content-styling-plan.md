# Sidebar Content Styling Plan

## Overview
Fix active menu item highlighting, remove redundant "Navigation" label, and enlarge "Connect" label in the sidebar.

## Critical Prerequisite: Sidebar Color Theme Tokens Are Broken

When `tailwind.config.ts` was deleted in the previous session (v3→v4 migration), the sidebar color theme tokens were lost. The old config had:

```typescript
sidebar: {
  DEFAULT: 'hsl(var(--sidebar-background))',
  foreground: 'hsl(var(--sidebar-foreground))',
  accent: 'hsl(var(--sidebar-accent))',
  'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  border: 'hsl(var(--sidebar-border))',
  ring: 'hsl(var(--sidebar-ring))',
  primary: 'hsl(var(--sidebar-primary))',
  'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
}
```

These generated Tailwind utilities like `bg-sidebar-accent`, `text-sidebar-foreground`, `ring-sidebar-ring`, etc. — used **21 times** in `sidebar.tsx`. None of these utilities exist in the compiled CSS today. This means:
- Active state highlighting (`data-[active=true]:bg-sidebar-accent`) → **broken**
- Hover state (`hover:bg-sidebar-accent`) → **broken**
- Sidebar text color (`text-sidebar-foreground`) → **broken**
- Sidebar ring/border colors → **broken**

## Changes

### Step 1: Add sidebar color tokens to `@theme` in `index.css`

**File**: `dev/web/src/styles/index.css`

Add sidebar color entries to the existing `@theme` block so Tailwind v4 generates the utility classes:

```css
@theme {
  /* ... existing custom colors ... */

  /* Sidebar color tokens */
  --color-sidebar: hsl(var(--sidebar-background));
  --color-sidebar-foreground: hsl(var(--sidebar-foreground));
  --color-sidebar-primary: hsl(var(--sidebar-primary));
  --color-sidebar-primary-foreground: hsl(var(--sidebar-primary-foreground));
  --color-sidebar-accent: hsl(var(--sidebar-accent));
  --color-sidebar-accent-foreground: hsl(var(--sidebar-accent-foreground));
  --color-sidebar-border: hsl(var(--sidebar-border));
  --color-sidebar-ring: hsl(var(--sidebar-ring));
}
```

The CSS custom properties (`--sidebar-accent`, etc.) are already defined in `@layer base` — these `@theme` entries create the bridge to Tailwind utilities.

### Step 2: Remove "Navigation" group label

**File**: `dev/web/src/layouts/MainLayout.tsx` (lines 91-93)

Remove the `<SidebarGroupLabel>` element from the navigation group:

```tsx
// Before:
<SidebarGroup>
  <SidebarGroupLabel className="text-stone-500 dark:text-stone-400">
    Navigation
  </SidebarGroupLabel>
  <SidebarGroupContent>
    ...

// After:
<SidebarGroup>
  <SidebarGroupContent>
    ...
```

### Step 3: Make "Connect" label bigger

**File**: `dev/web/src/layouts/MainLayout.tsx` (line 126)

Change the Connect label from default `text-xs` (from SidebarGroupLabel base styles) to `text-sm font-semibold`:

```tsx
// Before:
<SidebarGroupLabel className="text-stone-500 dark:text-stone-400">

// After:
<SidebarGroupLabel className="text-sm font-semibold text-stone-500 dark:text-stone-400">
```

### Step 4: Fix active menu item highlighting

**File**: `dev/web/src/layouts/MainLayout.tsx` (lines 98-118)

**Problem**: NavLink applies its own background styling (`bg-stone-200/50` when active) on the `<a>` wrapper element. This competes with SidebarMenuButton's built-in `data-[active=true]:bg-sidebar-accent`. The NavLink `<a>` tag is inline by default and doesn't fill width, so the highlight doesn't span full width.

**Fix**: Remove the background-related classes from NavLink's className. Let SidebarMenuButton handle all visual states (active, hover). SidebarMenuButton already has:
- `w-full rounded-md` → full width, rounded rectangle
- `data-[active=true]:bg-sidebar-accent` → slightly darker than sidebar background (which is the user's requirement)
- `data-[active=true]:text-sidebar-accent-foreground` → readable text on the accent background
- `hover:bg-sidebar-accent hover:text-sidebar-accent-foreground` → hover state

```tsx
// Before:
<NavLink
  to={link.to}
  end={link.to === "/"}
  className={({ isActive }) =>
    cn(
      isActive
        ? "bg-stone-200/50 text-stone-900 dark:bg-dark-800/50 dark:text-stone-100"
        : "text-stone-600 hover:bg-stone-200/30 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-dark-800/30 dark:hover:text-stone-100",
    )
  }
>

// After (remove className entirely — SidebarMenuButton handles all states):
<NavLink
  to={link.to}
  end={link.to === "/"}
>
```

The SidebarMenuButton inherits text color from the sidebar parent (`text-sidebar-foreground`), and its CVA handles active/hover backgrounds.

### Step 5: Clean up social links similarly

**File**: `dev/web/src/layouts/MainLayout.tsx` (lines 133-138)

The social links `<a>` wrapper also has competing background styling. Remove it to let SidebarMenuButton handle hover states:

```tsx
// Before:
<a
  href={link.href}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={link.ariaLabel}
  className="text-stone-600 hover:bg-stone-200/30 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-dark-800/30 dark:hover:text-stone-100 transition-colors duration-300"
>

// After:
<a
  href={link.href}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={link.ariaLabel}
>
```

## File Change Summary

| File | Change |
|------|--------|
| `dev/web/src/styles/index.css` | Add 8 sidebar color tokens to `@theme` block |
| `dev/web/src/layouts/MainLayout.tsx` | Remove "Navigation" label, enlarge "Connect" label, remove competing NavLink/anchor styling |

## Verification

1. Build succeeds (`pnpm build`)
2. Lint passes (`pnpm lint`)
3. Verify compiled CSS contains `.bg-sidebar-accent`, `.text-sidebar-foreground`, etc.
4. Visual check: active nav item shows rounded rectangle slightly darker than sidebar background
5. Visual check: "Navigation" label gone, "Connect" label visibly larger
6. Visual check: hover states work on both nav items and social links
