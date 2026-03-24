# Video Feature Module (React + Vite)

This project now includes a complete **Video module** under `src/Video` with:

- Video listing page
- Filters (debounced search, year, category)
- Pagination (20 videos per page)
- Video detail page with breadcrumb navigation
- Custom HTML5 video player controls

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

## Run

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run lint
npm run build
```


