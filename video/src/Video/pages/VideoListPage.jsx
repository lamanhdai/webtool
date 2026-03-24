import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Pagination } from '../components/Pagination'
import { VideoCard } from '../components/VideoCard'
import { VideoFilters } from '../components/VideoFilters'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useVideoStore } from '../store/useVideoStore'
import { buildVideoQuery, parseVideoQuery } from '../utils/queryState'

export function VideoListPage() {
  const [, setSearchParams] = useSearchParams()
  const initialQuery = useMemo(
    () => parseVideoQuery(new URLSearchParams(window.location.search)),
    [],
  )

  const videos = useVideoStore((s) => s.videos)
  const filters = useVideoStore((s) => s.filters)
  const pagination = useVideoStore((s) => s.pagination)
  const hydrateFromQuery = useVideoStore((s) => s.hydrateFromQuery)
  const setSearch = useVideoStore((s) => s.setSearch)
  const setYear = useVideoStore((s) => s.setYear)
  const toggleCategory = useVideoStore((s) => s.toggleCategory)
  const clearFilters = useVideoStore((s) => s.clearFilters)
  const setPage = useVideoStore((s) => s.setPage)
  const getComputed = useVideoStore((s) => s.getComputed)

  const [searchInput, setSearchInput] = useState(initialQuery.search)
  const debouncedSearch = useDebouncedValue(searchInput, 300)

  const computed = getComputed()
  const paged = computed.paged

  const years = useMemo(() => {
    const unique = new Set(videos.map((video) => video.year))
    return Array.from(unique).sort((a, b) => b - a)
  }, [videos])

  useEffect(() => {
    hydrateFromQuery(initialQuery)
  }, [hydrateFromQuery, initialQuery])

  useEffect(() => {
    setSearch(debouncedSearch)
  }, [debouncedSearch, setSearch])

  useEffect(() => {
    if (pagination.page !== paged.currentPage) {
      setPage(paged.currentPage)
    }
  }, [paged.currentPage, pagination.page, setPage])

  useEffect(() => {
    const params = buildVideoQuery({
      search: filters.search,
      year: filters.year,
      categories: filters.categories,
      page: pagination.page,
    })
    setSearchParams(params, { replace: true })
  }, [filters.categories, filters.search, filters.year, pagination.page, setSearchParams])

  const queryString = buildVideoQuery({
    search: filters.search,
    year: filters.year,
    categories: filters.categories,
    page: pagination.page,
  }).toString()

  return (
    <main className="min-h-screen p-4 md:p-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <header className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Video Listing</h1>
            <p className="text-sm text-slate-300">Filter and browse videos with 20 items per page.</p>
          </div>
          <Link
            to="/"
            className="rounded border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-slate-500"
          >
            Home
          </Link>
        </header>

        <VideoFilters
          searchInput={searchInput}
          onSearchInputChange={setSearchInput}
          year={filters.year}
          onYearChange={setYear}
          categories={filters.categories}
          onToggleCategory={toggleCategory}
          onClear={() => {
            clearFilters()
            setSearchInput('')
          }}
          years={years}
        />

        <div className="flex items-center justify-between text-xs text-slate-400">
          <p>
            Showing {paged.items.length} of {paged.totalItems} video(s)
          </p>
          <p>
            Page {paged.currentPage} / {paged.totalPages}
          </p>
        </div>

        {paged.items.length ? (
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {paged.items.map((video) => (
              <VideoCard key={video.id} video={video} queryString={queryString} />
            ))}
          </section>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-10 text-center text-sm text-slate-300">
            No videos matched your filters.
          </div>
        )}

        <Pagination currentPage={paged.currentPage} totalPages={paged.totalPages} onPageChange={setPage} />
      </div>
    </main>
  )
}
