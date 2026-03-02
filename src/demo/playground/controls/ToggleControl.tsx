interface ToggleControlProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
  docsUrl?: string;
  disabled?: boolean;
}

export default function ToggleControl({ label, description, checked, onChange, docsUrl, disabled }: ToggleControlProps) {
  return (
    <div className={`flex flex-col gap-1${disabled ? ' opacity-40' : ''}`}>
      <div className="min-w-0">
        <span className="text-sm font-medium text-slate-900 dark:text-white">
          {label}
          {docsUrl && (
            <a href={docsUrl} className="ml-1.5 text-xs font-normal text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300" target="_blank" rel="noopener noreferrer">docs</a>
          )}
        </span>
        {description && <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      <label className={`inline-flex shrink-0 items-center${disabled ? ' cursor-not-allowed' : ' cursor-pointer'}`}>
        <input type="checkbox" checked={checked} className="peer sr-only" onChange={onChange} disabled={disabled} />
        <div className="peer relative h-5 w-9 rounded-full bg-slate-300 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-sky-500 peer-checked:after:translate-x-full dark:bg-slate-600" />
      </label>
    </div>
  );
}
