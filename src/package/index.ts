// import { App } from 'vue';
import { JsonViewerProps } from './types/jsonViewerTypes';
import './style/global.scss';
import JsonViewer from './components/JsonViewer.vue';
import { useJsonViewer } from './hooks/useJsonViewer.ts';

// const jsonViewerPlugin = {
//   install(app: App) {
//     app.component('JsonViewer', JsonViewer);
//     app.provide('JsonViewer', {
//       darkMode: true,
//     });
//   },
// };
export { JsonViewer, useJsonViewer };
export type { JsonViewerProps };
