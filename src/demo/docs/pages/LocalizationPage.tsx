import CodeBlock from '../../components/CodeBlock';

const localeExample = `<ReactDateTimePicker
  locale={{
    format: 'dd/MM/yyyy HH:mm',
    sundayFirst: false,
    days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ],
    fromDate: 'From Date',
    toDate: 'To Date',
    selectingFrom: 'Selecting From',
    selectingTo: 'Selecting To',
    minDate: 'Min Date',
    maxDate: 'Max Date',
    apply: 'Apply',
    cancel: 'Cancel',
    close: 'Close',
  }}
  // ...other props
/>`;

const frenchExample = `<ReactDateTimePicker
  locale={{
    format: 'dd/MM/yyyy HH:mm',
    sundayFirst: false,
    days: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
    months: [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
    ],
    fromDate: 'Date de début',
    toDate: 'Date de fin',
    apply: 'Appliquer',
    cancel: 'Annuler',
    close: 'Fermer',
  }}
  // ...other props
/>`;

const localeType = `type Locale = {
  format?: string;        // date-fns format string (default: 'dd-MM-yyyy HH:mm')
  sundayFirst?: boolean;  // true: Sun-Sat, false: Mon-Sun (default: true)
  days?: [string, string, string, string, string, string, string];
  months?: [string, string, string, string, string, string,
            string, string, string, string, string, string];
  fromDate?: string;      // Label above start calendar
  toDate?: string;        // Label above end calendar
  selectingFrom?: string; // SmartMode notifier text
  selectingTo?: string;   // SmartMode notifier text
  minDate?: string;       // Footer min date label
  maxDate?: string;       // Footer max date label
  apply?: string;         // Apply button text
  cancel?: string;        // Cancel button text
  close?: string;         // Close button text (autoApply mode)
};`;

export default function LocalizationPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Localization</h1>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        Use the <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">locale</code> prop to
        customize every string in the picker UI. All keys are optional — only override what you need.
      </p>

      <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
        Locale Type
      </h2>
      <CodeBlock code={localeType} lang="ts" />

      <h2 className="mt-10 mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
        Full Example
      </h2>
      <CodeBlock code={localeExample} lang="tsx" />

      <h2 className="mt-10 mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
        French Locale Example
      </h2>
      <CodeBlock code={frenchExample} lang="tsx" />
    </div>
  );
}
