import { format } from 'date-fns';

interface DateControlProps {
  label: string;
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
  allowClear?: boolean;
  docsUrl?: string;
}

export default function DateControl({ label, value, onChange, allowClear = true, docsUrl }: DateControlProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-slate-900 dark:text-white">
        {label}
        {docsUrl && (
          <a href={docsUrl} className="ml-1.5 text-xs font-normal text-sky-500 hover:text-sky-600 dark:text-sky-400 dark:hover:text-sky-300" target="_blank" rel="noopener noreferrer">docs</a>
        )}
      </span>
      <div className="flex items-center gap-1">
        <input
          type="date"
          value={value ? format(value, 'yyyy-MM-dd') : ''}
          onChange={(e) => {
            const val = e.target.value;
            onChange(val ? new Date(val + 'T00:00:00') : undefined);
          }}
          className="rounded border border-slate-300 bg-white px-2 py-1 text-sm text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300"
        />
        {allowClear && value && (
          <button
            onClick={() => onChange(undefined)}
            className="rounded px-1.5 py-1 text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
