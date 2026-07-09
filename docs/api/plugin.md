# Plugin

Register the components globally with the Vue plugin.

## Installation

```ts
import { createApp } from 'vue';
import App from './App.vue';
import { JsonViewerPlugin } from '@anilkumarthakur/vue3-json-viewer';
import '@anilkumarthakur/vue3-json-viewer/styles.css';

const app = createApp(App);
app.use(JsonViewerPlugin);
app.mount('#app');
```

### What Gets Registered

| Component    | Usage                                        |
| ------------ | -------------------------------------------- |
| `JsonViewer` | The main component for displaying JSON       |
| `JsonNode`   | The recursive node (see [Components](/guide/components)) |

## Usage After Registration

Use the components anywhere without importing:

```vue
<script setup lang="ts">
  const myData = { hello: 'world' };
</script>

<template>
  <JsonViewer
    :data="myData"
    :dark-mode="true"
  />
</template>
```

## Plugin Definition

```ts
import type { App, Plugin } from 'vue';
import { JsonViewer, JsonNode } from '@anilkumarthakur/vue3-json-viewer';

const JsonViewerPlugin: Plugin = {
  install(app: App): void {
    app.component('JsonViewer', JsonViewer);
    app.component('JsonNode', JsonNode);
  },
};
```

## Default Export

The plugin is also the package's default export:

```ts
import JsonViewerPlugin from '@anilkumarthakur/vue3-json-viewer';
// identical to:
import { JsonViewerPlugin } from '@anilkumarthakur/vue3-json-viewer';
```

## Alternative: Direct Import

Prefer not to register globally? Import the component where you use it — this is
tree-shakeable:

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';
</script>

<template>
  <JsonViewer :data="data" />
</template>
```

| Approach            | Pros                                  | Cons                                   |
| ------------------- | ------------------------------------- | -------------------------------------- |
| **Plugin (global)** | No imports needed in components       | Registers components you may not use   |
| **Direct import**   | Tree-shakeable, explicit dependencies | Import required in each component      |

## Nuxt 3

```ts
// plugins/json-viewer.ts
import { JsonViewerPlugin } from '@anilkumarthakur/vue3-json-viewer';
import '@anilkumarthakur/vue3-json-viewer/styles.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(JsonViewerPlugin);
});
```

The component is SSR-safe, so a `.client` suffix isn't required. See the
[SSR & Nuxt guide](/guide/ssr) for details.

## TypeScript

The plugin is fully typed — no extra configuration needed:

```ts
import { JsonViewerPlugin } from '@anilkumarthakur/vue3-json-viewer';

app.use(JsonViewerPlugin); // ✓ type-safe
```
