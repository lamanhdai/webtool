import { useEffect, useMemo, useState } from 'react'
import { ImageUploader } from './features/image-upload/ImageUploader'
import { RegionSelector } from './features/region-selector/RegionSelector'
import { ResultsPanel } from './features/results/ResultsPanel'
import { runOCR } from './features/ocr/ocrService'
import { runObjectDetection } from './features/object-detection/detectionService'
import { useImageAnalysisStore } from './store/useImageAnalysisStore'
import { cropImageToDataUrl } from './utils/cropImage'

function App() {
  const imageUrl = useImageAnalysisStore((s) => s.imageUrl)
  const selection = useImageAnalysisStore((s) => s.selection)
  const imageMeta = useImageAnalysisStore((s) => s.imageMeta)
  const detections = useImageAnalysisStore((s) => s.detections)
  const ocrResult = useImageAnalysisStore((s) => s.ocrResult)
  const loading = useImageAnalysisStore((s) => s.loading)
  const error = useImageAnalysisStore((s) => s.error)
  const showDetections = useImageAnalysisStore((s) => s.showDetections)
  const ocrLanguage = useImageAnalysisStore((s) => s.ocrLanguage)

  const setImage = useImageAnalysisStore((s) => s.setImage)
  const setImageMeta = useImageAnalysisStore((s) => s.setImageMeta)
  const setSelection = useImageAnalysisStore((s) => s.setSelection)
  const pushSelectionHistory = useImageAnalysisStore((s) => s.pushSelectionHistory)
  const setResults = useImageAnalysisStore((s) => s.setResults)
  const setError = useImageAnalysisStore((s) => s.setError)
  const setLoading = useImageAnalysisStore((s) => s.setLoading)
  const clearResults = useImageAnalysisStore((s) => s.clearResults)
  const reset = useImageAnalysisStore((s) => s.reset)
  const toggleShowDetections = useImageAnalysisStore((s) => s.toggleShowDetections)
  const setOcrLanguage = useImageAnalysisStore((s) => s.setOcrLanguage)

  const [analyzeMeta, setAnalyzeMeta] = useState(null)
  const [sourceImageElement, setSourceImageElement] = useState(null)

  const canAnalyze = useMemo(() => {
    if (!imageUrl || !selection || !imageMeta || !sourceImageElement) {
      return false
    }
    return selection.width >= 8 && selection.height >= 8
  }, [imageMeta, imageUrl, selection, sourceImageElement])

  useEffect(() => {
    if (!selection) {
      return
    }
    clearResults()
    setAnalyzeMeta(null)
  }, [clearResults, selection])

  const handleAnalyze = async () => {
    if (!canAnalyze || !sourceImageElement) {
      return
    }

    setLoading(true)
    setError('')

    try {
      const cropped = await cropImageToDataUrl({
        imageElement: sourceImageElement,
        selection,
        imageMeta,
      })

      const [ocr, objects] = await Promise.all([
        runOCR(cropped.dataUrl, ocrLanguage),
        runObjectDetection(cropped.dataUrl),
      ])

      const projectedDetections = objects.map((item) => ({
        ...item,
        bbox: [
          item.bbox[0] + selection.x,
          item.bbox[1] + selection.y,
          item.bbox[2],
          item.bbox[3],
        ],
      }))

      setResults({
        ocr,
        detections: projectedDetections,
      })
      pushSelectionHistory(selection)

      setAnalyzeMeta({
        cropWidth: cropped.cropWidth,
        cropHeight: cropped.cropHeight,
        analyzedAt: new Date().toISOString(),
      })
    } catch (analysisError) {
      setError(analysisError?.message || 'Failed to analyze selection')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="h-full p-4 md:p-6">
      <div className="mx-auto flex h-full max-w-[1800px] flex-col gap-4">
        <header className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <h1 className="text-2xl font-semibold text-white">Image OCR + Object Detection</h1>
          <p className="text-sm text-slate-400">
            Upload an image, select a region, then run OCR and object detection on only the selected area.
          </p>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 xl:grid-cols-[1fr_420px]">
          <section className="flex min-h-0 flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <ImageUploader
              onImageReady={(payload) => {
                setImage(payload)
                clearResults()
                setAnalyzeMeta(null)
                setSourceImageElement(null)
              }}
            />

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                disabled={!canAnalyze || loading}
                onClick={handleAnalyze}
                className="rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-700"
              >
                {loading ? 'Analyzing…' : 'Analyze Selected Region'}
              </button>

              <button
                type="button"
                disabled={!selection}
                onClick={() => {
                  setSelection(null)
                  clearResults()
                }}
                className="rounded bg-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Clear Selection
              </button>

              <button
                type="button"
                disabled={!imageUrl}
                onClick={reset}
                className="rounded bg-rose-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Reset All
              </button>
            </div>

            {error ? <p className="rounded bg-rose-900/30 p-2 text-sm text-rose-300">{error}</p> : null}

            <RegionSelector
              imageUrl={imageUrl}
              selection={selection}
              detections={detections}
              showDetections={showDetections}
              loading={loading}
              onSelectionChange={(nextSelection) => {
                setSelection(nextSelection)
              }}
              onImageMetaChange={setImageMeta}
              onImageElementReady={setSourceImageElement}
            />
          </section>

          <ResultsPanel
            ocrResult={ocrResult}
            detections={detections}
            showDetections={showDetections}
            onToggleDetections={toggleShowDetections}
            analyzeMeta={analyzeMeta}
            selection={selection}
            loading={loading}
            ocrLanguage={ocrLanguage}
            onLanguageChange={setOcrLanguage}
          />
        </div>
      </div>
    </main>
  )
}

export default App
