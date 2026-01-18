# Getting Started

Vue3 JSON Viewer is a beautiful, customizable JSON viewer component for Vue 3 applications. It provides an intuitive way to display and interact with JSON data.

## Features

- 🎨 **Beautiful UI** - Modern design with gradient backgrounds and syntax highlighting
- 🌙 **Dark/Light Mode** - Built-in theme support
- 📦 **TypeScript Ready** - Full type definitions included
- 🔄 **Interactive** - Expand/collapse objects and arrays
- 📋 **Copy Support** - One-click copy to clipboard
- 🌈 **Rainbow Nesting** - Color-coded nesting levels

## Prerequisites

- Vue 3.3.0 or higher
- Node.js 18 or higher (for development)

## Installation

::: code-group

```bash [npm]
npm install @anilkumarthakur/vue3-json-viewer
```

```bash [yarn]
yarn add @anilkumarthakur/vue3-json-viewer
```

```bash [pnpm]
pnpm add @anilkumarthakur/vue3-json-viewer
```

:::

## Quick Example

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const jsonData = {
    name: 'Vue3 JSON Viewer',
    version: '0.2.0',
    features: ['dark mode', 'expand/collapse', 'copy'],
  };
</script>

<template>
  <JsonViewer
    :data="jsonData"
    :darkMode="true"
    :expanded="true"
  />
</template>
```

## What's Next?

- [Installation Guide](/guide/installation) - Detailed installation instructions
- [Quick Start](/guide/quick-start) - Get up and running quickly
- [API Reference](/api/props) - Complete props documentation
- [Examples](/examples/basic) - See it in action
