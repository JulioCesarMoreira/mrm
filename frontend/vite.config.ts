import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: true,
    }),
  ],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@lib': '/src/lib',
      constants: '/src/constants',
      pages: '/src/pages',
      hooks: '/src/hooks',
    },
  },
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
});
