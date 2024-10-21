import { App } from 'vue';
import { JsonViewerProps } from './types/jsonViewerTypes';
import { NestedComponent, JsonViewer } from './components';
import useJsonViewer from './hooks/useJsonViewer';
import '../package/style/global.scss';

const jsonViewerPlugin = {
  install(app: App) {
    app.component('JsonViewer', JsonViewer);
    app.component('NestedComponent', NestedComponent);
  },
};
export { JsonViewer, useJsonViewer, jsonViewerPlugin, NestedComponent };
export type { JsonViewerProps };
