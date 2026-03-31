# Plan: Dark Mode Color Overhaul — Near-Black Base

## Goal
Replace the current warm brown dark palette with a standard near-black scheme centered on `#0a0a0a` as the body background, with panels/headers/footer at a slightly lighter shade. Text, borders, and muted elements should be neutral (no warm tint).

---

## New Dark Palette

| Token | Old Value | New Value | Purpose |
|-------|-----------|-----------|---------|
| **Body bg** | `#342b1d` (warm brown) | `#0a0a0a` | Main content area |
| **Panels** (sidebar, header, footer) | `dark-900` = `#463a2b` | `#141414` | Sidebar, header, footer |
| **Cards / elevated surfaces** | `dark-950` = `#342b1d` | `#111111` | Cards, modals |
| **Borders** | `stone-700/30` (warm) | `stone-800/40` or `#1e1e1e` | Subtle panel dividers |
| **Scrollbar track** | `#3d3224` | `#111111` | |
| **Scrollbar thumb** | `#524435` | `#2a2a2a` | |
| **Scrollbar thumb hover** | `#5e4f3f` | `#3a3a3a` | |
| **Body text** | `#e8e4e0` (warm) | `#e5e5e5` | Neutral light gray |
| **Headings** | `#faf9f8` (warm white) | `#fafafa` | Neutral white |
| **Muted text** | `#b5afa8` (warm) | `#a3a3a3` | Neutral muted |

---

## Step 1: Update `@theme` custom color tokens in `index.css`

Replace the warm `dark-*` tokens with neutral ones:

```css
--color-dark-600: #4a4a4a;
--color-dark-700: #3a3a3a;
--color-dark-800: #2a2a2a;
--color-dark-900: #1a1a1a;
--color-dark-950: #111111;
```

These map to the Tailwind `bg-dark-*` utilities used throughout components.

---

## Step 2: Update base CSS rules in `index.css`

**`.dark body`**:
- `background-color`: `#342b1d` → `#0a0a0a`
- `color`: `#e8e4e0` → `#e5e5e5`

**`:where(.dark) :is(p, span, div)`**:
- `color`: `#e8e4e0` → `#e5e5e5`

**`.dark .text-muted` etc.**:
- `color`: `#b5afa8` → `#a3a3a3`

**`:where(.dark) :is(h1...h6)`**:
- `color`: `#faf9f8` → `#fafafa`

**Scrollbar dark values**:
- `.dark ::-webkit-scrollbar-track`: `#3d3224` → `#111111`
- `.dark ::-webkit-scrollbar-thumb`: `#524435` → `#2a2a2a`
- `.dark ::-webkit-scrollbar-thumb:hover`: `#5e4f3f` → `#3a3a3a`

---

## Step 3: Update shadcn/ui CSS variables (`.dark` block)

Replace warm HSL values with neutral ones:

```css
.dark {
  --background: 0 0% 4%;          /* #0a0a0a */
  --foreground: 0 0% 90%;         /* #e5e5e5 */
  --popover: 0 0% 7%;             /* #111111 */
  --popover-foreground: 0 0% 90%;
  --muted: 0 0% 15%;              /* #262626 */
  --muted-foreground: 0 0% 64%;   /* #a3a3a3 */
  --secondary: 0 0% 15%;
  --secondary-foreground: 0 0% 90%;
  --ring: 0 0% 40%;
  --input: 0 0% 12%;              /* #1e1e1e */
  --sidebar-background: 0 0% 8%;  /* #141414 */
  --sidebar-foreground: 0 0% 90%;
  --sidebar-primary: 0 0% 25%;
  --sidebar-primary-foreground: 0 0% 98%;
  --sidebar-accent: 0 0% 15%;
  --sidebar-accent-foreground: 0 0% 90%;
  --sidebar-border: 0 0% 12%;
  --sidebar-ring: 0 0% 40%;
}
```

---

## Step 4: Update component dark classes in `MainLayout.tsx`

The sidebar, header, and footer currently use `dark:bg-dark-900/80` — this will now resolve to `#1a1a1a/80` which is close to `#141414`. Good enough, but the panel areas should use a slightly different treatment.

Changes in `MainLayout.tsx`:
- **Sidebar**: `dark:bg-dark-900/80` → `dark:bg-[#141414]/80`
- **Header**: `dark:bg-dark-900/80` → `dark:bg-[#141414]/80`
- **Footer**: `dark:bg-dark-900/80` → `dark:bg-[#141414]/80`
- **Borders**: `dark:border-stone-700/30` → `dark:border-stone-800/30` (subtler on near-black)

---

## Step 5: Update remaining components

Files that reference `dark:bg-dark-*` or `dark:border-stone-700`:

| File | Change |
|------|--------|
| `components/ui/card.tsx:11` | `dark:bg-dark-950` stays (maps to `#111111` — good for cards on `#0a0a0a` bg) |
| `components/ui/button.tsx:14,16` | `dark:bg-dark-800/50` → auto-resolves to `#2a2a2a/50` — fine |
| `components/ThemeToggle.tsx:12` | `dark:hover:bg-dark-800/30` → auto-resolves, fine |
| `components/StrudelPlayer.tsx:52` | `dark:bg-dark-900/50` → `#1a1a1a/50`, fine |
| `components/TrackSelector.tsx:25-26,60,66` | `dark:bg-dark-800/50`, `dark:bg-dark-900/50` → auto-resolve, fine |

Most component-level changes happen automatically through the `@theme` token update. Only `MainLayout.tsx` needs manual panel color overrides with `bg-[#141414]`.

---

## Step 6: Update JcpLogo dark colors (optional)

The logo defines `--color-logo-ink-dark: #dde4ee` (bluish) and `--color-logo-warm-dark: #6a9bc4`. These may need adjusting depending on how they look on `#0a0a0a`. Leave for now and evaluate visually.

---

## Files Changed

| Action | File |
|--------|------|
| **EDIT** | `dev/web/src/styles/index.css` — `@theme` tokens, base rules, shadcn vars |
| **EDIT** | `dev/web/src/layouts/MainLayout.tsx` — panel bg colors, border opacity |

All other component files inherit the changes through Tailwind `dark-*` tokens.

---

## Risk / Notes

- Light mode is **untouched** — only `.dark` / `:where(.dark)` selectors change
- The warm accent colors (`amber`, `accent-primary`) remain and will still provide warmth against the neutral dark base
- All `stone-*` Tailwind classes (text colors, borders) are already neutral and work well on near-black
