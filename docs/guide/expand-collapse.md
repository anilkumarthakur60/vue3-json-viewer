# Expand/Collapse

Vue3 JSON Viewer provides multiple ways to control the expand/collapse state of objects and arrays.

## Initial State

Control the initial expanded state with the `expanded` prop:

```vue
<!-- Start expanded (default) -->
<JsonViewer :data="data" :expanded="true" />

<!-- Start collapsed -->
<JsonViewer :data="data" :expanded="false" />
```

## Interactive Controls

### Built-in Expand/Collapse All Buttons

At the root level, the component shows "Expand All" and "Collapse All" buttons:

```vue
<JsonViewer :data="data" />
<!-- Buttons appear automatically for objects and arrays -->
```

### Click Interactions

Users can click on multiple elements to toggle expand/collapse:

1. **Keys**: Click on property names (e.g., `"hobbies"`)
2. **Brackets**: Click on `{...}` or `[...]`
3. **Count badges**: Click on "3 keys" or "5 items"
4. **Type badges**: Click on `obj` or array count badges

## Programmatic Control

Control expand/collapse state from your component:

```vue
<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const isExpanded = ref(true);

  const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value;
  };

  // Use computed key to force re-render
  const viewerKey = computed(() =>
    isExpanded.value ? 'expanded' : 'collapsed',
  );
</script>

<template>
  <button @click="toggleExpanded">
    {{ isExpanded ? 'Collapse All' : 'Expand All' }}
  </button>

  <JsonViewer
    :data="data"
    :expanded="isExpanded"
    :key="viewerKey"
  />
</template>
```

## Visual Indicators

### Collapsed State

When collapsed, objects and arrays show:

- **Objects**: `{...}` with count badge (e.g., "3 keys")
- **Arrays**: `[...]` with count badge (e.g., "5 items")

### Expanded State

When expanded:

- **Objects**: Opening `{`, nested content, closing `}`
- **Arrays**: Opening `[`, array items, closing `]`

## Type Badges

The component shows type badges for quick identification:

| Type        | Badge   | Example             |
| ----------- | ------- | ------------------- |
| Object      | `obj`   | `"user": obj {...}` |
| Array       | Count   | `"items": 5 [...]`  |
| Empty Array | `empty` | `"list": empty []`  |

## Example: Toggle Control

```vue
<script setup lang="ts">
  import { ref } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const data = {
    users: [
      { id: 1, name: 'Alice', role: 'admin' },
      { id: 2, name: 'Bob', role: 'user' },
    ],
    settings: {
      theme: 'dark',
      notifications: {
        email: true,
        push: false,
      },
    },
  };

  const expanded = ref(true);
</script>

<template>
  <div class="toolbar">
    <button @click="expanded = true">📂 Expand All</button>
    <button @click="expanded = false">📁 Collapse All</button>
  </div>

  <JsonViewer
    :data="data"
    :expanded="expanded"
    :darkMode="true"
    :key="String(expanded)"
  />
</template>
```

## Tips

::: tip Key Prop for Re-rendering
When programmatically changing `expanded`, add a `:key` binding to force a complete re-render of the component tree.
:::

::: tip Performance
For very large JSON structures, consider starting with `expanded="false"` to improve initial render performance.
:::
