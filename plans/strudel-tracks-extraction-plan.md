# Strudel Tracks Extraction Plan

## Current State Analysis

### Current Structure
- All tracks are hardcoded in [`dev/web/src/content/tracks.ts`](dev/web/src/content/tracks.ts)
- Each track is a `StrudelTrack` object with: `id`, `title`, `description`, `code`, `bpm`, `tags`
- The `code` field contains Strudel code as a string literal
- Tracks are imported in [`MusicPage.tsx`](dev/web/src/pages/MusicPage.tsx) and [`TrackSelector.tsx`](dev/web/src/components/TrackSelector.tsx)

### Problems with Current Approach
1. **Editing difficulty**: All tracks in one file makes editing cumbersome
2. **No syntax highlighting**: Strudel code is just a string, no editor support
3. **Version control noise**: Changes to one track affect the entire file
4. **Scalability**: Adding many tracks will make the file unwieldy

## Proposed Solution: Vite Glob Import with Frontmatter

### Why This Approach?
1. **Native Vite support**: Uses built-in `import.meta.glob` - no custom plugins needed
2. **Clean separation**: Each track in its own file with proper syntax highlighting
3. **Build-time compilation**: All tracks bundled at build time, no runtime overhead
4. **Developer experience**: Easy to add/edit tracks, proper file organization
5. **Type safety**: TypeScript support maintained

### Directory Structure
```
dev/web/src/content/tracks/
├── basic-beat.str
├── melodic-sequence.str
├── ambient-pad.str
├── polyrhythm.str
├── bassline.str
└── index.ts          # Auto-generated or manual loader
```

### File Format: `.str` with Frontmatter

Each track file will use YAML frontmatter for metadata and Strudel code as content:

```yaml
---
id: basic-beat
title: Basic Beat
description: A simple drum pattern with kick, snare, and hi-hat. Perfect for getting started with Strudel.
bpm: 120
tags:
  - drums
  - beginner
---

stack(
  s("bd ~ ~ ~"),
  s("~ sd ~ ~"),
  s("~ ~ hh ~"),
)
```

## Implementation Plan

### Phase 1: Setup Infrastructure

#### 1.1 Install Dependencies
```bash
cd dev/web
npm install gray-matter  # For parsing YAML frontmatter
```

#### 1.2 Create Track Loader Module
Create `dev/web/src/content/tracks/loader.ts`:

```typescript
import { StrudelTrack } from './types';

// Import all .str files as raw strings
const trackModules = import.meta.glob('./*.str', {
  query: '?raw',
  import: 'default',
  eager: true
});

function parseTrackFile(content: string, filename: string): StrudelTrack {
  const matter = require('gray-matter');
  const { data, content: code } = matter(content);

  return {
    id: data.id || filename.replace('.str', ''),
    title: data.title || 'Untitled',
    description: data.description || '',
    code: code.trim(),
    bpm: data.bpm,
    tags: data.tags || [],
  };
}

export function loadTracks(): StrudelTrack[] {
  return Object.entries(trackModules).map(([path, content]) => {
    const filename = path.split('/').pop() || '';
    return parseTrackFile(content as string, filename);
  });
}

export const tracks = loadTracks();

export function getTrackById(id: string): StrudelTrack | undefined {
  return tracks.find((track) => track.id === id);
}

export function getTracksByTag(tag: string): StrudelTrack[] {
  return tracks.filter((track) => track.tags?.includes(tag));
}
```

#### 1.3 Create Type Definitions
Create `dev/web/src/content/tracks/types.ts`:

```typescript
export interface StrudelTrack {
  id: string;
  title: string;
  description: string;
  code: string;
  bpm?: number;
  tags?: string[];
}
```

### Phase 2: Migrate Existing Tracks

#### 2.1 Create Individual Track Files
Extract each track from the current `tracks.ts` into separate `.str` files:

**File: `dev/web/src/content/tracks/basic-beat.str`**
```yaml
---
id: basic-beat
title: Basic Beat
description: A simple drum pattern with kick, snare, and hi-hat. Perfect for getting started with Strudel.
bpm: 120
tags:
  - drums
  - beginner
---

stack(
  s("bd ~ ~ ~"),
  s("~ sd ~ ~"),
  s("~ ~ hh ~"),
)
```

**File: `dev/web/src/content/tracks/melodic-sequence.str`**
```yaml
---
id: melodic-sequence
title: Melodic Sequence
description: A simple melody using sawtooth waves with a low-pass filter.
bpm: 120
tags:
  - melody
  - synth
---

note("c4 e4 g4 c5")
  .s("sawtooth")
  .lpf(800)
```

(Continue for all 5 existing tracks)

#### 2.2 Create Index File
Create `dev/web/src/content/tracks/index.ts`:

```typescript
export { tracks, getTrackById, getTracksByTag } from './loader';
export type { StrudelTrack } from './types';
```

### Phase 3: Update Imports

#### 3.1 Update MusicPage.tsx
Change import from:
```typescript
import { tracks, StrudelTrack } from "../content/tracks";
```

To:
```typescript
import { tracks, StrudelTrack } from "../content/tracks";
```

(No change needed if we keep the same export path)

#### 3.2 Update TrackSelector.tsx
Change import from:
```typescript
import { StrudelTrack } from "../content/tracks";
```

To:
```typescript
import { StrudelTrack } from "../content/tracks";
```

(No change needed if we keep the same export path)

### Phase 4: Cleanup

#### 4.1 Remove Old tracks.ts
Delete `dev/web/src/content/tracks.ts` after confirming all imports work.

#### 4.2 Update .gitignore (Optional)
Add to `.gitignore` if needed:
```
# Generated files (if using build-time generation)
dev/web/src/content/tracks/generated.ts
```

## Alternative Approaches Considered

### Approach A: Vite Plugin (Custom)
**Pros**: Full control, can generate TypeScript types
**Cons**: More complex, requires plugin maintenance
**Verdict**: Overkill for this use case

### Approach B: Build Script
**Pros**: Simple, works with any bundler
**Cons**: Extra build step, not integrated with Vite
**Verdict**: Less elegant than glob import

### Approach C: Runtime Loading
**Pros**: Dynamic, can add tracks without rebuild
**Cons**: Runtime overhead, no tree-shaking, CORS issues
**Verdict**: Not suitable for static site

## Benefits of Chosen Approach

1. **Developer Experience**
   - Each track in its own file with `.str` extension
   - Syntax highlighting for Strudel code (with proper editor config)
   - Easy to add new tracks: just create a new `.str` file
   - Clear git history per track

2. **Build Performance**
   - All tracks loaded at build time
   - No runtime overhead
   - Tree-shaking friendly

3. **Maintainability**
   - Clear separation of concerns
   - Type-safe with TypeScript
   - Easy to test individual tracks

4. **Scalability**
   - Can handle hundreds of tracks
   - No performance degradation
   - Easy to organize into subdirectories if needed

## Future Enhancements

### 1. Editor Support for .str Files
Add VS Code configuration for Strudel syntax highlighting:

Create `.vscode/settings.json`:
```json
{
  "files.associations": {
    "*.str": "javascript"
  }
}
```

### 2. Track Validation
Add validation in loader to ensure all tracks have required fields:

```typescript
function validateTrack(track: StrudelTrack): void {
  if (!track.id) throw new Error(`Track missing id: ${track.title}`);
  if (!track.code) throw new Error(`Track missing code: ${track.id}`);
  // ... more validation
}
```

### 3. Hot Module Replacement
Vite's HMR will work automatically - editing a `.str` file will trigger a reload.

### 4. Track Categories
Organize tracks into subdirectories:
```
tracks/
├── drums/
│   ├── basic-beat.str
│   └── polyrhythm.str
├── melodies/
│   └── melodic-sequence.str
└── ambient/
    └── ambient-pad.str
```

Update loader to handle nested directories:
```typescript
const trackModules = import.meta.glob('./**/*.str', {
  query: '?raw',
  import: 'default',
  eager: true
});
```

## Implementation Checklist

- [ ] Install `gray-matter` dependency
- [ ] Create `dev/web/src/content/tracks/` directory
- [ ] Create `types.ts` with StrudelTrack interface
- [ ] Create `loader.ts` with track loading logic
- [ ] Create `index.ts` with exports
- [ ] Create 5 individual `.str` track files
- [ ] Update imports in MusicPage.tsx (if needed)
- [ ] Update imports in TrackSelector.tsx (if needed)
- [ ] Test that all tracks load correctly
- [ ] Remove old `tracks.ts` file
- [ ] Update documentation

## Testing Strategy

1. **Unit Tests**: Test loader function with mock .str files
2. **Integration Tests**: Verify all tracks load in MusicPage
3. **Manual Testing**:
   - Check each track plays correctly
   - Verify metadata (title, description, BPM, tags) displays
   - Test adding a new track file

## Rollback Plan

If issues arise:
1. Keep old `tracks.ts` as `tracks.backup.ts`
2. Revert imports to use backup
3. Fix issues in new structure
4. Switch back when ready

## Timeline Estimate

- Phase 1 (Setup): 30 minutes
- Phase 2 (Migration): 30 minutes
- Phase 3 (Update Imports): 15 minutes
- Phase 4 (Cleanup): 15 minutes
- Testing: 30 minutes

**Total**: ~2 hours

## Success Criteria

- [ ] All existing tracks work identically
- [ ] Each track in its own `.str` file
- [ ] Easy to add new tracks
- [ ] No performance regression
- [ ] Type safety maintained
- [ ] Developer experience improved
