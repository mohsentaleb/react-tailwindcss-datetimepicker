interface ToggleControlProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
}

export default function ToggleControl({ label, description, checked, onChange }: ToggleControlProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <span className="text-sm font-medium text-slate-900 dark:text-white">{label}</span>
        {description && <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      <label className="inline-flex shrink-0 cursor-pointer items-center">
        <input type="checkbox" checked={checked} className="peer sr-only" onChange={onChange} />
        <div className="peer relative h-5 w-9 rounded-full bg-slate-300 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-sky-500 peer-checked:after:translate-x-full dark:bg-slate-600" />
      </label>
    </div>
  );
}
