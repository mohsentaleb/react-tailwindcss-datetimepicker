import CodeBlock from '../../components/CodeBlock';

const setupSteps = `# Clone the repository
git clone https://github.com/mohsentaleb/react-tailwindcss-datetimepicker.git
cd react-tailwindcss-datetimepicker

# Install dependencies
npm install

# Start the development server
npm run dev
# Opens at http://localhost:3000`;

const buildCommands = `# Build the library (ES, UMD, CJS formats)
npm run build

# Generate TypeScript declaration files only
npm run build:types

# Run ESLint (zero warnings policy)
npm run lint

# Run tests
npm test

# Preview the production build
npm run preview`;

export default function DevelopmentPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Development</h1>
      <p className="mb-6 text-slate-600 dark:text-slate-400">
        Want to contribute or run the project locally? Here's how to get started.
      </p>

      <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
        Setup
      </h2>
      <CodeBlock code={setupSteps} lang="bash" />

      <h2 className="mt-10 mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
        Available Commands
      </h2>
      <CodeBlock code={buildCommands} lang="bash" />

      <h2 className="mt-10 mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
        Project Structure
      </h2>
      <div className="text-sm text-slate-600 dark:text-slate-400">
        <ul className="list-inside list-disc space-y-1">
          <li><code className="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-slate-800">src/lib/</code> — Published library code</li>
          <li><code className="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-slate-800">src/demo/</code> — This documentation site (dev only)</li>
          <li><code className="rounded bg-slate-100 px-1.5 py-0.5 dark:bg-slate-800">dist/</code> — Build output (ES, UMD, CJS + CSS)</li>
        </ul>
      </div>
    </div>
  );
}
