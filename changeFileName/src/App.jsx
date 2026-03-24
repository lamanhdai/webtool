import { useMemo } from 'react'
import ReactGA from "react-ga4";
import { FileDropZone } from './features/file-parser/FileDropZone'
import { PatternEditor } from './features/renamer/PatternEditor'
import { PreviewTable } from './features/preview/PreviewTable'
import { useRenamerStore } from './store/useRenamerStore'
import { buildPreviewRows } from './utils/patternEngine'
import { exportAsZip, exportRenameScript } from './utils/exportUtils'
import { usePageViews } from './features/tracking/PageView';

ReactGA.initialize("G-QSKQZWRY75");

function App() {
  const files = useRenamerStore((s) => s.files)
  const pattern = useRenamerStore((s) => s.pattern)
  const settings = useRenamerStore((s) => s.settings)
  const manualNames = useRenamerStore((s) => s.manualNames)
  const clearFiles = useRenamerStore((s) => s.clearFiles)

  const rows = useMemo(
    () => buildPreviewRows(files, pattern, settings, manualNames),
    [files, pattern, settings, manualNames],
  )

  usePageViews()

  const hasErrors = rows.some((row) => row.status !== 'ok')
  const validRows = rows.filter((row) => row.status === 'ok')

  return (
    <main className="h-full p-4 md:p-6">
      <div className="mx-auto grid h-full max-w-[1600px] grid-cols-1 gap-4 md:grid-cols-[360px_1fr]">
        <section className="flex min-h-0 flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <div>
            <h1 className="text-xl font-semibold text-white">Batch File Renamer</h1>
            <p className="text-sm text-slate-400">
              Upload multiple folders, rename with global continuous indexing.
            </p>
          </div>
          <FileDropZone />
        </section>

        <section className="flex min-h-0 flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <PatternEditor totalFiles={files.length} />

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded bg-slate-800 px-2 py-1 text-slate-200">
              Files: {rows.length}
            </span>
            <span className="rounded bg-emerald-900/30 px-2 py-1 text-emerald-300">
              Valid: {validRows.length}
            </span>
            <span className="rounded bg-rose-900/30 px-2 py-1 text-rose-300">
              Issues: {rows.length - validRows.length}
            </span>

            <div className="ml-auto flex flex-wrap gap-2">
              <button
                type="button"
                disabled={!validRows.length || hasErrors}
                className="rounded bg-indigo-600 px-3 py-2 font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-700"
                onClick={() => exportAsZip(validRows)}
              >
                Export ZIP
              </button>
              <button
                type="button"
                disabled={!validRows.length}
                className="rounded bg-cyan-600 px-3 py-2 font-medium text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:bg-slate-700"
                onClick={() => exportRenameScript(validRows, 'bat')}
              >
                Export .bat
              </button>
              <button
                type="button"
                disabled={!validRows.length}
                className="rounded bg-cyan-700 px-3 py-2 font-medium text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-slate-700"
                onClick={() => exportRenameScript(validRows, 'sh')}
              >
                Export .sh
              </button>
              <button
                type="button"
                disabled={!rows.length}
                className="rounded bg-slate-700 px-3 py-2 font-medium text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={clearFiles}
              >
                Clear Files
              </button>
            </div>
          </div>

          <PreviewTable rows={rows} />
        </section>
      </div>
    </main>
  )
}

export default App
