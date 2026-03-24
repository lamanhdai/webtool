import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 8787),
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  maxUploadMb: Number(process.env.MAX_UPLOAD_MB || 50),
  whisperModel: process.env.WHISPER_MODEL || 'whisper-1',
  translationProvider: process.env.TRANSLATION_PROVIDER || 'openai',
};
