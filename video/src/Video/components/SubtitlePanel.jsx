const LANG_OPTIONS = [
  { value: 'off', label: 'Off' },
  { value: 'en', label: 'English' },
  { value: 'vi', label: 'Vietnamese' },
  { value: 'ja', label: 'Japanese' },
]

export function SubtitlePanel({
  tracks,
  selectedLanguage,
  onLanguageChange,
  onGenerate,
  isGenerating,
  job,
  error,
}) {
  const availableLanguages = new Set(tracks.map((track) => track.language))

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-white">AI Subtitles</h2>

        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className="rounded bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isGenerating ? 'Generating subtitles…' : 'Generate Subtitles (AI)'}
        </button>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-[240px_1fr] md:items-center">
        <label className="text-xs text-slate-300">
          Subtitle language
          <select
            className="mt-1 w-full rounded border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
            value={selectedLanguage}
            onChange={(event) => onLanguageChange(event.target.value)}
          >
            {LANG_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.value !== 'off' && !availableLanguages.has(option.value)}
              >
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="rounded border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-300">
          {job ? (
            <>
              <p className="font-semibold text-slate-100">Status: {job.status}</p>
              <p className="mt-1">Progress: {Math.round(job.progress || 0)}%</p>
              <p className="mt-1 text-slate-400">{job.message}</p>
              {job.error ? <p className="mt-1 text-rose-300">{job.error}</p> : null}
            </>
          ) : (
            <p>No subtitle job running.</p>
          )}
        </div>
      </div>

      <div className="mt-3 rounded border border-slate-800 bg-slate-950/40 p-3 text-xs text-slate-300">
        <p className="font-semibold text-slate-100">Available tracks</p>
        {tracks.length ? (
          <ul className="mt-2 flex flex-wrap gap-2">
            {tracks.map((track) => (
              <li key={track.language} className="rounded bg-slate-800 px-2 py-1">
                {track.language.toUpperCase()}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-slate-400">No generated subtitles yet.</p>
        )}

        {error ? <p className="mt-2 text-rose-300">{error}</p> : null}
      </div>
    </section>
  )
}
