import { useEffect, useRef } from 'react';

export default function TranscriptPanel({ transcript, translatedText, interimText, isProcessing }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript, translatedText, interimText]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-400">Transcript</h2>

      <div className="h-[360px] overflow-y-auto rounded-xl bg-slate-950/60 p-4 text-slate-100">
        {transcript ? (
          <p className="whitespace-pre-wrap leading-7">{transcript}</p>
        ) : (
          <p className="text-slate-500">Transcript will appear here...</p>
        )}

        {interimText ? <p className="mt-2 animate-pulse text-cyan-300">{interimText}</p> : null}

        {translatedText ? (
          <>
            <hr className="my-4 border-slate-700" />
            <p className="mb-1 text-xs uppercase tracking-wide text-violet-400">Translated</p>
            <p className="whitespace-pre-wrap text-violet-100">{translatedText}</p>
          </>
        ) : null}

        {isProcessing ? <p className="mt-3 text-xs text-slate-400">Processing audio...</p> : null}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
