export async function cropImageToDataUrl({ imageElement, selection, imageMeta }) {
  if (!imageElement || !selection || !imageMeta) {
    throw new Error('Missing image context for crop operation')
  }

  const naturalWidth = imageElement.naturalWidth || imageMeta.naturalWidth
  const naturalHeight = imageElement.naturalHeight || imageMeta.naturalHeight

  const x = clamp(Math.round(selection.x), 0, naturalWidth - 1)
  const y = clamp(Math.round(selection.y), 0, naturalHeight - 1)
  const width = clamp(Math.round(selection.width), 1, naturalWidth - x)
  const height = clamp(Math.round(selection.height), 1, naturalHeight - y)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) {
    throw new Error('Canvas 2D context is not available')
  }

  context.drawImage(imageElement, x, y, width, height, 0, 0, width, height)

  return {
    dataUrl: canvas.toDataURL('image/png', 0.92),
    cropWidth: width,
    cropHeight: height,
  }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}
