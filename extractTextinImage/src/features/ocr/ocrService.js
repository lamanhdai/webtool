let tesseractModulePromise

async function getTesseract() {
  if (!tesseractModulePromise) {
    tesseractModulePromise = import('tesseract.js')
  }
  return tesseractModulePromise
}

export async function runOCR(imageDataUrl, language = 'eng') {
  const { recognize } = await getTesseract()

  const result = await recognize(imageDataUrl, language, {
    logger: () => {
      // Intentionally muted; wire to UI progress if needed.
    },
  })

  const text = result?.data?.text?.trim() || ''
  const confidence = (result?.data?.confidence || 0) / 100

  return {
    text,
    confidence,
    words: result?.data?.words || [],
    lines: result?.data?.lines || [],
  }
}
