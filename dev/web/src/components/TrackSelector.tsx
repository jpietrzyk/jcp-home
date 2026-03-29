import { StrudelTrack } from "../content/tracks";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface TrackSelectorProps {
  tracks: StrudelTrack[];
  selectedTrackId: string;
  onSelectAndScroll?: (track: StrudelTrack) => void;
  onPlay?: (track: StrudelTrack) => void;
}

export function TrackSelector({
  tracks,
  selectedTrackId,
  onSelectAndScroll,
  onPlay,
}: TrackSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-stone-100">Select a Track</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tracks.map((track) => (
          <Card
            key={track.id}
            className={`transition-all duration-200 hover:border-stone-600 ${
              track.id === selectedTrackId
                ? "border-stone-400 bg-stone-800/50"
                : "border-stone-700/50 bg-stone-900/50"
            }`}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{track.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-stone-400">{track.description}</p>
              <div className="flex flex-wrap gap-2">
                {track.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-stone-800 px-2 py-0.5 text-xs text-stone-400"
                  >
                    {tag}
                  </span>
                ))}
                {track.bpm && (
                  <span className="rounded-full bg-stone-800 px-2 py-0.5 text-xs text-stone-400">
                    {track.bpm} BPM
                  </span>
                )}
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onClick={() => onSelectAndScroll?.(track)}
                >
                  Load
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={() => onPlay?.(track)}
                >
                  Play
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
