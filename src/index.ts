import { App } from 'vue';
import JsonViewer from './JsonViewer.vue';
import { JsonViewerProps } from './types/jsonViewerTypes';
import { useJsonViewer } from './hooks/useJsonViewer';
import './global.scss';
const jsonViewerPlugin = {
  install(app: App) {
    app.component('JsonViewer', JsonViewer);
    app.provide('JsonViewer', {
      darkMode: true,
    });
  },
};

export { jsonViewerPlugin, useJsonViewer };

export type { JsonViewerProps };
