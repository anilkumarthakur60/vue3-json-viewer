# Installation

## Package Manager

Install the package using your preferred package manager:

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

:::

## Importing Styles

The component requires CSS to be imported. Add this to your main entry file or component:

```ts
import '@anilkumarthakur/vue3-json-viewer/styles.css';
```

## Component Registration

### Local Registration (Recommended)

Import and use the component directly in your Vue files:

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

Register the component globally using the plugin:

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

After global registration, you can use `<JsonViewer>` anywhere without importing:

```vue
<template>
  <JsonViewer
    :data="yourData"
    :darkMode="true"
  />
</template>
```

## TypeScript Support

The package includes TypeScript definitions out of the box. You can import types:

```ts
import type {
  JsonViewerProps,
  JsonValue,
  JsonObject,
  JsonArray,
} from '@anilkumarthakur/vue3-json-viewer';
```

## CDN Usage

You can also use the component via CDN:

```html
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/@anilkumarthakur/vue3-json-viewer"></script>
<link
  rel="stylesheet"
  href="https://unpkg.com/@anilkumarthakur/vue3-json-viewer/dist/vue3-json-viewer.css"
/>

<script>
  const app = Vue.createApp({
    data() {
      return {
        jsonData: { hello: 'world' },
      };
    },
    template: '<json-viewer :data="jsonData" />',
  });
  app.use(Vue3JsonViewer.JsonViewerPlugin);
  app.mount('#app');
</script>
```

## Verifying Installation

After installation, create a simple test:

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
    :darkMode="true"
  />
</template>
```

If you see a beautifully formatted JSON display, you're all set! 🎉
