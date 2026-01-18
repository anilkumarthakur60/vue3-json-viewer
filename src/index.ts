/**
 * Vue3 JSON Viewer
 *
 * A beautiful, customizable JSON viewer component for Vue 3 with TypeScript support.
 *
 * @packageDocumentation
 */

import type { App, Plugin } from 'vue';
import { JsonViewer, NestedComponent } from './components';
import type {
  JsonViewerProps,
  NestedComponentProps,
  JsonValue,
  JsonPrimitive,
  JsonObject,
  JsonArray,
  JsonViewerTheme,
  ThemeColors,
} from './types';

/**
 * Vue plugin for global registration of JsonViewer components
 */
const JsonViewerPlugin: Plugin = {
  install(app: App): void {
    app.component('JsonViewer', JsonViewer);
    app.component('NestedComponent', NestedComponent);
  },
};

// Named exports for components
export { JsonViewer, NestedComponent };

// Named export for plugin
export { JsonViewerPlugin };

// Default export is the plugin
export default JsonViewerPlugin;

// Type exports
export type {
  JsonViewerProps,
  NestedComponentProps,
  JsonValue,
  JsonPrimitive,
  JsonObject,
  JsonArray,
  JsonViewerTheme,
  ThemeColors,
};
