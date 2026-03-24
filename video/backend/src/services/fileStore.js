import fs from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import {
  audioRoot,
  jobsFile,
  subtitlesIndexFile,
  subtitlesRoot,
} from '../utils/paths.js'

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function readJson(file, fallback) {
  try {
    const content = await fs.readFile(file, 'utf8')
    return JSON.parse(content)
  } catch {
    return fallback
  }
}

async function writeJson(file, value) {
  await ensureDir(path.dirname(file))
  await fs.writeFile(file, JSON.stringify(value, null, 2), 'utf8')
}

export async function initStore() {
  await Promise.all([ensureDir(subtitlesRoot), ensureDir(audioRoot)])

  const [jobs, subtitles] = await Promise.all([
    readJson(jobsFile, []),
    readJson(subtitlesIndexFile, {}),
  ])

  return {
    jobs,
    subtitles,
  }
}

export async function saveJobs(jobs) {
  await writeJson(jobsFile, jobs)
}

export async function saveSubtitlesIndex(index) {
  await writeJson(subtitlesIndexFile, index)
}

export async function saveVtt(videoId, language, content) {
  const videoDir = path.join(subtitlesRoot, videoId)
  await ensureDir(videoDir)
  const fileName = `${language}.vtt`
  const filePath = path.join(videoDir, fileName)
  await fs.writeFile(filePath, content, 'utf8')
  return {
    filePath,
    relativeUrl: `/subtitle-files/${videoId}/${fileName}`,
  }
}

export function createAudioFilePath(videoId) {
  const fileName = `${videoId}-${randomUUID()}.mp3`
  return path.join(audioRoot, fileName)
}

export async function removeFile(filePath) {
  try {
    await fs.unlink(filePath)
  } catch {
    // ignore
  }
}
