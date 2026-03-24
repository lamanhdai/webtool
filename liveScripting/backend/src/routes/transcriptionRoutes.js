import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { normalizeAudioToWav } from '../services/audioNormalizer.js';
import { transcribeAudioFile } from '../services/transcriptionService.js';
import { translateText } from '../services/translationService.js';
import { safeUnlink } from '../utils/fs.js';

const router = Router();

async function processTranscription({ sourcePath, targetLanguage = 'none', chunkId = null }) {
  let normalizedPath;

  try {
    normalizedPath = await normalizeAudioToWav(sourcePath);
    const transcript = await transcribeAudioFile(normalizedPath);
    const translatedText = await translateText(transcript.text, targetLanguage);

    return {
      ok: true,
      chunkId,
      ...transcript,
      translatedText,
    };
  } finally {
    await safeUnlink(sourcePath);
    await safeUnlink(normalizedPath);
  }
}

router.post('/transcribe', upload.single('audio'), async (req, res, next) => {
  try {
    if (!req.file?.path) {
      return res.status(400).json({ ok: false, error: 'Missing audio file. Use form-data field `audio`.' });
    }

    const targetLanguage = req.body?.targetLanguage || 'none';
    const result = await processTranscription({ sourcePath: req.file.path, targetLanguage });

    return res.json(result);
  } catch (error) {
    return next(error);
  }
});

router.post('/transcribe/stream', upload.single('chunk'), async (req, res, next) => {
  try {
    if (!req.file?.path) {
      return res.status(400).json({ ok: false, error: 'Missing chunk file. Use form-data field `chunk`.' });
    }

    const targetLanguage = req.body?.targetLanguage || 'none';
    const chunkId = req.body?.chunkId || null;
    const result = await processTranscription({
      sourcePath: req.file.path,
      targetLanguage,
      chunkId,
    });

    return res.json(result);
  } catch (error) {
    return next(error);
  }
});

export default router;
