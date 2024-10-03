import { App } from 'vue';
import { JsonViewerProps } from './types/jsonViewerTypes';
import './style/global.scss';
import JsonViewer from './components/JsonViewer.vue';

const jsonViewerPlugin = {
  install(app: App) {
    app.component('JsonViewer', JsonViewer);
    app.provide('JsonViewer', {
      darkMode: true,
    });
  },
};

export { jsonViewerPlugin as default, JsonViewer };
export type { JsonViewerProps };
