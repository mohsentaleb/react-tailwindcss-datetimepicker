export type SidebarItem = { label: string; to: string };
export type SidebarSection = { heading: string | null; items: SidebarItem[] };

export const sidebarConfig: SidebarSection[] = [
  {
    heading: null,
    items: [{ label: 'Home', to: '/docs' }],
  },
  {
    heading: 'Installation',
    items: [
      { label: 'With Tailwind', to: '/docs/installation#with-tailwind' },
      { label: 'Without Tailwind', to: '/docs/installation#without-tailwind' },
    ],
  },
  {
    heading: 'Getting Started',
    items: [
      { label: 'Basic Usage', to: '/docs/getting-started#basic-usage' },
      { label: 'Class Components', to: '/docs/getting-started#class-components' },
    ],
  },
  {
    heading: 'Features',
    items: [
      { label: 'Date Range', to: '/docs/features#date-range' },
      { label: 'Time Selection', to: '/docs/features#time-selection' },
      { label: 'Preset Ranges', to: '/docs/features#preset-ranges' },
      { label: 'Dark Mode', to: '/docs/features#dark-mode' },
      { label: 'Mobile Support', to: '/docs/features#mobile-support' },
    ],
  },
  {
    heading: 'Customization',
    items: [
      { label: 'Themes', to: '/docs/customization#themes' },
      { label: 'classNames Overrides', to: '/docs/customization#classnames' },
    ],
  },
  {
    heading: null,
    items: [{ label: 'Localization', to: '/docs/localization' }],
  },
  {
    heading: 'API Reference',
    items: [
      { label: 'Required Props', to: '/docs/api-reference#required' },
      { label: 'Date Constraints', to: '/docs/api-reference#constraints' },
      { label: 'Behavior', to: '/docs/api-reference#behavior' },
      { label: 'Layout', to: '/docs/api-reference#layout' },
      { label: 'Time', to: '/docs/api-reference#time' },
      { label: 'Styling', to: '/docs/api-reference#styling' },
    ],
  },
  {
    heading: 'Guides',
    items: [
      { label: 'Preset Ranges', to: '/docs/guides#preset-ranges' },
      { label: 'Restricting Dates', to: '/docs/guides#restricting-dates' },
      { label: 'Custom Styling', to: '/docs/guides#custom-styling' },
      { label: 'Localization', to: '/docs/guides#localization' },
    ],
  },
  {
    heading: null,
    items: [
      { label: 'Migration', to: '/docs/migration' },
      { label: 'Development', to: '/docs/development' },
      { label: 'License', to: '/docs/license' },
    ],
  },
];
