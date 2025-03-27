import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      '~': '/app',
    },
  },
  server: {
    host: '0.0.0.0', // Listen on all addresses
    port: 5173,
    strictPort: false, // Allow port fallback
    hmr: {
      host: 'localhost',
      port: 5173,
      protocol: 'ws',
      clientPort: 443, // Important for CodeSandbox
    },
    watch: {
      usePolling: true,
    },
    allowedHosts: ['localhost', '127.0.0.1', '.csb.app', '.codesandbox.io', 'all', '0.0.0.0'],
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
  },
});
