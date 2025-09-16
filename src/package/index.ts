import type { App, Plugin } from 'vue';
import {
  JsonViewerProps,
  NestedComponentProps,
  JsonValue,
  JsonObject,
  JsonArray,
  ThemeMode,
  JsonViewerTheme,
  defaultDarkTheme,
  defaultLightTheme,
} from './types/jsonViewerTypes';
import { NestedComponent, JsonViewer } from './components';
import { useJsonViewer, type UseJsonViewerReturn } from './hooks/useJsonViewer';
import './style/global.scss';

// Plugin installation function
const install = (app: App): void => {
  app.component('JsonViewer', JsonViewer);
  app.component('NestedComponent', NestedComponent);
};

// Create plugin object
const jsonViewerPlugin: Plugin = {
  install,
};

// Named exports for individual components
export { JsonViewer, NestedComponent };

// Composable export
export { useJsonViewer };

// Plugin export
export { jsonViewerPlugin };
export default jsonViewerPlugin;

// Type exports
export type {
  JsonViewerProps,
  NestedComponentProps,
  JsonValue,
  JsonObject,
  JsonArray,
  ThemeMode,
  JsonViewerTheme,
  UseJsonViewerReturn,
};

// Theme exports
export { defaultDarkTheme, defaultLightTheme };

// Auto-install when used via script tag
if (typeof window !== 'undefined' && (window as any).Vue) {
  install((window as any).Vue);
}
