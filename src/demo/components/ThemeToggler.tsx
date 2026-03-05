import { useCallback, useEffect } from 'react';

import { useLocalStorage, useMediaQuery } from 'usehooks-ts';

import MoonIcon from '../assets/moon.svg?react';
import SunIcon from '../assets/sun.svg?react';

function ThemeToggler() {
  const isDarkOS = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkMode, setDarkMode] = useLocalStorage('usehooks-ts-dark-mode', isDarkOS);
  const toggle = useCallback(() => setDarkMode((prev) => !prev), [setDarkMode]);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDarkMode}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
      onClick={toggle}
    >
      <SunIcon className="absolute h-4 w-4 origin-center rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-4 w-4 origin-center rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
    </button>
  );
}

export default ThemeToggler;
