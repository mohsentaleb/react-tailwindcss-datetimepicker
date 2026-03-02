import CodeBlock from '../../components/CodeBlock';

const presetRangesGuide = `import { startOfDay, endOfDay, subDays, startOfWeek, endOfWeek,
  startOfMonth, endOfMonth, subMonths } from 'date-fns';

const ranges = {
  Today: [startOfDay(new Date()), endOfDay(new Date())],
  Yesterday: [
    startOfDay(subDays(new Date(), 1)),
    endOfDay(subDays(new Date(), 1)),
  ],
  'Last 7 Days': [subDays(new Date(), 7), new Date()],
  'This Week': [startOfWeek(new Date()), endOfWeek(new Date())],
  'This Month': [startOfMonth(new Date()), endOfMonth(new Date())],
  'Last Month': [
    startOfMonth(subMonths(new Date(), 1)),
    endOfMonth(subMonths(new Date(), 1)),
  ],
};

// A "Custom Range" entry is automatically appended
<ReactDateTimePicker
  ranges={ranges}
  rangeCallback={(index, label) => console.log(index, label)}
  // ...other props
/>`;

const restrictingDatesGuide = `import { set, sub, add } from 'date-fns';

<ReactDateTimePicker
  // Allow dates from 2 years ago to tomorrow
  minDate={set(sub(new Date(), { years: 2 }), {
    hours: 0, minutes: 0, seconds: 0
  })}
  maxDate={set(add(new Date(), { days: 1 }), {
    hours: 23, minutes: 59, seconds: 59
  })}
  // Constrain year dropdown
  years={[2022, 2026]}
  // Show the constraints in the footer
  displayMinDate
  displayMaxDate
  // ...other props
/>`;

const customStylingGuide = `// Example: Fully custom green theme with rounded cells
<ReactDateTimePicker
  theme="emerald"
  classNames={{
    rootContainer: 'shadow-2xl rounded-2xl',
    normalCell: 'rounded-full',
    normalCellHover: 'bg-emerald-100! dark:bg-emerald-900!',
    startCell: 'bg-emerald-600! rounded-full',
    endCell: 'bg-emerald-600! rounded-full',
    withinRangeCell: 'bg-emerald-50! dark:bg-emerald-950!',
    rangeButtonSelected: 'bg-emerald-600! text-white!',
    applyButton: 'bg-emerald-600! hover:bg-emerald-700!',
    footerContainer: 'border-t-2 border-emerald-200',
  }}
  // ...other props
/>

// Tip: Use the ! suffix (Tailwind important modifier) to
// override the picker's built-in styles.`;

const localizationGuide = `// German locale example
<ReactDateTimePicker
  locale={{
    format: 'dd.MM.yyyy HH:mm',
    sundayFirst: false,
    days: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    months: [
      'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
    ],
    fromDate: 'Von Datum',
    toDate: 'Bis Datum',
    selectingFrom: 'Auswahl von',
    selectingTo: 'Auswahl bis',
    apply: 'Anwenden',
    cancel: 'Abbrechen',
    close: 'Schließen',
  }}
  // ...other props
/>`;

export default function GuidesPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Guides</h1>

      <section id="preset-ranges">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          Preset Ranges
        </h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Define as many preset ranges as you need. Each entry is a key-value pair where the key is the button label
          and the value is a <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">[Date, Date]</code> tuple.
          Use <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">rangeCallback</code> to
          know when a preset is clicked.
        </p>
        <CodeBlock code={presetRangesGuide} lang="tsx" />
      </section>

      <section id="restricting-dates" className="mt-10">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          Restricting Dates
        </h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Use <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">minDate</code> and{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">maxDate</code> to restrict
          the selectable date range. Calendar cells outside this range are greyed out and unclickable. Preset range
          buttons whose dates fall outside the constraints are automatically disabled.
        </p>
        <CodeBlock code={restrictingDatesGuide} lang="tsx" />
      </section>

      <section id="custom-styling" className="mt-10">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          Custom Styling
        </h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Combine the <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">theme</code> prop
          with <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">classNames</code> for
          full visual control. The theme sets the base colors, and classNames lets you override individual elements.
        </p>
        <CodeBlock code={customStylingGuide} lang="tsx" />
      </section>

      <section id="localization" className="mt-10">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          Localization
        </h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Translate every visible string in the picker by providing a{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">locale</code> object. The
          date format string follows the{' '}
          <a
            href="https://date-fns.org/docs/format"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 hover:underline dark:text-sky-400"
          >
            date-fns format specification
          </a>
          .
        </p>
        <CodeBlock code={localizationGuide} lang="tsx" />
      </section>
    </div>
  );
}
