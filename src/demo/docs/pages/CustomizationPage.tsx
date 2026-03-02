import CodeBlock from '../../components/CodeBlock';

const themesExample = `// Available themes:
// Chromatic: sky (default), blue, orange, emerald, green, purple, red,
//            amber, yellow, lime, teal, cyan, indigo, violet, fuchsia, pink, rose
// Grayscale: slate, gray, zinc, neutral, stone

<ReactDateTimePicker
  theme="emerald"
  // ...other props
/>`;

const classNamesExample = `<ReactDateTimePicker
  classNames={{
    rootContainer: 'shadow-2xl',
    normalCell: 'rounded-full',
    normalCellHover: 'bg-emerald-100!',
    startCell: 'bg-emerald-600!',
    endCell: 'bg-emerald-600!',
    withinRangeCell: 'bg-emerald-50!',
    applyButton: 'bg-emerald-600! hover:bg-emerald-700!',
    rangeButtonSelected: 'bg-emerald-600!',
  }}
  // ...other props
/>`;

const classNamesKeys = `// All available classNames keys:
type ClassNames = {
  rootContainer?: string;       // Outermost picker wrapper
  rangesContainer?: string;     // Sidebar with preset range buttons
  rangeButtonDefault?: string;  // Unselected range button
  rangeButtonSelected?: string; // Selected range button
  fromToRangeContainer?: string; // Each date picker panel
  normalCell?: string;          // Default calendar day cell
  normalCellHover?: string;     // Calendar day cell on hover
  greyCell?: string;            // Day from adjacent month
  invalidCell?: string;         // Day disabled by min/maxDate
  startCell?: string;           // Selected start date cell
  endCell?: string;             // Selected end date cell
  withinRangeCell?: string;     // Cells between start and end
  startDot?: string;            // ActiveNotifier dot (start)
  endDot?: string;              // ActiveNotifier dot (end)
  footerContainer?: string;     // Footer with Apply/Cancel
  applyButton?: string;         // Apply button
  cancelButton?: string;        // Cancel/Close button
};`;

export default function CustomizationPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Customization</h1>

      <section id="themes">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          Themes
        </h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          The picker ships with 22 color themes based on Tailwind CSS color names. Set the{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">theme</code> prop to change
          the accent color used for selected cells, range highlights, and buttons.
        </p>
        <CodeBlock code={themesExample} lang="tsx" />
      </section>

      <section id="classnames" className="mt-10">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          classNames Overrides
        </h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          For fine-grained control, use the{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">classNames</code> prop to
          inject custom CSS classes into specific parts of the picker. Use Tailwind's{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">!</code> suffix to override
          existing styles.
        </p>
        <CodeBlock code={classNamesExample} lang="tsx" />

        <h3 className="mb-3 mt-8 text-lg font-semibold text-slate-900 dark:text-white">All Available Keys</h3>
        <CodeBlock code={classNamesKeys} lang="ts" />
      </section>
    </div>
  );
}
