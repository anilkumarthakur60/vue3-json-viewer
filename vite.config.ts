import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.tsx$/],
    }),
    vueJsx({
      // Enable TSX support
      mergeProps: false,
      enableObjectSlots: false,
    }),
    dts({
      insertTypesEntry: true,
      cleanVueFileName: true,
      skipDiagnostics: false,
      logDiagnostics: true,
      rollupTypes: true,
    }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/package/index.ts'),
      name: 'Vue3JsonViewer',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'umd', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', '@heroicons/vue/24/solid'],
      output: [
        {
          format: 'es',
          entryFileNames: 'index.es.js',
          exports: 'named',
        },
        {
          format: 'umd',
          name: 'Vue3JsonViewer',
          entryFileNames: 'index.umd.js',
          globals: {
            vue: 'Vue',
            '@heroicons/vue/24/solid': 'HeroiconsVue24Solid',
          },
          exports: 'named',
        },
        {
          format: 'cjs',
          entryFileNames: 'index.cjs.js',
          exports: 'named',
        },
      ],
    },
    sourcemap: true,
    emptyOutDir: true,
    cssCodeSplit: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console for debugging in development
        drop_debugger: true,
      },
      mangle: {
        keep_classnames: true,
        keep_fnames: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
