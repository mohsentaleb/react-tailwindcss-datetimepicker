import type { Theme } from '../types';

// Calendar cell classes
export const hoverCellClasses: Record<Theme, string> = {
  blue: 'text-black bg-sky-100 cursor-pointer dark:bg-slate-400 caret-transparent',
  orange: 'text-black bg-orange-100 cursor-pointer dark:bg-slate-400 caret-transparent',
  green: 'text-black bg-emerald-100 cursor-pointer dark:bg-slate-400 caret-transparent',
  purple: 'text-black bg-purple-100 cursor-pointer dark:bg-slate-400 caret-transparent',
};

export const startCellClasses: Record<Theme, string> = {
  blue: 'rounded-l-md text-white bg-sky-500 cursor-pointer caret-transparent',
  orange: 'rounded-l-md text-white bg-orange-500 cursor-pointer caret-transparent',
  green: 'rounded-l-md text-white bg-emerald-500 cursor-pointer caret-transparent',
  purple: 'rounded-l-md text-white bg-purple-500 cursor-pointer caret-transparent',
};

export const endCellClasses: Record<Theme, string> = {
  blue: 'rounded-r-md text-white bg-sky-500 cursor-pointer caret-transparent',
  orange: 'rounded-r-md text-white bg-orange-500 cursor-pointer caret-transparent',
  green: 'rounded-r-md text-white bg-emerald-500 cursor-pointer caret-transparent',
  purple: 'rounded-r-md text-white bg-purple-500 cursor-pointer caret-transparent',
};

export const inBetweenCellClasses: Record<Theme, string> = {
  blue: 'text-sky-800 bg-sky-50 cursor-pointer dark:bg-slate-500 dark:text-white',
  orange: 'text-orange-800 bg-orange-50 cursor-pointer dark:bg-slate-500 dark:text-white',
  green: 'text-emerald-800 bg-emerald-50 cursor-pointer dark:bg-slate-500 dark:text-white',
  purple: 'text-purple-800 bg-purple-50 cursor-pointer dark:bg-slate-500 dark:text-white',
};

// Range button classes
export const rangeButtonSelectedClasses: Record<Theme, string> = {
  blue: 'bg-sky-600 text-white hover:bg-sky-600 hover:text-white',
  orange: 'bg-orange-600 text-white hover:bg-orange-600 hover:text-white',
  green: 'bg-emerald-600 text-white hover:bg-emerald-600 hover:text-white',
  purple: 'bg-purple-600 text-white hover:bg-purple-600 hover:text-white',
};

export const rangeButtonDefaultClasses: Record<Theme, string> = {
  blue: 'bg-gray-50 text-black hover:bg-sky-100 hover:text-black dark:bg-slate-600 dark:text-white dark:hover:bg-slate-500',
  orange:
    'bg-gray-50 text-black hover:bg-orange-100 hover:text-black dark:bg-slate-600 dark:text-white dark:hover:bg-slate-500',
  green:
    'bg-gray-50 text-black hover:bg-emerald-100 hover:text-black dark:bg-slate-600 dark:text-white dark:hover:bg-slate-500',
  purple:
    'bg-gray-50 text-black hover:bg-purple-100 hover:text-black dark:bg-slate-600 dark:text-white dark:hover:bg-slate-500',
};

// Apply button classes
export const applyButtonClasses: Record<Theme, string> = {
  blue: 'bg-green-600 hover:bg-green-500 focus:ring-green-300',
  orange: 'bg-orange-600 hover:bg-orange-500 focus:ring-orange-300',
  green: 'bg-emerald-600 hover:bg-emerald-500 focus:ring-emerald-300',
  purple: 'bg-purple-600 hover:bg-purple-500 focus:ring-purple-300',
};
