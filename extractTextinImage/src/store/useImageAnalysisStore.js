import { create } from 'zustand'

const initialState = {
  imageUrl: '',
  imageInfo: null,
  imageMeta: null,
  selection: null,
  ocrResult: null,
  detections: [],
  loading: false,
  error: '',
  showDetections: true,
  ocrLanguage: 'eng',
  selectionHistory: [],
}

export const useImageAnalysisStore = create((set) => ({
  ...initialState,

  setImage: (payload) =>
    set(() => ({
      imageUrl: payload.imageUrl,
      imageInfo: {
        name: payload.name,
        size: payload.size,
        type: payload.type,
      },
      imageMeta: null,
      selection: null,
      ocrResult: null,
      detections: [],
      error: '',
      loading: false,
      selectionHistory: [],
    })),

  setImageMeta: (meta) => set(() => ({ imageMeta: meta })),

  setSelection: (selection) =>
    set(() => ({
      selection,
    })),

  pushSelectionHistory: (selection) =>
    set((state) => ({
      selectionHistory:
        selection && selection.width > 0 && selection.height > 0
          ? [selection, ...state.selectionHistory].slice(0, 10)
          : state.selectionHistory,
    })),

  setResults: ({ ocr, detections }) =>
    set(() => ({
      ocrResult: ocr,
      detections,
      error: '',
    })),

  clearResults: () => set(() => ({ ocrResult: null, detections: [], error: '' })),

  setLoading: (loading) => set(() => ({ loading })),
  setError: (error) => set(() => ({ error })),
  toggleShowDetections: () => set((state) => ({ showDetections: !state.showDetections })),
  setOcrLanguage: (ocrLanguage) => set(() => ({ ocrLanguage })),

  reset: () =>
    set(() => ({
      ...initialState,
      ocrLanguage: 'eng',
      showDetections: true,
    })),
}))
