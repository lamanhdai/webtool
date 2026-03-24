import { Link } from 'react-router-dom'
import { categoryLabel } from '../utils/videoFilters'

export function VideoCard({ video, queryString }) {
  return (
    <Link
      to={`/video/${video.id}${queryString ? `?${queryString}` : ''}`}
      className="group overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70 transition hover:-translate-y-0.5 hover:border-indigo-500/60"
    >
      <div className="aspect-video overflow-hidden bg-slate-950">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="space-y-1 p-3">
        <h3 className="line-clamp-1 text-sm font-semibold text-white">{video.title}</h3>
        <p className="text-xs text-slate-400">{video.year}</p>
        <span className="inline-flex rounded-full bg-slate-800 px-2 py-0.5 text-[11px] text-slate-200">
          {categoryLabel(video.category)}
        </span>
      </div>
    </Link>
  )
}
