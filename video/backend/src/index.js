import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { env } from './config/env.js'
import { initStore } from './services/fileStore.js'
import { createSubtitleJobService } from './services/subtitleJobService.js'
import { createSubtitleRoutes } from './routes/subtitleRoutes.js'
import { subtitlesRoot } from './utils/paths.js'

async function bootstrap() {
  const app = express()

  app.use(cors())
  app.use(express.json({ limit: '2mb' }))

  const initialState = await initStore()
  const subtitleJobService = createSubtitleJobService(initialState)

  app.get('/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'video-subtitle-backend',
      now: new Date().toISOString(),
    })
  })

  app.use('/subtitle-files', express.static(path.resolve(subtitlesRoot)))
  app.use('/subtitles', createSubtitleRoutes(subtitleJobService))

  app.use((error, _req, res, _next) => {
    res.status(500).json({
      message: 'Unhandled server error',
      error: error?.message || 'Unknown error',
    })
  })

  app.listen(env.port, () => {
    console.log(`Subtitle backend running on http://localhost:${env.port}`)
  })
}

bootstrap().catch((error) => {
  console.error('Failed to start subtitle backend:', error)
  process.exit(1)
})
