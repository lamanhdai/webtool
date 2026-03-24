const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787';

async function parseJsonSafe(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { ok: false, error: text || 'Invalid server response' };
  }
}

export async function transcribeFile({ file, targetLanguage = 'none', onProgress }) {
  const formData = new FormData();
  formData.append('audio', file);
  formData.append('targetLanguage', targetLanguage);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API_BASE_URL}/transcribe`);

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable || typeof onProgress !== 'function') return;
      const progress = Math.round((event.loaded / event.total) * 100);
      onProgress(progress);
    };

    xhr.onerror = () => reject(new Error('Network error while uploading audio file.'));
    xhr.onload = async () => {
      const responseLike = {
        text: async () => xhr.responseText,
      };
      const data = await parseJsonSafe(responseLike);
      if (xhr.status >= 200 && xhr.status < 300 && data.ok) {
        resolve(data);
      } else {
        reject(new Error(data.error || 'File transcription failed.'));
      }
    };

    xhr.send(formData);
  });
}

export async function transcribeStreamChunk({ blob, targetLanguage = 'none', chunkId }) {
  const formData = new FormData();
  formData.append('chunk', blob, `chunk-${chunkId}.webm`);
  formData.append('targetLanguage', targetLanguage);
  formData.append('chunkId', String(chunkId));

  const response = await fetch(`${API_BASE_URL}/transcribe/stream`, {
    method: 'POST',
    body: formData,
  });

  const data = await parseJsonSafe(response);
  if (!response.ok || !data.ok) {
    throw new Error(data.error || 'Chunk transcription failed.');
  }

  return data;
}
