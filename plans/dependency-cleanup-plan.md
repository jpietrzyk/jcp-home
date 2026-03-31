# Dependency Cleanup & Upgrade Plan

## Context

After the Tailwind v3→v4 migration, several leftover artifacts and version mismatches were identified. Some have already been resolved; remaining items are tracked below. The goal is a clean, up-to-date dependency tree.

---

## P1 — High Priority (broken/misleading config)

### 1. Fix `tailwindcss` version declaration in `package.json` — ✅ Done

**Problem**: `package.json` previously declared `"tailwindcss": "^3.4.17"` in devDependencies while v4.2.2 was actually installed. The declared semver range `^3.x` didn't match v4.

**Fix**: Already resolved — `dev/web/package.json` now correctly declares `"tailwindcss": "^4.2.2"` in devDependencies.

**Complexity**: None — already done.

### 2. Declare `@tailwindcss/vite` in `package.json` — ✅ Done

**Problem**: `@tailwindcss/vite@4.2.2` was installed and used in `vite.config.ts`, but was missing from `package.json` (only in the lockfile).

**Fix**: Already resolved — `dev/web/package.json` now lists `"@tailwindcss/vite": "^4.2.2"` in devDependencies.

**Complexity**: None — already done.

### 3. `tailwind.config.ts` (leftover from v3) — ✅ Done

**Status**: This file no longer exists in the repo (no `dev/web/tailwind.config.ts`). The v3 config has already been removed and all tokens live in `@theme` in `index.css`.

**Action**: None — cleanup already completed. If any Tailwind animations are needed in the future, define them in `@theme` in `index.css` (Tailwind v4 way).

**Complexity**: N/A — no work required.

### 4. `postcss.config.js` (leftover from v3) — ✅ Done

**Status**: There is no `dev/web/postcss.config.js` in the repo. The old PostCSS integration (with `tailwindcss` and `autoprefixer` plugins) has already been removed in favor of Tailwind v4 + `@tailwindcss/vite`.

**Action**: None — cleanup already completed.

**Complexity**: N/A — no work required.

### 5. `autoprefixer` and `postcss` devDependencies — ✅ Done

**Status**: `autoprefixer` and `postcss` are not listed in `dev/web/package.json` devDependencies anymore. The Tailwind v4 toolchain (via `@tailwindcss/vite`) handles CSS processing without these explicit devDependencies.

**Action**: None — cleanup already completed.

**Complexity**: N/A — no work required.

### 6. Remove deprecated `@types/testing-library__react` — ✅ Done

**Problem**: `pnpm outdated` reported it as **Deprecated**. Modern `@testing-library/react` (v16+) ships its own types.

**Fix**: Already resolved — removed from devDependencies.

**Complexity**: None — already done.

---

## P2 — Medium Priority (stale types, version bumps)

### 7. Keep `@types/react` and `@types/react-dom` (required for React 18)

**Problem**: For React 18, TypeScript types are still provided by the DefinitelyTyped packages (`@types/react` and `@types/react-dom`), not bundled directly with `react` / `react-dom`. In this repo, those `@types` packages are on v18.x while v19.x exists on npm, but that mismatch is expected and correct because the app itself is on React 18.

**Fix**: Two options:
- **Option A** (recommended for now): Keep `@types/react` and `@types/react-dom` pinned to a compatible v18.x range, since they are required while we are on React 18.
- **Option B**: If/when upgrading to a React version that **does** bundle its own TypeScript types (e.g. a future React 19+ that inlines types — see P3), remove `@types/react` and `@types/react-dom` and rely on the bundled types instead.

**Complexity**: N/A (no action needed unless/until a React major upgrade that bundles types happens)

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

1. ~~**Batch P1 items together** (items 1–6)~~ — All P1 items are already done.
2. Run `pnpm install` to refresh lockfile
3. Run `pnpm build && pnpm lint && pnpm test:run` to verify
4. **Tackle P3 items individually** — one major upgrade at a time with verification between each
5. P2 items can be done alongside P3 as convenient

## File Change Summary (P1 — all completed)

| File | Action | Status |
|------|--------|--------|
| `package.json` | Fix tailwindcss version, add @tailwindcss/vite, remove autoprefixer/postcss/@types/testing-library__react | ✅ Done |
| `tailwind.config.ts` | Delete | ✅ Done |
| `postcss.config.js` | Delete | ✅ Done |
