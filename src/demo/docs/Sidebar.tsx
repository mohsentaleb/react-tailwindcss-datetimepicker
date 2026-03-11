import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';

import { sidebarConfig } from './sidebarConfig';

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pathname } = useLocation();

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={onClose} />}
      <aside
        className={clsx(
          'fixed top-14 z-40 h-[calc(100vh-3.5rem)] w-48 shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-3 transition-transform duration-200 dark:border-slate-700 dark:bg-slate-900 md:sticky md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <nav className="flex flex-col gap-0.5">
          {sidebarConfig.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={clsx(
                'block rounded px-3 py-1.5 text-sm transition-colors',
                pathname === item.to
                  ? 'bg-sky-100 font-medium text-sky-700 dark:bg-slate-700 dark:text-sky-300'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800',
              )}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
