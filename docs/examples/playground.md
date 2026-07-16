---
title: Playground
---

# Playground

Edit the JSON below and tweak the options — the viewer updates live. Everything
on this page runs the real `@anilkumarthakur/vue3-json-viewer` component, and
the event log shows the `@toggle` / `@copy` events as you interact.

<Demo editable controls events />

## Source

```vue
<script setup lang="ts">
  import { ref, shallowRef } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';
  import type {
    ToggleEventPayload,
    CopyEventPayload,
  } from '@anilkumarthakur/vue3-json-viewer';

  const darkMode = ref(true);
  const expanded = ref(true);
  const data = shallowRef({ name: 'Vue3 JSON Viewer', version: '0.6.0' });

  const onToggle = (e: ToggleEventPayload) => console.log('toggle', e);
  const onCopy = (e: CopyEventPayload) => console.log('copy', e);
</script>

<template>
  <JsonViewer
    :data="data"
    :dark-mode="darkMode"
    :expanded="expanded"
    @toggle="onToggle"
    @copy="onCopy"
  />
</template>
```
