# Dark/Light Mode

Vue3 JSON Viewer comes with beautiful built-in dark and light themes.

## Basic Usage

Toggle between themes using the `darkMode` prop:

```vue
<script setup lang="ts">
  import { ref } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const isDarkMode = ref(true);
  const data = { message: 'Hello World' };
</script>

<template>
  <button @click="isDarkMode = !isDarkMode">Toggle Theme</button>
  <JsonViewer
    :data="data"
    :darkMode="isDarkMode"
  />
</template>
```

## Dark Mode (Default)

```vue
<JsonViewer :data="data" :darkMode="true" />
```

Features a Catppuccin-inspired color palette:

- **Background**: Gradient from `#1e1e2e` to `#2d2d3f`
- **Text**: Soft white `#cdd6f4`
- **Strings**: Green `#a6e3a1`
- **Numbers**: Peach `#fab387`
- **Booleans**: Yellow `#f9e2af`
- **Null**: Pink `#f38ba8`

## Light Mode

```vue
<JsonViewer :data="data" :darkMode="false" />
```

Clean, professional light theme:

- **Background**: Gradient from `#f8f9fa` to `#e9ecef`
- **Text**: Dark gray `#343a40`
- **Strings**: Green `#2f9e44`
- **Numbers**: Orange `#e8590c`
- **Booleans**: Amber `#f59f00`
- **Null**: Red `#e03131`

## System Preference Detection

Match the user's system preference:

```vue
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const isDarkMode = ref(true);

  onMounted(() => {
    // Check system preference
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    isDarkMode.value = prefersDark;

    // Listen for changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        isDarkMode.value = e.matches;
      });
  });
</script>

<template>
  <JsonViewer
    :data="data"
    :darkMode="isDarkMode"
  />
</template>
```

## Color Reference

### Dark Mode Colors

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

### Light Mode Colors

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

## Rainbow Nesting Colors

Bracket colors cycle through a rainbow pattern based on nesting level:

**Dark Mode**: Red → Peach → Yellow → Green → Sky → Mauve

**Light Mode**: Red → Orange → Yellow → Green → Cyan → Purple
