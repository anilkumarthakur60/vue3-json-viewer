# Large JSON

Tips and patterns for large structures.

## Start Collapsed

::: tip Performance
Collapsed subtrees aren't rendered at all, so for large payloads start with
`:expanded="false"` for a fast initial paint.
:::

```vue
<JsonViewer :data="largeData" :expanded="false" />
```

<Demo controls :expanded="false" :json='`{
  "total": 3,
  "users": [
    { "id": 1, "name": "User 1", "email": "user1@example.com", "meta": { "loginCount": 12 } },
    { "id": 2, "name": "User 2", "email": "user2@example.com", "meta": { "loginCount": 34 } },
    { "id": 3, "name": "User 3", "email": "user3@example.com", "meta": { "loginCount": 7 } }
  ]
}`' />

## Generating a Large Dataset

```vue
<script setup lang="ts">
  import { ref } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const generateUsers = (count: number) =>
    Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      isActive: i % 3 !== 0,
      meta: { loginCount: (i * 7) % 100 },
    }));

  const largeData = ref({ total: 100, users: generateUsers(100) });
  const isExpanded = ref(false);
</script>

<template>
  <button @click="isExpanded = !isExpanded">
    {{ isExpanded ? 'Collapse All' : 'Expand All' }}
  </button>

  <!-- No :key needed — expanded is reactive and state persists -->
  <JsonViewer
    :data="largeData"
    :dark-mode="true"
    :expanded="isExpanded"
  />
</template>
```

## Paginating Very Large Data

There is no built-in virtualization. For thousands of rows, paginate the data
yourself and show one page at a time:

```vue
<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const all = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    value: `Item ${i + 1}`,
  }));

  const page = ref(1);
  const pageSize = 20;

  const pageData = computed(() => {
    const start = (page.value - 1) * pageSize;
    return {
      page: page.value,
      totalPages: Math.ceil(all.length / pageSize),
      items: all.slice(start, start + pageSize),
    };
  });
</script>

<template>
  <div>
    <button
      @click="page--"
      :disabled="page === 1"
    >
      Previous
    </button>
    <button
      @click="page++"
      :disabled="page >= Math.ceil(all.length / pageSize)"
    >
      Next
    </button>
  </div>
  <JsonViewer
    :data="pageData"
    :dark-mode="true"
  />
</template>
```

## Memory Considerations

::: warning Very large files
For JSON larger than ~1 MB, consider:

1. Starting collapsed with `:expanded="false"`.
2. Server-side pagination.
3. Lazy-loading portions of the data.
   :::
