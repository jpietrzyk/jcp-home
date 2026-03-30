interface StrudelPlayerProps {
  code: string;
  bpm?: number;
}

export function StrudelPlayer({ code, bpm }: StrudelPlayerProps) {
  // Encode the code as base64 for Strudel
  // Use a chunked approach to handle large strings
  const encoder = new TextEncoder();
  const data = encoder.encode(code);
  let binary = "";
  for (let i = 0; i < data.length; i++) {
    binary += String.fromCharCode(data[i]);
  }
  const base64 = btoa(binary);
  // Don't use ?autoplay=1 parameter - it causes decoding errors in Strudel
  const strudelUrl = `https://strudel.cc/#${base64}`;

  console.log("[StrudelPlayer] Code length:", code.length);
  console.log("[StrudelPlayer] Base64 length:", base64.length);
  console.log(
    "[StrudelPlayer] First 100 chars of code:",
    code.substring(0, 100),
  );
  console.log(
    "[StrudelPlayer] First 100 chars of base64:",
    base64.substring(0, 100),
  );

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
          key={base64}
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
