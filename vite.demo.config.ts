import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// Demo/landing build — an ordinary Vite APP build of the root index.html, in
// contrast to vite.config.ts which builds the publishable library (lib mode).
// Vercel runs this (see vercel.json); the library build stays untouched for
// `npm publish`.

const dir = path.dirname(fileURLToPath(import.meta.url));
const { version } = JSON.parse(
  readFileSync(path.join(dir, 'package.json'), 'utf8'),
) as {
  version: string;
};

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: { '@': path.resolve(dir, 'src') },
  },
  define: {
    // Read from package.json so the version badge can never go stale.
    __PKG_VERSION__: JSON.stringify(version),
  },
  base: process.env.BASE_URL ?? '/',
  build: {
    outDir: 'demo-dist',
    emptyOutDir: true,
    sourcemap: false,
  },
});
