import { defineNuxtPlugin } from '#app';
import JsonViewerPlugin from '../index';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(JsonViewerPlugin);
});
