import { StrudelTrack } from "../content/tracks";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface TrackSelectorProps {
  tracks: StrudelTrack[];
  selectedTrackId: string;
  onSelect?: (track: StrudelTrack) => void;
  onPlay?: (track: StrudelTrack) => void;
}

export function TrackSelector({
  tracks,
  selectedTrackId,
  onSelect,
  onPlay,
}: TrackSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">
        Select a Track
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tracks.map((track) => (
          <Card
            key={track.id}
            className={`cursor-pointer flex flex-col transition-all duration-200 hover:border-stone-300 dark:hover:border-stone-600 ${
              track.id === selectedTrackId
                ? "border-stone-400 bg-light-200 dark:border-stone-400 dark:bg-stone-800/50"
                : "border-stone-200 bg-light-100 dark:border-stone-700/50 dark:bg-stone-900/50"
            }`}
            onClick={() => onSelect?.(track)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-[1rem]">{track.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col pb-0">
              <div className="flex-1 space-y-2">
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  {track.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {track.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-stone-200 px-2 py-0.5 text-xs text-stone-600 dark:bg-stone-800 dark:text-stone-400"
                    >
                      {tag}
                    </span>
                  ))}
                  {track.bpm && (
                    <span className="rounded-full bg-stone-200 px-2 py-0.5 text-xs text-stone-600 dark:bg-stone-800 dark:text-stone-400">
                      {track.bpm} BPM
                    </span>
                  )}
                </div>
              </div>
              <div className="flex justify-center p-4">
                <Button
                  variant="default"
                  size="sm"
                  className="h-10 w-10 rounded-full p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlay?.(track);
                  }}
                  aria-label={`Play ${track.title}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
