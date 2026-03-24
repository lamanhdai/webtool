import fs from 'fs';
import { env } from '../config/env.js';
import { getOpenAIClient } from './openaiClient.js';

export async function transcribeAudioFile(audioPath) {
  const client = getOpenAIClient();
  const response = await client.audio.transcriptions.create({
    model: env.whisperModel,
    file: fs.createReadStream(audioPath),
    response_format: 'verbose_json',
    timestamp_granularities: ['segment'],
    temperature: 0,
  });

  const segments = Array.isArray(response.segments)
    ? response.segments.map((segment) => ({
        id: segment.id,
        start: Number(segment.start ?? 0),
        end: Number(segment.end ?? 0),
        text: segment.text ?? '',
        avgLogprob: Number(segment.avg_logprob ?? 0),
      }))
    : [];

  const confidence = segments.length
    ? Number(
        Math.max(
          0,
          Math.min(
            1,
            Math.exp(segments.reduce((sum, s) => sum + s.avgLogprob, 0) / segments.length),
          ),
        ).toFixed(3),
      )
    : null;

  return {
    text: response.text ?? '',
    language: response.language ?? 'unknown',
    duration: Number(response.duration ?? 0),
    confidence,
    segments,
  };
}
