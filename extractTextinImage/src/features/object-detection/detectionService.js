let modelPromise
let backendReadyPromise

async function ensureBackend() {
  if (!backendReadyPromise) {
    backendReadyPromise = (async () => {
      const tf = await import('@tensorflow/tfjs')
      await import('@tensorflow/tfjs-backend-webgl')

      const current = tf.getBackend()
      if (current !== 'webgl') {
        try {
          await tf.setBackend('webgl')
          await tf.ready()
        } catch {
          await tf.ready()
        }
      } else {
        await tf.ready()
      }

      return tf
    })()
  }

  return backendReadyPromise
}

async function getModel() {
  if (!modelPromise) {
    modelPromise = (async () => {
      await ensureBackend()
      const cocoSsd = await import('@tensorflow-models/coco-ssd')
      return cocoSsd.load({ base: 'lite_mobilenet_v2' })
    })()
  }
  return modelPromise
}

export async function runObjectDetection(imageDataUrl) {
  const model = await getModel()
  const imageElement = await loadImage(imageDataUrl)

  const predictions = await model.detect(imageElement)
  return predictions.map((item) => ({
    label: item.class,
    confidence: item.score,
    bbox: item.bbox,
  }))
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Failed to load image for detection'))
    image.src = src
  })
}
