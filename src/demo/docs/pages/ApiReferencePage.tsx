import PropsTable, { type PropRow } from '../../components/PropsTable';

const requiredProps: PropRow[] = [
  { name: 'start', required: true, type: 'Date', default: '-', description: 'The currently selected start date.' },
  { name: 'end', required: true, type: 'Date', default: '-', description: 'The currently selected end date.' },
  { name: 'applyCallback', required: true, type: '(start: Date, end: Date) => void', default: '-', description: 'Called when the user clicks Apply (or immediately when autoApply is true).' },
  { name: 'children', required: true, type: 'ReactNode', default: '-', description: 'The trigger element. Clicking it opens the picker. Not used in standalone mode.' },
];

const constraintProps: PropRow[] = [
  { name: 'minDate', required: false, type: 'Date', default: 'undefined', description: 'Earliest selectable date. Cells before this are disabled.' },
  { name: 'maxDate', required: false, type: 'Date', default: 'undefined', description: 'Latest selectable date. Cells after this are disabled.' },
  { name: 'years', required: false, type: '[number, number]', default: '[1900, currentYear]', description: 'Constrains the year dropdown range.' },
  { name: 'displayMinDate', required: false, type: 'boolean', default: 'false', description: 'Show the formatted minDate in the footer.' },
  { name: 'displayMaxDate', required: false, type: 'boolean', default: 'false', description: 'Show the formatted maxDate in the footer.' },
];

const behaviorProps: PropRow[] = [
  { name: 'ranges', required: false, type: 'Record<string, [Date, Date]>', default: '{}', description: 'Preset range buttons. Each key is the label; value is a [start, end] Date tuple. When empty or omitted, the ranges panel is hidden.' },
  { name: 'autoApply', required: false, type: 'boolean', default: 'false', description: 'Fires applyCallback immediately on every change. Hides the Apply button.' },
  { name: 'smartMode', required: false, type: 'boolean', default: 'false', description: 'Enables flexible date selection: ping-pong selection (clicks alternate between start and end), auto-swap when a selection would create an invalid range, same-month calendar offset (right calendar shifts forward one month), and relaxed cell constraints (all cells clickable).' },
  { name: 'pastSearchFriendly', required: false, type: 'boolean', default: 'false', description: 'Requires smartMode. Modifies the same-month calendar offset so the left calendar shifts back one month instead of the right shifting forward. Useful for backward-in-time searches.' },
  { name: 'descendingYears', required: false, type: 'boolean', default: 'true', description: 'Show years in descending order in the dropdown. Set to false for ascending.' },
  { name: 'rangeCallback', required: false, type: '(index: number, value: string) => void', default: 'undefined', description: 'Called when a preset range button is clicked.' },
];

const layoutProps: PropRow[] = [
  { name: 'standalone', required: false, type: 'boolean', default: 'false', description: 'Renders the picker inline and always visible instead of as a dropdown.' },
  { name: 'alignment', required: false, type: "'left' | 'center' | 'right'", default: "'left'", description: 'Controls horizontal alignment of the dropdown relative to the trigger. "left" (default) opens left-aligned, "center" centers the dropdown, "right" aligns to the right edge.' },
  { name: 'noMobileMode', required: false, type: 'boolean', default: 'false', description: 'Always renders side-by-side regardless of screen width.' },
  { name: 'forceMobileMode', required: false, type: 'boolean', default: 'false', description: 'Always uses stacked/mobile layout.' },
];

const timeProps: PropRow[] = [
  { name: 'twelveHoursClock', required: false, type: 'boolean', default: 'false', description: 'Shows 12-hour time picker with AM/PM instead of 24-hour.' },
];

const stylingProps: PropRow[] = [
  { name: 'theme', required: false, type: 'Theme', default: "'sky'", description: 'Color theme. 22 options based on Tailwind color names.' },
  { name: 'classNames', required: false, type: 'ClassNames', default: 'undefined', description: 'Object for injecting custom CSS classes into specific UI zones.' },
  { name: 'locale', required: false, type: 'Locale', default: 'undefined', description: 'Localization object for customizing all text labels, date format, and first day of week.' },
];

export default function ApiReferencePage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">API Reference</h1>

      <section id="required">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          Required Props
        </h2>
        <PropsTable rows={requiredProps} />
      </section>

      <section id="constraints" className="mt-10">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          Date Constraints
        </h2>
        <PropsTable rows={constraintProps} />
      </section>

      <section id="behavior" className="mt-10">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          Behavior
        </h2>
        <PropsTable rows={behaviorProps} />
      </section>

      <section id="layout" className="mt-10">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          Layout
        </h2>
        <PropsTable rows={layoutProps} />
      </section>

      <section id="time" className="mt-10">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          Time
        </h2>
        <PropsTable rows={timeProps} />
      </section>

      <section id="styling" className="mt-10">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          Styling
        </h2>
        <PropsTable rows={stylingProps} />
      </section>
    </div>
  );
}
