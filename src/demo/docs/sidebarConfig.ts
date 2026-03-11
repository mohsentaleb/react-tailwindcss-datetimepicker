export type SidebarSubItem = { label: string; hash: string };
export type SidebarItem = {
  label: string;
  to: string;
  subItems?: SidebarSubItem[];
};

export const sidebarConfig: SidebarItem[] = [
  { label: 'Home', to: '/docs' },
  {
    label: 'Installation',
    to: '/docs/installation',
    subItems: [
      { label: 'With Tailwind', hash: 'with-tailwind' },
      { label: 'Without Tailwind', hash: 'without-tailwind' },
    ],
  },
  {
    label: 'Getting Started',
    to: '/docs/getting-started',
    subItems: [
      { label: 'Basic Usage', hash: 'basic-usage' },
      { label: 'Class Components', hash: 'class-components' },
    ],
  },
  {
    label: 'Features',
    to: '/docs/features',
    subItems: [
      { label: 'Date Range', hash: 'date-range' },
      { label: 'Smart Mode', hash: 'smart-mode' },
      { label: 'Time Selection', hash: 'time-selection' },
      { label: 'Preset Ranges', hash: 'preset-ranges' },
      { label: 'Dark Mode', hash: 'dark-mode' },
      { label: 'Mobile Support', hash: 'mobile-support' },
    ],
  },
  {
    label: 'Customization',
    to: '/docs/customization',
    subItems: [
      { label: 'Themes', hash: 'themes' },
      { label: 'classNames Overrides', hash: 'classnames' },
    ],
  },
  { label: 'Localization', to: '/docs/localization' },
  {
    label: 'API Reference',
    to: '/docs/api-reference',
    subItems: [
      { label: 'Required Props', hash: 'required' },
      { label: 'Date Constraints', hash: 'constraints' },
      { label: 'Behavior', hash: 'behavior' },
      { label: 'Layout', hash: 'layout' },
      { label: 'Time', hash: 'time' },
      { label: 'Styling', hash: 'styling' },
    ],
  },
  {
    label: 'Guides',
    to: '/docs/guides',
    subItems: [
      { label: 'Preset Ranges', hash: 'preset-ranges' },
      { label: 'Restricting Dates', hash: 'restricting-dates' },
      { label: 'Custom Styling', hash: 'custom-styling' },
      { label: 'Localization', hash: 'localization' },
    ],
  },
  { label: 'Migration', to: '/docs/migration' },
  { label: 'Development', to: '/docs/development' },
  { label: 'License', to: '/docs/license' },
];
