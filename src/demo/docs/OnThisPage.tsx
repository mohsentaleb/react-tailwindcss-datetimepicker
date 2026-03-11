import { useMemo } from 'react';

import clsx from 'clsx';
import { useLocation } from 'react-router-dom';

import { sidebarConfig } from './sidebarConfig';
import useScrollSpy from './useScrollSpy';

export default function OnThisPage() {
  const { pathname } = useLocation();

  const activeSection = useMemo(
    () => sidebarConfig.find((item) => item.to === pathname && item.subItems),
    [pathname],
  );

  const subItemHashes = useMemo(
    () => (activeSection?.subItems ?? []).map((s) => s.hash),
    [activeSection],
  );

  const activeHash = useScrollSpy(subItemHashes);

  if (!activeSection?.subItems) return null;

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-48 shrink-0 overflow-y-auto p-4 xl:block">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
        On This Page
      </h3>
      <nav className="flex flex-col gap-0.5 border-l border-slate-200 dark:border-slate-700">
        {activeSection.subItems.map((sub) => (
          <a
            key={sub.hash}
            href={`#${sub.hash}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(sub.hash);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className={clsx(
              '-ml-px border-l-2 py-1 pl-3 text-sm transition-colors',
              activeHash === sub.hash
                ? 'border-sky-500 font-medium text-sky-700 dark:text-sky-300'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200',
            )}
          >
            {sub.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
