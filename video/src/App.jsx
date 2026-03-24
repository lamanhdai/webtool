import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { VideoDetailPage } from './Video/pages/VideoDetailPage'
import { VideoListPage } from './Video/pages/VideoListPage'

function App() {
  return (
    <div className="min-h-full bg-slate-950 text-slate-100">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/video" element={<VideoListPage />} />
        <Route path="/video/:id" element={<VideoDetailPage />} />
        <Route path="*" element={<Navigate to="/video" replace />} />
      </Routes>
    </div>
  )
}

function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-center">
        <h1 className="text-3xl font-bold text-white">Video Feature Module</h1>
        <p className="mt-2 text-sm text-slate-300">
          Explore listing filters, pagination, and custom player controls.
        </p>
        <Link
          to="/video"
          className="mt-6 inline-flex rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-500"
        >
          Go to Videos
        </Link>
      </div>
    </main>
  )
}

export default App
