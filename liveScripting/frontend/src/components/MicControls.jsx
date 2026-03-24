export default function MicControls({ isRecording, isProcessing, onStart, onStop }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-400">Microphone</h2>
      <div className="flex flex-wrap items-center gap-3">
        {!isRecording ? (
          <button
            type="button"
            onClick={onStart}
            className="rounded-lg bg-emerald-500 px-4 py-2 font-medium text-slate-950 hover:bg-emerald-400"
          >
            🎤 Start Recording
          </button>
        ) : (
          <button
            type="button"
            onClick={onStop}
            className="rounded-lg bg-rose-500 px-4 py-2 font-medium text-white hover:bg-rose-400"
          >
            ⏹ Stop Recording
          </button>
        )}

        {isProcessing ? <span className="text-sm text-cyan-300">Processing latest chunk…</span> : null}
      </div>
      <p className="mt-3 text-xs text-slate-400">
        Records in 3s chunks for low-latency streaming transcription.
      </p>
    </div>
  );
}
