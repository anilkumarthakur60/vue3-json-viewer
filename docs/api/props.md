# Props

Complete reference for all JsonViewer component props.

## JsonViewer Props

| Prop        | Type        | Default  | Description                          |
| ----------- | ----------- | -------- | ------------------------------------ |
| `data`      | `JsonValue` | Required | The JSON data to display             |
| `darkMode`  | `boolean`   | `true`   | Enable dark mode theme               |
| `expanded`  | `boolean`   | `true`   | Initial expanded state for all nodes |
| `level`     | `number`    | `0`      | Nesting level (used internally)      |
| `parentKey` | `string`    | `''`     | Parent key name (used internally)    |

## Detailed Prop Descriptions

### data

The JSON data to visualize. Accepts any valid JSON value.

```ts
type JsonValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | RegExp
  | JsonObject
  | JsonArray;
```

**Examples:**

```vue
<!-- Object -->
<JsonViewer :data="{ name: 'John', age: 30 }" />

<!-- Array -->
<JsonViewer :data="[1, 2, 3]" />

<!-- Primitive -->
<JsonViewer :data="'Hello World'" />

<!-- Complex nested data -->
<JsonViewer :data="complexApiResponse" />
```

### darkMode

Controls the color theme of the viewer.

- `true` (default): Dark theme with gradient background
- `false`: Light theme with clean background

```vue
<!-- Dark mode (default) -->
<JsonViewer :data="data" :darkMode="true" />

<!-- Light mode -->
<JsonViewer :data="data" :darkMode="false" />

<!-- Reactive -->
<JsonViewer :data="data" :darkMode="isDarkMode" />
```

### expanded

Controls the initial expand/collapse state of all objects and arrays.

- `true` (default): All nodes start expanded
- `false`: All nodes start collapsed

```vue
<!-- Expanded (default) -->
<JsonViewer :data="data" :expanded="true" />

<!-- Collapsed -->
<JsonViewer :data="data" :expanded="false" />

<!-- Reactive with key for re-render -->
<JsonViewer :data="data" :expanded="isExpanded" :key="String(isExpanded)" />
```

### level

::: warning Internal Use
This prop is used internally for recursion. You typically don't need to set this.
:::

The current nesting depth. Used for:

- Rainbow bracket colors
- Determining root level controls

```vue
<!-- Default, starts at root -->
<JsonViewer :data="data" :level="0" />
```

### parentKey

::: warning Internal Use
This prop is used internally for recursion. You typically don't need to set this.
:::

The property name of the current node in its parent object.

## TypeScript Interface

```ts
interface JsonViewerProps {
  /**
   * The JSON data to display
   */
  data: JsonValue;

  /**
   * Enable dark mode theme
   * @default true
   */
  darkMode?: boolean;

  /**
   * Initial expanded state for all nodes
   * @default true
   */
  expanded?: boolean;

  /**
   * Nesting level (internal use)
   * @default 0
   */
  level?: number;

  /**
   * Parent key name (internal use)
   * @default ''
   */
  parentKey?: string | number;
}
```

## Usage Examples

### Basic Usage

```vue
<JsonViewer :data="myData" />
```

### With All Props

```vue
<JsonViewer :data="jsonData" :darkMode="true" :expanded="true" :level="0" />
```

### Reactive Props

```vue
<script setup lang="ts">
  import { ref } from 'vue';

  const isDark = ref(true);
  const isExpanded = ref(true);
  const data = ref({ hello: 'world' });
</script>

<template>
  <JsonViewer
    :data="data"
    :darkMode="isDark"
    :expanded="isExpanded"
    :key="`${isDark}-${isExpanded}`"
  />
</template>
```
