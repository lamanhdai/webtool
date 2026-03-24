import { spawn } from 'node:child_process'
import { env } from '../config/env.js'

export function extractAudioFromVideo(videoUrl, outputPath) {
  return new Promise((resolve, reject) => {
    const args = ['-y', '-i', videoUrl, '-vn', '-acodec', 'mp3', outputPath]
    const ffmpeg = spawn(env.ffmpegPath, args)

    let stderr = ''
    ffmpeg.stderr.on('data', (chunk) => {
      stderr += chunk.toString()
    })

    ffmpeg.on('error', (error) => {
      reject(new Error(`FFmpeg failed to start: ${error.message}`))
    })

    ffmpeg.on('close', (code) => {
      if (code === 0) {
        resolve(outputPath)
      } else {
        reject(new Error(`FFmpeg exited with code ${code}. ${stderr.slice(-500)}`))
      }
    })
  })
}
