import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const defaultSettings = {
  startIndex: 1,
  padding: 3,
  dateFormat: 'YYYY-MM-DD',
  sortBy: 'name',
  sortDir: 'asc',
}

export const useRenamerStore = create(
  persist(
    (set) => ({
      files: [],
      pattern: '{index}_{original}',
      settings: defaultSettings,
      manualNames: {},

      addFiles: (incoming) =>
        set((state) => {
          const map = new Map(state.files.map((f) => [f.id, f]))
          for (const file of incoming) {
            map.set(file.id, file)
          }
          return { files: Array.from(map.values()) }
        }),

      clearFiles: () => set({ files: [], manualNames: {} }),

      setPattern: (pattern) => set({ pattern }),

      setSettings: (patch) =>
        set((state) => ({ settings: { ...state.settings, ...patch } })),

      setManualName: (id, name) =>
        set((state) => ({
          manualNames: {
            ...state.manualNames,
            [id]: name,
          },
        })),

      clearManualNames: () => set({ manualNames: {} }),
    }),
    {
      name: 'renamer-settings-v1',
      partialize: (state) => ({
        pattern: state.pattern,
        settings: state.settings,
      }),
    },
  ),
)
