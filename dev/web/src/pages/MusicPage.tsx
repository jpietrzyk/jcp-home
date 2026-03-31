import { useState, useRef } from "react";
import { Music, Wand2 } from "lucide-react";
import { AnimatedSection } from "../components/AnimatedSection";
import { PageTransition } from "../components/PageTransition";
import { SectionHeading } from "../components/resume/SectionHeading";
import { CmsPageContent } from "../components/CmsPageContent";
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
  const { page, isLoading, error } = useCmsPage("music", {
    fallback: {
      title: "Music",
      slug: "music",
      subtitle:
        "Explore my experiments with Strudel, a JavaScript port of Tidal Cycles for live coding music. Select a track below, hit play, and feel free to modify the code to create your own variations.",
      eyebrow: "Interactive Music",
      bodyPlainText:
        "Strudel is a JavaScript implementation of Tidal Cycles, a language for live coding patterns. It allows you to create music by writing code that describes patterns of sound. Each track below is a mini-program that generates music in real-time. You can modify the code and hear your changes instantly.\n\n[Learn more about Strudel →](https://strudel.cc/workshop/getting-started/)",
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
    <PageTransition>
      <section className="space-y-10">
        {page.eyebrow ? (
          <AnimatedSection>
            <p className="text-sm uppercase tracking-wide text-stone-500 dark:text-stone-400">
              {page.eyebrow}
            </p>
          </AnimatedSection>
        ) : null}

        <AnimatedSection delay={0.1}>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{page.title}</CardTitle>
              <p className="text-stone-600 dark:text-stone-400">
                {page.subtitle}
              </p>
            </CardHeader>
            <CardContent>
              <CmsPageContent
                error={error}
                isLoading={isLoading}
                body={page.body}
                bodyPlainText={page.bodyPlainText}
                richTextClassName="prose max-w-2xl text-stone-600 dark:text-stone-400 dark:prose-invert"
                hideFirstHeadingMatching={page.title}
                errorClassName="max-w-2xl text-amber-600 dark:text-amber-500"
                loadingClassName="max-w-2xl text-stone-500 dark:text-stone-500"
              />
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <SectionHeading icon={Music} title="Tracks" />
          <TrackSelector
            tracks={tracks}
            selectedTrackId={selectedTrack?.id ?? ""}
            onSelect={handleSelect}
            onPlay={handlePlay}
          />
        </AnimatedSection>

        {selectedTrack && (
          <AnimatedSection delay={0.3}>
            <SectionHeading icon={Wand2} title="Play & Modify" />
            <Card>
              <CardContent className="p-5 md:p-6 space-y-4">
                <div ref={editorRef} className="scroll-mt-4 space-y-3">
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
              </CardContent>
            </Card>
          </AnimatedSection>
        )}
      </section>
    </PageTransition>
  );
}
