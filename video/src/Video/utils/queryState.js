export function parseVideoQuery(searchParams) {
  const search = searchParams.get('search') || ''
  const year = searchParams.get('year') || ''
  const page = Number(searchParams.get('page') || '1')
  const categories = (searchParams.get('categories') || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  return {
    search,
    year,
    page: Number.isNaN(page) ? 1 : page,
    categories,
  }
}

export function buildVideoQuery({ search, year, page, categories }) {
  const params = new URLSearchParams()

  if (search) params.set('search', search)
  if (year) params.set('year', String(year))
  if (page && Number(page) > 1) params.set('page', String(page))
  if (categories?.length) params.set('categories', categories.join(','))

  return params
}
