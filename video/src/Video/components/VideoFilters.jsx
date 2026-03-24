import { CATEGORY_OPTIONS, categoryLabel } from '../utils/videoFilters'

export function VideoFilters({
  searchInput,
  onSearchInputChange,
  year,
  onYearChange,
  categories,
  onToggleCategory,
  onClear,
  years,
}) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="grid gap-3 md:grid-cols-[1fr_180px_auto]">
        <label className="flex flex-col gap-1 text-xs text-slate-300">
          Search by name
          <input
            type="search"
            value={searchInput}
            onChange={(event) => onSearchInputChange(event.target.value)}
            placeholder="Type video title..."
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-indigo-400 transition focus:ring-2"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs text-slate-300">
          Filter by year
          <select
            value={year}
            onChange={(event) => onYearChange(event.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none ring-indigo-400 transition focus:ring-2"
          >
            <option value="">All years</option>
            {years.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={onClear}
          className="self-end rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
        >
          Clear Filters
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {CATEGORY_OPTIONS.map((category) => {
          const active = categories.includes(category)
          return (
            <button
              key={category}
              type="button"
              onClick={() => onToggleCategory(category)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                active
                  ? 'bg-indigo-600 text-white'
                  : 'border border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500'
              }`}
            >
              {categoryLabel(category)}
            </button>
          )
        })}
      </div>
    </section>
  )
}
