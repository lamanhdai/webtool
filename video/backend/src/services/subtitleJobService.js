import { randomUUID } from 'node:crypto'
import { extractAudioFromVideo } from './audioService.js'
import {
  createAudioFilePath,
  removeFile,
  saveJobs,
  saveSubtitlesIndex,
  saveVtt,
} from './fileStore.js'
import { transcribeAudio } from './sttService.js'
import { translateSegments } from './translationService.js'
import { segmentsToVtt } from '../utils/vtt.js'

export function createSubtitleJobService(initialState) {
  const state = {
    jobs: initialState.jobs || [],
    subtitles: initialState.subtitles || {},
    queue: [],
    processing: false,
  }

  const runNext = async () => {
    if (state.processing) return
    const next = state.queue.shift()
    if (!next) return

    state.processing = true
    try {
      await processJob(next)
    } finally {
      state.processing = false
      runNext()
    }
  }

  const createOrReuseJob = async ({ videoId, videoUrl, languages }) => {
    const requestedLanguages = normalizeLanguages(languages)
    const existing = state.jobs.find(
      (job) =>
        job.videoId === videoId &&
        (job.status === 'queued' || job.status === 'processing'),
    )

    if (existing) {
      return existing
    }

    const alreadyHaveAll = requestedLanguages.every(
      (lang) => state.subtitles?.[videoId]?.languages?.[lang],
    )

    const now = new Date().toISOString()
    const job = {
      id: randomUUID(),
      videoId,
      videoUrl,
      requestedLanguages,
      status: alreadyHaveAll ? 'completed' : 'queued',
      progress: alreadyHaveAll ? 100 : 0,
      message: alreadyHaveAll
        ? 'Requested subtitle languages already exist.'
        : 'Queued for subtitle generation',
      error: '',
      createdAt: now,
      updatedAt: now,
    }

    state.jobs.unshift(job)
    state.jobs = state.jobs.slice(0, 100)
    await saveJobs(state.jobs)

    if (!alreadyHaveAll) {
      state.queue.push(job.id)
      runNext()
    }

    return job
  }

  const processJob = async (jobId) => {
    const job = state.jobs.find((item) => item.id === jobId)
    if (!job) return

    const update = async (patch) => {
      Object.assign(job, patch, {
        updatedAt: new Date().toISOString(),
      })
      await saveJobs(state.jobs)
    }

    const missingLanguages = job.requestedLanguages.filter(
      (lang) => !state.subtitles?.[job.videoId]?.languages?.[lang],
    )

    if (!missingLanguages.length) {
      await update({
        status: 'completed',
        progress: 100,
        message: 'All requested subtitles already available.',
      })
      return
    }

    let audioPath = ''

    try {
      await update({
        status: 'processing',
        progress: 5,
        message: 'Extracting audio from video',
      })

      audioPath = createAudioFilePath(job.videoId)
      await extractAudioFromVideo(job.videoUrl, audioPath)

      await update({ progress: 30, message: 'Running speech-to-text transcription' })
      const sourceSegments = await transcribeAudio(audioPath)

      let step = 30
      const perLanguageStep = Math.max(8, Math.floor(60 / missingLanguages.length))

      for (const language of missingLanguages) {
        await update({
          progress: Math.min(95, step),
          message: `Preparing ${language.toUpperCase()} subtitles`,
        })

        const translatedSegments = await translateSegments(sourceSegments, language)
        const vtt = segmentsToVtt(translatedSegments)
        const saved = await saveVtt(job.videoId, language, vtt)

        if (!state.subtitles[job.videoId]) {
          state.subtitles[job.videoId] = {
            videoId: job.videoId,
            sourceUrl: job.videoUrl,
            languages: {},
          }
        }

        state.subtitles[job.videoId].languages[language] = {
          language,
          relativeUrl: saved.relativeUrl,
          updatedAt: new Date().toISOString(),
        }

        await saveSubtitlesIndex(state.subtitles)

        step += perLanguageStep
      }

      await update({
        status: 'completed',
        progress: 100,
        message: 'Subtitle generation completed',
      })
    } catch (error) {
      await update({
        status: 'failed',
        progress: job.progress,
        message: 'Subtitle generation failed',
        error: error.message,
      })
    } finally {
      if (audioPath) {
        await removeFile(audioPath)
      }
    }
  }

  const getSubtitleOverview = (videoId) => {
    const record = state.subtitles[videoId]
    const activeJobs = state.jobs.filter(
      (job) =>
        job.videoId === videoId &&
        (job.status === 'queued' || job.status === 'processing' || job.status === 'failed'),
    )

    return {
      videoId,
      tracks: record
        ? Object.values(record.languages).sort((a, b) => a.language.localeCompare(b.language))
        : [],
      jobs: activeJobs,
    }
  }

  const getTrack = (videoId, language) => {
    return state.subtitles?.[videoId]?.languages?.[language] || null
  }

  const getJob = (jobId) => state.jobs.find((job) => job.id === jobId) || null

  return {
    createOrReuseJob,
    getSubtitleOverview,
    getTrack,
    getJob,
  }
}

function normalizeLanguages(languages) {
  const safe = Array.isArray(languages) ? languages : []
  const normalized = Array.from(
    new Set(
      safe
        .map((lang) => String(lang || '').trim().toLowerCase())
        .filter(Boolean)
        .filter((lang) => ['en', 'vi', 'ja'].includes(lang)),
    ),
  )

  if (!normalized.includes('en')) {
    normalized.unshift('en')
  }

  return normalized
}
