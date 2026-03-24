function formatDuration(seconds) {
  if (!seconds) return '0s';
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}m ${s}s`;
}

export default function MetadataPanel({ language, duration, confidence, segmentsCount, uploadProgress, error }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-400">Metadata</h2>

      <div className="space-y-3 text-sm text-slate-200">
        <Row label="Detected language" value={language || 'unknown'} />
        <Row label="Duration" value={formatDuration(Number(duration || 0))} />
        <Row
          label="Confidence"
          value={typeof confidence === 'number' ? `${Math.round(confidence * 100)}%` : 'n/a'}
        />
        <Row label="Segments" value={String(segmentsCount || 0)} />
      </div>

      {uploadProgress > 0 && uploadProgress < 100 ? (
        <div className="mt-4">
          <p className="mb-1 text-xs text-slate-300">Upload progress: {uploadProgress}%</p>
          <div className="h-2 overflow-hidden rounded bg-slate-700">
            <div
              className="h-full bg-cyan-500 transition-all"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="mt-4 rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-300">
          {error}
        </div>
      ) : null}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg bg-slate-800/70 px-3 py-2">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-slate-100">{value}</span>
    </div>
  );
}
