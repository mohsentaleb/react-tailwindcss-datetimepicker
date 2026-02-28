import { useState } from 'react';

import { add, sub, set, format } from 'date-fns';

import ReactDateTimePicker from '../lib/index';

import Header from './components/Header';
import { DateRanges } from './consts';

import type { Theme } from '../lib/types';

const THEMES: { value: Theme | undefined; label: string; className: string }[] = [
  // Chromatic
  { value: undefined, label: 'Sky (Default)', className: 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300' },
  { value: 'orange', label: 'Orange', className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' },
  { value: 'emerald', label: 'Emerald', className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300' },
  { value: 'purple', label: 'Purple', className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' },
  { value: 'red', label: 'Red', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' },
  { value: 'amber', label: 'Amber', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300' },
  { value: 'yellow', label: 'Yellow', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
  { value: 'lime', label: 'Lime', className: 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-300' },
  { value: 'teal', label: 'Teal', className: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300' },
  { value: 'cyan', label: 'Cyan', className: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300' },
  { value: 'indigo', label: 'Indigo', className: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300' },
  { value: 'violet', label: 'Violet', className: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300' },
  { value: 'fuchsia', label: 'Fuchsia', className: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-300' },
  { value: 'pink', label: 'Pink', className: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300' },
  { value: 'rose', label: 'Rose', className: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300' },
  // Gray scale
  { value: 'slate', label: 'Slate', className: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300' },
  { value: 'gray', label: 'Gray', className: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' },
  { value: 'zinc', label: 'Zinc', className: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300' },
  { value: 'neutral', label: 'Neutral', className: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300' },
  { value: 'stone', label: 'Stone', className: 'bg-stone-100 text-stone-800 dark:bg-stone-700 dark:text-stone-300' },
];

export default function Demo() {
  const [standaloneMode, setStandaloneMode] = useState(true);
  const [twelveHoursClock, setTwelveHoursClock] = useState(true);
  const [theme, setTheme] = useState<Theme>();
  const [start, end] = DateRanges['Last 5 Days'];
  const [selectedRange, setSelectedRange] = useState({
    start,
    end,
  });

  function handleApply(startDate: Date, endDate: Date) {
    setSelectedRange({ start: startDate, end: endDate });
  }

  function getUserFriendlyDateRangeString() {
    const formattedSelectedStart = format(selectedRange.start, 'MMM d, yyyy h:mm a');
    const formattedSelectedEnd = format(selectedRange.end, 'MMM d, yyyy h:mm a');
    const formattedDateRange = `${formattedSelectedStart} to ${formattedSelectedEnd}`;

    return formattedDateRange;
  }

  return (
    <>
      <Header />
      <div className="max-w-7xl container mx-auto px-2 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row py-4 gap-5">
          <main role="main" className="w-full xl:w-2/3">
            {!standaloneMode && <p className="mb-5">Click on the button to display the date picker</p>}
            <ReactDateTimePicker
              ranges={DateRanges}
              start={selectedRange.start}
              end={selectedRange.end}
              years={[2020, new Date().getFullYear()]}
              minDate={set(sub(new Date(), { years: 2 }), {
                hours: 0,
                minutes: 0,
                seconds: 0,
              })}
              maxDate={set(add(end, { days: 1 }), {
                hours: 23,
                minutes: 59,
                seconds: 59,
              })}
              applyCallback={handleApply}
              twelveHoursClock={twelveHoursClock}
              displayMinDate
              displayMaxDate
              theme={theme}
              standalone={standaloneMode}
            >
              <button className="w-3/5 cursor-pointer rounded border bg-gray-50 px-3 py-2 text-left hover:border-gray-300">
                {getUserFriendlyDateRangeString()}
              </button>
            </ReactDateTimePicker>
          </main>
          <aside className="w-full rounded-xl border px-2 xl:w-1/3">
            <div className="sticky top-0 w-full p-4">
              <h2 className="mb-5 text-xl font-bold">Options</h2>
              <div className="flex flex-col gap-5">
                <div className="flex">
                  <label className="w-full font-bold md:w-2/3">
                    Standalone Mode{' '}
                    <p className="text-sm font-normal text-gray-400">
                      Calendar is always shown without clicking on a button
                    </p>
                  </label>
                  <div className="flex w-full justify-end md:w-1/3">
                    <label className="inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={standaloneMode}
                        className="peer sr-only"
                        onChange={() => setStandaloneMode((state) => !state)}
                      />
                      <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    </label>
                  </div>
                </div>
                <div className="flex">
                  <label className="w-full font-bold md:w-1/3">12 Hours Clock </label>
                  <div className="flex w-full justify-end md:w-2/3">
                    <label className="inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={twelveHoursClock}
                        className="peer sr-only"
                        onChange={() => setTwelveHoursClock((state) => !state)}
                      />
                      <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold">Theme</label>
                  <div className="flex flex-wrap gap-2">
                    {THEMES.map(({ value, label, className }) => (
                      <button
                        key={label}
                        type="button"
                        className={`rounded-full px-3 py-1 text-xs font-medium ${className} ${theme === value ? 'ring-2 ring-offset-1 ring-current' : ''}`}
                        onClick={() => setTheme(value)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
