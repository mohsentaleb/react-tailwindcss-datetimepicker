import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import postcss from 'postcss';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import svgr from 'vite-plugin-svgr';

import { resolve } from 'path';
import { fileURLToPath } from 'url';


const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * Vite plugin that strips CSS @layer wrappers from the built stylesheet.
 *
 * Tailwind CSS v4 wraps all utilities in @layer directives. In the CSS cascade,
 * layered styles always lose to unlayered styles — so when a non-Tailwind consumer
 * imports dist/style.css alongside their own regular CSS, the picker's styles get
 * overridden. This plugin unwraps the @layer blocks (keeping the rules inside) so
 * the distributed CSS works reliably as a standalone stylesheet.
 *
 * Only runs during `vite build` — the dev server is unaffected.
 */
function stripCssLayers() {
  return {
    name: 'strip-css-layers',
    apply: 'build',
    async writeBundle(options) {
      const fs = await import('fs');
      const path = await import('path');
      const outDir = options.dir || resolve(__dirname, 'dist');
      const cssPath = path.resolve(outDir, 'style.css');

      if (!fs.existsSync(cssPath)) return;

      const css = fs.readFileSync(cssPath, 'utf-8');
      const root = postcss.parse(css);
      root.walkAtRules('layer', (rule) => {
        if (rule.nodes && rule.nodes.length > 0) {
          rule.replaceWith(rule.nodes);
        } else {
          rule.remove();
        }
      });
      fs.writeFileSync(cssPath, root.toString());
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
  plugins: [
    tailwindcss(),
    react(),
    svgr(),
    dts({
      rollupTypes: true,
    }),
    stripCssLayers(),
  ],
  server: {
    port: 3000,
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, './src/lib/index.tsx'),
      formats: ['es', 'umd', 'cjs'],
      name: 'react-tailwindcss-datetimepicker',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
});
