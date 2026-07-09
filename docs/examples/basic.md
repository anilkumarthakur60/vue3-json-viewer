# Basic Usage

The simplest ways to use Vue3 JSON Viewer.

## Simple Object

<Demo :json='`{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "isActive": true
}`' />

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const data = {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    isActive: true,
  };
</script>

<template>
  <JsonViewer :data="data" />
</template>
```

## With Arrays

<Demo :json='`{
  "fruits": ["apple", "banana", "orange"],
  "numbers": [1, 2, 3, 4, 5],
  "mixed": [1, "two", true, null]
}`' />

```vue
<template>
  <JsonViewer
    :data="{
      fruits: ['apple', 'banana', 'orange'],
      numbers: [1, 2, 3, 4, 5],
      mixed: [1, 'two', true, null],
    }"
  />
</template>
```

## API Response

A very common use case — display a fetched response:

<Demo controls :json='`{
  "status": 200,
  "success": true,
  "data": {
    "users": [
      { "id": 1, "name": "Alice Johnson", "role": "admin" },
      { "id": 2, "name": "Bob Smith", "role": "user" }
    ],
    "pagination": { "page": 1, "limit": 10, "total": 2, "hasMore": false }
  },
  "meta": { "requestId": "req_abc123" }
}`' />

```vue
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';
  import type { JsonValue } from '@anilkumarthakur/vue3-json-viewer';

  const apiData = ref<JsonValue>(null);

  onMounted(async () => {
    const res = await fetch('https://api.example.com/users');
    apiData.value = await res.json();
  });
</script>

<template>
  <JsonViewer
    v-if="apiData"
    :data="apiData"
    :dark-mode="true"
  />
</template>
```

## Configuration Object

<Demo :json='`{
  "app": { "name": "My Application", "version": "1.0.0", "environment": "production" },
  "server": { "host": "localhost", "port": 3000, "ssl": true },
  "features": { "darkMode": true, "notifications": true, "analytics": false }
}`' />
