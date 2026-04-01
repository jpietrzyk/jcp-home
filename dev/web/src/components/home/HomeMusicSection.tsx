import { Link } from "react-router-dom";
import { Music } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";
import { SectionHeading } from "../resume/SectionHeading";
import { Card, CardContent } from "../ui/card";
import { tracks } from "../../content/tracks";

export function HomeMusicSection() {
  const latestTracks = tracks.slice(0, 2);

  return (
    <div>
      <AnimatedSection>
        <SectionHeading icon={Music} title="Music" />
      </AnimatedSection>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {latestTracks.map((track, index) => (
          <AnimatedSection key={track.id} delay={0.1 * index}>
            <Link to="/music">
              <Card className="overflow-hidden h-full hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-5 md:p-6 space-y-2">
                  <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 group-hover:underline">
                    {track.title}
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2">
                    {track.description}
                  </p>
                  {track.tags && track.tags.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {track.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </Link>
          </AnimatedSection>
        ))}
      </div>

      {latestTracks.length > 0 && (
        <AnimatedSection delay={0.3}>
          <Link
            to="/music"
            className="inline-flex items-center gap-1.5 text-sm text-amber-700 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 transition-colors mt-4"
          >
            Explore all tracks &rarr;
          </Link>
        </AnimatedSection>
      )}

      {tracks.length === 0 && (
        <p className="text-stone-500 dark:text-stone-500">No tracks yet.</p>
      )}
    </div>
  );
}
