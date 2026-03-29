import { useEffect } from "react";

interface StrudelPlayerProps {
  code: string;
  bpm?: number;
}

export function StrudelPlayer({ code, bpm }: StrudelPlayerProps) {
  // Encode the code for URL
  const encodedCode = encodeURIComponent(code);
  const strudelUrl = `https://strudel.cc/#${encodedCode}`;

  useEffect(() => {
    // Cleanup function to handle component unmount
    return () => {
      // Any cleanup needed when component unmounts
      // The iframe will be removed from DOM automatically
    };
  }, []);

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
