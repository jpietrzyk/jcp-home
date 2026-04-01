import { Link } from "react-router-dom";
import { Music, ArrowRight, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeading } from "./resume/SectionHeading";
import { tracks } from "../content/tracks";

export function HomeMusicSection() {
  const featuredTracks = tracks.slice(0, 2);

  return (
    <section className="space-y-6">
      <AnimatedSection>
        <SectionHeading icon={Music} title="Music" />
      </AnimatedSection>

      {featuredTracks.length === 0 ? (
        <p className="text-stone-500 dark:text-stone-500">No tracks yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {featuredTracks.map((track, index) => (
            <AnimatedSection key={track.id} delay={0.1 * index}>
              <Card className="overflow-hidden h-full transition-all duration-200 hover:border-stone-300 dark:hover:border-stone-600">
                <CardContent className="p-5 md:p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center h-9 w-9 shrink-0 rounded-full bg-amber-100 dark:bg-amber-900/30">
                      <Play className="h-4 w-4 text-amber-700 dark:text-amber-400" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <h3 className="font-semibold text-stone-900 dark:text-stone-100 truncate">
                        {track.title}
                      </h3>
                      <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2">
                        {track.description}
                      </p>
                    </div>
                  </div>
                  {track.tags && track.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {track.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {track.bpm && (
                        <span className="inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                          {track.bpm} BPM
                        </span>
                      )}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      )}

      {tracks.length > 2 ? (
        <AnimatedSection delay={0.2}>
          <Link to="/music">
            <Button variant="ghost" className="group">
              Explore all tracks
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </AnimatedSection>
      ) : null}
    </section>
  );
}
