import { create } from 'zustand'
import { videos } from '../data/videos'
import { filterVideos, paginateVideos } from '../utils/videoFilters'

const initialFilters = {
  search: '',
  year: '',
  categories: [],
}

export const useVideoStore = create((set, get) => ({
  videos,
  filters: initialFilters,
  pagination: {
    page: 1,
    perPage: 20,
  },

  setSearch: (search) =>
    set((state) => ({
      filters: { ...state.filters, search },
      pagination: { ...state.pagination, page: 1 },
    })),

  setYear: (year) =>
    set((state) => ({
      filters: { ...state.filters, year },
      pagination: { ...state.pagination, page: 1 },
    })),

  toggleCategory: (category) =>
    set((state) => {
      const exists = state.filters.categories.includes(category)
      const categories = exists
        ? state.filters.categories.filter((item) => item !== category)
        : [...state.filters.categories, category]

      return {
        filters: { ...state.filters, categories },
        pagination: { ...state.pagination, page: 1 },
      }
    }),

  clearFilters: () =>
    set((state) => ({
      filters: initialFilters,
      pagination: { ...state.pagination, page: 1 },
    })),

  setPage: (page) =>
    set((state) => ({
      pagination: { ...state.pagination, page },
    })),

  hydrateFromQuery: ({ search = '', year = '', categories = [], page = 1 }) =>
    set((state) => ({
      filters: {
        search,
        year,
        categories,
      },
      pagination: {
        ...state.pagination,
        page: Number(page) > 0 ? Number(page) : 1,
      },
    })),

  getComputed: () => {
    const state = get()
    const filtered = filterVideos(state.videos, state.filters)
    const paged = paginateVideos(filtered, state.pagination.page, state.pagination.perPage)

    return {
      filtered,
      paged,
    }
  },

  getVideoById: (id) => get().videos.find((video) => video.id === id),
}))
