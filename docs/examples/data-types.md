# Data Types

A live tour of every value type the viewer renders. See the
[Data Types guide](/guide/data-types) for the formatting rules.

## Every Type at Once

<Demo controls :json='`{
  "string": "hello world",
  "emptyString": "",
  "integer": 42,
  "float": -2.757,
  "zero": 0,
  "booleanTrue": true,
  "booleanFalse": false,
  "nullValue": null,
  "array": [1, 2, 3, "four", true],
  "emptyArray": [],
  "object": { "nested": "value" },
  "emptyObject": {},
  "deep": { "a": { "b": { "c": "three levels" } } }
}`' />

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const data = {
    string: 'hello world',
    integer: 42,
    float: -2.757,
    booleanTrue: true,
    nullValue: null,
    array: [1, 2, 3, 'four', true],
    object: { nested: 'value' },
    // Also supported at runtime (not valid in a JSON string):
    // currentDate: new Date(),
    // pattern: /[0-9]+/gi,
    // fn: () => 'hi',
  };
</script>

<template>
  <JsonViewer :data="data" />
</template>
```

## Special JavaScript Types

`Date`, `RegExp`, `undefined`, and functions can't be expressed in a JSON
string, but the component renders them at runtime:

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const data = {
    createdAt: new Date('2024-01-01T00:00:00Z'), // → "2024-01-01T00:00:00.000Z"
    pattern: /[a-z]+/gi, // → /[a-z]+/gi
    missing: undefined, // → undefined (italic)
    handler: function greet() {
      return 'hi';
    },
  };
</script>

<template>
  <JsonViewer :data="data" />
</template>
```

## Arrays of Objects

<Demo :json='`[
  { "id": 1, "name": "Alice", "active": true },
  { "id": 2, "name": "Bob", "active": false },
  { "id": 3, "name": "Carol", "active": true }
]`' />

## Primitive at the Root

The root can be a primitive, not just an object or array:

<Demo :json='`"Just a string at the root"`' />
