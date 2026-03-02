import CodeBlock from '../../components/CodeBlock';

const dateRangeExample = `<ReactDateTimePicker
  ranges={ranges}
  start={start}
  end={end}
  applyCallback={handleApply}
  smartMode
>
  <button>Pick dates</button>
</ReactDateTimePicker>`;

const pastSearchExample = `<ReactDateTimePicker
  ranges={ranges}
  start={start}
  end={end}
  applyCallback={handleApply}
  smartMode
  pastSearchFriendly
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
          The picker displays two calendars side-by-side for selecting a start and end date. By default, the left
          calendar sets the start date and the right calendar sets the end date.
        </p>
        <CodeBlock code={dateRangeExample} lang="tsx" />
      </section>

      <section id="smart-mode" className="mt-10">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          Smart Mode
        </h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          Enable <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">smartMode</code> for a
          more flexible date selection experience. It enables the following behaviors:
        </p>
        <ul className="mb-4 list-inside list-disc space-y-2 text-slate-600 dark:text-slate-400">
          <li>
            <strong className="text-slate-900 dark:text-white">Ping-pong selection</strong> &mdash; Clicks alternate
            between setting the start and end date regardless of which calendar side is clicked. A &ldquo;Selecting
            From&rdquo; / &ldquo;Selecting To&rdquo; indicator shows which date will be set next.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">Auto-swap invalid ranges</strong> &mdash; When a
            selection (cell click or typed input) would place the start date after the end date, the other date is
            automatically adjusted by one day. Without{' '}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">smartMode</code>, such
            selections are rejected.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">Same-month calendar offset</strong> &mdash; When both
            dates fall in the same month and year, the right calendar shifts forward one month so you always see two
            different months.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white">Relaxed cell constraints</strong> &mdash; Without{' '}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">smartMode</code>, cells
            outside the current range are greyed out and unclickable. With{' '}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">smartMode</code>, all cells
            are clickable and auto-swap handles any conflicts.
          </li>
        </ul>

        <h3 className="mb-3 mt-6 text-lg font-semibold text-slate-900 dark:text-white">Past Search Friendly</h3>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          The <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">pastSearchFriendly</code>{' '}
          prop modifies the same-month calendar offset behavior. Instead of the right calendar shifting forward, the
          left calendar shifts back one month. This keeps the current month on the right with the previous month visible
          on the left, which is useful when searching backward in time (e.g. log analysis, historical data). Requires{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">smartMode</code>.
        </p>
        <CodeBlock code={pastSearchExample} lang="tsx" />
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
