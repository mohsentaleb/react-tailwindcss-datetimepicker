import type { Theme } from '../../../lib/types';

const themeColors: Record<string, { bg: string; active: string }> = {
  sky: { bg: 'bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300', active: 'bg-sky-500 text-white' },
  red: { bg: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300', active: 'bg-red-500 text-white' },
  rose: { bg: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300', active: 'bg-rose-500 text-white' },
  pink: { bg: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300', active: 'bg-pink-500 text-white' },
  fuchsia: {
    bg: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900 dark:text-fuchsia-300',
    active: 'bg-fuchsia-500 text-white',
  },
  purple: {
    bg: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    active: 'bg-purple-500 text-white',
  },
  violet: {
    bg: 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300',
    active: 'bg-violet-500 text-white',
  },
  indigo: {
    bg: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
    active: 'bg-indigo-500 text-white',
  },
  blue: { bg: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300', active: 'bg-blue-500 text-white' },
  cyan: { bg: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300', active: 'bg-cyan-500 text-white' },
  teal: { bg: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300', active: 'bg-teal-500 text-white' },
  emerald: {
    bg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
    active: 'bg-emerald-500 text-white',
  },
  green: { bg: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300', active: 'bg-green-500 text-white' },
  lime: { bg: 'bg-lime-100 text-lime-700 dark:bg-lime-900 dark:text-lime-300', active: 'bg-lime-500 text-white' },
  yellow: {
    bg: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    active: 'bg-yellow-500 text-white',
  },
  amber: { bg: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300', active: 'bg-amber-500 text-white' },
  orange: {
    bg: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    active: 'bg-orange-500 text-white',
  },
  slate: { bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300', active: 'bg-slate-500 text-white' },
  gray: { bg: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300', active: 'bg-gray-500 text-white' },
  zinc: { bg: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300', active: 'bg-zinc-500 text-white' },
  neutral: {
    bg: 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300',
    active: 'bg-neutral-500 text-white',
  },
  stone: { bg: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300', active: 'bg-stone-500 text-white' },
};

// "sky" maps to undefined (default theme)
type ThemeKey = Theme | 'sky';

const allThemes: ThemeKey[] = [
  'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'red',
  'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan',
  'slate', 'gray', 'zinc', 'neutral', 'stone',
];

interface ThemePickerProps {
  value: Theme | undefined;
  onChange: (value: Theme | undefined) => void;
}

export default function ThemePicker({ value, onChange }: ThemePickerProps) {
  // undefined (default) maps to 'sky' for display purposes
  const activeKey: ThemeKey = value ?? 'sky';

  function handleClick(key: ThemeKey) {
    onChange(key === 'sky' ? undefined : key);
  }

  return (
    <div>
      <span className="mb-2 block text-sm font-medium text-slate-900 dark:text-white">Theme</span>
      <div className="flex flex-wrap gap-1.5">
        {allThemes.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleClick(t)}
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
              activeKey === t ? themeColors[t].active : themeColors[t].bg
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
