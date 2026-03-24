import { useState } from 'react'
import { useRenamerStore } from '../../store/useRenamerStore'
import { parseDroppedItems, parseFileList } from '../../utils/fileParser'

export function FileDropZone() {
  const [dragActive, setDragActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const files = useRenamerStore((s) => s.files)
  const addFiles = useRenamerStore((s) => s.addFiles)

  const addFromInput = (fileList) => {
    const parsed = parseFileList(fileList)
    addFiles(parsed)
  }

  const onInputChange = (event) => {
    setError('')
    addFromInput(event.target.files)
    event.target.value = ''
  }

  const onDrop = async (event) => {
    event.preventDefault()
    setDragActive(false)
    setError('')
    setLoading(true)

    try {
      const parsedFromItems = await parseDroppedItems(event.dataTransfer.items)
      if (parsedFromItems.length) {
        addFiles(parsedFromItems)
      } else {
        addFromInput(event.dataTransfer.files)
      }
    } catch {
      setError('Unable to parse dropped folders/files in this browser.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <label
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center transition ${
          dragActive
            ? 'border-indigo-400 bg-indigo-500/10'
            : 'border-slate-700 bg-slate-900 hover:border-slate-500'
        }`}
      >
        <input
          type="file"
          className="hidden"
          multiple
          directory=""
          webkitdirectory=""
          onChange={onInputChange}
        />
        <p className="font-medium text-white">Drop folders here or click to select</p>
        <p className="mt-1 text-xs text-slate-400">
          Supports nested folders. Files are indexed globally across all selected folders.
        </p>
      </label>

      <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-xs text-slate-300">
        <div className="flex items-center justify-between">
          <span>Total parsed files</span>
          <strong className="text-sm text-white">{files.length}</strong>
        </div>
        {loading && <p className="mt-2 text-indigo-300">Parsing dropped items…</p>}
        {!!error && <p className="mt-2 text-rose-300">{error}</p>}
      </div>
    </div>
  )
}
