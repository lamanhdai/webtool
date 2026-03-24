import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const projectRoot = path.resolve(__dirname, '..', '..')
export const dataRoot = path.join(projectRoot, 'data')
export const subtitlesRoot = path.join(dataRoot, 'subtitles')
export const audioRoot = path.join(dataRoot, 'audio')
export const jobsFile = path.join(dataRoot, 'subtitle-jobs.json')
export const subtitlesIndexFile = path.join(dataRoot, 'subtitles-index.json')
