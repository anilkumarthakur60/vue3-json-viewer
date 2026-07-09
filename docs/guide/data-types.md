# Data Types

`JsonViewer` renders far more than plain JSON. It understands every JavaScript
value you are likely to inspect while debugging — including `Date`, `RegExp`,
`undefined`, and functions — and gives each its own color and formatting.

## Supported Types

| Value            | Rendered as                    | Dark color | Light color |
| ---------------- | ------------------------------ | ---------- | ----------- |
| `string`         | `"value"` (quoted)             | Green      | Green       |
| `number`         | `42`, `-2.75`                  | Peach      | Orange      |
| `boolean`        | `true` / `false`               | Yellow     | Amber       |
| `null`           | `null` (italic)                | Pink       | Red         |
| `undefined`      | `undefined` (italic)           | Pink       | Red         |
| `Date`           | ISO string, e.g. `"2024-…Z"`   | Teal       | Teal        |
| `RegExp`         | `/pattern/flags`               | Purple     | Purple      |
| `function`       | its `toString()`               | Default    | Default     |
| `object`         | expandable `{ … }` with badge  | Pink key   | Pink key    |
| `array`          | expandable `[ … ]` with count  | Blue key   | Blue key    |

## Live Example

Every supported type in one object:

<Demo controls :json='`{
  "string": "hello world",
  "number": 42,
  "float": -2.757,
  "booleanTrue": true,
  "booleanFalse": false,
  "nullValue": null,
  "emptyString": "",
  "emptyArray": [],
  "emptyObject": {},
  "array": [1, 2, 3],
  "nested": { "a": { "b": "deep" } }
}`' />

## How Values Are Formatted

The formatting logic is deterministic:

- **Strings** are wrapped in double quotes: `"John"`.
- **Dates** are serialized with `.toISOString()` and quoted.
- **RegExp** uses its literal form, e.g. `/[0-9]/gi`.
- **`null` and `undefined`** are shown in italics to distinguish "empty" from a
  real value.
- **Functions** display their source via `String(fn)`.

```ts
// Excerpt of the formatting rules
formatValue(null); // "null"
formatValue(undefined); // "undefined"
formatValue('hi'); // "\"hi\""
formatValue(new Date('2024-01-01')); // "\"2024-01-01T00:00:00.000Z\""
formatValue(/[a-z]+/gi); // "/[a-z]+/gi"
```

## Empty Containers

Empty objects and arrays are shown inline and are **not** expandable (there is
nothing to expand):

- Empty object → `obj {}`
- Empty array → `empty []`

## Containers & Badges

Objects and arrays are expandable and carry a small type badge plus a size
label when collapsed:

| Type        | Badge   | Collapsed example    |
| ----------- | ------- | -------------------- |
| Object      | `obj`   | `"user": obj {...} 3 keys`  |
| Array       | count   | `"items": 5 [...] 5 items`  |
| Empty array | `empty` | `"list": empty []`   |

::: tip Non-plain objects
Values like `Map`, `Set`, or class instances are treated as plain objects and
enumerated with `Object.entries()`. For predictable output, convert them to
plain objects/arrays before passing them in.
:::

## TypeScript

The full value type is exported as [`JsonValue`](/api/types#jsonvalue):

```ts
import type { JsonValue } from '@anilkumarthakur/vue3-json-viewer';

const data: JsonValue = {
  createdAt: new Date(),
  pattern: /[0-9]+/,
  tags: ['a', 'b'],
};
```
