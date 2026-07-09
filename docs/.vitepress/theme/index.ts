import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
// Import the component straight from source so docs always track the latest
// API. Importing the component also pulls in its stylesheet as a side effect.
import { JsonViewer, JsonNode } from '../../../src';
import Demo from './components/Demo.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // Registered globally so any `.md` page can drop in a live viewer.
    app.component('JsonViewer', JsonViewer);
    app.component('JsonNode', JsonNode);
    // `<Demo>` powers the interactive examples throughout the docs.
    app.component('Demo', Demo);
  },
} satisfies Theme;
