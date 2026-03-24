const modes = [
  { value: 'mic', label: '🎤 Microphone' },
  { value: 'file', label: '📁 File Upload' },
];

export default function ModeSwitcher({ mode, onChange }) {
  return (
    <div className="inline-flex rounded-xl bg-slate-800/70 p-1">
      {modes.map((item) => (
        <button
          key={item.value}
          type="button"
          onClick={() => onChange(item.value)}
          className={`rounded-lg px-4 py-2 text-sm transition ${
            mode === item.value ? 'bg-cyan-500 text-slate-950' : 'text-slate-200 hover:bg-slate-700'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
