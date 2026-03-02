interface SelectControlProps {
  label: string;
  description?: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  docsUrl?: string;
}

export default function SelectControl({ label, description, value, options, onChange, docsUrl }: SelectControlProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="min-w-0">
        <span className="text-sm font-medium text-slate-900 dark:text-white">
          {label}
          {docsUrl && (
            <a href={docsUrl} className="ml-1.5 text-xs font-normal text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300" target="_blank" rel="noopener noreferrer">docs</a>
          )}
        </span>
        {description && <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-slate-300 bg-white px-2 py-1 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
