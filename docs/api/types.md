# Types

Complete TypeScript type definitions exported by Vue3 JSON Viewer.

## Importing Types

```ts
import type {
  JsonViewerProps,
  NestedComponentProps,
  JsonValue,
  JsonPrimitive,
  JsonObject,
  JsonArray,
  ThemeColors,
  JsonViewerTheme,
} from '@anilkumarthakur/vue3-json-viewer';
```

## Core Types

### JsonViewerProps

Main props interface for the JsonViewer component.

```ts
interface JsonViewerProps {
  /**
   * The JSON data to display. Can be any valid JSON value.
   */
  data: JsonValue;

  /**
   * The nesting level of the current node
   * @default 0
   */
  level?: number;

  /**
   * The key name of the current property
   * @default ''
   */
  parentKey?: string | number;

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
}
```

### NestedComponentProps

Extended props for the internal recursive component.

```ts
interface NestedComponentProps extends JsonViewerProps {
  /**
   * Whether this node is an array item
   * @default false
   */
  isArrayItem?: boolean;

  /**
   * Whether this is the last item in parent
   * @default true
   */
  isLast?: boolean;
}
```

## JSON Value Types

### JsonPrimitive

Represents any JSON primitive value.

```ts
type JsonPrimitive = string | number | boolean | null | undefined;
```

### JsonObject

Represents a JSON object with string keys.

```ts
interface JsonObject {
  [key: string]: JsonValue;
}
```

### JsonArray

Represents a JSON array.

```ts
type JsonArray = JsonValue[];
```

### JsonValue

Union type representing any valid JSON value.

```ts
type JsonValue =
  | JsonPrimitive
  | JsonObject
  | JsonArray
  | Date
  | RegExp
  | ((...args: unknown[]) => unknown);
```

## Theme Types

### ThemeColors

Color configuration for a single theme.

```ts
interface ThemeColors {
  /** Background color */
  background: string;
  /** Default text color */
  text: string;
  /** Color for string values */
  string: string;
  /** Color for number values */
  number: string;
  /** Color for boolean values */
  boolean: string;
  /** Color for null/undefined values */
  null: string;
  /** Color for date values */
  date: string;
  /** Color for regexp values */
  regexp: string;
  /** Color for object keys */
  objectKey: string;
  /** Color for array keys */
  arrayKey: string;
  /** Color for brackets */
  bracket: string;
}
```

### JsonViewerTheme

Complete theme configuration with dark and light modes.

```ts
interface JsonViewerTheme {
  /** Dark mode color scheme */
  dark: ThemeColors;
  /** Light mode color scheme */
  light: ThemeColors;
}
```

## Utility Types

### IsPlainObject

Type guard to check if a value is a plain object.

```ts
type IsPlainObject<T> = T extends object
  ? T extends Array<unknown>
    ? false
    : T extends Date
      ? false
      : T extends RegExp
        ? false
        : T extends (...args: unknown[]) => unknown
          ? false
          : true
  : false;
```

### JsonKeys

Extract keys from a JSON object type.

```ts
type JsonKeys<T extends JsonObject> = keyof T & string;
```

## Usage Examples

### Type-Safe Data

```ts
import type { JsonObject, JsonValue } from '@anilkumarthakur/vue3-json-viewer';

const userData: JsonObject = {
  name: 'John Doe',
  age: 30,
  isActive: true,
};

const mixedData: JsonValue = {
  users: [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ],
  count: 2,
};
```

### Component Props Typing

```vue
<script setup lang="ts">
  import { ref } from 'vue';
  import type { JsonViewerProps } from '@anilkumarthakur/vue3-json-viewer';

  const props: JsonViewerProps = {
    data: { hello: 'world' },
    darkMode: true,
    expanded: true,
  };
</script>
```

### Creating Typed JSON Structures

```ts
import type { JsonObject, JsonArray } from '@anilkumarthakur/vue3-json-viewer';

interface User extends JsonObject {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse extends JsonObject {
  status: number;
  data: {
    users: User[];
    total: number;
  };
}

const response: ApiResponse = {
  status: 200,
  data: {
    users: [{ id: 1, name: 'Alice', email: 'alice@example.com' }],
    total: 1,
  },
};
```
