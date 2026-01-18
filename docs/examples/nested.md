# Nested Objects

Examples showcasing deeply nested JSON structures.

## Deep Nesting with Rainbow Colors

The viewer automatically applies rainbow colors to brackets based on nesting level:

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const deeplyNested = {
    level1: {
      level2: {
        level3: {
          level4: {
            level5: {
              level6: {
                message: 'Six levels deep!',
                colors: 'cycle through rainbow',
              },
            },
          },
        },
      },
    },
  };
</script>

<template>
  <JsonViewer
    :data="deeplyNested"
    :darkMode="true"
  />
</template>
```

## File System Structure

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const fileSystem = {
    root: {
      home: {
        user: {
          documents: {
            work: ['report.pdf', 'presentation.pptx'],
            personal: ['photo.jpg', 'notes.txt'],
          },
          downloads: ['installer.exe', 'archive.zip'],
          '.config': {
            vscode: {
              'settings.json': '{ "theme": "dark" }',
              'keybindings.json': '[]',
            },
          },
        },
      },
      var: {
        log: ['syslog', 'auth.log', 'nginx/access.log'],
        www: {
          html: {
            'index.html': '<html>...</html>',
            css: ['style.css', 'reset.css'],
            js: ['app.js', 'vendor.js'],
          },
        },
      },
      etc: {
        nginx: {
          'nginx.conf': '# main config',
          'sites-available': ['default', 'myapp'],
        },
      },
    },
  };
</script>

<template>
  <JsonViewer
    :data="fileSystem"
    :darkMode="true"
    :expanded="false"
  />
</template>
```

## Organization Hierarchy

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const organization = {
    CEO: {
      name: 'John Smith',
      reports: {
        CTO: {
          name: 'Alice Johnson',
          department: 'Technology',
          reports: {
            'VP Engineering': {
              name: 'Bob Williams',
              reports: {
                'Engineering Manager': {
                  name: 'Carol Davis',
                  team: ['Dev 1', 'Dev 2', 'Dev 3'],
                },
              },
            },
            'VP Product': {
              name: 'David Brown',
              reports: {
                'Product Manager': {
                  name: 'Eve Wilson',
                  products: ['Product A', 'Product B'],
                },
              },
            },
          },
        },
        CFO: {
          name: 'Frank Miller',
          department: 'Finance',
          reports: {
            Controller: {
              name: 'Grace Lee',
              team: ['Accountant 1', 'Accountant 2'],
            },
          },
        },
        COO: {
          name: 'Henry Taylor',
          department: 'Operations',
          reports: {
            'Operations Manager': {
              name: 'Ivy Chen',
              regions: ['North', 'South', 'East', 'West'],
            },
          },
        },
      },
    },
  };
</script>

<template>
  <JsonViewer
    :data="organization"
    :darkMode="true"
  />
</template>
```

## GraphQL Response

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const graphqlResponse = {
    data: {
      user: {
        id: '1',
        username: 'johndoe',
        profile: {
          firstName: 'John',
          lastName: 'Doe',
          avatar: {
            url: 'https://example.com/avatar.jpg',
            dimensions: {
              width: 200,
              height: 200,
            },
          },
        },
        posts: {
          edges: [
            {
              node: {
                id: 'post_1',
                title: 'First Post',
                comments: {
                  totalCount: 5,
                  edges: [
                    {
                      node: {
                        id: 'comment_1',
                        text: 'Great post!',
                        author: {
                          username: 'alice',
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
          pageInfo: {
            hasNextPage: true,
            endCursor: 'cursor_abc',
          },
        },
      },
    },
  };
</script>

<template>
  <JsonViewer
    :data="graphqlResponse"
    :darkMode="true"
  />
</template>
```

## Redux State

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const reduxState = {
    auth: {
      isAuthenticated: true,
      user: {
        id: 1,
        email: 'user@example.com',
        permissions: ['read', 'write'],
      },
      tokens: {
        access: 'eyJhbG...truncated',
        refresh: 'eyJhbG...truncated',
        expiresAt: '2024-12-31T23:59:59Z',
      },
    },
    ui: {
      theme: 'dark',
      sidebar: {
        isOpen: true,
        width: 250,
      },
      modals: {
        settings: false,
        confirm: false,
      },
      notifications: [],
    },
    entities: {
      users: {
        byId: {
          1: { id: 1, name: 'Alice' },
          2: { id: 2, name: 'Bob' },
        },
        allIds: [1, 2],
      },
      posts: {
        byId: {},
        allIds: [],
        loading: false,
        error: null,
      },
    },
    router: {
      location: {
        pathname: '/dashboard',
        search: '?tab=overview',
        hash: '',
      },
      action: 'PUSH',
    },
  };
</script>

<template>
  <h3>Redux DevTools Style</h3>
  <JsonViewer
    :data="reduxState"
    :darkMode="true"
    :expanded="false"
  />
</template>
```

## Mixed Nesting

Arrays inside objects inside arrays:

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const mixedNesting = {
    projects: [
      {
        name: 'Project Alpha',
        tasks: [
          {
            id: 1,
            subtasks: [
              { id: '1a', done: true },
              { id: '1b', done: false },
            ],
          },
          {
            id: 2,
            subtasks: [{ id: '2a', done: true }],
          },
        ],
      },
      {
        name: 'Project Beta',
        tasks: [
          {
            id: 3,
            subtasks: [],
          },
        ],
      },
    ],
  };
</script>

<template>
  <JsonViewer
    :data="mixedNesting"
    :darkMode="true"
  />
</template>
```
