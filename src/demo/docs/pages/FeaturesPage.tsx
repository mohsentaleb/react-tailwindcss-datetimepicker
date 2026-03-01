import CodeBlock from '../../components/CodeBlock';

const dateRangeExample = `<ReactDateTimePicker
  ranges={ranges}
  start={start}
  end={end}
  applyCallback={handleApply}
  smartMode  // Enables ping-pong selection: click start, then end
>
  <button>Pick dates</button>
</ReactDateTimePicker>`;

const timeExample = `// 12-hour clock with AM/PM selector
<ReactDateTimePicker
  ranges={ranges}
  start={start}
  end={end}
  applyCallback={handleApply}
  twelveHoursClock
>
  <button>Pick dates</button>
</ReactDateTimePicker>`;

const presetExample = `import { startOfDay, endOfDay, subDays, startOfMonth, endOfMonth, subMonths } from 'date-fns';

const ranges = {
  Today: [startOfDay(new Date()), endOfDay(new Date())],
  Yesterday: [subDays(startOfDay(new Date()), 1), subDays(endOfDay(new Date()), 1)],
  'Last 7 Days': [subDays(new Date(), 7), new Date()],
  'This Month': [startOfMonth(new Date()), endOfMonth(new Date())],
  'Last Month': [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
};`;

const darkModeExample = `<!-- Add 'dark' class to any ancestor element -->
<body class="dark">
  <!-- The picker automatically uses dark styles -->
  <ReactDateTimePicker ... />
</body>

<!-- Or toggle it dynamically -->
<script>
  document.body.classList.toggle('dark');
</script>`;

const mobileExample = `// Force mobile (stacked) layout
<ReactDateTimePicker forceMobileMode ... />

// Force desktop (side-by-side) layout
<ReactDateTimePicker noMobileMode ... />`;

export default function FeaturesPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Features</h1>

      <section id="date-range">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          Date Range Selection
        </h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          The picker displays two calendars side-by-side for selecting a start and end date. Enable{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">smartMode</code> to allow
          ping-pong selection where clicks alternate between setting the start and end date.
        </p>
        <CodeBlock code={dateRangeExample} lang="tsx" />
      </section>

      <section id="time-selection" className="mt-10">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          Time Selection
        </h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Each calendar panel includes hour and minute selectors. By default it uses a 24-hour clock (0-23). Set{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">twelveHoursClock</code> to
          switch to a 12-hour format with an AM/PM selector.
        </p>
        <CodeBlock code={timeExample} lang="tsx" />
      </section>

      <section id="preset-ranges" className="mt-10">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          Preset Ranges
        </h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Define preset date ranges that appear as buttons in the sidebar. A "Custom Range" option is automatically
          appended. Ranges that fall outside{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">minDate</code>/
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">maxDate</code> are
          automatically disabled.
        </p>
        <CodeBlock code={presetExample} lang="tsx" />
      </section>

      <section id="dark-mode" className="mt-10">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          Dark Mode
        </h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Dark mode is built-in using Tailwind CSS class-based dark mode. Add{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">class="dark"</code> to any
          ancestor element and the picker automatically switches to dark colors. No separate prop is needed.
        </p>
        <CodeBlock code={darkModeExample} lang="html" />
      </section>

      <section id="mobile-support" className="mt-10">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          Mobile Support
        </h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          The picker automatically stacks calendars vertically on small screens. Use{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">forceMobileMode</code> to
          always stack, or{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">noMobileMode</code> to
          always show side-by-side.
        </p>
        <CodeBlock code={mobileExample} lang="tsx" />
      </section>
    </div>
  );
}
