---
layout: home

hero:
  name: Vue3 JSON Viewer
  text: Beautiful JSON visualization for Vue 3
  tagline: A customizable, TypeScript-ready JSON viewer with dark/light mode, expand/collapse controls, and syntax highlighting.
  image:
    src: /logo.svg
    alt: Vue3 JSON Viewer
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/anilkumarthakur60/vue3-json-viewer

features:
  - icon: 🎨
    title: Beautiful UI
    details: Modern, gradient-based design with syntax highlighting for all JSON data types.
  - icon: 🌙
    title: Dark/Light Mode
    details: Built-in dark and light themes with Catppuccin-inspired color palette.
  - icon: 📦
    title: TypeScript Ready
    details: Full TypeScript support with comprehensive type definitions included.
  - icon: 🔄
    title: Expand/Collapse
    details: Interactive expand/collapse controls for objects and arrays at any level.
  - icon: 📋
    title: Copy to Clipboard
    details: One-click copy functionality for any JSON node with visual feedback.
  - icon: 🌈
    title: Rainbow Nesting
    details: Color-coded nesting levels make it easy to navigate deep structures.
---

## Quick Start

### Installation

```bash
npm install @anilkumarthakur/vue3-json-viewer
```

### Basic Usage

```vue
<script setup>
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const data = {
    name: 'John Doe',
    age: 30,
    hobbies: ['reading', 'coding'],
  };
</script>

<template>
  <JsonViewer
    :data="data"
    :darkMode="true"
  />
</template>
```

## Why Vue3 JSON Viewer?

<div class="feature-grid">

| Feature                  | Description                                   |
| ------------------------ | --------------------------------------------- |
| 🎯 **Zero Dependencies** | No external dependencies besides Vue 3        |
| 📱 **Responsive**        | Works on all screen sizes                     |
| ♿ **Accessible**        | Keyboard navigable and screen reader friendly |
| 🚀 **Performant**        | Efficiently handles large JSON structures     |
| 🔧 **Customizable**      | Easy to customize with props                  |

</div>
