# Enlarge Sidebar Logo, Shrink Header

## Goal
Move the visual weight of the logo to the sidebar (enlarge it there) and shrink the main content area header to a thin strip since it only contains the sidebar trigger toggle.

## Changes — all in `dev/web/src/layouts/MainLayout.tsx`

### Step 1: Enlarge sidebar header logo
- **Line ~85**: Change `JcpLogo` className from `h-8` to `h-12`
- **Line ~83**: Change link padding from `py-1` to `py-3` for breathing room around the larger logo

### Step 2: Shrink content area header
- **Line ~146**: Change header height from `h-16` to `h-10`
- **Line ~146**: Change padding from `px-4` to `px-3` for compact look

### Not changing
- Footer logo (`h-6`) — appropriate size for footer
- `JcpLogo.tsx` — SVG scales via className, no component changes needed
- Sidebar component internals — `SidebarHeader` already renders the logo correctly
