# Events & Persistence

Two things people often get wrong about expand/collapse — both handled here.

## State Persists Automatically

Expand a nested node, collapse its parent, then expand the parent again. The
nested node keeps the state you left it in — nothing resets. This works out of
the box, no code required.

<Demo controls :json='`{
  "level1": {
    "level2": {
      "level3": { "deep": "expand me, then collapse level1 and reopen it" }
    }
  },
  "sibling": { "untouched": true }
}`' />

## Reacting to Toggles

Listen to `@toggle` to mirror interaction into your own state — here into a
live log:

<Demo controls events :json='`{
  "order": { "id": 1001, "items": ["book", "pen"] },
  "customer": { "name": "Ada", "vip": true }
}`' />

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';
  import type { ToggleEventPayload } from '@anilkumarthakur/vue3-json-viewer';

  const data = {
    order: { id: 1001, items: ['book', 'pen'] },
    customer: { name: 'Ada', vip: true },
  };

  const onToggle = (e: ToggleEventPayload) => {
    console.log(e.expanded ? 'expanded' : 'collapsed', e.path);
  };
</script>

<template>
  <JsonViewer
    :data="data"
    @toggle="onToggle"
  />
</template>
```

## Persisting Across Reloads

Save toggle state to `localStorage` and restore it on the next visit:

```vue
<script setup lang="ts">
  import { reactive } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';
  import type { ToggleEventPayload } from '@anilkumarthakur/vue3-json-viewer';

  const KEY = 'jv-expand-state';
  const state = reactive<Record<string, boolean>>(
    JSON.parse(localStorage.getItem(KEY) ?? '{}'),
  );

  const data = {
    /* … */
  };

  const onToggle = (e: ToggleEventPayload) => {
    state[e.path] = e.expanded;
    localStorage.setItem(KEY, JSON.stringify(state));
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

`@copy` fires only on a successful clipboard write:

```vue
<script setup lang="ts">
  import type { CopyEventPayload } from '@anilkumarthakur/vue3-json-viewer';

  const onCopy = (e: CopyEventPayload) => {
    console.log('copied', e.path, e.value);
  };
</script>

<template>
  <JsonViewer :data="data" @copy="onCopy" />
</template>
```
