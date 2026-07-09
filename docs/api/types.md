# Types

All TypeScript types exported by Vue3 JSON Viewer.

## Importing Types

```ts
import type {
  // Props
  JsonViewerProps,
  JsonNodeProps,
  // Events
  JsonViewerEmits,
  ToggleEventPayload,
  CopyEventPayload,
  // Values
  JsonValue,
  JsonPrimitive,
  JsonObject,
  JsonArray,
  ContainerKind,
  // Theme
  ThemeColors,
  JsonViewerTheme,
} from '@anilkumarthakur/vue3-json-viewer';
```

## Props Types

### JsonViewerProps

Props for the `JsonViewer` component.

```ts
interface JsonViewerProps {
  data: JsonValue;
  level?: number; // internal, @default 0
  parentKey?: string | number; // internal, @default ''
  darkMode?: boolean; // @default true
  expanded?: boolean; // @default true
}
```

### JsonNodeProps

Props for the internal recursive `JsonNode` component. Extends
`JsonViewerProps`.

```ts
interface JsonNodeProps extends JsonViewerProps {
  /** Whether this node is an array item (hides the key) @default false */
  isArrayItem?: boolean;
  /** Whether this is the last item in its parent @default true */
  isLast?: boolean;
  /** Unique JSONPath-style path, e.g. `$.address.city` @default '$' */
  path?: string;
}
```

## Event Types

### ToggleEventPayload

```ts
interface ToggleEventPayload {
  /** JSONPath-style path of the toggled node */
  path: string;
  /** Key/index within the parent */
  key: string;
  /** New expanded state */
  expanded: boolean;
}
```

### CopyEventPayload

```ts
interface CopyEventPayload {
  /** JSONPath-style path of the copied node */
  path: string;
  /** Key/index within the parent */
  key: string;
  /** The copied value */
  value: JsonValue;
}
```

### JsonViewerEmits

```ts
interface JsonViewerEmits {
  (event: 'toggle', payload: ToggleEventPayload): void;
  (event: 'copy', payload: CopyEventPayload): void;
}
```

## Value Types

### JsonPrimitive

```ts
type JsonPrimitive = string | number | boolean | null | undefined;
```

### JsonObject

```ts
interface JsonObject {
  [key: string]: JsonValue;
}
```

### JsonArray

```ts
type JsonArray = JsonValue[];
```

### JsonValue

The union of everything the viewer can render.

```ts
type JsonValue =
  | JsonPrimitive
  | JsonObject
  | JsonArray
  | Date
  | RegExp
  | ((...args: unknown[]) => unknown);
```

### ContainerKind

Discriminates the two expandable container types.

```ts
type ContainerKind = 'object' | 'array';
```

## Theme Types

These describe the shape of the built-in palettes. They are exported for
reference; there is currently no prop to inject a custom theme (see
[Custom Styling](/guide/styling)).

### ThemeColors

```ts
interface ThemeColors {
  background: string;
  text: string;
  string: string;
  number: string;
  boolean: string;
  null: string;
  date: string;
  regexp: string;
  objectKey: string;
  arrayKey: string;
  bracket: string;
}
```

### JsonViewerTheme

```ts
interface JsonViewerTheme {
  dark: ThemeColors;
  light: ThemeColors;
}
```

## Usage Examples

### Typed Data

```ts
import type { JsonValue } from '@anilkumarthakur/vue3-json-viewer';

const data: JsonValue = {
  users: [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ],
  count: 2,
  fetchedAt: new Date(),
};
```

### Typed Event Handlers

```ts
import type {
  ToggleEventPayload,
  CopyEventPayload,
} from '@anilkumarthakur/vue3-json-viewer';

const onToggle = (e: ToggleEventPayload) => console.log(e.path, e.expanded);
const onCopy = (e: CopyEventPayload) => console.log(e.path, e.value);
```
