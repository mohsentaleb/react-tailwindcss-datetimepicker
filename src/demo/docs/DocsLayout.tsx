import { useEffect, useState } from 'react';

import { Outlet, useLocation } from 'react-router-dom';

import NavBar from '../components/NavBar';

import OnThisPage from './OnThisPage';
import Sidebar from './Sidebar';
import { sidebarConfig } from './sidebarConfig';

export default function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const base = 'React TailwindCSS Date & Time Picker';
    const section = sidebarConfig.find((item) => item.to === pathname);
    document.title = section && section.label !== 'Home' ? `${base} | ${section.label}` : base;
  }, [pathname]);

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <NavBar onToggleSidebar={() => setSidebarOpen((s) => !s)} />
      <div className="mx-auto flex max-w-7xl">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="min-w-0 flex-1 px-6 py-8 md:px-10">
          <div className="mx-auto max-w-4xl">
            <Outlet />
          </div>
        </main>
        <OnThisPage />
      </div>
    </div>
  );
}
