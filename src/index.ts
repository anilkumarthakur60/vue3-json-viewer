/**
 * Vue3 JSON Viewer
 *
 * A beautiful, customizable JSON viewer component for Vue 3 with TypeScript support.
 *
 * @packageDocumentation
 */

import type { App, Plugin } from 'vue';
import { JsonViewer, JsonNode } from './components';
import type {
  JsonViewerProps,
  JsonNodeProps,
  JsonValue,
  JsonPrimitive,
  JsonObject,
  JsonArray,
  JsonViewerTheme,
  ThemeColors,
  ContainerKind,
} from './types';

/** Vue plugin for global registration of JsonViewer components */
const JsonViewerPlugin: Plugin = {
  install(app: App): void {
    app.component('JsonViewer', JsonViewer);
    app.component('JsonNode', JsonNode);
  },
};

export { JsonViewer, JsonNode };
export { JsonViewerPlugin };
export default JsonViewerPlugin;

export type {
  JsonViewerProps,
  JsonNodeProps,
  JsonValue,
  JsonPrimitive,
  JsonObject,
  JsonArray,
  JsonViewerTheme,
  ThemeColors,
  ContainerKind,
};
