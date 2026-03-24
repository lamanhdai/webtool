function formatTimestamp(seconds = 0) {
  const msTotal = Math.max(0, Math.floor(Number(seconds) * 1000));
  const hours = String(Math.floor(msTotal / 3600000)).padStart(2, '0');
  const minutes = String(Math.floor((msTotal % 3600000) / 60000)).padStart(2, '0');
  const secs = String(Math.floor((msTotal % 60000) / 1000)).padStart(2, '0');
  const millis = String(msTotal % 1000).padStart(3, '0');
  return `${hours}:${minutes}:${secs},${millis}`;
}

function downloadTextFile(content, fileName, mimeType = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

export function exportAsTxt(transcript) {
  downloadTextFile(transcript || '', `transcript-${Date.now()}.txt`);
}

export function exportAsSrt(segments = []) {
  const content = segments
    .map((segment, idx) => {
      const start = formatTimestamp(segment.start);
      const end = formatTimestamp(segment.end);
      return `${idx + 1}\n${start} --> ${end}\n${segment.text || ''}\n`;
    })
    .join('\n');

  downloadTextFile(content, `transcript-${Date.now()}.srt`);
}
