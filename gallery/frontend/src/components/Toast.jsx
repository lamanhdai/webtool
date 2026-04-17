export default function Toast({ toast }) {
  if (!toast) return null;

  const color =
    toast.type === 'error'
      ? 'bg-rose-500/90'
      : toast.type === 'success'
        ? 'bg-emerald-500/90'
        : 'bg-slate-700/90';

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div className={`rounded-md px-4 py-2 text-sm shadow-lg ${color}`}>{toast.message}</div>
    </div>
  );
}
