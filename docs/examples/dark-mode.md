# Dark Mode

Examples of using the dark and light themes.

## Theme Toggle

Interactive theme switching:

```vue
<script setup lang="ts">
  import { ref } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const isDarkMode = ref(true);

  const data = {
    theme: 'Toggle me!',
    darkMode: true,
    colors: {
      primary: '#646cff',
      secondary: '#42b883',
    },
  };

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
  };
</script>

<template>
  <div>
    <button
      @click="toggleTheme"
      class="theme-btn"
    >
      {{ isDarkMode ? '☀️ Switch to Light' : '🌙 Switch to Dark' }}
    </button>

    <JsonViewer
      :data="data"
      :darkMode="isDarkMode"
    />
  </div>
</template>

<style scoped>
  .theme-btn {
    margin-bottom: 16px;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
  }
</style>
```

## Dark Mode Only

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const data = {
    mode: 'dark',
    background: 'gradient #1e1e2e → #2d2d3f',
    colors: {
      string: '#a6e3a1',
      number: '#fab387',
      boolean: '#f9e2af',
      null: '#f38ba8',
    },
  };
</script>

<template>
  <JsonViewer
    :data="data"
    :darkMode="true"
  />
</template>
```

## Light Mode Only

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const data = {
    mode: 'light',
    background: 'gradient #f8f9fa → #e9ecef',
    colors: {
      string: '#2f9e44',
      number: '#e8590c',
      boolean: '#f59f00',
      null: '#e03131',
    },
  };
</script>

<template>
  <JsonViewer
    :data="data"
    :darkMode="false"
  />
</template>
```

## System Preference

Auto-detect user's system theme preference:

```vue
<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const isDarkMode = ref(true);
  let mediaQuery: MediaQueryList | null = null;

  const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
    isDarkMode.value = e.matches;
  };

  onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    updateTheme(mediaQuery);
    mediaQuery.addEventListener('change', updateTheme);
  });

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', updateTheme);
  });

  const data = {
    system: 'Follows your OS theme preference',
    instruction: 'Change your system theme to see this update',
  };
</script>

<template>
  <div>
    <p
      >Current theme: {{ isDarkMode ? 'Dark' : 'Light' }} (system preference)</p
    >
    <JsonViewer
      :data="data"
      :darkMode="isDarkMode"
    />
  </div>
</template>
```

## Side by Side Comparison

Compare both themes:

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const data = {
    string: 'Hello World',
    number: 42,
    float: 3.14159,
    boolean: true,
    null: null,
    array: [1, 2, 3],
    object: {
      nested: 'value',
    },
  };
</script>

<template>
  <div class="comparison">
    <div class="panel">
      <h3>🌙 Dark Mode</h3>
      <JsonViewer
        :data="data"
        :darkMode="true"
      />
    </div>

    <div class="panel">
      <h3>☀️ Light Mode</h3>
      <JsonViewer
        :data="data"
        :darkMode="false"
      />
    </div>
  </div>
</template>

<style scoped>
  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .panel h3 {
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    .comparison {
      grid-template-columns: 1fr;
    }
  }
</style>
```

## Persisting Theme Choice

Save theme preference to localStorage:

```vue
<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const STORAGE_KEY = 'json-viewer-theme';
  const isDarkMode = ref(true);

  onMounted(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      isDarkMode.value = saved === 'dark';
    }
  });

  watch(isDarkMode, (newValue) => {
    localStorage.setItem(STORAGE_KEY, newValue ? 'dark' : 'light');
  });

  const data = {
    message: 'Your theme preference is saved!',
    storage: 'localStorage',
  };
</script>

<template>
  <div>
    <button @click="isDarkMode = !isDarkMode">
      Toggle Theme (persisted)
    </button>
    <JsonViewer
      :data="data"
      :darkMode="isDarkMode"
    />
  </div>
</template>
```
