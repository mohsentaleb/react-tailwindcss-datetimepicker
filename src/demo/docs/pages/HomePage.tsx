import { useState } from 'react';

import { Link } from 'react-router-dom';

import ReactDateTimePicker from '../../../lib/index';
import { Theme } from '../../../lib/types';
import CodeBlock from '../../components/CodeBlock';
import { DateRanges } from '../../consts';

const themeColors: Record<string, { bg: string; active: string }> = {
  blue: { bg: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300', active: 'bg-blue-500 text-white' },
  orange: {
    bg: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    active: 'bg-orange-500 text-white',
  },
  green: {
    bg: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    active: 'bg-green-500 text-white',
  },
  purple: {
    bg: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    active: 'bg-purple-500 text-white',
  },
  red: { bg: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300', active: 'bg-red-500 text-white' },
  amber: {
    bg: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    active: 'bg-amber-500 text-white',
  },
  emerald: {
    bg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
    active: 'bg-emerald-500 text-white',
  },
  teal: { bg: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300', active: 'bg-teal-500 text-white' },
  cyan: { bg: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300', active: 'bg-cyan-500 text-white' },
  sky: { bg: 'bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300', active: 'bg-sky-500 text-white' },
  indigo: {
    bg: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
    active: 'bg-indigo-500 text-white',
  },
  violet: {
    bg: 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300',
    active: 'bg-violet-500 text-white',
  },
  fuchsia: {
    bg: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900 dark:text-fuchsia-300',
    active: 'bg-fuchsia-500 text-white',
  },
  pink: { bg: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300', active: 'bg-pink-500 text-white' },
  rose: { bg: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300', active: 'bg-rose-500 text-white' },
  slate: {
    bg: 'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300',
    active: 'bg-slate-500 text-white',
  },
};

const themes: Theme[][] = [
  ['red', 'rose', 'pink', 'fuchsia', 'purple', 'violet', 'indigo', 'blue'],
  ['sky', 'cyan', 'teal', 'emerald', 'green', 'amber', 'orange', 'slate'],
];

const quickExample = `import ReactDateTimePicker from 'react-tailwindcss-datetimepicker';
import 'react-tailwindcss-datetimepicker/dist/style.css';

const ranges = {
  Today: [startOfDay(new Date()), endOfDay(new Date())],
  'Last 7 Days': [subDays(new Date(), 7), new Date()],
};

function App() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  return (
    <ReactDateTimePicker
      ranges={ranges}
      start={start}
      end={end}
      applyCallback={(s, e) => { setStart(s); setEnd(e); }}
    >
      <button>Pick a date range</button>
    </ReactDateTimePicker>
  );
}`;

const features = [
  {
    title: 'Date Range Selection',
    description: 'Select start and end dates with an intuitive dual-calendar interface.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    title: 'Time Picker',
    description: 'Built-in time selection with 12-hour and 24-hour clock support.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Preset Shortcuts',
    description: 'Define custom preset ranges like "Today", "Last 7 Days", or any custom period.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Dark Mode',
    description: 'Built-in dark mode support via Tailwind CSS class-based toggling.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
  },
  {
    title: 'Mobile Responsive',
    description: 'Automatically adapts to mobile screens with stacked calendar layout.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
  {
    title: 'TypeScript',
    description: 'Fully typed with TypeScript. Includes all type definitions out of the box.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
];

export default function HomePage() {
  const [start, setStart] = useState(DateRanges['Last 1 Week'][0]);
  const [end, setEnd] = useState(DateRanges['Last 1 Week'][1]);
  const [theme, setTheme] = useState<Theme>('blue');

  return (
    <div>
      {/* Hero */}
      <div className="pb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          React TailwindCSS
          <br />
          <span className="text-sky-500">Date &amp; Time Picker</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          A powerful, customizable date and time range picker component for React, styled with TailwindCSS.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            to="/docs/installation"
            className="rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-600"
          >
            Get Started
          </Link>
          <Link
            to="/playground"
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Playground
          </Link>
        </div>
        <div className="mx-auto mt-6 max-w-md">
          <CodeBlock code="npm install react-tailwindcss-datetimepicker" lang="bash" />
        </div>
      </div>

      {/* Quick Example */}
      <div className="border-t border-slate-200 pt-10 dark:border-slate-700">
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-900 dark:text-white">Quick Example</h2>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col gap-2">
              {themes.map((row, i) => (
                <div key={i} className="flex flex-wrap justify-center gap-2">
                  {row.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`w-20 rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
                        theme === t ? themeColors[t].active : themeColors[t].bg
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <ReactDateTimePicker
              ranges={DateRanges}
              start={start}
              end={end}
              theme={theme}
              applyCallback={(s, e) => {
                setStart(s);
                setEnd(e);
              }}
              standalone
            >
              <button>Pick a date</button>
            </ReactDateTimePicker>
          </div>
          <div>
            <CodeBlock code={quickExample} lang="tsx" />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mt-12 border-t border-slate-200 pt-10 dark:border-slate-700">
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-900 dark:text-white">Features</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-slate-200 p-5 dark:border-slate-700"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-sky-600 dark:bg-sky-900 dark:text-sky-400">
                {f.icon}
              </div>
              <h3 className="mb-1 font-semibold text-slate-900 dark:text-white">{f.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
