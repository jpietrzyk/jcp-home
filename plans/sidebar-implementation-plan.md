# Sidebar Implementation Plan

## Overview
Migrate the current header-based navigation menu to a shadcn/ui Sidebar component aligned to the left side of the screen. This will provide a modern, collapsible sidebar navigation pattern.

## Current State Analysis

### Current Implementation
- **Location**: `dev/web/src/layouts/MainLayout.tsx`
- **Navigation**: Horizontal header with 5 links (Home, About, Resume, Blog, Music)
- **Components**: Uses `Button` component from shadcn/ui, `ThemeToggle` component
- **Styling**: Tailwind CSS with custom color palette (stone, light, dark themes)
- **Features**:
  - Active link highlighting
  - Theme toggle button
  - Footer with quick links
  - Responsive design (max-w-6xl container)

### Existing UI Components
- `button.tsx` - shadcn/ui Button component
- `card.tsx` - shadcn/ui Card component
- `ThemeToggle.tsx` - Custom theme toggle component

## Implementation Plan

### Phase 1: Install shadcn/ui Sidebar Component

1. **Install Sidebar component**
   ```bash
   cd dev/web
   npx shadcn@latest add sidebar
   ```

2. **Verify dependencies**
   - Ensure `@radix-ui/react-slot` is installed (required for Sidebar)
   - Ensure `lucide-react` is installed (for icons)

3. **Install additional dependencies if needed**
   ```bash
   pnpm add @radix-ui/react-slot lucide-react
   ```

### Phase 2: Create Sidebar Component Files

1. **Create `sidebar.tsx`** - Main sidebar component
   - Sidebar container with proper styling
   - Sidebar header with logo/brand
   - Sidebar content with navigation links
   - Sidebar footer with theme toggle

2. **Create `sidebar-provider.tsx`** - Context provider for sidebar state
   - Manages open/close state
   - Provides context to child components

3. **Create `sidebar-trigger.tsx`** - Mobile hamburger menu trigger
   - Button to toggle sidebar on mobile
   - Icon that changes based on state

4. **Create `sidebar-menu.tsx`** - Navigation menu component
   - Renders navigation links
   - Handles active state styling
   - Supports icons for each link

### Phase 3: Update MainLayout.tsx

1. **Import new components**
   ```tsx
   import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
   import { Sidebar } from "@/components/ui/sidebar"
   ```

2. **Wrap layout with SidebarProvider**
   ```tsx
   <SidebarProvider>
     <div className="flex min-h-screen">
       <Sidebar />
       <main className="flex-1">
         <Outlet />
       </main>
     </div>
   </SidebarProvider>
   ```

3. **Move navigation to Sidebar component**
   - Extract navigation links from header
   - Move ThemeToggle to sidebar footer
   - Keep footer in main content area

4. **Update header**
   - Remove navigation from header
   - Add SidebarTrigger for mobile
   - Keep brand/logo in header or move to sidebar

### Phase 4: Mobile Responsiveness

1. **Add mobile breakpoint handling**
   - Sidebar collapses to overlay on mobile
   - Hamburger menu appears in header
   - Click outside to close sidebar

2. **Implement SidebarTrigger**
   - Shows on mobile (< md breakpoint)
   - Hidden on desktop
   - Toggles sidebar open/close

3. **Add overlay for mobile**
   - Semi-transparent backdrop when sidebar is open
   - Click to close sidebar

### Phase 5: Styling and Theming

1. **Match existing design system**
   - Use existing color palette (stone, light, dark)
   - Apply backdrop-blur and transparency effects
   - Maintain border styles (stone-200/50, stone-700/30)

2. **Style navigation links**
   - Use existing Button component variants
   - Maintain active state styling
   - Add hover effects

3. **Style sidebar sections**
   - Header with brand/logo
   - Content with navigation
   - Footer with theme toggle

4. **Dark mode support**
   - Ensure all components respect dark mode
   - Use existing dark mode classes

### Phase 6: Testing and Verification

1. **Test desktop behavior**
   - Sidebar visible by default
   - Navigation works correctly
   - Active states display properly
   - Theme toggle functions

2. **Test mobile behavior**
   - Sidebar hidden by default
   - Hamburger menu appears
   - Sidebar opens/closes correctly
   - Overlay works properly

3. **Test responsive breakpoints**
   - Verify transition at md breakpoint
   - Ensure smooth animations
   - Check for layout shifts

4. **Test accessibility**
   - Keyboard navigation
   - Screen reader support
   - Focus management

## File Structure

```
dev/web/src/
├── components/
│   └── ui/
│       ├── sidebar.tsx
│       ├── sidebar-provider.tsx
│       ├── sidebar-trigger.tsx
│       ├── sidebar-menu.tsx
│       ├── button.tsx (existing)
│       └── card.tsx (existing)
├── layouts/
│   └── MainLayout.tsx (updated)
└── components/
    └── ThemeToggle.tsx (existing)
```

## Dependencies

### Required Packages
- `@radix-ui/react-slot` - For component composition
- `lucide-react` - For icons (Menu, X, etc.)
- `class-variance-authority` - Already installed
- `clsx` - Already installed
- `tailwind-merge` - Already installed

### Existing Dependencies
- `react` - Already installed
- `react-router-dom` - Already installed
- `tailwindcss` - Already installed
- `framer-motion` - Already installed (for animations)

## Implementation Details

### Sidebar Component Structure

```tsx
// sidebar.tsx
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { ThemeToggle } from "../ThemeToggle"
import { NavLink } from "react-router-dom"

const links = [
  { to: "/", label: "Home", icon: Home },
  { to: "/about", label: "About", icon: User },
  { to: "/resume", label: "Resume", icon: FileText },
  { to: "/blog", label: "Blog", icon: BookOpen },
  { to: "/music", label: "Music", icon: Music },
]

export function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-stone-200/50 bg-light-100/80 backdrop-blur-sm dark:border-stone-700/30 dark:bg-dark-900/80">
      {/* Header */}
      <div className="flex h-16 items-center border-b border-stone-200/50 px-4 dark:border-stone-700/30">
        <Link to="/" className="text-lg font-semibold">
          jcp.home
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to}>
            {({ isActive }) => (
              <Button
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.label}
              </Button>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-stone-200/50 p-4 dark:border-stone-700/30">
        <ThemeToggle />
      </div>
    </aside>
  )
}
```

### MainLayout Updates

```tsx
// MainLayout.tsx (updated)
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Sidebar } from "@/components/ui/sidebar"

export function MainLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-light-50 text-stone-900 dark:bg-dark-950 dark:text-stone-200">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {/* Header with mobile trigger */}
          <header className="sticky top-0 z-10 border-b border-stone-200/50 bg-light-100/80 backdrop-blur-sm dark:border-stone-700/30 dark:bg-dark-900/80">
            <div className="flex h-16 items-center justify-between px-4">
              <SidebarTrigger className="md:hidden" />
              <div className="flex-1" />
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 px-4 py-10">
            <Outlet />
          </main>

          {/* Footer */}
          <footer>...</footer>
        </div>
      </div>
    </SidebarProvider>
  )
}
```

## Success Criteria

1. ✅ Sidebar displays on left side of screen
2. ✅ Navigation links work correctly
3. ✅ Active states display properly
4. ✅ Theme toggle functions in sidebar
5. ✅ Mobile hamburger menu appears on small screens
6. ✅ Sidebar collapses to overlay on mobile
7. ✅ Styling matches existing design system
8. ✅ Dark mode support works correctly
9. ✅ Accessibility requirements met
10. ✅ No layout shifts or broken styles

## Timeline

- **Phase 1**: Install dependencies (5 minutes)
- **Phase 2**: Create sidebar components (30 minutes)
- **Phase 3**: Update MainLayout (20 minutes)
- **Phase 4**: Mobile responsiveness (20 minutes)
- **Phase 5**: Styling and theming (15 minutes)
- **Phase 6**: Testing and verification (15 minutes)

**Total estimated time**: ~2 hours

## Notes

- The sidebar should be collapsible on desktop for users who prefer more content space
- Consider adding keyboard shortcuts (e.g., Ctrl+B to toggle sidebar)
- Ensure smooth animations using framer-motion
- Maintain existing footer structure and functionality
- Keep existing color palette and design tokens
