# Expand & Collapse

Objects and arrays are collapsible. State is tracked per node and **persists**,
so exploring deep structures never loses your place.

## Initial State

The `expanded` prop sets the starting state for every node:

```vue
<!-- Start expanded (default) -->
<JsonViewer :data="data" :expanded="true" />

<!-- Start collapsed -->
<JsonViewer :data="data" :expanded="false" />
```

## Interactive Controls

### Expand All / Collapse All

For a root object or array, the component shows **Expand All** and **Collapse
All** buttons automatically:

```vue
<JsonViewer :data="data" />
```

### Click to Toggle

Users can toggle a node by clicking any of:

1. the **key** (e.g. `"hobbies"`),
2. the **type indicator** / brackets (`{`, `[…]`),
3. the **count label** (`3 keys`, `5 items`),
4. the **type badge** (`obj`, count).

<Demo controls :json='`{
  "users": [
    { "id": 1, "name": "Alice", "role": "admin" },
    { "id": 2, "name": "Bob", "role": "user" }
  ],
  "settings": { "theme": "dark", "notifications": { "email": true, "push": false } }
}`' />

## State Persists Across Collapse

This is the important part. Expand a nested node, collapse one of its ancestors,
then expand that ancestor again — the nested node is **exactly where you left
it**. Node state is keyed by a stable path and stored above the part of the tree
that unmounts, so collapsing a parent never destroys the state inside it.

::: info Why this matters
In many tree viewers, collapsing a parent throws away all the expand/collapse
state inside it, forcing you to re-drill every time. Here it just works.
:::

## Programmatic Control

Bind `expanded` to a ref. It's reactive — changing it re-seeds the whole tree.

```vue
<script setup lang="ts">
  import { ref } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const expanded = ref(true);
  const data = {
    /* … */
  };
</script>

<template>
  <button @click="expanded = !expanded">
    {{ expanded ? 'Collapse All' : 'Expand All' }}
  </button>

  <JsonViewer
    :data="data"
    :expanded="expanded"
  />
</template>
```

::: warning No `:key` hack needed
Earlier versions of these docs recommended `:key="String(expanded)"` to force a
remount. That was a workaround for a state-loss bug that is now fixed. **Remove
it** — binding `:expanded` is enough, and the `:key` hack would throw away the
persistence described above.
:::

## Reacting to Toggles

To observe or persist toggles, listen to the [`toggle` event](/api/events):

```vue
<JsonViewer :data="data" @toggle="(e) => console.log(e.path, e.expanded)" />
```

See [Events & Persistence](/examples/events) for saving state across reloads.

## Visual Indicators

**Collapsed:**

- Object → `{...}` + count badge (`3 keys`)
- Array → `[...]` + count badge (`5 items`)

**Expanded:**

- Object → `{`, children, `}`
- Array → `[`, items, `]`

## Type Badges

| Type        | Badge   | Collapsed example            |
| ----------- | ------- | ---------------------------- |
| Object      | `obj`   | `"user": obj {...} 3 keys`   |
| Array       | count   | `"items": 5 [...] 5 items`   |
| Empty array | `empty` | `"list": empty []`           |

## Tips

::: tip Large data
For very large JSON, start with `:expanded="false"` — collapsed subtrees aren't
rendered, so the initial paint is much faster. See [Large JSON](/examples/large-json).
:::
