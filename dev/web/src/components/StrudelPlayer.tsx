interface StrudelPlayerProps {
  code: string;
  bpm?: number;
  autoplay?: boolean;
}

export function StrudelPlayer({
  code,
  bpm,
  autoplay = false,
}: StrudelPlayerProps) {
  // Encode the code as base64 for Strudel
  const encodedCode = btoa(unescape(encodeURIComponent(code)));
  const strudelUrl = `https://strudel.cc/#${encodedCode}${autoplay ? "?autoplay=1" : ""}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {bpm && <span className="text-sm text-zinc-400">{bpm} BPM</span>}
        <a
          href={strudelUrl}
          target="_blank"
          rel="noreferrer"
          className="ml-auto text-sm text-zinc-400 hover:text-zinc-200 hover:underline"
        >
          Open in Strudel.cc →
        </a>
      </div>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden">
        <iframe
          key={encodedCode}
          src={strudelUrl}
          title="Strudel REPL"
          className="w-full min-h-[400px] border-0"
          allow="autoplay"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
}
