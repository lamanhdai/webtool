import { useRenamerStore } from '../../store/useRenamerStore'

const tokenStyle =
  'rounded bg-slate-800 px-2 py-1 font-mono text-xs text-sky-300 border border-slate-700'

export function PatternEditor({ totalFiles }) {
  const pattern = useRenamerStore((s) => s.pattern)
  const settings = useRenamerStore((s) => s.settings)
  const setPattern = useRenamerStore((s) => s.setPattern)
  const setSettings = useRenamerStore((s) => s.setSettings)
  const clearManualNames = useRenamerStore((s) => s.clearManualNames)

  return (
    <div className="space-y-3 rounded-lg border border-slate-800 bg-slate-950/50 p-3">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Rename Pattern</h2>
        <p className="mt-1 text-xs text-slate-400">Example: <span className="font-mono">{`{folder}_{index}_{original}`}</span></p>
      </div>

      <input
        value={pattern}
        onChange={(e) => setPattern(e.target.value)}
        className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-sm text-white outline-none ring-indigo-500 placeholder:text-slate-500 focus:ring"
        placeholder="{index}_{original}"
      />

      <div className="flex flex-wrap gap-2">
        {['{index}', '{folder}', '{original}', '{ext}', '{date}'].map((token) => (
          <button
            key={token}
            type="button"
            className={tokenStyle}
            onClick={() => setPattern(`${pattern}${token}`)}
          >
            {token}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <label className="space-y-1 text-xs">
          <span className="text-slate-400">Start Index</span>
          <input
            type="number"
            min={1}
            value={settings.startIndex}
            onChange={(e) => setSettings({ startIndex: Number(e.target.value || 1) })}
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1.5 text-slate-100"
          />
        </label>

        <label className="space-y-1 text-xs">
          <span className="text-slate-400">Padding</span>
          <input
            type="number"
            min={1}
            max={10}
            value={settings.padding}
            onChange={(e) => setSettings({ padding: Number(e.target.value || 1) })}
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1.5 text-slate-100"
          />
        </label>

        <label className="space-y-1 text-xs">
          <span className="text-slate-400">Date Format</span>
          <input
            value={settings.dateFormat}
            onChange={(e) => setSettings({ dateFormat: e.target.value })}
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1.5 text-slate-100"
            placeholder="YYYY-MM-DD"
          />
        </label>

        <label className="space-y-1 text-xs">
          <span className="text-slate-400">Sort By</span>
          <select
            value={settings.sortBy}
            onChange={(e) => setSettings({ sortBy: e.target.value })}
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1.5 text-slate-100"
          >
            <option value="name">Name</option>
            <option value="date">Date</option>
            <option value="folder">Folder</option>
          </select>
        </label>

        <label className="space-y-1 text-xs">
          <span className="text-slate-400">Direction</span>
          <select
            value={settings.sortDir}
            onChange={(e) => setSettings({ sortDir: e.target.value })}
            className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1.5 text-slate-100"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </label>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500">Loaded files: {totalFiles}</span>
        <button
          type="button"
          onClick={clearManualNames}
          className="rounded border border-slate-700 px-2 py-1 text-slate-300 hover:bg-slate-800"
        >
          Reset Inline Edits
        </button>
      </div>
    </div>
  )
}
