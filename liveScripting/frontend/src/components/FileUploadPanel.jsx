export default function FileUploadPanel({ isProcessing, onSelectFile }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-400">Audio File</h2>
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-600 bg-slate-950/60 p-8 text-center hover:border-cyan-500">
        <input
          type="file"
          className="hidden"
          accept=".mp3,.wav,.m4a,audio/*"
          disabled={isProcessing}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) onSelectFile(file);
            event.target.value = '';
          }}
        />
        <p className="text-slate-200">Drop or select an audio file</p>
        <p className="mt-1 text-xs text-slate-500">Supported: mp3, wav, m4a</p>
      </label>
    </div>
  );
}
