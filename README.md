# Vue 3 JSON Viewer
To install the package, run the following command:

```bash
# For npm
npm install @anilkumarthakur/vue3-json-viewer
```

```bash 
# For yarn
  yarn add @anilkumarthakur/vue3-json-viewer
```

```bash 
# For bun
  bun add @anilkumarthakur/vue3-json-viewer
```

```bash 
# For pnpm
pnpm add @anilkumarthakur/vue3-json-viewer




## Usage

To use the package, import the `JsonViewer` component and use it in your template:

```vue
<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';
  import Moment from 'moment';
  const jsonData = {
    name: 'John Doe',
    age: 30,
    isActive: true,
    isVerified: false,
    hobbies: ['reading', 'traveling', 'swimming', 'coding'],
    items: [
      {
        property1: 'value',
        property2: 'value2',
        property3: 'value3',
      },
      {
        property1: 'value',
        property2: 'value2',
        property3: 'value3',
      },
    ],
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      coordinates: {
        latitude: 40.7128,
        longitude: -74.006,
      },
    },
    mixedArray: [1, 2, 3, 'test', { property: 'value' }],
    temperature: -2.757,
    currentDate: new Date(),
    regexPattern: /[0-9]/gi,
    formattedDate: Moment().format('YYYY-MM-DD'),
    emptyObj: {},
    emptyArr: [],
    emptyStr: '',
    zeroValue: 0,
    nullValue: null,
    undefinedValue: undefined,
    deepNestedObject: {
      level1: {
        level2: {
          level3: {
            level4: {
              level5: {
                deepKey: 'deep value',
              },
            },
          },
        },
      },
    },
    sampleFunction: function () {
      return 'This is a function';
    },
  };

  const isDarkMode = ref(true);
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  const isExpanded = ref(true);
  const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value;
  };

  const computedExpanded = computed(() => {
    return isExpanded.value ? 'expanded' : 'collapsed';
  });
</script>

<template>
  <button @click="toggleDarkMode">Toggle Dark Mode</button>
  <button @click="toggleExpanded">Toggle Expanded</button>
  <JsonViewer
      :data="jsonData"
      :level="0"
      :key="computedExpanded"
      :expanded="isExpanded"
      :darkMode="isDarkMode"
  />
</template>


```

//demo is available in the src/App.vue file also at https://vue3-json-viewer.vercel.app/
