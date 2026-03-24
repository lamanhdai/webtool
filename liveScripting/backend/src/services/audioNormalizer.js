import { spawn } from 'child_process';
import path from 'path';
import { createTempFileName, ensureDir, resolveDataPath } from '../utils/fs.js';

const normalizedDir = resolveDataPath('normalized');

export async function normalizeAudioToWav(inputPath) {
  await ensureDir(normalizedDir);
  const outputPath = path.join(normalizedDir, createTempFileName('.wav'));

  await runFfmpeg([
    '-y',
    '-i',
    inputPath,
    '-ac',
    '1',
    '-ar',
    '16000',
    '-c:a',
    'pcm_s16le',
    outputPath,
  ]);

  return outputPath;
}

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const ffmpeg = spawn('ffmpeg', args, { stdio: ['ignore', 'ignore', 'pipe'] });
    let stderr = '';

    ffmpeg.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    ffmpeg.on('error', (error) => {
      reject(
        new Error(
          `Unable to run ffmpeg. Please install ffmpeg and add it to PATH. Original error: ${error.message}`,
        ),
      );
    });

    ffmpeg.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`ffmpeg conversion failed (exit code ${code}): ${stderr}`));
      }
    });
  });
}
