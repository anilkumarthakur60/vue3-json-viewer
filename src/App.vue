<script setup lang="ts">
  import Moment from 'moment';
  import './package/style/global.scss';

  import { ref } from 'vue';
  import { ViewJson, JsonViewer } from './package/components';
  import { RecaptchaV3 } from '@anilkumarthakur/vue3-recaptcha';
  const jsonData = {
    name: 'John Doe',
    age: 30,
    isActive: true,
    hobbies: ['reading', 'traveling', 'swimming', 'coding'],
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      coordinates: {
        lat: 40.7128,
        lng: -74.006,
      },
    },
    contact: {
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      emergencyContact: {
        name: 'Jane Doe',
        phone: '987-654-3210',
      },
    },
    education: [
      {
        degree: 'B.Sc. Computer Science',
        institution: 'University of XYZ',
        year: 2012,
      },
      {
        degree: 'M.Sc. Software Engineering',
        institution: 'University of ABC',
        year: 2014,
      },
    ],
    workExperience: [
      { company: 'Tech Corp', position: 'Software Engineer', years: 3 },
      { company: 'Innovate Ltd', position: 'Senior Developer', years: 2 },
    ],
    scores: [
      { subject: 'Math', score: 95 },
      { subject: 'English', score: 82 },
      { subject: 'Science', score: 88 },
    ],
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['user', 'admin', 'developer'],
    },
    preferences: {
      notifications: true,
      theme: 'dark',
      language: 'en',
    },
    friends: [
      { name: 'Jane', age: 28, relationship: 'sister' },
      { name: 'Mike', age: 32, relationship: 'colleague' },
    ],
    additionalInfo: 'Some additional information about John Doe.',
    string: 'this is a test string',
    integer: 42,
    array: [1, 2, 3, 'test', { key: 'value' }],
    float: -2.757,
    undefined_var: undefined,
    date: new Date(),
    regexp: /[0-9]/gi,
    moment: Moment(),
    empty: {},
    emptyArray: [],
    emptyString: '',
    emptyNumber: 0,
    emptyNull: null,
    emptyUndefined: undefined,
    emptyObject: {},
    nestedObject: {
      level1: {
        level2: {
          level3: {
            level4: {
              level5: {
                key: 'deep value',
              },
            },
          },
        },
      },
    },
    function: function () {
      return 'This is a function';
    },
    complexArray: [
      'string',
      123,
      true,
      null,
      undefined,
      { key: 'value' },
      [1, 2, 3],
      new Date(),
      /regex/,
      Moment(),
      function () {
        return 'Array function';
      },
    ],
  };

  const isDarkMode = ref(true);
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };

  const complexObject = {
    numberValue: 42,
    bigIntValue: BigInt(9007199254740991),
    stringValue: 'Hello, World!',
    booleanValue: true,
    undefinedValue: undefined,
    nullValue: null,
    symbolValue: Symbol('uniqueSymbol'),

    // Arrays and Nested Arrays
    arrayValue: [1, 2, 3, 'text', { key: 'value' }],
    nestedArrayValue: [
      [1, 2, 3],
      ['nested', ['deep', ['deeper', ['deepest']]]],
    ],

    // Objects and Nested Objects
    objectValue: {
      name: 'John',
      age: 30,
      address: {
        street: '123 Main St',
        city: 'New York',
        zip: '10001',
      },
      hobbies: ['reading', 'traveling', 'sports'],
    },

    // Functions
    functionValue: function (x, y) {
      return x + y;
    },
    arrowFunctionValue: (x, y) => x * y,

    // Dates
    dateValue: new Date(),

    // Regular Expressions
    regexValue: /[A-Z]\w+/g,

    // Maps and Sets
    mapValue: new Map([
      ['key1', 'value1'],
      ['key2', 'value2'],
    ]),
    setValue: new Set([1, 2, 3, 4, 5]),

    // Nested and Circular References
    circularReference: {},
    deepNestedObject: {
      level1: {
        level2: {
          level3: {
            key: 'deep value',
          },
        },
      },
    },

    // Typed Arrays
    typedArrayValue: new Uint8Array([10, 20, 30, 40]),

    // Symbols as Object Keys
    [Symbol('symbolKey')]: 'symbolValue',

    // Boolean Operators
    logicalOperators: {
      and: true && false,
      or: true || false,
      not: !true,
    },

    // Optional Chaining and Nullish Coalescing
    optionalChainingValue: undefined?.nested?.value || 'default',
    nullishCoalescingValue: null ?? 'fallback',

    // Arrays with Different Data Types
    mixedArrayValue: [
      42,
      'text',
      true,
      null,
      undefined,
      { nested: 'object' },
      [1, 2, 3],
    ],

    // Handling Promises
    promiseExample: new Promise((resolve, reject) => {
      setTimeout(() => resolve('Promise Resolved!'), 1000);
    }),

    // Generators
    generatorFunctionValue: function* () {
      yield 1;
      yield 2;
      yield 3;
    },

    // Async Functions
    asyncFunctionValue: async function () {
      return 'Async Function Result';
    },

    // Error Object
    errorExample: new Error('This is an error'),

    // WeakMap and WeakSet
    weakMapValue: new WeakMap(),
    weakSetValue: new WeakSet(),

    // Special Numbers (Infinity, NaN)
    infinityValue: Infinity,
    nanValue: NaN,

    // Structured Clone-able data for transferables
    transferableArrayBuffer: new ArrayBuffer(16),

    // Immutable Data Structures (Object.freeze)
    frozenObjectValue: Object.freeze({
      name: 'Immutable',
      value: 100,
    }),

    // DOM Elements (if applicable in environment)
    domElement:
      typeof document !== 'undefined' ? document.createElement('div') : null,
  };

  // Adding circular reference after creation

  console.log(complexObject);
</script>

<template>
  <button @click="toggleDarkMode">Toggle Dark Mode</button>
  <ViewJson
    :data="complexObject"
    :level="0"
    :darkMode="isDarkMode"
  />

  <pre>{{ jsonData }}</pre>
  <RecaptchaV3 />
</template>

<style>
  /* styles.css */
</style>
