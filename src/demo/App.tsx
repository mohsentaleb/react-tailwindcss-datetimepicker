import { Suspense, lazy } from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import DocsLayout from './docs/DocsLayout';
import HomePage from './docs/pages/HomePage';

const ApiReferencePage = lazy(() => import('./docs/pages/ApiReferencePage'));
const CustomizationPage = lazy(() => import('./docs/pages/CustomizationPage'));
const DevelopmentPage = lazy(() => import('./docs/pages/DevelopmentPage'));
const FeaturesPage = lazy(() => import('./docs/pages/FeaturesPage'));
const GettingStartedPage = lazy(() => import('./docs/pages/GettingStartedPage'));
const GuidesPage = lazy(() => import('./docs/pages/GuidesPage'));
const InstallationPage = lazy(() => import('./docs/pages/InstallationPage'));
const LicensePage = lazy(() => import('./docs/pages/LicensePage'));
const LocalizationPage = lazy(() => import('./docs/pages/LocalizationPage'));
const MigrationPage = lazy(() => import('./docs/pages/MigrationPage'));
const PlaygroundPage = lazy(() => import('./playground/PlaygroundPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div />}>
        <Routes>
          <Route path="/" element={<Navigate to="/docs" replace />} />
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<HomePage />} />
            <Route path="installation" element={<InstallationPage />} />
            <Route path="getting-started" element={<GettingStartedPage />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="customization" element={<CustomizationPage />} />
            <Route path="localization" element={<LocalizationPage />} />
            <Route path="api-reference" element={<ApiReferencePage />} />
            <Route path="guides" element={<GuidesPage />} />
            <Route path="migration" element={<MigrationPage />} />
            <Route path="development" element={<DevelopmentPage />} />
            <Route path="license" element={<LicensePage />} />
          </Route>
          <Route path="/playground" element={<PlaygroundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
