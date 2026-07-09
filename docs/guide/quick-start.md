# Quick Start

Get up and running with Vue3 JSON Viewer in minutes.

## 1. Import the Component and Styles

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';
</script>
```

::: tip Import the CSS once
The stylesheet isn't auto-injected. Import it once (here or in your entry file).
:::

## 2. Prepare Your Data

```ts
const jsonData = {
  name: 'John Doe',
  age: 30,
  email: 'john@example.com',
  isActive: true,
  hobbies: ['reading', 'traveling', 'coding'],
  address: {
    street: '123 Main St',
    city: 'New York',
    country: 'USA',
  },
};
```

## 3. Render It

```vue
<template>
  <JsonViewer
    :data="jsonData"
    :dark-mode="true"
    :expanded="true"
  />
</template>
```

Result:

<Demo controls :json='`{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "isActive": true,
  "hobbies": ["reading", "traveling", "coding"],
  "address": { "street": "123 Main St", "city": "New York", "country": "USA" }
}`' />

## Complete Example

A theme toggle plus expand/collapse control. Note there's **no `:key` hack** —
the `expanded` prop is reactive and node state persists on its own.

```vue
<script setup lang="ts">
  import { ref } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const isDarkMode = ref(true);
  const isExpanded = ref(true);

  const jsonData = {
    user: { id: 1, name: 'John Doe', email: 'john@example.com' },
    posts: [
      { id: 1, title: 'Hello World' },
      { id: 2, title: 'Vue 3 is awesome' },
    ],
    metadata: { version: '1.0.0' },
  };
</script>

<template>
  <div class="controls">
    <button @click="isDarkMode = !isDarkMode">
      {{ isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode' }}
    </button>
    <button @click="isExpanded = !isExpanded">
      {{ isExpanded ? '📁 Collapse All' : '📂 Expand All' }}
    </button>
  </div>

  <JsonViewer
    :data="jsonData"
    :dark-mode="isDarkMode"
    :expanded="isExpanded"
  />
</template>
```

## Working with API Data

A common use case is displaying a fetched response:

```vue
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';
  import type { JsonValue } from '@anilkumarthakur/vue3-json-viewer';

  const apiData = ref<JsonValue>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);

  onMounted(async () => {
    try {
      const response = await fetch('https://api.example.com/data');
      apiData.value = await response.json();
    } catch (e) {
      error.value = (e as Error).message;
    } finally {
      loading.value = false;
    }
  });
</script>

<template>
  <div v-if="loading">Loading…</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <JsonViewer
    v-else
    :data="apiData"
    :dark-mode="true"
  />
</template>
```

## Next Steps

- [Theming](/guide/theming) — dark & light mode
- [Expand & Collapse](/guide/expand-collapse) — controls and persistence
- [Events](/guide/events) — `@toggle` and `@copy`
- [API Reference](/api/props) — every prop and event
