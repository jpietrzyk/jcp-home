# Dependency Cleanup & Upgrade Plan

## Context

After the Tailwind v3→v4 migration, several leftover artifacts and version mismatches remain. The `package.json` declarations don't match what's actually installed. The goal is a clean, up-to-date dependency tree.

---

## P1 — High Priority (broken/misleading config)

### 1. Fix `tailwindcss` version declaration in `package.json`

**Problem**: `package.json` declares `"tailwindcss": "^3.4.17"` in devDependencies, but v4.2.2 is actually installed (pulled in by `@tailwindcss/vite`). The declared semver range `^3.x` doesn't match v4.

**Fix**: Change to `"tailwindcss": "^4.2.2"` in devDependencies (or remove it entirely since `@tailwindcss/vite` pulls it in as a dependency — but keeping it explicit is clearer).

**Complexity**: Low — single line edit in `package.json`

### 2. Declare `@tailwindcss/vite` in `package.json`

**Problem**: `@tailwindcss/vite@4.2.2` is installed and used in `vite.config.ts`, but it's not listed anywhere in `package.json`. It exists in the lockfile only. This means `pnpm install` on a fresh clone could fail or resolve differently.

**Fix**: Add `"@tailwindcss/vite": "^4.2.2"` to devDependencies (it's a build tool, not a runtime dependency).

**Complexity**: Low — single line edit in `package.json`

### 3. Delete `tailwind.config.ts` (leftover from v3)

**Problem**: The old Tailwind v3 config file still exists. It's not used — all tokens are now in `@theme` in `index.css`. Having it is confusing and could mislead tooling (e.g. `components.json` previously pointed at it). The animations defined in it (`fade-in`, `fade-in-up`, etc.) are **not used anywhere** in the codebase.

**Fix**: Delete `tailwind.config.ts`. If any animations are needed later, define them in `@theme` in `index.css` (Tailwind v4 way).

**Complexity**: Low — delete file

### 4. Delete `postcss.config.js` (leftover from v3)

**Problem**: PostCSS config references `tailwindcss` and `autoprefixer` plugins — this is the Tailwind v3 integration pattern. With Tailwind v4 + `@tailwindcss/vite`, PostCSS is not used. Neither `autoprefixer` nor `postcss` are installed (marked as "missing" by `pnpm outdated`).

**Fix**: Delete `postcss.config.js`.

**Complexity**: Low — delete file

### 5. Remove `autoprefixer` and `postcss` from `package.json`

**Problem**: Both are declared in devDependencies but not installed. They're not needed — Tailwind v4 includes autoprefixer functionality, and the Vite plugin handles CSS processing.

**Fix**: Remove both entries from devDependencies in `package.json`.

**Complexity**: Low — remove two lines

### 6. Remove deprecated `@types/testing-library__react`

**Problem**: `pnpm outdated` reports it as **Deprecated**. Modern `@testing-library/react` (v16+) ships its own types.

**Fix**: Remove `"@types/testing-library__react"` from devDependencies.

**Complexity**: Low — remove one line

---

## P2 — Medium Priority (stale types, version bumps)

### 7. Remove `@types/react` and `@types/react-dom` (or keep pinned to v18)

**Problem**: React 18.x ships with its own types (types are included in the `react` and `react-dom` packages starting from certain versions). The separate `@types/react` and `@types/react-dom` packages are at v18.x but v19.x exists. However, since we're on React 18, the v18 types are correct.

**Fix**: Two options:
- **Option A** (recommended for now): Keep them as-is since we're on React 18 — they're needed.
- **Option B**: If upgrading to React 19 (see P3), these should be removed since React 19 ships its own types.

**Complexity**: N/A (no action needed unless React 19 upgrade happens)

### 8. Bump `typescript-eslint` to `^8.58.0`

**Problem**: Currently at `8.57.2`, latest is `8.58.0`. Minor version bump.

**Fix**: Update version range in `package.json`, run `pnpm install`.

**Complexity**: Low

---

## P3 — Lower Priority (major version bumps, larger scope)

### 9. Upgrade React 18 → 19

**Current**: `react@18.3.1`, `react-dom@18.3.1`
**Latest**: `react@19.2.4`, `react-dom@19.2.4`

**Impact**:
- Remove `@types/react` and `@types/react-dom` (React 19 ships own types)
- `framer-motion` v12 should support React 19, but verify
- `react-router-dom` v7 supports React 19
- Some React 19 breaking changes: `ref` as prop (no more `forwardRef` needed), `use` hook, changes to `react-dom/client`
- Test all components thoroughly

**Complexity**: Medium — requires testing all components and potentially refactoring forwardRef patterns

### 10. Upgrade Vite 5 → 6 (or latest)

**Current**: `vite@5.4.21`
**Latest**: `vite@8.0.3`

**Impact**:
- Vite 6 and above have breaking changes around environment API
- `@vitejs/plugin-react` needs to be bumped too (currently `4.7.0`, latest `6.0.1`)
- Major version jump — may require config changes
- Recommend upgrading to Vite 6 first, then 7, then 8 if needed

**Complexity**: Medium-High — multiple major versions, incremental upgrade recommended

### 11. Upgrade Vitest 3 → 4

**Current**: `vitest@3.2.4`, `@vitest/ui@3.2.4`, `@vitest/coverage-v8@3.2.4`
**Latest**: `4.1.2` for all three

**Impact**:
- Breaking changes in Vitest 4 (check migration guide)
- All three packages must be upgraded together

**Complexity**: Medium — check migration guide, update config if needed

### 12. Upgrade `@portabletext/react` 3 → 6 and `@portabletext/types` 2 → 4

**Current**: `@portabletext/react@3.2.4`, `@portabletext/types@2.0.15`
**Latest**: `6.0.3`, `4.0.2`

**Impact**:
- Major API changes likely between v3→v6
- Check if Sanity CMS integration code needs updating

**Complexity**: Medium — API changes need investigation

### 13. Upgrade `tailwind-merge` 2 → 3

**Current**: `tailwind-merge@2.6.1`
**Latest**: `3.5.0`

**Impact**:
- Only used in `src/lib/utils.ts` for `cn()` helper
- Check breaking changes — likely minor API adjustments

**Complexity**: Low-Medium — check changelog for breaking changes

### 14. Upgrade `@types/node` 22 → 25

**Current**: `@types/node@22.19.15`
**Latest**: `25.5.0`

**Impact**: Should be safe — these are just type definitions. Align with Node.js version being used.

**Complexity**: Low

---

## Recommended Execution Order

1. **Batch P1 items together** (items 1–6) — clean up the broken/leftover artifacts first
2. Run `pnpm install` to refresh lockfile
3. Run `pnpm build && pnpm lint && pnpm test:run` to verify
4. **Then tackle P3 items individually** — one major upgrade at a time with verification between each
5. P2 items can be done alongside P1 or P3 as convenient

## File Change Summary (P1 only)

| File | Action |
|------|--------|
| `package.json` | Fix tailwindcss version, add @tailwindcss/vite, remove autoprefixer/postcss/@types/testing-library__react |
| `tailwind.config.ts` | Delete |
| `postcss.config.js` | Delete |
