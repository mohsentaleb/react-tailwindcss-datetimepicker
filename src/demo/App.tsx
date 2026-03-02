import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import DocsLayout from './docs/DocsLayout';
import ApiReferencePage from './docs/pages/ApiReferencePage';
import CustomizationPage from './docs/pages/CustomizationPage';
import DevelopmentPage from './docs/pages/DevelopmentPage';
import FeaturesPage from './docs/pages/FeaturesPage';
import GettingStartedPage from './docs/pages/GettingStartedPage';
import GuidesPage from './docs/pages/GuidesPage';
import HomePage from './docs/pages/HomePage';
import InstallationPage from './docs/pages/InstallationPage';
import LicensePage from './docs/pages/LicensePage';
import LocalizationPage from './docs/pages/LocalizationPage';
import MigrationPage from './docs/pages/MigrationPage';
import PlaygroundPage from './playground/PlaygroundPage';

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
