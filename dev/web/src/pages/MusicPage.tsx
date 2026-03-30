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
import { useCmsPage } from "../lib/cms/useCmsPage";

export function MusicPage() {
  const { page } = useCmsPage("music", {
    fallback: {
      title: "Music",
      slug: "music",
      subtitle:
        "Explore my experiments with Strudel, a JavaScript port of Tidal Cycles for live coding music. Select a track below, hit play, and feel free to modify the code to create your own variations.",
      eyebrow: "Interactive Music",
      bodyPlainText:
        "Add a Page document with slug 'music' in Sanity to manage this section.",
    },
  });

  const [selectedTrack, setSelectedTrack] = useState<StrudelTrack | null>(
    tracks.length > 0 ? tracks[0] : null,
  );
  const editorRef = useRef<HTMLDivElement>(null);

  const handleSelect = (track: StrudelTrack) => {
    setSelectedTrack(track);
  };

  const handlePlay = (track: StrudelTrack) => {
    setSelectedTrack(track);
    setTimeout(() => {
      editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <section className="space-y-8">
      {page.eyebrow ? (
        <AnimatedSection delay={0.1}>
          <p className="text-sm uppercase tracking-wide text-stone-500 dark:text-stone-400">
            {page.eyebrow}
          </p>
        </AnimatedSection>
      ) : null}

      <AnimatedSection delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{page.title}</CardTitle>
            <p className="text-stone-600 dark:text-stone-400">
              {page.subtitle}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <AnimatedSection delay={0.3}>
              <div className="rounded-lg border border-stone-200/50 bg-light-100 p-4 dark:border-stone-700/30 dark:bg-dark-900/50">
                <h3 className="mb-2 font-semibold text-stone-900 dark:text-stone-100">
                  About Strudel
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400">
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
                  className="mt-2 inline-block text-sm text-stone-600 hover:text-stone-900 hover:underline dark:text-stone-300 dark:hover:text-stone-100"
                >
                  Learn more about Strudel →
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <TrackSelector
                tracks={tracks}
                selectedTrackId={selectedTrack?.id ?? ""}
                onSelect={handleSelect}
                onPlay={handlePlay}
              />
            </AnimatedSection>

            {selectedTrack && (
              <AnimatedSection delay={0.5}>
                <div ref={editorRef} className="space-y-4 scroll-mt-4">
                  <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                    {selectedTrack.title}
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    {selectedTrack.description}
                  </p>
                  <StrudelPlayer
                    code={selectedTrack.code}
                    bpm={selectedTrack.bpm}
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
