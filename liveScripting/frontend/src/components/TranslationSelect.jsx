const targets = [
  { value: 'none', label: 'None' },
  { value: 'en', label: 'English' },
  { value: 'vi', label: 'Vietnamese' },
  { value: 'ja', label: 'Japanese' },
];

export default function TranslationSelect({ value, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm text-slate-200">
      <span>Translate to:</span>
      <select
        className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:border-cyan-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {targets.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}
