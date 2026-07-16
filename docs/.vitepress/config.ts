import { defineConfig } from 'vitepress';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  base: '/vue3-json-viewer/',
  title: 'Vue3 JSON Viewer',
  description:
    'A beautiful, customizable JSON viewer component for Vue 3 with TypeScript support, expand/collapse persistence, dark/light mode, events, and copy-to-clipboard.',

  lastUpdated: true,
  cleanUrls: true,

  // The component is authored in TSX, so the docs build needs the JSX plugin
  // to import it directly from source for the live demos.
  vite: {
    plugins: [vueJsx()],
  },

  head: [
    [
      'link',
      { rel: 'icon', type: 'image/svg+xml', href: '/vue3-json-viewer/logo.svg' },
    ],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'vue3, json viewer, json, vue component, typescript, dark mode, syntax highlighting, expand collapse, copy to clipboard',
      },
    ],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/props' },
      { text: 'Examples', link: '/examples/basic' },
      { text: 'Playground', link: '/examples/playground' },
      {
        text: 'v0.5.1',
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/anilkumarthakur60/vue3-json-viewer/releases',
          },
          {
            text: 'npm',
            link: 'https://www.npmjs.com/package/@anilkumarthakur/vue3-json-viewer',
          },
          {
            text: 'Contributing',
            link: 'https://github.com/anilkumarthakur60/vue3-json-viewer/blob/main/CONTRIBUTING.md',
          },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Quick Start', link: '/guide/quick-start' },
          ],
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Data Types', link: '/guide/data-types' },
            { text: 'Expand & Collapse', link: '/guide/expand-collapse' },
            { text: 'Events', link: '/guide/events' },
            { text: 'Copy to Clipboard', link: '/guide/copy' },
          ],
        },
        {
          text: 'Styling',
          items: [
            { text: 'Dark / Light Mode', link: '/guide/theming' },
            { text: 'Custom Styling', link: '/guide/styling' },
          ],
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Components', link: '/guide/components' },
            { text: 'SSR & Nuxt', link: '/guide/ssr' },
            { text: 'FAQ & Troubleshooting', link: '/guide/faq' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Props', link: '/api/props' },
            { text: 'Events', link: '/api/events' },
            { text: 'Types', link: '/api/types' },
            { text: 'Plugin', link: '/api/plugin' },
          ],
        },
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Basic Usage', link: '/examples/basic' },
            { text: 'Data Types', link: '/examples/data-types' },
            { text: 'Dark Mode', link: '/examples/dark-mode' },
            { text: 'Nested Objects', link: '/examples/nested' },
            { text: 'Large JSON', link: '/examples/large-json' },
            { text: 'Events & Persistence', link: '/examples/events' },
            { text: 'Playground', link: '/examples/playground' },
          ],
        },
      ],
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/anilkumarthakur60/vue3-json-viewer',
      },
      {
        icon: 'npm',
        link: 'https://www.npmjs.com/package/@anilkumarthakur/vue3-json-viewer',
      },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Anil Kumar Thakur',
    },

    search: {
      provider: 'local',
    },

    editLink: {
      pattern:
        'https://github.com/anilkumarthakur60/vue3-json-viewer/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },
});
