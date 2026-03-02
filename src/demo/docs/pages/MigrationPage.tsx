import CodeBlock from '../../components/CodeBlock';

const alignmentMigration = `// leftMode / centerMode → alignment
//
// Before:
<ReactDateTimePicker leftMode />          // opens right-aligned
<ReactDateTimePicker centerMode />        // opens centered
<ReactDateTimePicker />                   // opens left-aligned (default)

// After:
<ReactDateTimePicker alignment="right" /> // opens right-aligned
<ReactDateTimePicker alignment="center" />// opens centered
<ReactDateTimePicker />                   // opens left-aligned (default)`;

const migrationSteps = `// v2 (Moment.js) → v3 (date-fns)
//
// 1. Date objects: Moment objects → plain JavaScript Date objects
//    Before: moment()
//    After:  new Date()
//
// 2. Range definitions: Use date-fns helpers
//    Before: { Today: [moment().startOf('day'), moment().endOf('day')] }
//    After:  { Today: [startOfDay(new Date()), endOfDay(new Date())] }
//
// 3. Date format strings: Moment format → date-fns format
//    Before: 'DD-MM-YYYY HH:mm'
//    After:  'dd-MM-yyyy HH:mm'
//
// 4. Callback signatures: Same shape, but Date instead of Moment
//    Before: applyCallback(momentStart, momentEnd)
//    After:  applyCallback(dateStart, dateEnd)
//
// 5. Remove moment dependency
//    npm uninstall moment
//    npm install date-fns`;

export default function MigrationPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Migration</h1>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        Version 3.0.0 replaced Moment.js with date-fns. The API surface is largely the same — the main difference
        is that all date values are now plain JavaScript{' '}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">Date</code> objects instead
        of Moment objects.
      </p>

      <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
        Alignment Prop (replaces leftMode / centerMode)
      </h2>
      <p className="mb-4 text-slate-600 dark:text-slate-400">
        The <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">leftMode</code> and{' '}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">centerMode</code> boolean props
        have been removed and replaced with a single{' '}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">alignment</code> prop that
        accepts <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">&apos;left&apos;</code>,{' '}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">&apos;center&apos;</code>, or{' '}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">&apos;right&apos;</code>.
      </p>
      <CodeBlock code={alignmentMigration} lang="tsx" />

      <h2 className="mt-10 mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
        v2 → v3: Moment.js to date-fns
      </h2>
      <CodeBlock code={migrationSteps} lang="ts" />

      <h2 className="mt-10 mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
        Format String Changes
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="py-2 pr-4 font-semibold text-slate-900 dark:text-white">Moment.js</th>
              <th className="py-2 pr-4 font-semibold text-slate-900 dark:text-white">date-fns</th>
              <th className="py-2 font-semibold text-slate-900 dark:text-white">Description</th>
            </tr>
          </thead>
          <tbody className="text-slate-600 dark:text-slate-400">
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 pr-4 font-mono text-sm">DD</td>
              <td className="py-2 pr-4 font-mono text-sm">dd</td>
              <td className="py-2">Day of month (zero-padded)</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 pr-4 font-mono text-sm">YYYY</td>
              <td className="py-2 pr-4 font-mono text-sm">yyyy</td>
              <td className="py-2">Full year</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 pr-4 font-mono text-sm">HH</td>
              <td className="py-2 pr-4 font-mono text-sm">HH</td>
              <td className="py-2">24-hour (unchanged)</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="py-2 pr-4 font-mono text-sm">hh</td>
              <td className="py-2 pr-4 font-mono text-sm">h</td>
              <td className="py-2">12-hour (single 'h' in date-fns)</td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-mono text-sm">A</td>
              <td className="py-2 pr-4 font-mono text-sm">a</td>
              <td className="py-2">AM/PM (lowercase in date-fns)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
