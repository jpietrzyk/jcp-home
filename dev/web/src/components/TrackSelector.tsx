import { StrudelTrack } from "../content/tracks";
import { Card, CardContent } from "./ui/card";

interface TrackSelectorProps {
  tracks: StrudelTrack[];
  selectedTrackId: string;
  onSelect: (track: StrudelTrack) => void;
  onPlay?: (track: StrudelTrack) => void;
}

export function TrackSelector({
  tracks,
  selectedTrackId,
  onSelect,
  onPlay,
}: TrackSelectorProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tracks.map((track) => (
          <Card
            key={track.id}
            className={`cursor-pointer transition-all duration-200 hover:border-stone-300 dark:hover:border-stone-600 ${
              track.id === selectedTrackId
                ? "border-stone-400 bg-light-200 dark:border-stone-400 dark:bg-dark-800/50"
                : "border-stone-200/50 bg-light-100 dark:border-stone-700/30 dark:bg-dark-900/50"
            }`}
            onClick={() => onSelect?.(track)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSelect?.(track);
              } else if (e.key === " ") {
                e.preventDefault();
              }
            }}
            onKeyUp={(e) => {
              if (e.key === " ") {
                e.preventDefault();
                onSelect?.(track);
              }
            }}
            role="button"
            tabIndex={0}
            aria-pressed={track.id === selectedTrackId}
          >
            <CardContent className="p-3 space-y-1.5">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-full bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 transition-colors"
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
                    className="h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span className="font-medium text-stone-900 dark:text-stone-100 truncate">
                  {track.title}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {track.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-stone-200/50 px-2 py-0.5 text-xs text-stone-600 dark:bg-dark-800/50 dark:text-stone-400"
                  >
                    {tag}
                  </span>
                ))}
                {track.bpm && (
                  <span className="rounded-full bg-stone-200/50 px-2 py-0.5 text-xs text-stone-600 dark:bg-dark-800/50 dark:text-stone-400">
                    {track.bpm} BPM
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                {track.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
  );
}
