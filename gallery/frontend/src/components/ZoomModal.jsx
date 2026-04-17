import { useState } from 'react';

export default function ZoomModal({ imageUrl, onClose }) {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center gap-2">
          <button
            onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
            className="rounded bg-slate-800 px-3 py-1"
          >
            -
          </button>
          <button onClick={() => setZoom((z) => Math.min(4, z + 0.25))} className="rounded bg-slate-800 px-3 py-1">
            +
          </button>
          <span className="text-sm text-slate-300">Zoom: {zoom.toFixed(2)}x</span>
          <button onClick={onClose} className="ml-auto rounded bg-rose-600 px-3 py-1">
            Close
          </button>
        </div>
        <div className="max-h-[80vh] overflow-auto rounded-lg border border-slate-700 bg-slate-900 p-3">
          <img
            src={imageUrl}
            alt="Zoomed"
            draggable={false}
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
            className="mx-auto select-none"
          />
        </div>
      </div>
    </div>
  );
}
