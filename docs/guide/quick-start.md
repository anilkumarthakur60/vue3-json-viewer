# Quick Start

Get up and running with Vue3 JSON Viewer in minutes.

## Basic Setup

### 1. Import the Component

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';
</script>
```

### 2. Prepare Your Data

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

### 3. Use the Component

```vue
<template>
  <JsonViewer
    :data="jsonData"
    :darkMode="true"
    :expanded="true"
  />
</template>
```

## Complete Example

```vue
<script setup lang="ts">
  import { ref } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const isDarkMode = ref(true);
  const isExpanded = ref(true);

  const jsonData = {
    user: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    },
    posts: [
      { id: 1, title: 'Hello World' },
      { id: 2, title: 'Vue3 is awesome' },
    ],
    metadata: {
      createdAt: new Date(),
      version: '1.0.0',
    },
  };

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value;
  };
</script>

<template>
  <div>
    <div class="controls">
      <button @click="toggleTheme">
        {{ isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode' }}
      </button>
      <button @click="toggleExpanded">
        {{ isExpanded ? '📁 Collapse All' : '📂 Expand All' }}
      </button>
    </div>

    <JsonViewer
      :data="jsonData"
      :darkMode="isDarkMode"
      :expanded="isExpanded"
      :key="isExpanded ? 'expanded' : 'collapsed'"
    />
  </div>
</template>

<style scoped>
  .controls {
    margin-bottom: 16px;
    display: flex;
    gap: 8px;
  }

  button {
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
</style>
```

## Working with API Data

A common use case is displaying API responses:

```vue
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const apiData = ref(null);
  const loading = ref(true);
  const error = ref(null);

  onMounted(async () => {
    try {
      const response = await fetch('https://api.example.com/data');
      apiData.value = await response.json();
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  });
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <JsonViewer
    v-else
    :data="apiData"
    :darkMode="true"
  />
</template>
```

## Next Steps

- Learn about [theming](/guide/theming) to customize colors
- Explore [expand/collapse](/guide/expand-collapse) features
- See the [API reference](/api/props) for all available props
