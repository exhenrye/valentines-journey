import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 8080,
  },
  preview: {
    port: 8080,
  },
});
