# Vue 3 JSON Viewer

This project demonstrates how to use the `@anilkumarthakur/vue3-json-viewer` package to display JSON data in a Vue 3 application.

## Installation

To install the package, run the following command:

```bash
npm install @anilkumarthakur/vue3-json-viewer
```

## Usage

To use the package, import the `JsonViewer` component and use it in your template:

```vue
<template>
  <JsonViewer :data="jsonData" />
  //level , expanded and darkMode are optional props
  <JsonViewer
    :data="jsonData"
    :level="0"
    :expanded="true"
    :darkMode="true"
  />
</template>
<script setup>
  import { ref } from 'vue';
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
    diverseArray: [
      'string',
      123,
      true,
      null,
      undefined,
      { property: 'value' },
      [1, 2, 3],
      new Date(),
      /regex/,
      Moment().format('YYYY-MM-DD'),
      function () {
        return 'Array function';
      },
    ],
  };
</script>
```

//demo is available in the src/App.vue file also at https://vue3-json-viewer.vercel.app/



