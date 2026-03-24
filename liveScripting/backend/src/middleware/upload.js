import path from 'path';
import multer from 'multer';
import { env } from '../config/env.js';
import { createTempFileName, ensureDir, resolveDataPath } from '../utils/fs.js';

const uploadDir = resolveDataPath('uploads');
await ensureDir(uploadDir);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || '') || '.webm';
    cb(null, createTempFileName(ext));
  },
});

const allowedMimeTypes = new Set([
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/x-wav',
  'audio/webm',
  'audio/mp4',
  'audio/x-m4a',
  'audio/m4a',
  'video/mp4',
  'application/octet-stream',
]);

function fileFilter(_req, file, cb) {
  if (allowedMimeTypes.has(file.mimetype)) {
    cb(null, true);
    return;
  }
  cb(new Error(`Unsupported audio type: ${file.mimetype}`));
}

export const upload = multer({
  storage,
  limits: { fileSize: env.maxUploadMb * 1024 * 1024 },
  fileFilter,
});
