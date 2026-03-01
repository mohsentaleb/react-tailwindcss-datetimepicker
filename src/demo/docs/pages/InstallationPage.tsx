import CodeBlock from '../../components/CodeBlock';

const installCmd = 'npm install react-tailwindcss-datetimepicker';

const withTailwindConfig = `// tailwind.config.js (v3) or CSS config (v4)
// Add the package to your content sources:

// Tailwind v3 — tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datetimepicker/dist/**/*.js',
  ],
  // ...
};

// Tailwind v4 — your main CSS file
@import 'tailwindcss';
@source "../node_modules/react-tailwindcss-datetimepicker/dist";`;

const withoutTailwindImport = `// Import the pre-built CSS in your entry file
import 'react-tailwindcss-datetimepicker/dist/style.css';`;

export default function InstallationPage() {
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
        <CodeBlock code={withTailwindConfig} lang="js" />
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
