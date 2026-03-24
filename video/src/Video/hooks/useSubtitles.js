import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  fetchSubtitleJob,
  fetchSubtitlesOverview,
  getSubtitleFileUrl,
  requestSubtitleGeneration,
} from '../api/subtitleApi'

const DEFAULT_LANGUAGES = ['en', 'vi', 'ja']

export function useSubtitles({ videoId, videoUrl }) {
  const [tracks, setTracks] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState('off')
  const [job, setJob] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const refreshOverview = useCallback(async () => {
    try {
      const overview = await fetchSubtitlesOverview(videoId)
      setTracks(overview.tracks || [])

      const activeJob = (overview.jobs || []).find((item) =>
        ['queued', 'processing', 'failed'].includes(item.status),
      )

      if (activeJob) {
        setJob(activeJob)
      }
    } catch (nextError) {
      setError(nextError.message)
    }
  }, [videoId])

  useEffect(() => {
    setTracks([])
    setSelectedLanguage('off')
    setJob(null)
    setError('')
    refreshOverview()
  }, [refreshOverview])

  useEffect(() => {
    if (!job || !['queued', 'processing'].includes(job.status)) {
      return undefined
    }

    const timer = window.setInterval(async () => {
      try {
        const latest = await fetchSubtitleJob(job.id)
        setJob(latest)

        if (latest.status === 'completed' || latest.status === 'failed') {
          await refreshOverview()
          if (latest.status === 'completed') {
            setError('')
          } else if (latest.error) {
            setError(latest.error)
          }
        }
      } catch (pollError) {
        setError(pollError.message)
      }
    }, 1500)

    return () => window.clearInterval(timer)
  }, [job, refreshOverview])

  const requestGeneration = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await requestSubtitleGeneration({
        videoId,
        videoUrl,
        languages: DEFAULT_LANGUAGES,
      })
      setJob(response.job)
      await refreshOverview()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }, [refreshOverview, videoId, videoUrl])

  const selectedTrackUrl = useMemo(() => {
    if (selectedLanguage === 'off') return ''
    const found = tracks.find((track) => track.language === selectedLanguage)
    return found ? getSubtitleFileUrl(found.relativeUrl) : ''
  }, [selectedLanguage, tracks])

  return {
    tracks,
    selectedLanguage,
    setSelectedLanguage,
    selectedTrackUrl,
    requestGeneration,
    loading,
    job,
    error,
    refreshOverview,
  }
}
