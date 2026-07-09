# Dark Mode

Using the dark and light themes. See the [theming guide](/guide/theming) for the
full color reference.

## Interactive Toggle

<Demo controls :json='`{
  "theme": "toggle me with the button above",
  "colors": { "primary": "#646cff", "secondary": "#42b883" },
  "values": { "string": "text", "number": 42, "boolean": true, "null": null }
}`' />

```vue
<script setup lang="ts">
  import { ref } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const isDarkMode = ref(true);
  const data = { theme: 'Toggle me!' };
</script>

<template>
  <button @click="isDarkMode = !isDarkMode">
    {{ isDarkMode ? '☀️ Light' : '🌙 Dark' }}
  </button>
  <JsonViewer
    :data="data"
    :dark-mode="isDarkMode"
  />
</template>
```

## Dark Mode

<Demo :dark="true" :json='`{ "mode": "dark", "string": "green", "number": 42, "boolean": true, "null": null }`' />

```vue
<JsonViewer :data="data" :dark-mode="true" />
```

## Light Mode

<Demo :dark="false" :json='`{ "mode": "light", "string": "green", "number": 42, "boolean": true, "null": null }`' />

```vue
<JsonViewer :data="data" :dark-mode="false" />
```

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

  const data = { system: 'Follows your OS theme preference' };
</script>

<template>
  <JsonViewer
    :data="data"
    :dark-mode="isDarkMode"
  />
</template>
```

## Persisting the Choice

```vue
<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const KEY = 'json-viewer-theme';
  const isDarkMode = ref(true);

  onMounted(() => {
    const saved = localStorage.getItem(KEY);
    if (saved !== null) isDarkMode.value = saved === 'dark';
  });

  watch(isDarkMode, (v) => localStorage.setItem(KEY, v ? 'dark' : 'light'));

  const data = { message: 'Your theme preference is saved!' };
</script>

<template>
  <button @click="isDarkMode = !isDarkMode">Toggle Theme (persisted)</button>
  <JsonViewer
    :data="data"
    :dark-mode="isDarkMode"
  />
</template>
```
