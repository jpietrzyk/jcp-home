import { StrudelTrack } from './types';

// Import all .str files as raw strings
const trackModules = import.meta.glob('./*.str', {
  query: '?raw',
  import: 'default',
  eager: true
});

// Simple browser-compatible frontmatter parser
function parseFrontmatter(content: string): { data: Record<string, unknown>; content: string } {
  const lines = content.split('\n');
  const data: Record<string, unknown> = {};
  let inFrontmatter = false;
  let contentStartIndex = 0;
  let currentKey: string | null = null;
  let currentArray: string[] | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === '---') {
      if (!inFrontmatter) {
        inFrontmatter = true;
        continue;
      } else {
        contentStartIndex = i + 1;
        break;
      }
    }

    if (inFrontmatter) {
      // Check if this is a new key-value pair
      const keyValueMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
      if (keyValueMatch) {
        // Save previous array if exists
        if (currentKey && currentArray) {
          data[currentKey] = currentArray;
          currentArray = null;
        }

        currentKey = keyValueMatch[1];
        const value = keyValueMatch[2].trim();

        if (value === '') {
          // Value might be on next lines (array)
          currentArray = [];
        } else {
          // Parse value
          if (value === 'true') {
            data[currentKey] = true;
          } else if (value === 'false') {
            data[currentKey] = false;
          } else if (!isNaN(Number(value))) {
            data[currentKey] = Number(value);
          } else {
            // Remove quotes if present
            data[currentKey] = value.replace(/^["']|["']$/g, '');
          }
          currentKey = null;
        }
      } else if (line.startsWith('- ') && currentArray !== null) {
        // Array item
        const arrayValue = line.substring(2).trim().replace(/^["']|["']$/g, '');
        currentArray.push(arrayValue);
      }
    }
  }

  // Save last array if exists
  if (currentKey && currentArray) {
    data[currentKey] = currentArray;
  }

  const codeContent = lines.slice(contentStartIndex).join('\n');

  return { data, content: codeContent };
}

function parseTrackFile(content: string, filename: string): StrudelTrack {
  const { data, content: code } = parseFrontmatter(content);

  return {
    id: (data.id as string) || filename.replace('.str', ''),
    title: (data.title as string) || 'Untitled',
    description: (data.description as string) || '',
    code: code.trim(),
    bpm: data.bpm as number | undefined,
    tags: (data.tags as string[]) || [],
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
