import { useState, useRef } from "react";
import { AnimatedSection } from "../components/AnimatedSection";
import { StrudelPlayer } from "../components/StrudelPlayer";
import { TrackSelector } from "../components/TrackSelector";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { tracks, StrudelTrack } from "../content/tracks";

export function MusicPage() {
  const [selectedTrack, setSelectedTrack] = useState<StrudelTrack | null>(
    tracks.length > 0 ? tracks[0] : null,
  );
  const [autoplay, setAutoplay] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleSelectAndScroll = (track: StrudelTrack) => {
    setSelectedTrack(track);
    setAutoplay(false);
    setTimeout(() => {
      editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handlePlay = (track: StrudelTrack) => {
    setSelectedTrack(track);
    setAutoplay(true);
    setTimeout(() => {
      editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <section className="space-y-8">
      <AnimatedSection delay={0.1}>
        <p className="text-sm uppercase tracking-wide text-zinc-500">
          Interactive Music
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Music</CardTitle>
            <p className="text-zinc-400">
              Explore my experiments with Strudel, a JavaScript port of Tidal
              Cycles for live coding music. Select a track below, hit play, and
              feel free to modify the code to create your own variations.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <AnimatedSection delay={0.3}>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
                <h3 className="mb-2 font-semibold text-zinc-100">
                  About Strudel
                </h3>
                <p className="text-sm text-zinc-400">
                  Strudel is a JavaScript implementation of Tidal Cycles, a
                  language for live coding patterns. It allows you to create
                  music by writing code that describes patterns of sound. Each
                  track below is a mini-program that generates music in
                  real-time. You can modify the code and hear your changes
                  instantly.
                </p>
                <a
                  href="https://strudel.cc/workshop/getting-started/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-sm text-zinc-300 hover:text-zinc-100 hover:underline"
                >
                  Learn more about Strudel →
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <TrackSelector
                tracks={tracks}
                selectedTrackId={selectedTrack?.id ?? ""}
                onSelectAndScroll={handleSelectAndScroll}
                onPlay={handlePlay}
              />
            </AnimatedSection>

            {selectedTrack && (
              <AnimatedSection delay={0.5}>
                <div ref={editorRef} className="space-y-4 scroll-mt-4">
                  <h3 className="text-lg font-semibold text-zinc-100">
                    {selectedTrack.title}
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {selectedTrack.description}
                  </p>
                  <StrudelPlayer
                    code={selectedTrack.code}
                    bpm={selectedTrack.bpm}
                    autoplay={autoplay}
                  />
                </div>
              </AnimatedSection>
            )}
          </CardContent>
        </Card>
      </AnimatedSection>
    </section>
  );
}
