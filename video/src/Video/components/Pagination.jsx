export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null
  }

  const pages = createPageList(currentPage, totalPages)

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`min-w-8 rounded px-2 py-1.5 text-xs font-semibold transition ${
            page === currentPage
              ? 'bg-indigo-600 text-white'
              : 'border border-slate-700 text-slate-200 hover:border-slate-500'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-slate-500 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  )
}

function createPageList(currentPage, totalPages) {
  const pages = []
  const from = Math.max(1, currentPage - 2)
  const to = Math.min(totalPages, currentPage + 2)
  for (let page = from; page <= to; page += 1) {
    pages.push(page)
  }
  return pages
}
