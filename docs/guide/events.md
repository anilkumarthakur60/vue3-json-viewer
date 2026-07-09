# Events

`JsonViewer` emits two typed events so you can observe interaction and, if you
want, persist or synchronize view state in your own store.

| Event     | Fired when                          | Payload                                            |
| --------- | ----------------------------------- | -------------------------------------------------- |
| `toggle`  | a node is expanded or collapsed     | `{ path: string; key: string; expanded: boolean }` |
| `copy`    | a node's value is copied            | `{ path: string; key: string; value: JsonValue }`  |

See the [Events API reference](/api/events) for full payload details.

## Listening for Events

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';
  import type {
    ToggleEventPayload,
    CopyEventPayload,
  } from '@anilkumarthakur/vue3-json-viewer';

  const data = { user: { name: 'Ada', roles: ['admin'] } };

  const onToggle = (e: ToggleEventPayload) => {
    console.log(`${e.expanded ? 'expanded' : 'collapsed'} ${e.path}`);
  };

  const onCopy = (e: CopyEventPayload) => {
    console.log(`copied ${e.path}`, e.value);
  };
</script>

<template>
  <JsonViewer
    :data="data"
    @toggle="onToggle"
    @copy="onCopy"
  />
</template>
```

Try it — the log below updates as you toggle nodes and copy values:

<Demo controls events :json='`{
  "user": { "name": "Ada", "roles": ["admin", "editor"] },
  "settings": { "theme": "dark", "beta": true }
}`' />

## Understanding `path`

Every node has a stable, JSONPath-style `path` that uniquely identifies it in
the tree:

- The root is `$`.
- Object keys use dot notation: `$.user.name`.
- Keys that aren't plain identifiers are bracket-quoted: `$["order.id"]`.
- Array items use bracket-index notation: `$.user.roles[0]`.

Because the path is unique and stable, it's the ideal key for storing view
state (see below).

## Persisting Expand/Collapse State

Expand/collapse state already **persists across collapse/re-expand within a
single `JsonViewer` instance** — you don't need events for that (see
[Expand & Collapse](/guide/expand-collapse)).

Use the `toggle` event when you want state to survive something bigger — a route
change, a remount, or a page reload — by recording it yourself:

```vue
<script setup lang="ts">
  import { reactive } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';
  import type { ToggleEventPayload } from '@anilkumarthakur/vue3-json-viewer';

  // Restore any previously-saved state.
  const collapsedPaths = reactive<Record<string, boolean>>(
    JSON.parse(localStorage.getItem('jv-state') ?? '{}'),
  );

  const data = {
    /* … */
  };

  const onToggle = (e: ToggleEventPayload) => {
    collapsedPaths[e.path] = e.expanded;
    localStorage.setItem('jv-state', JSON.stringify(collapsedPaths));
  };
</script>

<template>
  <JsonViewer
    :data="data"
    @toggle="onToggle"
  />
</template>
```

## Auditing Copies

The `copy` event is handy for analytics or to show a toast:

```vue
<script setup lang="ts">
  import type { CopyEventPayload } from '@anilkumarthakur/vue3-json-viewer';

  const onCopy = (e: CopyEventPayload) => {
    // e.g. show a notification
    console.log(`Copied ${e.key || 'root'} (${e.path})`);
  };
</script>
```

::: tip Copy only fires on success
The `copy` event is emitted **only after the value is actually written** to the
clipboard. If the copy fails, no event is emitted. See
[Copy to Clipboard](/guide/copy).
:::
