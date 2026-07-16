# Events

`JsonViewer` emits two events. Both payloads are exported as TypeScript types.

| Event    | Payload type                                | Fired when                      |
| -------- | ------------------------------------------- | ------------------------------- |
| `toggle` | [`ToggleEventPayload`](#toggleeventpayload) | a node is expanded or collapsed |
| `copy`   | [`CopyEventPayload`](#copyeventpayload)     | a node's value is copied        |

## `toggle`

Emitted when a user toggles an individual node (clicking its key, brackets,
type badge, or count label).

::: warning Expand All / Collapse All don't emit
The root "Expand All" / "Collapse All" controls reset the shared baseline in one
operation and do **not** emit a `toggle` for each node. Listen to those buttons
separately if you need to react to them.
:::

```ts
interface ToggleEventPayload {
  /** JSONPath-style path of the toggled node, e.g. `$.address` or `$.items[0]`. */
  path: string;
  /** Key/index of the toggled node within its parent (`''` for the root). */
  key: string;
  /** The node's new expanded state. */
  expanded: boolean;
}
```

```vue
<JsonViewer :data="data" @toggle="onToggle" />
```

```ts
function onToggle(payload: ToggleEventPayload) {
  // { path: '$.address', key: 'address', expanded: false }
}
```

## `copy`

Emitted **only after** a value is successfully written to the clipboard.

```ts
interface CopyEventPayload {
  /** JSONPath-style path of the copied node. */
  path: string;
  /** Key/index of the copied node within its parent (`''` for the root). */
  key: string;
  /** The copied value (the same reference shown in the tree). */
  value: JsonValue;
}
```

```vue
<JsonViewer :data="data" @copy="onCopy" />
```

```ts
function onCopy(payload: CopyEventPayload) {
  // { path: '$.user.email', key: 'email', value: 'ada@example.com' }
}
```

## The `path` Format

`path` is a stable, unique JSONPath-style identifier:

| Node                          | `path`             |
| ----------------------------- | ------------------ |
| Root                          | `$`                |
| Object key `address`          | `$.address`        |
| Nested key `city`             | `$.address.city`   |
| Array item at index 0         | `$.items[0]`       |
| Non-identifier key `order.id` | `$["order.id"]`    |

Identifier-safe keys use dot notation; any other key is bracket-quoted so a key
containing a `.` can never be confused with a nested path.

## Typed Emits Interface

The combined emits signature is exported as `JsonViewerEmits`:

```ts
import type {
  JsonViewerEmits,
  ToggleEventPayload,
  CopyEventPayload,
} from '@anilkumarthakur/vue3-json-viewer';

interface JsonViewerEmits {
  (event: 'toggle', payload: ToggleEventPayload): void;
  (event: 'copy', payload: CopyEventPayload): void;
}
```

## Live Example

<Demo controls events :json='`{
  "id": 1,
  "user": { "name": "Ada", "email": "ada@example.com" },
  "tags": ["vue", "json"]
}`' />

## Notes

- The `toggle` event fires only for the specific node a user toggles. "Expand
  All" / "Collapse All" reset the shared baseline and clear per-node overrides
  in a single operation — they do **not** emit a `toggle` per node.
- `copy` does not fire on failure (e.g. a circular value that can't be
  serialized). See [Copy to Clipboard](/guide/copy).
