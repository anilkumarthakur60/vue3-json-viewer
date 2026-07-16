# Nested Objects

Deeply nested structures, with rainbow-colored bracket levels.

## Deep Nesting

Bracket colors cycle by depth, making nesting easy to follow:

<Demo controls :json='`{
  "level1": {
    "level2": {
      "level3": {
        "level4": {
          "level5": { "message": "five levels deep", "note": "watch the bracket colors" }
        }
      }
    }
  }
}`' />

## Keys That Aren't Plain Identifiers

Keys with dots, spaces, or leading symbols are handled correctly — internally
their [path](/api/events#the-path-format) is bracket-quoted so they never
collide with nested paths:

<Demo :json='`{
  "normal": 1,
  "with.dot": 2,
  "has space": 3,
  ".config": { "vscode": { "settings.json": "{ }" } }
}`' />

## Mixed Nesting

Arrays inside objects inside arrays:

<Demo controls :json='`{
  "projects": [
    {
      "name": "Project Alpha",
      "tasks": [
        { "id": 1, "subtasks": [ { "id": "1a", "done": true }, { "id": "1b", "done": false } ] },
        { "id": 2, "subtasks": [ { "id": "2a", "done": true } ] }
      ]
    },
    { "name": "Project Beta", "tasks": [ { "id": 3, "subtasks": [] } ] }
  ]
}`' />

## Real-World Shapes

These patterns come up constantly:

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  // GraphQL response
  const graphql = {
    data: {
      user: {
        id: '1',
        profile: { firstName: 'John', avatar: { url: '…', width: 200 } },
        posts: { edges: [{ node: { id: 'p1', title: 'First' } }] },
      },
    },
  };

  // Redux / Pinia state
  const state = {
    auth: { isAuthenticated: true, user: { id: 1, permissions: ['read', 'write'] } },
    ui: { theme: 'dark', sidebar: { isOpen: true } },
    entities: { users: { byId: { 1: { id: 1, name: 'Alice' } }, allIds: [1] } },
  };
</script>

<template>
  <JsonViewer
    :data="graphql"
    :expanded="false"
  />
  <JsonViewer
    :data="state"
    :expanded="false"
  />
</template>
```
