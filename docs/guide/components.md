# Components

The package exports two components. In almost all cases you want `JsonViewer`.

| Export       | Use it for                                                 |
| ------------ | ---------------------------------------------------------- |
| `JsonViewer` | The component you render. Owns the shared view state and emits events. |
| `JsonNode`   | The recursive building block. Exported for advanced/standalone use.    |

Both are also registered globally by the [plugin](/api/plugin).

## `JsonViewer`

This is the public component. It:

- accepts your [props](/api/props) (`data`, `darkMode`, `expanded`, …),
- owns the shared expand/collapse store for the whole tree,
- emits the [`toggle` and `copy` events](/api/events).

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const data = { hello: 'world' };
</script>

<template>
  <JsonViewer :data="data" />
</template>
```

## `JsonNode`

`JsonNode` is the recursive renderer that `JsonViewer` uses internally. It is
exported so you can use it directly in advanced scenarios, but note:

- When rendered **without** a `JsonViewer` ancestor, the root `JsonNode`
  creates its own internal expand/collapse store, so state still persists.
- It does **not** emit the `toggle` / `copy` events — those are surfaced by
  `JsonViewer`. If you need events, use `JsonViewer`.

```vue
<script setup lang="ts">
  import { JsonNode } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const data = { standalone: true, items: [1, 2, 3] };
</script>

<template>
  <JsonNode :data="data" />
</template>
```

<Demo :json='`{ "renderedWith": "JsonViewer", "items": [1, 2, 3] }`' />

::: tip Prefer `JsonViewer`
Unless you have a specific reason to reach for `JsonNode`, use `JsonViewer`.
It gives you the events and is the supported public surface.
:::

## Internal Props

Both components accept `level` and `parentKey` props that exist for the
recursion and are documented as [internal](/api/props#internal-props). You
normally never set them.
