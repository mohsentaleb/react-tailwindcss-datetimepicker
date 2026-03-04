import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import logo from '../assets/logo.webp';

import ThemeToggler from './ThemeToggler';

export default function NavBar({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(
      'rounded px-3 py-1.5 text-sm font-medium transition-colors',
      isActive
        ? 'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-white'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white',
    );

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {onToggleSidebar && (
            <button
              className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white md:hidden"
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          <NavLink
            to="/docs"
            className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white"
            end={false}
          >
            <img src={logo} alt="Logo" className="h-8 w-8 shrink-0" width={32} height={32} />
            <span className="hidden md:inline">React TailwindCSS Date &amp; Time Picker</span>
          </NavLink>
        </div>
        <div className="flex items-center gap-2">
          <NavLink to="/docs" className={linkClass} end>
            Documentation
          </NavLink>
          <NavLink to="/playground" className={linkClass}>
            Playground
          </NavLink>
          <div className="ml-2 flex items-center border-l border-slate-200 pl-3 dark:border-slate-700">
            <ThemeToggler />
          </div>
          <a
            href="https://github.com/mohsentaleb/react-tailwindcss-datetimepicker"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            title="GitHub"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
