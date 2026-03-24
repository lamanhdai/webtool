import fs from 'node:fs/promises'
import { env } from '../config/env.js'

export async function transcribeAudio(audioPath) {
  if (!env.openAiApiKey) {
    return buildFallbackSegments()
  }

  const form = new FormData()
  const audioBuffer = await fs.readFile(audioPath)
  const fileBlob = new Blob([audioBuffer], { type: 'audio/mpeg' })

  form.append('file', fileBlob, 'audio.mp3')
  form.append('model', env.openAiWhisperModel)
  form.append('response_format', 'verbose_json')

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.openAiApiKey}`,
    },
    body: form,
  })

  if (!response.ok) {
    throw new Error(`Whisper request failed with status ${response.status}`)
  }

  const result = await response.json()
  const segments = result.segments || []

  if (!segments.length) {
    return buildFallbackSegments()
  }

  return segments.map((segment) => ({
    text: segment.text?.trim() || '',
    start: Number(segment.start || 0),
    end: Number(segment.end || 0),
  }))
}

function buildFallbackSegments() {
  return [
    {
      text: 'Auto-generated subtitle placeholder. Configure OPENAI_API_KEY for accurate transcripts.',
      start: 0,
      end: 4,
    },
    {
      text: 'The subtitle generation pipeline is active and waiting for AI provider credentials.',
      start: 4,
      end: 9,
    },
  ]
}
