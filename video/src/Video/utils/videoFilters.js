export const CATEGORY_OPTIONS = ['action', 'horror', 'cartoon']

export function filterVideos(videos, filters) {
  const search = filters.search.trim().toLowerCase()
  const year = Number(filters.year) || null
  const categories = filters.categories || []

  return videos.filter((video) => {
    const bySearch = !search || video.title.toLowerCase().includes(search)
    const byYear = !year || video.year === year
    const byCategory = categories.length === 0 || categories.includes(video.category)
    return bySearch && byYear && byCategory
  })
}

export function paginateVideos(videos, page, perPage) {
  const totalItems = videos.length
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage))
  const safePage = clamp(page, 1, totalPages)
  const startIndex = (safePage - 1) * perPage
  const endIndex = startIndex + perPage

  return {
    items: videos.slice(startIndex, endIndex),
    totalItems,
    totalPages,
    currentPage: safePage,
  }
}

export function categoryLabel(category) {
  if (category === 'action') return 'Action'
  if (category === 'horror') return 'Horror'
  return 'Cartoon'
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}
