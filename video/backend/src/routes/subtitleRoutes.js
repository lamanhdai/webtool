import { Router } from 'express'

export function createSubtitleRoutes(subtitleJobService) {
  const router = Router()

  router.get('/jobs/:jobId/status', (req, res) => {
    const { jobId } = req.params
    const job = subtitleJobService.getJob(jobId)

    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
      })
    }

    return res.json(job)
  })

  router.post('/generate/:videoId', async (req, res) => {
    try {
      const { videoId } = req.params
      const { videoUrl, languages = ['en', 'vi', 'ja'] } = req.body || {}

      if (!videoUrl) {
        return res.status(400).json({
          message: 'videoUrl is required',
        })
      }

      const job = await subtitleJobService.createOrReuseJob({
        videoId,
        videoUrl,
        languages,
      })

      return res.status(202).json({
        message: 'Subtitle generation requested',
        job,
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to queue subtitle generation',
        error: error.message,
      })
    }
  })

  router.get('/:videoId', (req, res) => {
    const { videoId } = req.params
    const overview = subtitleJobService.getSubtitleOverview(videoId)

    return res.json({
      ...overview,
    })
  })

  router.get('/:videoId/:lang', (req, res) => {
    const { videoId, lang } = req.params
    const track = subtitleJobService.getTrack(videoId, lang)

    if (!track) {
      return res.status(404).json({
        message: 'Subtitle track not found',
      })
    }

    return res.json(track)
  })

  return router
}
