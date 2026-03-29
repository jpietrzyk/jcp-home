export interface StrudelTrack {
  id: string;
  title: string;
  description: string;
  code: string;
  bpm?: number;
  tags?: string[];
}

export const tracks: StrudelTrack[] = [
  {
    id: "basic-beat",
    title: "Basic Beat",
    description: "A simple drum pattern with kick, snare, and hi-hat. Perfect for getting started with Strudel.",
    code: `stack(
  s("bd ~ ~ ~"),
  s("~ sd ~ ~"),
  s("~ ~ hh ~"),
)`,
    bpm: 120,
    tags: ["drums", "beginner"],
  },
  {
    id: "melodic-sequence",
    title: "Melodic Sequence",
    description: "A simple melody using sawtooth waves with a low-pass filter.",
    code: `note("c4 e4 g4 c5")
  .s("sawtooth")
  .lpf(800)`,
    bpm: 120,
    tags: ["melody", "synth"],
  },
  {
    id: "ambient-pad",
    title: "Ambient Pad",
    description: "Slow, evolving ambient soundscape with layered sine and triangle waves.",
    code: `stack(
  note("c3 eb3 g3").s("sine").slow(4),
  note("c4 eb4 g4").s("triangle").slow(8),
)`,
    bpm: 60,
    tags: ["ambient", "chill"],
  },
  {
    id: "polyrhythm",
    title: "Polyrhythm",
    description: "Complex rhythmic pattern with multiple layers playing at different speeds.",
    code: `stack(
  s("bd ~ ~ ~ ~ ~ ~ ~"),
  s("~ ~ sd ~ ~ ~ ~ ~"),
  s("~ ~ ~ ~ hh ~ hh ~"),
  note("c3 ~ ~ eb3 ~ ~ g3 ~"),
)`,
    bpm: 140,
    tags: ["complex", "rhythm"],
  },
  {
    id: "bassline",
    title: "Bassline",
    description: "Deep bass pattern with a simple kick drum accompaniment.",
    code: `stack(
  note("c2 c2 eb2 c2").s("sawtooth").lpf(400),
  s("bd ~ ~ ~"),
)`,
    bpm: 128,
    tags: ["bass", "techno"],
  },
];

export function getTrackById(id: string): StrudelTrack | undefined {
  return tracks.find((track) => track.id === id);
}

export function getTracksByTag(tag: string): StrudelTrack[] {
  return tracks.filter((track) => track.tags?.includes(tag));
}
