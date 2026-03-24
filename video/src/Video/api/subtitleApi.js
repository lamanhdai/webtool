const BASE_URL = import.meta.env.VITE_SUBTITLE_API_BASE_URL || 'http://localhost:8787'

export function getSubtitleFileUrl(relativeUrl) {
  return `${BASE_URL}${relativeUrl}`
}

export async function fetchSubtitlesOverview(videoId) {
  const response = await fetch(`${BASE_URL}/subtitles/${videoId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch subtitle overview')
  }
  return response.json()
}

export async function requestSubtitleGeneration({ videoId, videoUrl, languages }) {
  const response = await fetch(`${BASE_URL}/subtitles/generate/${videoId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      videoUrl,
      languages,
    }),
  })

  if (!response.ok) {
    const payload = await safeJson(response)
    throw new Error(payload?.message || 'Failed to queue subtitle generation')
  }

  return response.json()
}

export async function fetchSubtitleJob(jobId) {
  const response = await fetch(`${BASE_URL}/subtitles/jobs/${jobId}/status`)
  if (!response.ok) {
    throw new Error('Failed to fetch subtitle job status')
  }
  return response.json()
}

async function safeJson(response) {
  try {
    return await response.json()
  } catch {
    return null
  }
}
