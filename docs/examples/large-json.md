# Large JSON

Tips and examples for handling large JSON structures.

## Performance Tips

::: tip Start Collapsed
For large JSON files, use `expanded="false"` to improve initial render time.
:::

```vue
<JsonViewer :data="largeData" :expanded="false" />
```

## Large Array Example

```vue
<script setup lang="ts">
  import { ref } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  // Generate large dataset
  const generateUsers = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      age: Math.floor(Math.random() * 50) + 18,
      isActive: Math.random() > 0.3,
      createdAt: new Date(
        Date.now() - Math.random() * 10000000000,
      ).toISOString(),
      metadata: {
        lastLogin: new Date().toISOString(),
        loginCount: Math.floor(Math.random() * 100),
      },
    }));
  };

  const largeData = ref({
    total: 100,
    users: generateUsers(100),
  });

  const isExpanded = ref(false);
</script>

<template>
  <div>
    <p>Dataset with 100 users</p>
    <button @click="isExpanded = !isExpanded">
      {{ isExpanded ? 'Collapse All' : 'Expand All' }}
    </button>

    <JsonViewer
      :data="largeData"
      :darkMode="true"
      :expanded="isExpanded"
      :key="String(isExpanded)"
    />
  </div>
</template>
```

## Paginated Data

For very large datasets, consider pagination:

```vue
<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const allData = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    value: `Item ${i + 1}`,
  }));

  const page = ref(1);
  const pageSize = 20;

  const paginatedData = computed(() => {
    const start = (page.value - 1) * pageSize;
    return {
      page: page.value,
      pageSize,
      total: allData.length,
      totalPages: Math.ceil(allData.length / pageSize),
      items: allData.slice(start, start + pageSize),
    };
  });

  const nextPage = () => {
    if (page.value < Math.ceil(allData.length / pageSize)) {
      page.value++;
    }
  };

  const prevPage = () => {
    if (page.value > 1) {
      page.value--;
    }
  };
</script>

<template>
  <div>
    <div class="pagination">
      <button
        @click="prevPage"
        :disabled="page === 1"
        >Previous</button
      >
      <span>Page {{ page }} of {{ Math.ceil(allData.length / pageSize) }}</span>
      <button
        @click="nextPage"
        :disabled="page >= Math.ceil(allData.length / pageSize)"
      >
        Next
      </button>
    </div>

    <JsonViewer
      :data="paginatedData"
      :darkMode="true"
    />
  </div>
</template>

<style scoped>
  .pagination {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 16px;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
```

## Complex Nested Structure

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const complexData = {
    company: {
      name: 'TechCorp Inc.',
      founded: 2010,
      departments: {
        engineering: {
          teams: {
            frontend: {
              lead: 'Alice',
              members: ['Bob', 'Charlie', 'Diana'],
              projects: [
                { name: 'Dashboard', status: 'active' },
                { name: 'Mobile App', status: 'planning' },
              ],
            },
            backend: {
              lead: 'Eve',
              members: ['Frank', 'Grace'],
              projects: [
                { name: 'API v2', status: 'active' },
                { name: 'Migration', status: 'completed' },
              ],
            },
            devops: {
              lead: 'Henry',
              members: ['Ivy'],
              infrastructure: {
                cloud: 'AWS',
                containers: 'Kubernetes',
                ci: 'GitHub Actions',
              },
            },
          },
        },
        marketing: {
          campaigns: [
            { name: 'Q1 Launch', budget: 50000 },
            { name: 'Summer Sale', budget: 30000 },
          ],
        },
        hr: {
          openPositions: 15,
          hiring: true,
        },
      },
    },
  };
</script>

<template>
  <JsonViewer
    :data="complexData"
    :darkMode="true"
    :expanded="false"
  />
</template>
```

## API Response with Metadata

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const apiResponse = {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'x-request-id': 'req_abc123xyz',
      'x-ratelimit-remaining': 99,
    },
    data: {
      results: Array.from({ length: 50 }, (_, i) => ({
        id: `item_${i + 1}`,
        title: `Result Item ${i + 1}`,
        score: Math.random().toFixed(4),
        tags: ['tag1', 'tag2', 'tag3'].slice(
          0,
          Math.floor(Math.random() * 3) + 1,
        ),
      })),
      facets: {
        categories: { A: 15, B: 20, C: 15 },
        status: { active: 40, inactive: 10 },
      },
    },
    meta: {
      query: 'search term',
      took: 45,
      total: 50,
      page: 1,
      perPage: 50,
    },
  };
</script>

<template>
  <JsonViewer
    :data="apiResponse"
    :darkMode="true"
    :expanded="false"
  />
</template>
```

## Memory Considerations

::: warning Large Datasets
For JSON files larger than 1MB, consider:

1. Lazy loading portions of the data
2. Virtual scrolling (not built-in)
3. Collapsing by default with `expanded="false"`
4. Server-side pagination
   :::
