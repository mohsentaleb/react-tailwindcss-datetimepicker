import { useState } from 'react';

import { format as formatDate } from 'date-fns';

import ReactDateTimePicker from '../../lib/index';
import CodeBlock from '../components/CodeBlock';
import NavBar from '../components/NavBar';
import { DateRanges } from '../consts';

import DateControl from './controls/DateControl';
import SelectControl from './controls/SelectControl';
import ThemePicker from './controls/ThemePicker';
import ToggleControl from './controls/ToggleControl';

import type { ClassNames, Locale, Theme } from '../../lib/types';

// --- Locale presets ---
const LOCALE_PRESETS: Record<string, Partial<Locale>> = {
  english: {},
  french: {
    days: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
    months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    fromDate: 'Date de début',
    toDate: 'Date de fin',
    apply: 'Appliquer',
    cancel: 'Annuler',
    close: 'Fermer',
    selectingFrom: 'Sélection début',
    selectingTo: 'Sélection fin',
  },
  german: {
    days: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    fromDate: 'Von Datum',
    toDate: 'Bis Datum',
    apply: 'Anwenden',
    cancel: 'Abbrechen',
    close: 'Schließen',
    selectingFrom: 'Auswahl von',
    selectingTo: 'Auswahl bis',
  },
  persian: {
    sundayFirst: false,
    days: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
    months: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
    fromDate: 'از تاریخ',
    toDate: 'تا تاریخ',
    apply: 'اعمال',
    cancel: 'لغو',
    close: 'بستن',
    selectingFrom: 'انتخاب شروع',
    selectingTo: 'انتخاب پایان',
  },
};

// --- Range presets ---
const RANGE_PRESETS: Record<string, Record<string, [Date, Date]>> = {
  default: DateRanges,
  minimal: {
    'This Week': [(() => { const d = new Date(); d.setDate(d.getDate() - d.getDay()); d.setHours(0, 0, 0, 0); return d; })(), new Date()],
    'This Month': [new Date(new Date().getFullYear(), new Date().getMonth(), 1), new Date()],
  },
  none: {},
};

// --- ClassNames presets ---
const CELL_STYLES: Record<string, Partial<ClassNames>> = {
  default: {},
  rounded: { normalCell: 'rounded-full' },
  large: { normalCell: 'text-lg p-3' },
};

const RANGE_BUTTON_STYLES: Record<string, Partial<ClassNames>> = {
  default: {},
  pill: { rangeButtonDefault: 'rounded-full px-4' },
  bordered: { rangeButtonDefault: 'border-2 border-current rounded-none' },
};

const FOOTER_STYLES: Record<string, Partial<ClassNames>> = {
  default: {},
  compact: { footerContainer: 'py-1 px-2' },
  accent: { footerContainer: 'border-t-2 border-emerald-300', applyButton: 'bg-emerald-600! hover:bg-emerald-700! text-white' },
};

// --- Format presets ---
const FORMAT_OPTIONS = [
  { value: 'dd-MM-yyyy HH:mm', label: 'dd-MM-yyyy HH:mm' },
  { value: 'MM/dd/yyyy HH:mm', label: 'MM/dd/yyyy HH:mm' },
  { value: 'yyyy-MM-dd HH:mm', label: 'yyyy-MM-dd HH:mm' },
];

export default function PlaygroundPage() {
  // Core props
  const [theme, setTheme] = useState<Theme | undefined>(undefined);
  const [standalone, setStandalone] = useState(true);
  const [twelveHoursClock, setTwelveHoursClock] = useState(false);
  const [smartMode, setSmartMode] = useState(false);
  const [autoApply, setAutoApply] = useState(false);
  const [pastSearchFriendly, setPastSearchFriendly] = useState(false);
  const [descendingYears, setDescendingYears] = useState(false);
  const [minDate, setMinDate] = useState<Date | undefined>(undefined);
  const [maxDate, setMaxDate] = useState<Date | undefined>(undefined);
  const [displayMinDate, setDisplayMinDate] = useState(false);
  const [displayMaxDate, setDisplayMaxDate] = useState(false);

  // Layout
  const [noMobileMode, setNoMobileMode] = useState(false);
  const [forceMobileMode, setForceMobileMode] = useState(false);
  const [leftMode, setLeftMode] = useState(false);
  const [centerMode, setCenterMode] = useState(false);

  // Locale
  const [sundayFirst, setSundayFirst] = useState(true);
  const [dateFormat, setDateFormat] = useState('dd-MM-yyyy HH:mm');
  const [language, setLanguage] = useState('english');

  // Ranges
  const [rangesPreset, setRangesPreset] = useState('default');

  // ClassNames
  const [cellStyle, setCellStyle] = useState('default');
  const [rangeButtonStyle, setRangeButtonStyle] = useState('default');
  const [footerStyle, setFooterStyle] = useState('default');

  // Date state
  const [selectedRange, setSelectedRange] = useState({ start: new Date(), end: new Date() });

  // Build locale object
  const localePreset = LOCALE_PRESETS[language] || {};
  const locale: Locale = {
    ...localePreset,
    format: dateFormat,
    sundayFirst,
  };

  // Build classNames
  const classNames: ClassNames = {
    ...CELL_STYLES[cellStyle],
    ...RANGE_BUTTON_STYLES[rangeButtonStyle],
    ...FOOTER_STYLES[footerStyle],
  };
  const hasClassNames = cellStyle !== 'default' || rangeButtonStyle !== 'default' || footerStyle !== 'default';

  // Build ranges
  const ranges = RANGE_PRESETS[rangesPreset] || DateRanges;

  // Sections open state
  const [coreOpen, setCoreOpen] = useState(true);
  const [layoutOpen, setLayoutOpen] = useState(false);
  const [localeOpen, setLocaleOpen] = useState(false);
  const [rangesOpen, setRangesOpen] = useState(false);
  const [classNamesOpen, setClassNamesOpen] = useState(false);

  function handleApply(start: Date, end: Date) {
    setSelectedRange({ start, end });
  }

  // Generate code
  function generateCode() {
    const lines: string[] = [];
    lines.push('<ReactDateTimePicker');
    lines.push('  ranges={ranges}');
    lines.push('  start={start}');
    lines.push('  end={end}');
    lines.push('  applyCallback={handleApply}');

    if (theme) lines.push(`  theme="${theme}"`);
    if (standalone) lines.push('  standalone');
    if (twelveHoursClock) lines.push('  twelveHoursClock');
    if (smartMode) lines.push('  smartMode');
    if (autoApply) lines.push('  autoApply');
    if (pastSearchFriendly) lines.push('  pastSearchFriendly');
    if (descendingYears) lines.push('  descendingYears');
    if (noMobileMode) lines.push('  noMobileMode');
    if (forceMobileMode) lines.push('  forceMobileMode');
    if (leftMode) lines.push('  leftMode');
    if (centerMode) lines.push('  centerMode');
    if (displayMinDate) lines.push('  displayMinDate');
    if (displayMaxDate) lines.push('  displayMaxDate');

    if (minDate) {
      lines.push(`  minDate={new Date('${formatDate(minDate, 'yyyy-MM-dd')}')}`);
    }
    if (maxDate) {
      lines.push(`  maxDate={new Date('${formatDate(maxDate, 'yyyy-MM-dd')}')}`);
    }

    const hasLocaleCustomization = language !== 'english' || dateFormat !== 'dd-MM-yyyy HH:mm' || !sundayFirst;
    if (hasLocaleCustomization) {
      const localeLines: string[] = [];
      if (dateFormat !== 'dd-MM-yyyy HH:mm') localeLines.push(`    format: '${dateFormat}',`);
      if (!sundayFirst) localeLines.push(`    sundayFirst: false,`);
      if (localePreset.days) localeLines.push(`    days: [${localePreset.days.map((d) => `'${d}'`).join(', ')}],`);
      if (localePreset.months) localeLines.push(`    months: [${localePreset.months.map((m) => `'${m}'`).join(', ')}],`);
      if (localePreset.fromDate) localeLines.push(`    fromDate: '${localePreset.fromDate}',`);
      if (localePreset.toDate) localeLines.push(`    toDate: '${localePreset.toDate}',`);
      if (localePreset.apply) localeLines.push(`    apply: '${localePreset.apply}',`);
      if (localePreset.cancel) localeLines.push(`    cancel: '${localePreset.cancel}',`);
      lines.push(`  locale={{`);
      localeLines.forEach((l) => lines.push(l));
      lines.push(`  }}`);
    }

    if (hasClassNames) {
      const cn = classNames;
      const cnLines: string[] = [];
      Object.entries(cn).forEach(([key, val]) => {
        if (val) cnLines.push(`    ${key}: '${val}',`);
      });
      lines.push(`  classNames={{`);
      cnLines.forEach((l) => lines.push(l));
      lines.push(`  }}`);
    }

    if (!standalone) {
      lines.push('>');
      lines.push('  <button>Select date range</button>');
      lines.push('</ReactDateTimePicker>');
    } else {
      lines.push('>');
      lines.push('  <button>Select date range</button>');
      lines.push('</ReactDateTimePicker>');
    }

    return lines.join('\n');
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <NavBar />
      <div className="mx-auto max-w-7xl px-4 py-6">
        <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Playground</h1>
        <p className="mb-6 text-slate-600 dark:text-slate-400">
          Interact with the date picker and tweak its props live. The generated code below updates automatically.
        </p>

        <div className="flex flex-col gap-6 xl:flex-row">
          {/* Live Picker */}
          <div className="min-w-0 flex-1">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <ReactDateTimePicker
                ranges={ranges}
                start={selectedRange.start}
                end={selectedRange.end}
                applyCallback={handleApply}
                theme={theme}
                standalone={standalone}
                twelveHoursClock={twelveHoursClock}
                smartMode={smartMode}
                autoApply={autoApply}
                pastSearchFriendly={pastSearchFriendly}
                descendingYears={descendingYears}
                noMobileMode={noMobileMode}
                forceMobileMode={forceMobileMode}
                leftMode={leftMode}
                centerMode={centerMode}
                displayMinDate={displayMinDate}
                displayMaxDate={displayMaxDate}
                minDate={minDate}
                maxDate={maxDate}
                locale={locale}
                classNames={hasClassNames ? classNames : undefined}
              >
                <button className="cursor-pointer rounded border border-slate-300 bg-white px-4 py-2 text-left text-sm hover:border-slate-400 dark:border-slate-600 dark:bg-slate-700 dark:text-white">
                  {formatDate(selectedRange.start, 'MMM d, yyyy h:mm a')} &mdash;{' '}
                  {formatDate(selectedRange.end, 'MMM d, yyyy h:mm a')}
                </button>
              </ReactDateTimePicker>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="w-full shrink-0 xl:w-80">
            <div className="sticky top-20 space-y-4 overflow-y-auto rounded-xl border border-slate-200 p-4 dark:border-slate-700" style={{ maxHeight: 'calc(100vh - 6rem)' }}>
              {/* Core Props */}
              <div>
                <button
                  onClick={() => setCoreOpen((o) => !o)}
                  className="flex w-full items-center justify-between border-b border-slate-200 pb-2 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:border-slate-700 dark:text-slate-300"
                >
                  ⚙️ Core Props
                  <svg className={`h-4 w-4 transition-transform ${coreOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {coreOpen && (
                  <div className="mt-3 flex flex-col gap-3">
                    <ThemePicker value={theme} onChange={setTheme} />
                    <ToggleControl label="Standalone" description="Always-visible inline picker" checked={standalone} onChange={() => setStandalone((s) => !s)} />
                    <ToggleControl label="12-Hour Clock" checked={twelveHoursClock} onChange={() => setTwelveHoursClock((s) => !s)} />
                    <ToggleControl label="Smart Mode" description="Ping-pong start/end selection" checked={smartMode} onChange={() => setSmartMode((s) => !s)} />
                    <ToggleControl label="Auto Apply" description="Apply on every change" checked={autoApply} onChange={() => setAutoApply((s) => !s)} />
                    <ToggleControl label="Past Search Friendly" checked={pastSearchFriendly} onChange={() => setPastSearchFriendly((s) => !s)} />
                    <ToggleControl label="Descending Years" checked={descendingYears} onChange={() => setDescendingYears((s) => !s)} />
                    <DateControl label="Min Date" value={minDate} onChange={setMinDate} />
                    <DateControl label="Max Date" value={maxDate} onChange={setMaxDate} />
                    <ToggleControl label="Display Min Date" checked={displayMinDate} onChange={() => setDisplayMinDate((s) => !s)} />
                    <ToggleControl label="Display Max Date" checked={displayMaxDate} onChange={() => setDisplayMaxDate((s) => !s)} />
                  </div>
                )}
              </div>

              {/* Layout */}
              <div>
                <button
                  onClick={() => setLayoutOpen((o) => !o)}
                  className="flex w-full items-center justify-between border-b border-slate-200 pb-2 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:border-slate-700 dark:text-slate-300"
                >
                  📐 Layout
                  <svg className={`h-4 w-4 transition-transform ${layoutOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {layoutOpen && (
                  <div className="mt-3 flex flex-col gap-3">
                    <ToggleControl label="No Mobile Mode" description="Always side-by-side" checked={noMobileMode} onChange={() => setNoMobileMode((s) => !s)} />
                    <ToggleControl label="Force Mobile Mode" description="Always stacked" checked={forceMobileMode} onChange={() => setForceMobileMode((s) => !s)} />
                    <ToggleControl label="Left Mode" checked={leftMode} onChange={() => setLeftMode((s) => !s)} />
                    <ToggleControl label="Center Mode" checked={centerMode} onChange={() => setCenterMode((s) => !s)} />
                  </div>
                )}
              </div>

              {/* Locale */}
              <div>
                <button
                  onClick={() => setLocaleOpen((o) => !o)}
                  className="flex w-full items-center justify-between border-b border-slate-200 pb-2 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:border-slate-700 dark:text-slate-300"
                >
                  🌍 Locale
                  <svg className={`h-4 w-4 transition-transform ${localeOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {localeOpen && (
                  <div className="mt-3 flex flex-col gap-3">
                    <ToggleControl label="Sunday First" checked={sundayFirst} onChange={() => setSundayFirst((s) => !s)} />
                    <SelectControl
                      label="Date Format"
                      value={dateFormat}
                      options={FORMAT_OPTIONS}
                      onChange={setDateFormat}
                    />
                    <SelectControl
                      label="Language"
                      value={language}
                      options={[
                        { value: 'english', label: 'English' },
                        { value: 'french', label: 'French' },
                        { value: 'german', label: 'German' },
                        { value: 'persian', label: 'Persian' },
                      ]}
                      onChange={setLanguage}
                    />
                  </div>
                )}
              </div>

              {/* Preset Ranges */}
              <div>
                <button
                  onClick={() => setRangesOpen((o) => !o)}
                  className="flex w-full items-center justify-between border-b border-slate-200 pb-2 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:border-slate-700 dark:text-slate-300"
                >
                  📅 Preset Ranges
                  <svg className={`h-4 w-4 transition-transform ${rangesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {rangesOpen && (
                  <div className="mt-3 flex flex-col gap-3">
                    <SelectControl
                      label="Ranges Set"
                      value={rangesPreset}
                      options={[
                        { value: 'default', label: 'Default (8 ranges)' },
                        { value: 'minimal', label: 'Minimal (2 ranges)' },
                        { value: 'none', label: 'None (empty)' },
                      ]}
                      onChange={setRangesPreset}
                    />
                  </div>
                )}
              </div>

              {/* Customization (classNames) */}
              <div>
                <button
                  onClick={() => setClassNamesOpen((o) => !o)}
                  className="flex w-full items-center justify-between pb-2 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                >
                  🎨 Customization
                  <svg className={`h-4 w-4 transition-transform ${classNamesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {classNamesOpen && (
                  <div className="mt-3 flex flex-col gap-3">
                    <SelectControl
                      label="Cell Style"
                      value={cellStyle}
                      options={[
                        { value: 'default', label: 'Default' },
                        { value: 'rounded', label: 'Rounded' },
                        { value: 'large', label: 'Large' },
                      ]}
                      onChange={setCellStyle}
                    />
                    <SelectControl
                      label="Range Buttons"
                      value={rangeButtonStyle}
                      options={[
                        { value: 'default', label: 'Default' },
                        { value: 'pill', label: 'Pill' },
                        { value: 'bordered', label: 'Bordered' },
                      ]}
                      onChange={setRangeButtonStyle}
                    />
                    <SelectControl
                      label="Footer Style"
                      value={footerStyle}
                      options={[
                        { value: 'default', label: 'Default' },
                        { value: 'compact', label: 'Compact' },
                        { value: 'accent', label: 'Accent (Emerald)' },
                      ]}
                      onChange={setFooterStyle}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Generated Code */}
        <div className="mt-8">
          <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">Generated Code</h2>
          <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
            Copy this code to use the picker with your current settings.
          </p>
          <CodeBlock code={generateCode()} lang="tsx" />
        </div>
      </div>
    </div>
  );
}
