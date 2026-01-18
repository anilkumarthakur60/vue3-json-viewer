import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Vue3 JSON Viewer',
  description:
    'A beautiful, customizable JSON viewer component for Vue 3 with TypeScript support',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'vue3, json viewer, json, vue component, typescript, dark mode, syntax highlighting',
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
      {
        text: 'v0.2.0',
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/anilkumarthakur60/vue3-json-viewer/releases',
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
          text: 'Features',
          items: [
            { text: 'Dark/Light Mode', link: '/guide/theming' },
            { text: 'Expand/Collapse', link: '/guide/expand-collapse' },
            { text: 'Copy to Clipboard', link: '/guide/copy' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Props', link: '/api/props' },
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
            { text: 'Dark Mode', link: '/examples/dark-mode' },
            { text: 'Large JSON', link: '/examples/large-json' },
            { text: 'Nested Objects', link: '/examples/nested' },
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
