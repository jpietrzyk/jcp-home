import { StrudelTrack } from "../content/tracks";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface TrackSelectorProps {
  tracks: StrudelTrack[];
  selectedTrackId: string;
  onSelectTrack: (track: StrudelTrack) => void;
}

export function TrackSelector({
  tracks,
  selectedTrackId,
  onSelectTrack,
}: TrackSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-zinc-100">Select a Track</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tracks.map((track) => (
          <Card
            key={track.id}
            className={`cursor-pointer transition-all duration-200 hover:border-zinc-600 ${
              track.id === selectedTrackId
                ? "border-zinc-400 bg-zinc-800/50"
                : "border-zinc-800 bg-zinc-900/50"
            }`}
            onClick={() => onSelectTrack(track)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{track.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-zinc-400">{track.description}</p>
              <div className="flex flex-wrap gap-2">
                {track.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
                {track.bpm && (
                  <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                    {track.bpm} BPM
                  </span>
                )}
              </div>
              <Button
                variant={track.id === selectedTrackId ? "default" : "ghost"}
                size="sm"
                className="w-full mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectTrack(track);
                }}
              >
                {track.id === selectedTrackId ? "Selected" : "Select"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
