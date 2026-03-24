import { env } from '../config/env.js'

const DEEPL_MAP = {
  en: 'EN',
  vi: 'VI',
  ja: 'JA',
}

const GOOGLE_MAP = {
  en: 'en',
  vi: 'vi',
  ja: 'ja',
}

export async function translateSegments(segments, targetLang) {
  if (targetLang === 'en') {
    return segments
  }

  if (env.deeplApiKey) {
    return translateWithDeepL(segments, targetLang)
  }

  if (env.googleTranslateApiKey) {
    return translateWithGoogle(segments, targetLang)
  }

  return segments.map((segment) => ({
    ...segment,
    text: `[${targetLang}] ${segment.text}`,
  }))
}

async function translateWithDeepL(segments, targetLang) {
  const target = DEEPL_MAP[targetLang] || 'EN'

  const results = await Promise.all(
    segments.map(async (segment) => {
      const body = new URLSearchParams()
      body.set('text', segment.text)
      body.set('target_lang', target)

      const response = await fetch('https://api-free.deepl.com/v2/translate', {
        method: 'POST',
        headers: {
          Authorization: `DeepL-Auth-Key ${env.deeplApiKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      })

      if (!response.ok) {
        throw new Error(`DeepL failed (${response.status})`)
      }

      const data = await response.json()
      return {
        ...segment,
        text: data?.translations?.[0]?.text || segment.text,
      }
    }),
  )

  return results
}

async function translateWithGoogle(segments, targetLang) {
  const target = GOOGLE_MAP[targetLang] || 'en'
  const endpoint = `https://translation.googleapis.com/language/translate/v2?key=${env.googleTranslateApiKey}`

  const results = await Promise.all(
    segments.map(async (segment) => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: segment.text,
          target,
          format: 'text',
        }),
      })

      if (!response.ok) {
        throw new Error(`Google Translate failed (${response.status})`)
      }

      const data = await response.json()
      return {
        ...segment,
        text: data?.data?.translations?.[0]?.translatedText || segment.text,
      }
    }),
  )

  return results
}
