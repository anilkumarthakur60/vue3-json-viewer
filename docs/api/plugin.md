# Plugin

Vue3 JSON Viewer can be registered globally using the Vue plugin system.

## Installation

### Using the Plugin

```ts
import { createApp } from 'vue';
import App from './App.vue';
import { JsonViewerPlugin } from '@anilkumarthakur/vue3-json-viewer';
import '@anilkumarthakur/vue3-json-viewer/styles.css';

const app = createApp(App);

// Register the plugin
app.use(JsonViewerPlugin);

app.mount('#app');
```

### What Gets Registered

The plugin registers the following components globally:

| Component         | Usage                              |
| ----------------- | ---------------------------------- |
| `JsonViewer`      | Main component for displaying JSON |
| `NestedComponent` | Internal recursive component       |

## Usage After Registration

Once registered, you can use the components anywhere without importing:

```vue
<template>
  <JsonViewer
    :data="myData"
    :darkMode="true"
  />
</template>

<script setup lang="ts">
  const myData = { hello: 'world' };
</script>
```

## Plugin API

### JsonViewerPlugin

```ts
import type { Plugin } from 'vue';

const JsonViewerPlugin: Plugin = {
  install(app: App): void {
    app.component('JsonViewer', JsonViewer);
    app.component('NestedComponent', NestedComponent);
  },
};
```

## Alternative: Direct Import

If you prefer not to use global registration, import components directly:

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';
</script>

<template>
  <JsonViewer :data="data" />
</template>
```

## Comparison

| Approach            | Pros                                  | Cons                                   |
| ------------------- | ------------------------------------- | -------------------------------------- |
| **Plugin (Global)** | No imports needed in components       | Registers components you might not use |
| **Direct Import**   | Tree-shakeable, explicit dependencies | Import required in each component      |

## Nuxt.js Integration

For Nuxt 3, create a plugin file:

```ts
// plugins/json-viewer.client.ts
import { JsonViewerPlugin } from '@anilkumarthakur/vue3-json-viewer';
import '@anilkumarthakur/vue3-json-viewer/styles.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(JsonViewerPlugin);
});
```

::: tip Client-Side Only
The component uses browser APIs (like `navigator.clipboard`), so register it as a client-side plugin (`.client.ts` suffix).
:::

## TypeScript Support

The plugin is fully typed. No additional configuration needed:

```ts
// The plugin type is correctly inferred
import { JsonViewerPlugin } from '@anilkumarthakur/vue3-json-viewer';

app.use(JsonViewerPlugin); // ✓ Type-safe
```

## Default Export

The package also exports the plugin as the default export:

```ts
import JsonViewerPlugin from '@anilkumarthakur/vue3-json-viewer';

// Same as
import { JsonViewerPlugin } from '@anilkumarthakur/vue3-json-viewer';
```
