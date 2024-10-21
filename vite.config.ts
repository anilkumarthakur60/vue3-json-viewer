import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import path from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import { viteStaticCopy } from 'vite-plugin-static-copy'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts(),
    // viteStaticCopy({
    //   targets: [
    //     { src: 'src/package/global.scss', dest: '' }
    //   ]
    // })
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/package/index.ts'),
      name: '@anilkumarthakur/vue3-json-viewer',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    cssCodeSplit: true,
  },
  server: {
    host: '0.0.0.0', // Allows access from the local network
    port: 3000, // You can change this to any port number you prefer
  },
});
