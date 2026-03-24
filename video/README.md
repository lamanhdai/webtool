# Video Module + AI Subtitle Pipeline

This project includes:

1. A frontend **Video module** in `src/Video`
2. A Node.js **subtitle backend** in `backend/`

Together, they provide:

- Video listing + detail pages
- Custom player controls
- AI subtitle generation from video audio
- Multi-language subtitle translation
- Dynamic subtitle track loading in player

## Feature Overview

### 1) Video Listing (`/video`)

- Responsive grid layout
- Card info: thumbnail, title, year, category
- Filters:
  - Search by title (debounced)
  - Year selector
  - Category toggle (Action, Horror, Cartoon)
- Pagination:
  - Previous / Next
  - Page numbers
  - 20 items per page
- Filter/pagination state is synced into URL query params

### 2) Video Detail (`/video/:id`)

- Breadcrumb: `Home / Videos / [Video Title]`
- Returns back to listing while preserving previous query state
- Video metadata: title, year, category, description

### 3) Custom Video Player

- Controls:
  - Play
  - Pause (smooth fade-out pause)
  - Stop
  - Backward 10s
  - Forward 10s
  - Volume -/+ (clamped to [0,1])
- Seek bar + time indicator
- Playback speed selector
- Keyboard shortcut: `Space` toggles play/pause

### 4) AI Subtitle Features

- Generate subtitles via backend pipeline:
  - Extract audio (FFmpeg)
  - Speech-to-text (OpenAI Whisper; fallback mode when key not set)
  - Translate into multiple languages (DeepL / Google Translate; fallback mode)
  - Convert to `.vtt`
  - Persist subtitle files and metadata
- Frontend integration:
  - “Generate Subtitles (AI)” trigger
  - Progress and status updates (polling)
  - Language selector (`Off`, `English`, `Vietnamese`, `Japanese`)
  - Dynamic `<track>` injection into video element

## Folder Structure

```txt
src/
  Video/
    components/
      Breadcrumbs.jsx
      Pagination.jsx
      VideoCard.jsx
      VideoFilters.jsx
      VideoPlayer.jsx
    pages/
      VideoListPage.jsx
      VideoDetailPage.jsx
    hooks/
      useDebouncedValue.js
    utils/
      queryState.js
      videoFilters.js
    data/
      videos.js
    store/
      useVideoStore.js

backend/
  .env.example
  package.json
  data/
    examples/
      sample-en.vtt
  src/
    index.js
    config/
      env.js
    routes/
      subtitleRoutes.js
    services/
      audioService.js
      sttService.js
      translationService.js
      subtitleJobService.js
      fileStore.js
    utils/
      time.js
      vtt.js
      paths.js
```

## Mock Data

- Local mock data in `src/Video/data/videos.js`
- 60 generated videos
- Data model:
  - `id`
  - `title`
  - `year`
  - `category` (`action | horror | cartoon`)
  - `thumbnail`
  - `videoUrl`
  - `description`

## Environment

### Frontend (`video/.env`)

Copy from `.env.example`:

```bash
VITE_SUBTITLE_API_BASE_URL=http://localhost:8787
```

### Backend (`video/backend/.env`)

Copy from `backend/.env.example`:

```bash
PORT=8787
SUBTITLE_PUBLIC_BASE_URL=http://localhost:8787

OPENAI_API_KEY=
OPENAI_WHISPER_MODEL=whisper-1

DEEPL_API_KEY=
GOOGLE_TRANSLATE_API_KEY=

FFMPEG_PATH=ffmpeg
```

> If API keys are not set, the backend uses safe placeholder fallback text so the UX flow still works.

## Run

### 1) Frontend

```bash
npm install
npm run dev
```

### 2) Backend

```bash
cd backend
npm install
npm run dev
```

## Subtitle API Endpoints

- `POST /subtitles/generate/:videoId`
- `GET /subtitles/:videoId`
- `GET /subtitles/:videoId/:lang`
- `GET /subtitles/jobs/:jobId/status`

Static VTT hosting:

- `GET /subtitle-files/:videoId/:lang.vtt`

## Quality Checks

```bash
npm run lint
npm run build
```

Backend health check:

```bash
curl http://localhost:8787/health
```



