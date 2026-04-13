import { randomUUID } from 'node:crypto'
import { Router } from 'express'
import {
  createVideo,
  deleteVideo,
  getVideoById,
  listVideos,
  updateVideo,
} from '../services/videoService.js'

export function createVideoRoutes() {
  const router = Router()

  router.get('/', async (req, res, next) => {
    try {
      const { page = '1', search = '', year = '', category = '' } = req.query
      const payload = await listVideos({
        page: Number(page),
        search: String(search),
        year: String(year),
        category: String(category),
      })
      return res.json(payload)
    } catch (error) {
      return next(error)
    }
  })

  router.get('/:id', async (req, res, next) => {
    try {
      const video = await getVideoById(req.params.id)
      if (!video) return res.status(404).json({ message: 'Video not found' })
      return res.json(video)
    } catch (error) {
      return next(error)
    }
  })

  router.get('/:id/url', async (req, res, next) => {
    try {
      const video = await getVideoById(req.params.id)
      if (!video) return res.status(404).json({ message: 'Video not found' })
      return res.json({
        id: video.id,
        title: video.title,
        videoUrl: video.videoUrl,
      })
    } catch (error) {
      return next(error)
    }
  })

  router.post('/', async (req, res, next) => {
    try {
      const body = normalizeVideoPayload(req.body, true)
      if (body.error) return res.status(400).json({ message: body.error })

      const created = await createVideo({
        id: body.id || randomUUID(),
        ...body.data,
      })
      return res.status(201).json(created)
    } catch (error) {
      if (String(error?.message || '').includes('UNIQUE constraint failed')) {
        return res.status(409).json({ message: 'Video id already exists' })
      }
      return next(error)
    }
  })

  router.put('/:id', async (req, res, next) => {
    try {
      const body = normalizeVideoPayload(req.body, false)
      if (body.error) return res.status(400).json({ message: body.error })

      const updated = await updateVideo(req.params.id, body.data)
      if (!updated) return res.status(404).json({ message: 'Video not found' })
      return res.json(updated)
    } catch (error) {
      return next(error)
    }
  })

  router.delete('/:id', async (req, res, next) => {
    try {
      const deleted = await deleteVideo(req.params.id)
      if (!deleted) return res.status(404).json({ message: 'Video not found' })
      return res.status(204).send()
    } catch (error) {
      return next(error)
    }
  })

  return router
}

function normalizeVideoPayload(input, requireAllFields) {
  const body = input || {}
  const raw = {
    title: String(body.title || '').trim(),
    year: Number(body.year),
    category: String(body.category || '').trim().toLowerCase(),
    thumbnail: String(body.thumbnail || '').trim(),
    videoUrl: String(body.videoUrl || '').trim(),
    description: String(body.description || '').trim(),
  }

  if (requireAllFields) {
    for (const [key, value] of Object.entries(raw)) {
      if (!value && value !== 0) {
        return { error: `${key} is required` }
      }
    }
    if (Number.isNaN(raw.year) || raw.year < 1900 || raw.year > 3000) {
      return { error: 'year must be a valid number' }
    }
    return {
      id: typeof body.id === 'string' ? body.id.trim() : '',
      data: raw,
    }
  }

  const data = {}
  if (body.title !== undefined) data.title = raw.title
  if (body.year !== undefined) data.year = raw.year
  if (body.category !== undefined) data.category = raw.category
  if (body.thumbnail !== undefined) data.thumbnail = raw.thumbnail
  if (body.videoUrl !== undefined) data.videoUrl = raw.videoUrl
  if (body.description !== undefined) data.description = raw.description

  if (!Object.keys(data).length) {
    return { error: 'At least one field is required' }
  }

  if (data.year !== undefined && (Number.isNaN(data.year) || data.year < 1900 || data.year > 3000)) {
    return { error: 'year must be a valid number' }
  }

  for (const [key, value] of Object.entries(data)) {
    if (key !== 'year' && !value) {
      return { error: `${key} cannot be empty` }
    }
  }

  return { data }
}
