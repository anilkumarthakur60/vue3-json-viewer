# Nuxt Integration

Vue3 JSON Viewer fully supports **Nuxt 3** and **Nuxt 4** with seamless integration through a dedicated Nuxt module.

## Installation

Install the package:

```bash
npm install @anilkumarthakur/vue3-json-viewer
```

## Setup

### Option 1: Automatic Setup (Recommended)

Add the module to your `nuxt.config.ts`:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@anilkumarthakur/vue3-json-viewer/nuxt'],

  // Optional: Configure the module
  jsonViewer: {
    autoImport: true, // Components are auto-imported globally (default: true)
  },
});
```

With automatic setup, the `JsonViewer` and `NestedComponent` components are automatically registered globally and can be used directly in templates without manual imports.

### Option 2: Manual Import

If you prefer manual control, you can import the component where needed:

```vue
<script setup>
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';
</script>

<template>
  <JsonViewer
    :data="data"
    :darkMode="true"
  />
</template>
```

## Usage Examples

### Basic Usage

With automatic setup, simply use the component in your template:

```vue
<template>
  <div class="p-6">
    <JsonViewer
      :data="{ name: 'John Doe', age: 30, email: 'john@example.com' }"
      :darkMode="true"
    />
  </div>
</template>
```

### With Reactive Data

```vue
<script setup>
  import { ref } from 'vue';

  const data = ref({
    user: {
      name: 'Jane Smith',
      id: 123,
      roles: ['admin', 'user'],
      settings: {
        theme: 'dark',
        notifications: true,
      },
    },
  });

  const isDarkMode = ref(true);

  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
  };
</script>

<template>
  <div>
    <button
      @click="toggleTheme"
      class="mb-4"
    >
      Toggle Theme ({{ isDarkMode ? 'Dark' : 'Light' }})
    </button>
    <JsonViewer
      :data="data"
      :darkMode="isDarkMode"
    />
  </div>
</template>
```

### Expand/Collapse Control

```vue
<script setup>
  import { ref } from 'vue';

  const isExpanded = ref(false);

  const complexData = {
    level1: {
      level2: {
        level3: {
          level4: {
            deepValue: 'This is nested deep',
          },
        },
      },
    },
  };
</script>

<template>
  <div>
    <button
      @click="isExpanded = !isExpanded"
      class="mb-4"
    >
      {{ isExpanded ? 'Collapse' : 'Expand' }} All
    </button>
    <JsonViewer
      :data="complexData"
      :expanded="isExpanded"
      :darkMode="true"
    />
  </div>
</template>
```

### API Response Display

```vue
<script setup>
  import { ref, onMounted } from 'vue';

  const apiResponse = ref(null);
  const loading = ref(true);

  onMounted(async () => {
    try {
      const response = await fetch('https://api.example.com/data');
      apiResponse.value = await response.json();
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      loading.value = false;
    }
  });
</script>

<template>
  <div>
    <div
      v-if="loading"
      class="text-center"
    >
      Loading API response...
    </div>
    <div v-else>
      <h2>API Response</h2>
      <JsonViewer
        :data="apiResponse"
        :darkMode="true"
        :expanded="false"
      />
    </div>
  </div>
</template>
```

## Configuration

You can configure the module behavior through `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@anilkumarthakur/vue3-json-viewer/nuxt'],

  jsonViewer: {
    autoImport: true, // Enable auto-import of components (default: true)
  },
});
```

### Module Options

| Option       | Type    | Default | Description                                |
| ------------ | ------- | ------- | ------------------------------------------ |
| `autoImport` | Boolean | `true`  | Automatically register components globally |

## Features

- ✅ **Nuxt 3 & 4 Compatible** - Works seamlessly with both versions
- ✅ **TypeScript Support** - Full type definitions included
- ✅ **Auto-import Components** - No manual imports needed
- ✅ **Dark/Light Mode** - Beautiful themes included
- ✅ **Expand/Collapse** - Interactive JSON navigation
- ✅ **Copy to Clipboard** - One-click copy functionality
- ✅ **Syntax Highlighting** - Color-coded JSON types
- ✅ **Performance Optimized** - Efficiently handles large JSON structures

## Troubleshooting

### Components not auto-imported?

Make sure the module is correctly added to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@anilkumarthakur/vue3-json-viewer/nuxt'],
});
```

### Styles not loading?

The styles are automatically imported with the module. If they don't load, manually import them:

```vue
<script setup>
  import '@anilkumarthakur/vue3-json-viewer/styles.css';
</script>
```

### TypeScript errors?

Ensure your `tsconfig.json` has proper Vue and module resolution settings:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "types": ["node", "nuxt"]
  }
}
```

## Next Steps

- Check out [Props](/api/props) for all available configuration options
- See [Examples](/examples/basic) for more usage patterns
- Visit the [GitHub repository](https://github.com/anilkumarthakur60/vue3-json-viewer) for issues and contributions
