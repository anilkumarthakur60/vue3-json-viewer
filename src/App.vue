<script setup lang="ts">
  import Moment from 'moment';
  import './global.scss';

  import JsonViewer from './JsonViewer.vue';
  const jsonData = {
    name: 'John',
    age: 30,
    city: 'New York',
    isActive: true,
    hobbies: [
      {
        name: 'reading',
        details: {
          genre: 'fiction',
          favoriteBooks: ['1984', 'Brave New World', 'Fahrenheit 451'],
          readingTime: 'evening',
        },
      },
      {
        name: 'traveling',
        details: {
          countriesVisited: ['France', 'Japan', 'Australia'],
          favoriteCities: ['Paris', 'Tokyo', 'Sydney'],
          travelFrequency: 'twice a year',
        },
      },
      {
        name: 'swimming',
        details: {
          style: 'freestyle',
          bestTimes: {
            '50m': '30s',
            '100m': '1m 10s',
          },
          trainingSchedule: ['Monday', 'Wednesday', 'Friday'],
        },
      },
    ],
    address: {
      street: '123 Main St',
      city: 'New York',
      zipCode: '10001',
      coordinates: {
        lat: 40.7128,
        lng: -74.006,
        history: {
          logins: [new Date(), new Date()],
          actions: ['login', 'update'],
        },
      },
      nearbyPlaces: [
        {
          name: 'Central Park',
          type: 'park',
          distance: '2 miles',
        },
        {
          name: 'Metropolitan Museum of Art',
          type: 'museum',
          distance: '3 miles',
        },
      ],
    },
    contact: {
      email: 'john@example.com',
      phone: '123-456-7890',
      social: {
        twitter: '@john',
        facebook: 'facebook.com/john',
        instagram: 'instagram.com/john',
      },
      emergencyContacts: [
        {
          name: 'Alice',
          relation: 'sister',
          phone: '321-654-0987',
        },
        {
          name: 'Bob',
          relation: 'friend',
          phone: '654-321-9870',
        },
      ],
    },
    scores: [
      {
        subject: 'Math',
        score: 95,
        date: new Date(),
      },
      {
        subject: 'English',
        score: 82,
        date: new Date(),
      },
      {
        subject: 'Science',
        score: 75,
        date: new Date(),
      },
      {
        subject: 'History',
        score: 88,
        date: new Date(),
      },
    ],
    metadata: {
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: ['user', 'admin'],
      history: {
        logins: [new Date(), new Date()],
        actions: ['login', 'update'],
      },
      permissions: {
        read: true,
        write: false,
        execute: true,
      },
    },
    preferences: {
      notifications: true,
      theme: 'dark',
      layout: {
        sidebar: true,
        grid: false,
      },
      language: 'en',
      accessibility: {
        highContrast: false,
        textToSpeech: true,
      },
    },
    friends: [
      {
        name: 'Jane',
        age: 28,
        city: 'Los Angeles',
        contact: {
          email: 'jane@example.com',
          phone: '987-654-3210',
        },
        hobbies: ['hiking', 'photography'],
      },
      {
        name: 'Mike',
        age: 32,
        city: 'Chicago',
        contact: {
          email: 'mike@example.com',
          phone: '456-789-0123',
        },
        hobbies: ['gaming', 'cooking'],
      },
      {
        name: 'Sara',
        age: 25,
        city: 'Miami',
        contact: {
          email: 'sara@example.com',
          phone: '321-987-6540',
        },
        hobbies: ['dancing', 'painting'],
      },
    ],
    additionalInfo: null,
    string: 'this is a test string',
    integer: 42,
    empty_array: [],
    empty_object: {},
    array: [1, 2, 3, 'test'],
    float: -2.757,
    undefined_var: undefined,
    parent: {
      sibling1: true,
      sibling2: false,
      sibling3: null,
      isString: (value: any) => {
        if (typeof value === 'string') {
          return 'string';
        } else {
          return 'other';
        }
      },
    },
    string_number: '1234',
    date: new Date(),
    // moment: Moment(),
    regexp: /[0-9]/gi,
  };
</script>

<template>
  <JsonViewer
    :data="jsonData"
    :level="0"
    :darkMode="false"
  />

  <pre>{{ jsonData }}</pre>
</template>

<style>
  /* styles.css */
</style>
