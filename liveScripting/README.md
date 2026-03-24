# LiveScripting - Multilingual Speech-to-Text App

Real-time and batch speech-to-text web app with auto language detection (English, Vietnamese, Japanese + mixed-language audio), built with React + Tailwind + Zustand (frontend) and Express + OpenAI Whisper (backend).

## Features

- 🎤 **Microphone mode** (3-second chunk streaming)
- 📁 **File upload mode** (`mp3`, `wav`, `m4a`)
- 🌍 **Auto language detection** by Whisper
- 📝 **Segmented transcription** with timestamps
- 🌐 **Optional translation** (`none`, `en`, `vi`, `ja`)
- ⚡ Live typing/progress UX with metadata panel
- 📦 Export transcript to **TXT/SRT**
- 🛟 Browser **Web Speech API fallback** for realtime-only basic usage

---

## Project Structure

```bash
liveScripting/
  backend/
    src/
      routes/transcriptionRoutes.js
      services/{audioNormalizer,transcriptionService,translationService}.js
      middleware/upload.js
      index.js
  frontend/
    src/
      hooks/useMicrophoneTranscription.js
      api/transcriptionApi.js
      store/useTranscriptionStore.js
      components/*
      App.jsx
```

---

## Prerequisites

- Node.js 18+
- FFmpeg installed and available in `PATH`
- OpenAI API key

---

## Setup

### 1) Backend

```bash
cd liveScripting/backend
npm install
copy .env.example .env
```

Set in `backend/.env`:

```env
PORT=8787
OPENAI_API_KEY=your_key_here
CORS_ORIGIN=http://localhost:5173
MAX_UPLOAD_MB=50
WHISPER_MODEL=whisper-1
TRANSLATION_PROVIDER=openai
```

Run backend:

```bash
npm run dev
```

### 2) Frontend

```bash
cd liveScripting/frontend
npm install
copy .env.example .env
```

Set in `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8787
```

Run frontend:

```bash
npm run dev
```

Open `http://localhost:5173`.

---

## API

- `POST /transcribe` with `form-data` field: `audio`
- `POST /transcribe/stream` with `form-data` field: `chunk`

Optional form fields:

- `targetLanguage`: `none | en | vi | ja`
- `chunkId` for stream mode

Response shape:

```json
{
  "ok": true,
  "text": "...",
  "language": "en",
  "duration": 12.4,
  "confidence": 0.93,
  "segments": [{ "start": 0, "end": 2.1, "text": "..." }],
  "translatedText": "..."
}
```

---

## Validation Checklist

- [x] Mic recording start/stop works
- [x] Realtime chunk transcription appends live
- [x] File upload transcription works
- [x] Language auto-detection returned from Whisper
- [x] Translation toggle supported
- [x] UI remains responsive with loading/progress indicators
