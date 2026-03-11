import { createServer } from 'vite';

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const ROUTES = [
  {
    path: '/docs',
    title: 'Documentation | React TailwindCSS DateTimePicker',
    description:
      'Complete documentation for react-tailwindcss-datetimepicker. Installation guides, API reference, examples, and more.',
  },
  {
    path: '/docs/installation',
    title: 'Installation | React TailwindCSS DateTimePicker',
    description:
      'Install react-tailwindcss-datetimepicker with or without TailwindCSS. npm, yarn, and pnpm setup guides.',
  },
  {
    path: '/docs/getting-started',
    title: 'Getting Started | React TailwindCSS DateTimePicker',
    description:
      'Quick start guide for react-tailwindcss-datetimepicker. Basic usage with functional and class components.',
  },
  {
    path: '/docs/features',
    title: 'Features | React TailwindCSS DateTimePicker',
    description:
      'Explore features: date ranges, smart mode, time selection, preset ranges, dark mode, and mobile support.',
  },
  {
    path: '/docs/customization',
    title: 'Customization | React TailwindCSS DateTimePicker',
    description: 'Customize themes and styles with the classNames API and built-in theme presets.',
  },
  {
    path: '/docs/localization',
    title: 'Localization | React TailwindCSS DateTimePicker',
    description:
      'Localize the date picker with date-fns locales. Support for 50+ languages and custom date formats.',
  },
  {
    path: '/docs/api-reference',
    title: 'API Reference | React TailwindCSS DateTimePicker',
    description:
      'Complete props API reference. Required props, date constraints, behavior, layout, time, and styling options.',
  },
  {
    path: '/docs/guides',
    title: 'Guides | React TailwindCSS DateTimePicker',
    description:
      'Step-by-step guides for preset ranges, date restrictions, custom styling, and localization.',
  },
  {
    path: '/docs/migration',
    title: 'Migration Guide | React TailwindCSS DateTimePicker',
    description:
      'Migrate from v2 (Moment.js) to v3 (date-fns). Breaking changes and upgrade instructions.',
  },
  {
    path: '/docs/development',
    title: 'Development | React TailwindCSS DateTimePicker',
    description:
      'Contribute to react-tailwindcss-datetimepicker. Local development setup and guidelines.',
  },
  {
    path: '/docs/license',
    title: 'License | React TailwindCSS DateTimePicker',
    description: 'MIT License for react-tailwindcss-datetimepicker.',
  },
  {
    path: '/playground',
    title: 'Playground | React TailwindCSS DateTimePicker',
    description:
      'Interactive playground to test react-tailwindcss-datetimepicker with live controls for props, themes, and options.',
  },
];

const SITE_URL = 'https://reactdatetime.dev';

function injectMetadata(html, route) {
  const { title, description, path: routePath } = route;
  const fullUrl = `${SITE_URL}${routePath}`;

  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${description}"`,
    )
    .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${fullUrl}"`)
    .replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${title}"`)
    .replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${description}"`,
    )
    .replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${fullUrl}"`)
    .replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${title}"`)
    .replace(
      /<meta name="twitter:description" content="[^"]*"/,
      `<meta name="twitter:description" content="${description}"`,
    );
}

async function prerender() {
  const vite = await createServer({
    configFile: path.resolve(ROOT, 'vite.config.demo.js'),
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    const { render } = await vite.ssrLoadModule('./src/demo/entry-server.tsx');

    const distDir = path.resolve(ROOT, 'dist-demo');
    const template = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8');

    for (const route of ROUTES) {
      console.log(`Pre-rendering ${route.path}...`);

      const appHtml = render(route.path);
      let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
      html = injectMetadata(html, route);

      // Write to route-specific directory (e.g., dist-demo/docs/index.html)
      const filePath = path.resolve(distDir, route.path.slice(1), 'index.html');
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, html);
    }

    console.log(`\nPre-rendered ${ROUTES.length} routes successfully.`);
  } finally {
    await vite.close();
  }
}

prerender().catch((err) => {
  console.error('Pre-rendering failed:', err);
  process.exit(1);
});
