# Strudel Music Integration Plan for jcp.home

## Overview
Add a "Music" section to the jcp.home homepage featuring an interactive Strudel REPL widget that allows visitors to play and modify your music tracks.

## Project Context
- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **CMS**: Sanity (for content management)

## Implementation Steps

### 1. Install Dependencies
```bash
cd dev/web
npm install @strudel/repl
```

### 2. Create Music Page Component
**File**: `dev/web/src/pages/MusicPage.tsx`

**Features**:
- Hero section with page title and description
- Track selector (dropdown or card-based selection)
- Strudel REPL widget container
- Play/Pause/Stop controls
- Code editor showing the Strudel pattern
- "Open in Strudel.cc" link for full experience
- Responsive design with Tailwind CSS

**Component Structure**:
```tsx
- MusicPage (main page)
  - TrackSelector (component for choosing tracks)
  - StrudelPlayer (component wrapping the REPL)
  - TrackInfo (component showing track details)
```

### 3. Create Track Data Structure
**File**: `dev/web/src/content/tracks.ts`

**Track Interface**:
```typescript
interface StrudelTrack {
  id: string;
  title: string;
  description: string;
  code: string; // Strudel pattern code
  bpm?: number;
  tags?: string[];
}
```

**Sample Tracks**:
- Basic drum pattern
- Melodic sequence
- Ambient soundscape
- Complex polyrhythm

### 4. Update Navigation
**File**: `dev/web/src/layouts/MainLayout.tsx`

Add "Music" link to the navigation menu:
```typescript
const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/resume", label: "Resume" },
  { to: "/blog", label: "Blog" },
  { to: "/music", label: "Music" }, // NEW
];
```

### 5. Update Router Configuration
**File**: `dev/web/src/router.tsx`

Add music route:
```typescript
{ path: "music", element: <MusicPage /> }
```

### 6. Create Strudel Player Component
**File**: `dev/web/src/components/StrudelPlayer.tsx`

**Responsibilities**:
- Initialize Strudel REPL instance
- Handle play/pause/stop controls
- Manage audio context
- Clean up resources on unmount
- Handle code changes

**Key Implementation Details**:
```typescript
import { repl } from '@strudel/repl';

// Initialize REPL with:
// - target container element
// - initial code
// - audio context settings
// - onChange callback for code updates
```

### 7. Create Track Selector Component
**File**: `dev/web/src/components/TrackSelector.tsx`

**Features**:
- Display available tracks as cards or list
- Show track title, description, and tags
- Highlight currently selected track
- Smooth transitions between selections

### 8. Add Styling and Animations
**File**: `dev/web/src/styles/index.css`

Add any custom styles for:
- Strudel REPL container
- Code editor styling
- Control buttons
- Track cards

### 9. Create Sample Strudel Tracks
Include 3-5 demonstration tracks showcasing different Strudel capabilities:

**Track 1: Basic Beat**
```javascript
stack(
  s("bd ~ ~ ~"),
  s("~ sd ~ ~"),
  s("~ ~ hh ~"),
)
```

**Track 2: Melodic Pattern**
```javascript
note("c4 e4 g4 c5")
  .s("sawtooth")
  .lpf(800)
```

**Track 3: Ambient**
```javascript
stack(
  note("c3 eb3 g3").s("sine").slow(4),
  note("c4 eb4 g4").s("triangle").slow(8),
)
```

### 10. Testing Checklist
- [ ] Page loads without errors
- [ ] Strudel REPL initializes correctly
- [ ] Audio plays when clicking play
- [ ] Track selection works
- [ ] Code editor is editable
- [ ] Responsive design works on mobile
- [ ] No memory leaks (proper cleanup)
- [ ] Navigation link works

## File Structure
```
dev/web/src/
├── pages/
│   └── MusicPage.tsx (NEW)
├── components/
│   ├── StrudelPlayer.tsx (NEW)
│   └── TrackSelector.tsx (NEW)
├── content/
│   └── tracks.ts (NEW)
├── layouts/
│   └── MainLayout.tsx (MODIFY - add nav link)
└── router.tsx (MODIFY - add route)
```

## Dependencies to Add
- `@strudel/repl` - Official Strudel REPL package

## Potential Challenges & Solutions

### Challenge 1: Audio Context Initialization
**Issue**: Browsers require user interaction before playing audio
**Solution**: Initialize audio context on first play button click

### Challenge 2: Code Editor Integration
**Issue**: Strudel REPL includes its own editor
**Solution**: Use the built-in editor from @strudel/repl, customize styling with CSS

### Challenge 3: Performance
**Issue**: Multiple audio instances could cause issues
**Solution**: Ensure proper cleanup on component unmount and track changes

### Challenge 4: Mobile Experience
**Issue**: REPL might not be touch-friendly
**Solution**: Add responsive breakpoints, consider simplified mobile controls

## Future Enhancements (Out of Scope)
- Save user modifications to tracks
- Share tracks via URL
- Record and export audio
- Visual feedback (waveform, spectrum)
- Integration with Sanity CMS for track management
- User-submitted tracks

## Success Criteria
1. Music page accessible from navigation
2. Strudel REPL loads and plays audio
3. Users can select from multiple tracks
4. Users can modify code and hear changes
5. Clean, responsive UI matching site design
6. No console errors or warnings

## Estimated Complexity
- Low-Medium (well-documented Strudel API)
- Most complexity in UI/UX design and state management
