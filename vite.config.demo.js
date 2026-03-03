import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  // Set the root to the demo folder so Vite treats it as a standalone app
  root: resolve(__dirname, 'src/demo'),

  plugins: [
    cloudflare({ configPath: resolve(__dirname, 'wrangler.jsonc') }),
    svgr({
      svgrOptions: {
        // 1. Keeps the viewBox so the SVG can scale
        icon: true,
        // 2. Ensures 'className' and other props are passed to the <svg> tag
        expandProps: 'end',
        // 3. Prevents SVGO from stripping essential attributes
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false, // Critical for scaling
                },
              },
            },
          ],
        },
      },
      include: '**/*.svg?react',
    }),
    react(),
    tailwindcss(),
  ],

  build: {
    // Output one level up to the project root's dist-demo folder
    outDir: resolve(__dirname, 'dist-demo'),
    emptyOutDir: true,
  },
});
