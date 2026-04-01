# Footer Redesign Plan

## Current state
The footer is a single-row horizontal strip (`flex-row sm:justify-between`) with:
- Logo + copyright (left)
- Nav links in a row: About | Blog | Music (center)
- Social icons in a row: Email | LinkedIn | GitHub (right)

## Desired layout
A taller, more spacious footer with two content columns:

```
┌─────────────────────────────────────────────────────┐
│  ┌──────────────┐  ┌──────────────┐                 │
│  │  PAGES        │  │  CONNECT      │                │
│  │  Home         │  │  [in] [gh] ✉] │                │
│  │  About        │  │               │                │
│  │  Projects     │  │               │                │
│  │  Blog         │  │               │                │
│  │  Music        │  │               │                │
│  └──────────────┘  └──────────────┘                 │
│                                                     │
│  © 2026 Jacek Pietrzyk                              │
└─────────────────────────────────────────────────────┘
```

**Row 1** — Two columns:
1. **Pages** (left) — Section title "Pages" + all 5 nav links stacked vertically (one per line, same styling as current nav links but vertical)
2. **Connect** (right) — Section title "Connect" + social icons displayed the same as now (horizontal row of icon links)

**Row 2** — Full width:
- Copyright line: `© 2026 Jacek Pietrzyk`

## Implementation

### Single file change: `dev/web/src/layouts/MainLayout.tsx`

Replace the `<footer>` block (lines 155–224) with:

```tsx
<footer className="border-t border-stone-200/50 bg-sidebar/80 backdrop-blur-sm dark:border-stone-800/30">
  <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12">
      {/* Pages column */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-4">
          Pages
        </h3>
        <nav className="flex flex-col gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-sm transition-colors duration-300",
                  isActive
                    ? "text-stone-900 dark:text-stone-100"
                    : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-300",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Connect column */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-stone-400 mb-4">
          Connect
        </h3>
        <div className="flex items-center gap-3">
          {/* same social icon links as current */}
        </div>
      </div>
    </div>

    <div className="mt-8 pt-6 border-t border-stone-200/50 dark:border-stone-800/30">
      <span className="text-sm text-stone-600 dark:text-stone-400">
        © {new Date().getFullYear()} {profile.name}
      </span>
    </div>
  </div>
</footer>
```

### Key details
- **Section titles**: `text-sm font-semibold uppercase tracking-wide text-stone-500` — matching the `SidebarGroupLabel` style used in the sidebar
- **Pages nav**: `flex-col gap-2` for vertical stacking of all 5 links (Home, About, Projects, Blog, Music)
- **Social icons**: Keep exactly the same icon-only links in a horizontal row (`flex items-center gap-3`)
- **Copyright**: Full-width row below, separated by a subtle border-top
- **Responsive**: `grid-cols-1 sm:grid-cols-2` — stacks on mobile, side-by-side on desktop
- **Spacing**: `py-8 md:py-10` for more vertical breathing room (up from `py-6`)
- **No logo in footer**: Removed to avoid redundancy with the sidebar — copyright line is sufficient

### Files to modify
| File | Change |
|------|--------|
| `dev/web/src/layouts/MainLayout.tsx` | Replace footer section (lines 155–224) |

No new components or files needed — this is a pure layout change within MainLayout.
