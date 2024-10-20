<script setup lang="ts">
  import Moment from 'moment';
  import './package/style/global.scss';

  import { ref } from 'vue';
  import { ViewJson, JsonViewer } from './package/components';
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
  };

  const isDarkMode = ref(true);
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
  };
</script>

<template>
  <button @click="toggleDarkMode">Toggle Dark Mode</button>
  <ViewJson
    :data="jsonData"
    :level="1"
    :darkMode="isDarkMode"
  />
  <JsonViewer
    :darkMode="isDarkMode"
    :data="jsonData"
    :level="1"
  />

  <pre>{{ jsonData }}</pre>
</template>

<style>
  /* styles.css */
</style>
