import { useEffect, useRef, useState } from 'react'
import { useImageAnalysisStore } from '../../store/useImageAnalysisStore'

const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/bmp']

export function ImageUploader({ onImageReady }) {
  const inputRef = useRef(null)
  const objectUrlRef = useRef('')
  const [isDragOver, setIsDragOver] = useState(false)

  const imageInfo = useImageAnalysisStore((s) => s.imageInfo)

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current)
      }
    }
  }, [])

  const processFile = (file) => {
    if (!file) {
      return
    }

    if (!file.type.startsWith('image/') || !ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      window.alert('Please upload a valid image (PNG, JPEG, WEBP, GIF, BMP).')
      return
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
    }

    const imageUrl = URL.createObjectURL(file)
    objectUrlRef.current = imageUrl

    onImageReady({
      imageUrl,
      name: file.name,
      size: file.size,
      type: file.type,
    })
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const [file] = event.target.files || []
          processFile(file)
          event.target.value = ''
        }}
      />

      <div
        className={`rounded-lg border border-dashed p-5 text-center transition ${
          isDragOver ? 'border-indigo-400 bg-indigo-500/10' : 'border-slate-700 bg-slate-950/40'
        }`}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragOver(true)
        }}
        onDragLeave={(event) => {
          event.preventDefault()
          setIsDragOver(false)
        }}
        onDrop={(event) => {
          event.preventDefault()
          setIsDragOver(false)
          const [file] = event.dataTransfer.files || []
          processFile(file)
        }}
      >
        <p className="text-sm text-slate-300">Drag & drop an image here, or</p>
        <button
          type="button"
          className="mt-3 rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          onClick={() => inputRef.current?.click()}
        >
          Browse Image
        </button>
      </div>

      {imageInfo ? (
        <div className="rounded bg-slate-800/70 p-2 text-xs text-slate-300">
          <p>
            <span className="font-semibold text-slate-100">File:</span> {imageInfo.name}
          </p>
          <p>
            <span className="font-semibold text-slate-100">Type:</span> {imageInfo.type}
          </p>
          <p>
            <span className="font-semibold text-slate-100">Size:</span>{' '}
            {(imageInfo.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>
      ) : null}
    </div>
  )
}
