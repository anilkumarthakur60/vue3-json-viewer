# Props

Complete reference for the `JsonViewer` (and `JsonNode`) props.

## Overview

| Prop        | Type              | Default    | Description                          |
| ----------- | ----------------- | ---------- | ------------------------------------ |
| `data`      | `JsonValue`       | `{}`       | The value to display                 |
| `darkMode`  | `boolean`         | `true`     | Use the dark theme                   |
| `expanded`  | `boolean`         | `true`     | Initial expanded state for all nodes |
| `level`     | `number`          | `0`        | Nesting level (internal)             |
| `parentKey` | `string \| number`| `''`       | Parent key name (internal)           |

For events, see the [Events reference](/api/events).

## `data`

The value to visualize. Accepts any [`JsonValue`](/api/types#jsonvalue) —
objects, arrays, primitives, `Date`, `RegExp`, and functions.

```ts
type JsonValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | RegExp
  | ((...args: unknown[]) => unknown)
  | JsonObject
  | JsonArray;
```

```vue
<!-- Object -->
<JsonViewer :data="{ name: 'John', age: 30 }" />

<!-- Array -->
<JsonViewer :data="[1, 2, 3]" />

<!-- Primitive -->
<JsonViewer :data="'Hello World'" />
```

## `darkMode`

Controls the theme. `true` (default) = dark, `false` = light.

```vue
<JsonViewer :data="data" :dark-mode="true" />
<JsonViewer :data="data" :dark-mode="false" />
<JsonViewer :data="data" :dark-mode="isDarkMode" />
```

## `expanded`

Initial expand/collapse state for all nodes. `true` (default) = expanded,
`false` = collapsed. The prop is **reactive** — changing it re-seeds the tree.

```vue
<JsonViewer :data="data" :expanded="true" />
<JsonViewer :data="data" :expanded="false" />

<!-- Reactive — no :key needed -->
<JsonViewer :data="data" :expanded="isExpanded" />
```

::: warning No `:key` workaround
Don't add `:key="String(isExpanded)"`. It was an old workaround for a fixed bug
and it discards the [persistent expand state](/guide/expand-collapse). Just bind
`:expanded`.
:::

## Internal Props

These exist for the internal recursion. You normally never set them.

### `level`

::: warning Internal Use
Used internally for recursion.
:::

The current nesting depth. Drives rainbow bracket colors and whether the root
controls render (`level === 0`).

### `parentKey`

::: warning Internal Use
Used internally for recursion.
:::

The property name/index of the current node within its parent.

## TypeScript Interface

```ts
interface JsonViewerProps {
  /** The JSON data to display */
  data: JsonValue;
  /** Enable dark mode theme @default true */
  darkMode?: boolean;
  /** Initial expanded state for all nodes @default true */
  expanded?: boolean;
  /** Nesting level (internal use) @default 0 */
  level?: number;
  /** Parent key name (internal use) @default '' */
  parentKey?: string | number;
}
```

## Reactive Example

```vue
<script setup lang="ts">
  import { ref } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const isDark = ref(true);
  const isExpanded = ref(true);
  const data = ref({ hello: 'world' });
</script>

<template>
  <JsonViewer
    :data="data"
    :dark-mode="isDark"
    :expanded="isExpanded"
  />
</template>
```
