import { getOpenAIClient } from './openaiClient.js';
import { env } from '../config/env.js';

const LANGUAGE_LABELS = {
  en: 'English',
  vi: 'Vietnamese',
  ja: 'Japanese',
};

export async function translateText(text, targetLanguage) {
  if (!text?.trim() || !targetLanguage || targetLanguage === 'none') {
    return null;
  }

  if (env.translationProvider !== 'openai') {
    return null;
  }

  const targetLabel = LANGUAGE_LABELS[targetLanguage] || targetLanguage;
  const client = getOpenAIClient();

  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0,
    messages: [
      {
        role: 'system',
        content:
          'You are a precise translator. Translate exactly while preserving meaning and punctuation. Return only translated text.',
      },
      {
        role: 'user',
        content: `Translate the following content to ${targetLabel}:\n\n${text}`,
      },
    ],
  });

  return completion.choices?.[0]?.message?.content?.trim() || null;
}
