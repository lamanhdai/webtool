import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { SubtitlePanel } from '../components/SubtitlePanel'
import { VideoPlayer } from '../components/VideoPlayer'
import { useSubtitles } from '../hooks/useSubtitles'
import { useVideoStore } from '../store/useVideoStore'
import { categoryLabel } from '../utils/videoFilters'

export function VideoDetailPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const getVideoById = useVideoStore((s) => s.getVideoById)

  const video = getVideoById(id)
  const backToList = `/video${location.search}`

  const {
    tracks,
    selectedLanguage,
    setSelectedLanguage,
    requestGeneration,
    loading,
    job,
    error,
  } = useSubtitles({
    videoId: id,
    videoUrl: video?.videoUrl || '',
  })

  if (!video) {
    return (
      <main className="min-h-screen p-6">
        <div className="mx-auto max-w-3xl rounded-xl border border-slate-800 bg-slate-900/70 p-6">
          <h1 className="text-xl font-bold text-white">Video not found</h1>
          <p className="mt-2 text-sm text-slate-300">The selected video does not exist.</p>
          <Link
            to={backToList}
            className="mt-4 inline-flex rounded bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Back to Videos
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-4 md:p-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Videos', to: backToList },
              { label: video.title },
            ]}
          />
        </div>

        <VideoPlayer
          src={video.videoUrl}
          poster={video.thumbnail}
          title={video.title}
          subtitleTracks={tracks.map((track) => ({
            language: track.language,
            src: `${import.meta.env.VITE_SUBTITLE_API_BASE_URL || 'http://localhost:8787'}${track.relativeUrl}`,
          }))}
          activeSubtitleLanguage={selectedLanguage}
        />

        <SubtitlePanel
          tracks={tracks}
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
          onGenerate={requestGeneration}
          isGenerating={loading || ['queued', 'processing'].includes(job?.status)}
          job={job}
          error={error}
        />

        <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-white">{video.title}</h1>
            <span className="rounded bg-slate-800 px-2 py-1 text-xs text-slate-200">{video.year}</span>
            <span className="rounded bg-indigo-600/80 px-2 py-1 text-xs text-white">
              {categoryLabel(video.category)}
            </span>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-300">{video.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => navigate(backToList)}
              className="rounded border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-slate-500"
            >
              Back to List
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
