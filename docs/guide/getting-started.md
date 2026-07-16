# Getting Started

Vue3 JSON Viewer is a beautiful, customizable JSON viewer component for Vue 3.
It gives you an interactive, syntax-highlighted tree for any JSON-like value —
ideal for debugging panels, API explorers, admin tools, and docs.

## Features

- 🎨 **Beautiful UI** — gradient backgrounds and per-type syntax highlighting
- 🌙 **Dark & light mode** — switchable with a single prop
- 📦 **TypeScript-first** — authored in TSX with complete, exported types
- 🔄 **Persistent expand/collapse** — node state survives collapsing an ancestor
- 📡 **Typed events** — `@toggle` and `@copy` with typed payloads
- 📋 **Copy to clipboard** — one click, with a fallback for non-secure contexts
- 🌈 **Rainbow nesting** — color-coded bracket levels
- 🪶 **Lightweight** — ~3.7 KB gzipped, Vue 3 as the only peer dependency

## Live Preview

<Demo controls />

## Prerequisites

- **Vue 3.3.0** or higher
- A bundler that imports CSS (Vite, webpack, etc.), or a CDN setup

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

```bash [bun]
bun add @anilkumarthakur/vue3-json-viewer
```

:::

## Quick Example

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const jsonData = {
    name: 'Vue3 JSON Viewer',
    version: '0.5.1',
    features: ['dark mode', 'expand/collapse', 'events', 'copy'],
  };
</script>

<template>
  <JsonViewer
    :data="jsonData"
    :dark-mode="true"
    :expanded="true"
  />
</template>
```

## What's Next?

- [Installation](/guide/installation) — package managers, CDN, SSR
- [Quick Start](/guide/quick-start) — get running in minutes
- [Data Types](/guide/data-types) — what each value looks like
- [Events](/guide/events) — react to toggles and copies
- [API Reference](/api/props) — props, events, and types
- [Playground](/examples/playground) — experiment live
