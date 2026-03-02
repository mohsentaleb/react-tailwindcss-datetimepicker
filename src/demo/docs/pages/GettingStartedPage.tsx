import CodeBlock from '../../components/CodeBlock';

const basicUsage = `import { useState } from 'react';
import ReactDateTimePicker from 'react-tailwindcss-datetimepicker';
import { startOfDay, endOfDay, subDays } from 'date-fns';

const ranges = {
  Today: [startOfDay(new Date()), endOfDay(new Date())],
  'Last 7 Days': [subDays(new Date(), 7), new Date()],
  'Last 30 Days': [subDays(new Date(), 30), new Date()],
};

function MyComponent() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  function handleApply(startDate: Date, endDate: Date) {
    setStart(startDate);
    setEnd(endDate);
  }

  return (
    <ReactDateTimePicker
      ranges={ranges}
      start={start}
      end={end}
      applyCallback={handleApply}
    >
      <button>Select date range</button>
    </ReactDateTimePicker>
  );
}`;

const classComponentUsage = `import React from 'react';
import ReactDateTimePicker from 'react-tailwindcss-datetimepicker';

const ranges = {
  Today: [new Date(), new Date()],
};

class MyComponent extends React.Component {
  state = {
    start: new Date(),
    end: new Date(),
  };

  handleApply = (start: Date, end: Date) => {
    this.setState({ start, end });
  };

  render() {
    return (
      <ReactDateTimePicker
        ranges={ranges}
        start={this.state.start}
        end={this.state.end}
        applyCallback={this.handleApply}
      >
        <button>Select date range</button>
      </ReactDateTimePicker>
    );
  }
}`;

export default function GettingStartedPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Getting Started</h1>

      <section id="basic-usage">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          Basic Usage
        </h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          The picker requires three essential props: <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">start</code>,{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">end</code>, and{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">applyCallback</code>.
          Optionally pass <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">ranges</code> to show preset range buttons.
          Pass a trigger element as <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">children</code> — clicking it
          opens the picker dropdown.
        </p>
        <CodeBlock code={basicUsage} lang="tsx" />
      </section>

      <section id="class-components" className="mt-10">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          Class Components
        </h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          The picker works with both functional and class components. Here is an equivalent class component example:
        </p>
        <CodeBlock code={classComponentUsage} lang="tsx" />
      </section>
    </div>
  );
}
