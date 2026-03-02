import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// Builds the demo/docs SPA as a static site for Cloudflare Pages deployment.
// Separate from the main vite.config.js which builds the npm library.
export default defineConfig({
  plugins: [tailwindcss(), react(), svgr()],
  build: {
    outDir: 'dist-demo',
  },
});
