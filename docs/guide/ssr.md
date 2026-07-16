# SSR & Nuxt

`JsonViewer` renders cleanly on the server — its render logic touches no
browser globals. Browser APIs (`navigator.clipboard`, `document`) are only used
inside the copy handler, which runs on click in the browser.

## Nuxt 3

Register the plugin as a client plugin and import the stylesheet:

```ts
// plugins/json-viewer.ts
import { JsonViewerPlugin } from '@anilkumarthakur/vue3-json-viewer';
import '@anilkumarthakur/vue3-json-viewer/styles.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(JsonViewerPlugin);
});
```

The component itself is SSR-safe, so a `.client.ts` suffix is **not required**.
If you prefer to avoid rendering it on the server entirely, wrap it:

```vue
<template>
  <ClientOnly>
    <JsonViewer :data="data" />
  </ClientOnly>
</template>
```

Or import the stylesheet globally via `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  css: ['@anilkumarthakur/vue3-json-viewer/styles.css'],
});
```

## Vite / Vue SSR

Import and use the component normally. Only the CSS import needs to be present
in a place your SSR build includes (typically your app entry):

```ts
import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
import '@anilkumarthakur/vue3-json-viewer/styles.css';
```

## Hydration Notes

- The initial expand/collapse state is derived purely from the `expanded` prop,
  so the server-rendered markup matches the client's first render — no
  hydration mismatch.
- Avoid passing values that differ between server and client (for example a bare
  `new Date()` created in `setup`) as `data`, or you may see a hydration
  warning. Compute such values in `onMounted` or pass a fixed timestamp.

## This Documentation

These docs are built with VitePress (which is SSR-rendered) and embed the real
component on nearly every page — a live demonstration that server rendering
works.
