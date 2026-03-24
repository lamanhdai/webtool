export default function ExportButtons({ disabled, onExportTxt, onExportSrt }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        disabled={disabled}
        onClick={onExportTxt}
        className="rounded-lg border border-slate-600 px-3 py-2 text-sm text-slate-200 disabled:opacity-40"
      >
        Export TXT
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={onExportSrt}
        className="rounded-lg border border-slate-600 px-3 py-2 text-sm text-slate-200 disabled:opacity-40"
      >
        Export SRT
      </button>
    </div>
  );
}
