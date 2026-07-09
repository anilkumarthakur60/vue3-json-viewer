# Installation

## Package Manager

Install with your preferred package manager:

::: code-group

```bash [npm]
npm install @anilkumarthakur/vue3-json-viewer
```

```bash [yarn]
yarn add @anilkumarthakur/vue3-json-viewer
```

```bash [pnpm]
pnpm add @anilkumarthakur/vue3-json-viewer
```

```bash [bun]
bun add @anilkumarthakur/vue3-json-viewer
```

:::

**Requirements:** Vue **3.3.0+** (declared as a peer dependency).

## Importing Styles

The component's CSS is **not** injected automatically. Import it once, anywhere
in your app (entry file or a component):

```ts
import '@anilkumarthakur/vue3-json-viewer/styles.css';
```

## Component Registration

### Local Registration (Recommended)

Import the component directly where you use it — this is tree-shakeable:

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';
</script>

<template>
  <JsonViewer :data="yourData" />
</template>
```

### Global Registration

Register globally with the plugin (see the [Plugin API](/api/plugin)):

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { JsonViewerPlugin } from '@anilkumarthakur/vue3-json-viewer';
import '@anilkumarthakur/vue3-json-viewer/styles.css';

const app = createApp(App);
app.use(JsonViewerPlugin);
app.mount('#app');
```

After that you can use `<JsonViewer>` and `<JsonNode>` anywhere without importing.

## TypeScript Support

Type definitions ship with the package. Import types from the package root:

```ts
import type {
  JsonViewerProps,
  JsonViewerEmits,
  ToggleEventPayload,
  CopyEventPayload,
  JsonValue,
  JsonObject,
  JsonArray,
} from '@anilkumarthakur/vue3-json-viewer';
```

See the full list in the [Types reference](/api/types).

## SSR / Nuxt

The component is SSR-safe. For Nuxt and Vue SSR specifics, see the
[SSR & Nuxt guide](/guide/ssr).

## CDN Usage

Use the UMD build directly in the browser:

```html
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/@anilkumarthakur/vue3-json-viewer"></script>
<link
  rel="stylesheet"
  href="https://unpkg.com/@anilkumarthakur/vue3-json-viewer/dist/vue3-json-viewer.css"
/>

<div id="app"></div>

<script>
  const app = Vue.createApp({
    data() {
      return { jsonData: { hello: 'world' } };
    },
    template: '<json-viewer :data="jsonData" />',
  });
  app.use(Vue3JsonViewer.JsonViewerPlugin);
  app.mount('#app');
</script>
```

::: tip Global name
The UMD global is `Vue3JsonViewer`, exposing `JsonViewer`, `JsonNode`, and
`JsonViewerPlugin`.
:::

## Verifying Installation

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const testData = {
    status: 'success',
    message: 'Vue3 JSON Viewer is working!',
  };
</script>

<template>
  <JsonViewer
    :data="testData"
    :dark-mode="true"
  />
</template>
```

If you see a formatted JSON tree, you're all set! 🎉
