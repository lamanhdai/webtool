import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: Number(process.env.PORT || 8787),
  subtitlePublicBaseUrl: process.env.SUBTITLE_PUBLIC_BASE_URL || 'http://localhost:8787',
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  openAiWhisperModel: process.env.OPENAI_WHISPER_MODEL || 'whisper-1',
  deeplApiKey: process.env.DEEPL_API_KEY || '',
  googleTranslateApiKey: process.env.GOOGLE_TRANSLATE_API_KEY || '',
  ffmpegPath: process.env.FFMPEG_PATH || 'ffmpeg',
}
