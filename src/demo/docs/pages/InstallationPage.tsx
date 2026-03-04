import { useState } from 'react';

import CodeBlock from '../../components/CodeBlock';

const installCmd = 'npm install react-tailwindcss-datetimepicker';

const tailwindV3Config = `// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datetimepicker/dist/**/*.js',
  ],
  // ...
};`;

const tailwindV4Config = `/* your main CSS file */
@import 'tailwindcss';
@source "../node_modules/react-tailwindcss-datetimepicker/dist";`;

const withoutTailwindImport = `// Import the pre-built CSS in your entry file
import 'react-tailwindcss-datetimepicker/dist/style.css';`;

const tabs = [
  { label: 'Tailwind v4', code: tailwindV4Config, lang: 'css' },
  { label: 'Tailwind v3', code: tailwindV3Config, lang: 'js' },
] as const;

export default function InstallationPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Installation</h1>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        Install the package from npm:
      </p>
      <CodeBlock code={installCmd} lang="bash" />

      <section id="with-tailwind" className="mt-10">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          With Tailwind CSS
        </h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          If your project already uses TailwindCSS, add the package to your content configuration so Tailwind can
          scan it for class names. No extra CSS import is needed.
        </p>
        <div>
          <div className="flex gap-1 rounded-t-lg border border-b-0 border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800">
            {tabs.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeTab === i
                    ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="[&>pre]:rounded-t-none! [&>pre]:mt-0!">
            <CodeBlock code={tabs[activeTab].code} lang={tabs[activeTab].lang} />
          </div>
        </div>
      </section>

      <section id="without-tailwind" className="mt-10">
        <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
          Without Tailwind CSS
        </h2>
        <p className="mb-4 text-slate-600 dark:text-slate-400">
          If your project does not use TailwindCSS, import the pre-built CSS file. This includes all the styles
          the component needs.
        </p>
        <CodeBlock code={withoutTailwindImport} lang="js" />
      </section>
    </div>
  );
}
