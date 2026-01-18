# Nuxt 3 & Nuxt 4 Support

## Overview

Vue3 JSON Viewer now has **full support** for **Nuxt 3** and **Nuxt 4** with a dedicated Nuxt module for seamless integration.

## What's New

### 1. **Nuxt Module** (`src/nuxt.ts`)

- Auto-registers the JsonViewer plugin in Nuxt applications
- Provides component auto-import functionality
- Compatible with both Nuxt 3 and Nuxt 4

### 2. **Runtime Plugin** (`src/runtime/plugin.ts`)

- Automatically installs the Vue plugin during Nuxt app initialization
- No manual plugin registration needed

### 3. **Package.json Updates**

- Added Nuxt module export in `exports` field
- Added `@nuxt/kit` to devDependencies
- Updated module compatibility metadata

### 4. **Documentation**

- New Nuxt guide: `docs/guide/nuxt.md`
- Added to VitePress sidebar under "Framework Integration"
- Includes multiple usage examples and troubleshooting

## Usage

### Quick Setup

1. **Add to `nuxt.config.ts`:**

```typescript
export default defineNuxtConfig({
  modules: ['@anilkumarthakur/vue3-json-viewer/nuxt'],
});
```

2. **Use in templates:**

```vue
<template>
  <JsonViewer
    :data="{ name: 'John' }"
    :darkMode="true"
  />
</template>
```

### Features

✅ Auto-import components globally  
✅ Works with Nuxt 3 and Nuxt 4  
✅ Full TypeScript support  
✅ Automatic style loading  
✅ Customizable configuration

## Files Modified/Created

```
src/
├── nuxt.ts                    # Main Nuxt module
└── runtime/
    ├── plugin.ts              # Nuxt plugin for Vue app setup
    └── components/
        └── index.ts           # Component placeholder

package.json                   # Added @nuxt/kit, updated exports
tsconfig.json                  # Excluded Nuxt files from build
vite.config.ts                 # Excluded Nuxt files from build
README.md                       # Added Nuxt setup section
docs/
├── guide/
│   └── nuxt.md               # Comprehensive Nuxt guide
└── .vitepress/
    └── config.ts             # Added Nuxt guide to sidebar
```

## Compatibility

| Version  | Support |
| -------- | ------- |
| Vue 3.3+ | ✅ Full |
| Nuxt 3   | ✅ Full |
| Nuxt 4   | ✅ Full |

## Next Steps

Users can now:

1. Install the package
2. Add the module to `nuxt.config.ts`
3. Start using `<JsonViewer />` components immediately
4. Refer to the comprehensive Nuxt guide for advanced configurations
