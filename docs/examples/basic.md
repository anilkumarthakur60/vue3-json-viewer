# Basic Usage

The simplest way to use Vue3 JSON Viewer.

## Simple Object

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

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const data = {
    fruits: ['apple', 'banana', 'orange'],
    numbers: [1, 2, 3, 4, 5],
    mixed: [1, 'two', true, null],
  };
</script>

<template>
  <JsonViewer :data="data" />
</template>
```

## All Data Types

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const data = {
    // Strings
    name: 'Vue3 JSON Viewer',
    description: 'A beautiful JSON viewer component',

    // Numbers
    version: 0.2,
    downloads: 10000,
    rating: 4.9,

    // Booleans
    isPublished: true,
    isDeprecated: false,

    // Null and undefined
    nullValue: null,
    undefinedValue: undefined,

    // Empty values
    emptyString: '',
    emptyArray: [],
    emptyObject: {},

    // Special types
    currentDate: new Date(),
    pattern: /[a-z]+/gi,

    // Nested structures
    author: {
      name: 'Developer',
      github: 'https://github.com/developer',
    },

    tags: ['vue', 'json', 'viewer', 'typescript'],
  };
</script>

<template>
  <JsonViewer
    :data="data"
    :darkMode="true"
  />
</template>
```

## API Response Example

A typical use case is displaying API responses:

```vue
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const apiData = ref(null);

  // Simulated API response
  const mockApiResponse = {
    status: 200,
    success: true,
    data: {
      users: [
        {
          id: 1,
          name: 'Alice Johnson',
          email: 'alice@example.com',
          role: 'admin',
          createdAt: '2024-01-15T10:30:00Z',
        },
        {
          id: 2,
          name: 'Bob Smith',
          email: 'bob@example.com',
          role: 'user',
          createdAt: '2024-02-20T14:45:00Z',
        },
      ],
      pagination: {
        page: 1,
        limit: 10,
        total: 2,
        hasMore: false,
      },
    },
    meta: {
      requestId: 'req_abc123',
      timestamp: new Date().toISOString(),
    },
  };

  onMounted(() => {
    // Simulate API call
    setTimeout(() => {
      apiData.value = mockApiResponse;
    }, 500);
  });
</script>

<template>
  <div>
    <h2>API Response</h2>
    <div v-if="!apiData">Loading...</div>
    <JsonViewer
      v-else
      :data="apiData"
      :darkMode="true"
    />
  </div>
</template>
```

## Configuration Object

Display application configuration:

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const config = {
    app: {
      name: 'My Application',
      version: '1.0.0',
      environment: 'production',
    },
    server: {
      host: 'localhost',
      port: 3000,
      ssl: true,
    },
    database: {
      type: 'postgresql',
      host: 'db.example.com',
      port: 5432,
      name: 'myapp_production',
    },
    features: {
      darkMode: true,
      notifications: true,
      analytics: false,
    },
  };
</script>

<template>
  <JsonViewer
    :data="config"
    :expanded="true"
  />
</template>
```
