import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

export const resolveDataPath = (...segments) => path.resolve(process.cwd(), 'data', ...segments);

export async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

export function createTempFileName(ext = '.wav') {
  return `${Date.now()}-${randomUUID()}${ext}`;
}

export async function safeUnlink(filePath) {
  if (!filePath) return;
  try {
    await fs.unlink(filePath);
  } catch {
    // no-op
  }
}
