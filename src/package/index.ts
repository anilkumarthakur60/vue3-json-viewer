import { App } from 'vue';
import { JsonViewerProps } from './types/jsonViewerTypes';
import { ViewJson, JsonViewer } from './components';
import { useJsonViewer } from './hooks/useJsonViewer';

const jsonViewerPlugin = {
  install(app: App) {
    app.component('JsonViewer', JsonViewer);
    app.component('JsonView', ViewJson);
  },
};
export { JsonViewer, useJsonViewer, jsonViewerPlugin, ViewJson };
export type { JsonViewerProps };
