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
        {bpm && (
          <span className="text-sm text-stone-600 dark:text-stone-400">
            {bpm} BPM
          </span>
        )}
        <a
          href={strudelUrl}
          target="_blank"
          rel="noreferrer"
          className="ml-auto text-sm text-stone-600 hover:text-stone-900 hover:underline dark:text-stone-400 dark:hover:text-stone-200"
        >
          Open in Strudel.cc →
        </a>
      </div>
      <div className="rounded-lg border border-stone-200 bg-light-100 overflow-hidden dark:border-stone-700/50 dark:bg-stone-900/50">
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
