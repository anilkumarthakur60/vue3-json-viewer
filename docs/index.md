---
layout: home

hero:
  name: Vue3 JSON Viewer
  text: Beautiful JSON visualization for Vue 3
  tagline: A customizable, TypeScript-first JSON viewer with persistent expand/collapse, dark & light themes, typed events, and copy-to-clipboard.
  image:
    src: /logo.svg
    alt: Vue3 JSON Viewer
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Playground
      link: /examples/playground
    - theme: alt
      text: View on GitHub
      link: https://github.com/anilkumarthakur60/vue3-json-viewer

features:
  - icon: 🎨
    title: Beautiful UI
    details: Modern, gradient-based design with syntax highlighting for every JSON data type.
  - icon: 🌙
    title: Dark & Light Mode
    details: Two built-in themes with a Catppuccin-inspired palette, switchable via a single prop.
  - icon: 📦
    title: TypeScript-First
    details: Authored in TSX with complete, exported type definitions for props, events, and values.
  - icon: 🔄
    title: Persistent Expand/Collapse
    details: Node state is keyed by path and survives collapsing an ancestor — your place is never lost.
  - icon: 📡
    title: Typed Events
    details: Listen to @toggle and @copy with fully typed payloads to sync or persist view state.
  - icon: 📋
    title: Copy to Clipboard
    details: One-click copy on any node, with a graceful fallback for non-secure contexts.
  - icon: 🌈
    title: Rainbow Nesting
    details: Color-coded bracket levels make deep structures easy to scan.
  - icon: 🪶
    title: Lightweight
    details: ~3.7 KB gzipped, zero runtime dependencies, tree-shakeable ESM & UMD builds.
---

## Try it live

<Demo controls events />

## Quick Start

Install the package:

```bash
npm install @anilkumarthakur/vue3-json-viewer
```

Use it in a component:

```vue
<script setup lang="ts">
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
    :dark-mode="true"
  />
</template>
```

## Why Vue3 JSON Viewer?

| Feature                    | Description                                                |
| -------------------------- | ---------------------------------------------------------- |
| 🎯 **Zero dependencies**   | Only Vue 3 as a peer dependency                            |
| 📱 **Responsive**          | The root container scrolls; works on any screen size       |
| 🧠 **State that persists** | Expand/collapse survives collapsing a parent node          |
| 🚀 **Efficient**           | Collapsed subtrees aren't rendered at all                  |
| 🔧 **Customizable**        | Props for theme & initial state, CSS classes for the rest  |
