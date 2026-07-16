# Dark / Light Mode

Vue3 JSON Viewer ships two built-in themes. Switch between them with the
`darkMode` prop.

## Basic Usage

```vue
<script setup lang="ts">
  import { ref } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const isDarkMode = ref(true);
  const data = { message: 'Hello World', count: 42, active: true };
</script>

<template>
  <button @click="isDarkMode = !isDarkMode">Toggle Theme</button>
  <JsonViewer
    :data="data"
    :dark-mode="isDarkMode"
  />
</template>
```

Try the toggle:

<Demo controls :json='`{
  "message": "Hello World",
  "count": 42,
  "active": true,
  "nested": { "colors": ["green", "peach", "yellow"] }
}`' />

## Dark Mode (Default)

```vue
<JsonViewer :data="data" :dark-mode="true" />
```

A Catppuccin-inspired palette:

- **Background** — gradient `#1e1e2e → #2d2d3f`
- **Text** — `#cdd6f4`
- **Strings** — `#a6e3a1` · **Numbers** — `#fab387` · **Booleans** — `#f9e2af`
- **Null** — `#f38ba8`

## Light Mode

```vue
<JsonViewer :data="data" :dark-mode="false" />
```

A clean, high-contrast palette:

- **Background** — gradient `#f8f9fa → #e9ecef`
- **Text** — `#343a40`
- **Strings** — `#2f9e44` · **Numbers** — `#e8590c` · **Booleans** — `#f59f00`
- **Null** — `#e03131`

## Following System Preference

```vue
<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const isDarkMode = ref(true);
  let mq: MediaQueryList | null = null;
  const update = (e: MediaQueryListEvent | MediaQueryList) => {
    isDarkMode.value = e.matches;
  };

  onMounted(() => {
    mq = window.matchMedia('(prefers-color-scheme: dark)');
    update(mq);
    mq.addEventListener('change', update);
  });
  onUnmounted(() => mq?.removeEventListener('change', update));

  const data = { theme: 'follows your OS setting' };
</script>

<template>
  <JsonViewer
    :data="data"
    :dark-mode="isDarkMode"
  />
</template>
```

## Full Color Reference

### Dark Mode

| Data Type  | Color  | Hex       |
| ---------- | ------ | --------- |
| String     | Green  | `#a6e3a1` |
| Number     | Peach  | `#fab387` |
| Boolean    | Yellow | `#f9e2af` |
| Null       | Pink   | `#f38ba8` |
| Date       | Teal   | `#94e2d5` |
| RegExp     | Purple | `#cba6f7` |
| Object Key | Pink   | `#f5c2e7` |
| Array Key  | Blue   | `#89b4fa` |

### Light Mode

| Data Type  | Color  | Hex       |
| ---------- | ------ | --------- |
| String     | Green  | `#2f9e44` |
| Number     | Orange | `#e8590c` |
| Boolean    | Amber  | `#f59f00` |
| Null       | Red    | `#e03131` |
| Date       | Teal   | `#0c8599` |
| RegExp     | Purple | `#7048e8` |
| Object Key | Pink   | `#c2255c` |
| Array Key  | Blue   | `#1971c2` |

## Rainbow Nesting

Bracket colors cycle by nesting depth:

- **Dark:** Red → Peach → Yellow → Green → Sky → Mauve
- **Light:** Red → Orange → Yellow → Green → Cyan → Purple

## Custom Colors

There is no color-theme prop yet. To recolor values, override the `jv-*` classes
— see [Custom Styling](/guide/styling).
