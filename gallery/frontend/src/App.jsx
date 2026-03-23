import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import AuthPanel from './components/AuthPanel';
import Gallery from './components/Gallery';
import Toast from './components/Toast';
import ZoomModal from './components/ZoomModal';
import { getMe } from './api/services';
import { useAppStore } from './store/useAppStore';

export default function App() {
  const token = useAppStore((s) => s.token);
  const user = useAppStore((s) => s.user);
  const setUser = useAppStore((s) => s.setUser);
  const logout = useAppStore((s) => s.logout);
  const toast = useAppStore((s) => s.toast);
  const showToast = useAppStore((s) => s.showToast);
  const [zoomImage, setZoomImage] = useState('');

  const authQuery = useQuery({
    queryKey: ['me', token],
    queryFn: getMe,
    enabled: Boolean(token),
    retry: false,
  });

  useEffect(() => {
    if (authQuery.data) {
      setUser(authQuery.data);
    }
  }, [authQuery.data, setUser]);

  useEffect(() => {
    if (authQuery.error) {
      logout();
      showToast('Session expired. Please login again.', 'error');
    }
  }, [authQuery.error, logout, showToast]);

  const title = useMemo(() => (user ? `Welcome, ${user.username}` : 'Secure Cloudinary Gallery'), [user]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-7xl space-y-6 p-4 md:p-8">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4">
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-sm text-slate-400">Locked by default • Signed URLs • JWT auth</p>
          </div>
          {user && (
            <div className="flex items-center gap-3">
              <span className="rounded bg-slate-800 px-3 py-1 text-sm">Points: {user.points}</span>
              <button className="rounded bg-rose-600 px-3 py-1 text-sm" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </header>

        {!token || !user ? <AuthPanel /> : <Gallery onZoom={setZoomImage} />}
      </div>

      {zoomImage && <ZoomModal imageUrl={zoomImage} onClose={() => setZoomImage('')} />}
      <Toast toast={toast} />
    </main>
  );
}
