<script setup lang="ts">
  import Moment from 'moment';
  import './package/style/global.scss';

  import { computed, ref } from 'vue';
  import { JsonViewer } from './package/components';
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

  <pre>{{ jsonData }}</pre>
</template>

<style>
  /* styles.css */
</style>
