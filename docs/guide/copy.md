# Copy to Clipboard

Every node has a copy button that copies its value as formatted JSON.

## How It Works

Hover over any row to reveal the copy button, then click it. The value is
serialized with `JSON.stringify(value, null, 2)` and written to the clipboard.

<Demo :json='`{
  "user": { "name": "Ada", "email": "ada@example.com" },
  "roles": ["admin", "editor"]
}`' />

## Visual Feedback

1. **Before copy** — a clipboard icon.
2. **After a successful copy** — a checkmark ✓.
3. **Auto-reset** — back to the clipboard icon after 1.5 seconds.

The icon changes **only when the copy actually succeeds**.

## Robust by Default

Copying is designed never to throw and to work in as many environments as
possible:

- Uses the async **Clipboard API** (`navigator.clipboard.writeText`) when
  available.
- Falls back to `document.execCommand('copy')` when the Clipboard API is
  missing or rejects — so it also works in **non-secure (`http://`) contexts**
  and older browsers.
- If the value can't be serialized (for example a **circular reference**), the
  copy fails gracefully: no icon change, no `copy` event, no thrown error.

## The `copy` Event

A successful copy emits a typed [`copy` event](/api/events) so you can audit or
react to it:

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';
  import type { CopyEventPayload } from '@anilkumarthakur/vue3-json-viewer';

  const data = { name: 'John Doe', age: 30 };

  const onCopy = (e: CopyEventPayload) => {
    // { path: '$.name', key: 'name', value: 'John Doe' }
    console.log('copied', e.path, e.value);
  };
</script>

<template>
  <JsonViewer
    :data="data"
    @copy="onCopy"
  />
</template>
```

## What Gets Copied

| Node       | Clipboard contents               |
| ---------- | -------------------------------- |
| Object     | the object, pretty-printed       |
| Array      | the array, pretty-printed        |
| String     | `"Hello World"`                  |
| Number     | `42`                             |
| Boolean    | `true`                           |

Values that `JSON.stringify` drops (like `undefined` or functions at the top
level) fall back to their `String()` form.

## Styling the Copy Button

The button uses the `jv-copy-btn` class (with `jv-copy-btn-dark` /
`jv-copy-btn-light` variants). It's hidden until you hover the row — to always
show it:

```css
.jv-copy-btn {
  opacity: 0.4 !important;
}
.jv-copy-btn:hover {
  opacity: 1 !important;
}
```

See [Custom Styling](/guide/styling) for the full class reference.
