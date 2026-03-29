import matter from 'gray-matter';
import { StrudelTrack } from './types';

// Import all .str files as raw strings
const trackModules = import.meta.glob('./*.str', {
  query: '?raw',
  import: 'default',
  eager: true
});

function parseTrackFile(content: string, filename: string): StrudelTrack {
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
