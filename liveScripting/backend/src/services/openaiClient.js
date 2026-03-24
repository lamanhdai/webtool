import OpenAI from 'openai';
import { env } from '../config/env.js';

let client = null;

export function getOpenAIClient() {
  if (!env.openaiApiKey) {
    throw new Error('OPENAI_API_KEY is missing. Please set it in backend/.env');
  }

  if (!client) {
    client = new OpenAI({ apiKey: env.openaiApiKey });
  }

  return client;
}
