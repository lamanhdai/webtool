import { useImageAnalysisStore } from '../../store/useImageAnalysisStore'

const OCR_LANG_OPTIONS = [
  { value: 'eng', label: 'English' },
  { value: 'tha', label: 'Thai' },
  { value: 'eng+tha', label: 'English + Thai' },
]

export function ResultsPanel({
  ocrResult,
  detections,
  showDetections,
  onToggleDetections,
  analyzeMeta,
  selection,
  loading,
  ocrLanguage,
  onLanguageChange,
}) {
  const selectionHistory = useImageAnalysisStore((s) => s.selectionHistory)

  const summary = {
    textLength: ocrResult?.text?.length || 0,
    objectCount: detections.length,
    confidence:
      typeof ocrResult?.confidence === 'number'
        ? `${(ocrResult.confidence * 100).toFixed(1)}%`
        : 'N/A',
  }

  const handleCopyText = async () => {
    if (!ocrResult?.text) return
    try {
      await navigator.clipboard.writeText(ocrResult.text)
    } catch {
      window.alert('Unable to copy text in this browser.')
    }
  }

  const handleDownload = () => {
    const payload = {
      analyzedAt: analyzeMeta?.analyzedAt || null,
      selection,
      crop: analyzeMeta
        ? {
            width: analyzeMeta.cropWidth,
            height: analyzeMeta.cropHeight,
          }
        : null,
      ocr: {
        language: ocrLanguage,
        text: ocrResult?.text || '',
        confidence: ocrResult?.confidence || 0,
      },
      detections,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'analysis-result.json'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <aside className="flex min-h-0 flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Analysis Results</h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <Badge label={`OCR chars: ${summary.textLength}`} />
          <Badge label={`Objects: ${summary.objectCount}`} />
          <Badge label={`OCR confidence: ${summary.confidence}`} />
        </div>
      </div>

      <div className="rounded border border-slate-700 bg-slate-950/40 p-3">
        <label className="text-xs font-medium uppercase tracking-wide text-slate-300">OCR Language</label>
        <select
          value={ocrLanguage}
          onChange={(event) => onLanguageChange(event.target.value)}
          className="mt-2 w-full rounded border border-slate-700 bg-slate-900 px-2 py-2 text-sm text-slate-100"
          disabled={loading}
        >
          {OCR_LANG_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-slate-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-600"
          onClick={onToggleDetections}
        >
          {showDetections ? 'Hide' : 'Show'} Object Boxes
        </button>
        <button
          type="button"
          onClick={handleCopyText}
          disabled={!ocrResult?.text}
          className="rounded bg-cyan-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Copy OCR Text
        </button>
        <button
          type="button"
          onClick={handleDownload}
          disabled={!ocrResult && detections.length === 0}
          className="rounded bg-indigo-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Download JSON
        </button>
      </div>

      <section className="min-h-0 flex-1 space-y-3 overflow-auto">
        <div className="rounded border border-slate-700 bg-slate-950/40 p-3">
          <h3 className="text-sm font-semibold text-white">Extracted Text</h3>
          <pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap rounded bg-slate-900/70 p-2 text-xs text-slate-200">
            {ocrResult?.text || (loading ? 'Running OCR...' : 'No OCR output yet.')}
          </pre>
        </div>

        <div className="rounded border border-slate-700 bg-slate-950/40 p-3">
          <h3 className="text-sm font-semibold text-white">Detected Objects</h3>
          {detections.length ? (
            <ul className="mt-2 space-y-1 text-xs text-slate-200">
              {detections.map((item, index) => (
                <li key={`${item.label}-${index}`} className="rounded bg-slate-900/70 p-2">
                  <div className="font-semibold text-slate-100">
                    {item.label} • {(item.confidence * 100).toFixed(1)}%
                  </div>
                  <div className="text-slate-400">
                    bbox [{item.bbox.map((value) => Math.round(value)).join(', ')}]
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-xs text-slate-400">
              {loading ? 'Detecting objects...' : 'No detected objects yet.'}
            </p>
          )}
        </div>

        <div className="rounded border border-slate-700 bg-slate-950/40 p-3">
          <h3 className="text-sm font-semibold text-white">Selection History</h3>
          {selectionHistory.length ? (
            <ul className="mt-2 space-y-1 text-xs text-slate-300">
              {selectionHistory.map((item, index) => (
                <li key={`${item.x}-${item.y}-${item.width}-${item.height}-${index}`}>
                  #{index + 1}: x={Math.round(item.x)}, y={Math.round(item.y)}, w=
                  {Math.round(item.width)}, h={Math.round(item.height)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-xs text-slate-400">No selection history yet.</p>
          )}
        </div>
      </section>
    </aside>
  )
}

function Badge({ label }) {
  return <span className="rounded bg-slate-800 px-2 py-1 text-slate-200">{label}</span>
}
