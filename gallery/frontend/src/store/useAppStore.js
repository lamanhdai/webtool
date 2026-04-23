import { create } from 'zustand';

function loadToken() {
  return localStorage.getItem('token') || '';
}

export const useAppStore = create((set) => ({
  token: loadToken(),
  user: null,
  page: 1,
  filter: 'dateAdded',
  toast: null,

  setAuth: ({ token, user }) => {
    localStorage.setItem('token', token);
    set({ token, user });
  },

  setUser: (user) => set({ user }),

  logout: () => {
    localStorage.removeItem('token');
    set({ token: '', user: null });
  },

  setPage: (page) => set({ page }),
  setFilter: (filter) => set({ filter, page: 1 }),

  showToast: (message, type = 'info') => {
    set({ toast: { message, type } });
    setTimeout(() => set({ toast: null }), 2400);
  },

  applyUnlock: ({ imageId, remainingPoints }) =>
    set((state) => {
      if (!state.user) return state;
      const unlockedSet = new Set(state.user.unlockedImages || []);
      unlockedSet.add(imageId);
      return {
        user: {
          ...state.user,
          points: remainingPoints,
          unlockedImages: [...unlockedSet],
        },
      };
    }),
}));
