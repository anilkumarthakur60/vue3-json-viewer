import {
  defineNuxtModule,
  createResolver,
  addPlugin,
  addComponentsDir,
} from '@nuxt/kit';
import { fileURLToPath } from 'node:url';

export interface ModuleOptions {
  /**
   * Auto-import components
   * @default true
   */
  autoImport?: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vue3-json-viewer',
    configKey: 'jsonViewer',
    compatibility: {
      nuxt: '^3.0.0 || ^4.0.0',
    },
  },
  defaults: {
    autoImport: true,
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    // Ensure auto-import is enabled
    if (options.autoImport) {
      // Auto-import plugin
      addPlugin({
        src: resolve('./runtime/plugin.ts'),
        mode: 'client',
      });

      // Auto-import components
      addComponentsDir({
        path: resolve('./runtime/components'),
        prefix: '',
        global: true,
      });
    }
  },
});
