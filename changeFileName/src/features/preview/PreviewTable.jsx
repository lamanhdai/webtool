import { useMemo } from 'react'
import { useRenamerStore } from '../../store/useRenamerStore'

const statusStyle = {
  ok: 'bg-emerald-900/30 text-emerald-300 border-emerald-700/40',
  duplicate: 'bg-amber-900/30 text-amber-300 border-amber-700/40',
  invalid: 'bg-rose-900/30 text-rose-300 border-rose-700/40',
}

export function PreviewTable({ rows }) {
  const setManualName = useRenamerStore((s) => s.setManualName)

  const topRows = useMemo(() => rows.slice(0, 1500), [rows])

  if (!rows.length) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center rounded-lg border border-slate-800 bg-slate-950/40 p-8 text-center text-slate-400">
        Add folders/files to preview renamed results.
      </div>
    )
  }

  return (
    <div className="min-h-0 flex-1 overflow-hidden rounded-lg border border-slate-800">
      <div className="h-full overflow-auto bg-slate-950/40">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead className="sticky top-0 bg-slate-900 text-left text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Folder</th>
              <th className="px-3 py-2">Original Name</th>
              <th className="px-3 py-2">New Name (editable)</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {topRows.map((row) => (
              <tr key={row.id} className="border-t border-slate-800 align-top">
                <td className="px-3 py-2 font-mono text-xs text-slate-400">{row.index}</td>
                <td className="max-w-[280px] px-3 py-2 font-mono text-xs text-slate-400">{row.folderPath || '/'}</td>
                <td className="px-3 py-2 text-slate-200">{row.originalName}</td>
                <td className="px-3 py-2">
                  <input
                    value={row.newName}
                    onChange={(e) => setManualName(row.id, e.target.value)}
                    className="w-full rounded border border-slate-700 bg-slate-900 px-2 py-1.5 text-slate-100 outline-none ring-indigo-500 focus:ring"
                  />
                </td>
                <td className="px-3 py-2">
                  <span
                    className={`inline-flex rounded border px-2 py-1 text-xs ${statusStyle[row.status] || statusStyle.ok}`}
                    title={row.reason}
                  >
                    {row.status}
                  </span>
                  {row.reason && <p className="mt-1 text-xs text-slate-400">{row.reason}</p>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length > topRows.length && (
        <div className="border-t border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-400">
          Showing first {topRows.length.toLocaleString()} rows for performance. Total rows:{' '}
          {rows.length.toLocaleString()}.
        </div>
      )}
    </div>
  )
}
