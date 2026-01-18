# Copy to Clipboard

Vue3 JSON Viewer includes a built-in copy to clipboard feature for easy data extraction.

## How It Works

Hover over any JSON node to reveal the copy button. Click it to copy the value to your clipboard.

## What Gets Copied

The copy function uses `JSON.stringify(value, null, 2)` to create a formatted, readable JSON string:

```json
{
  "name": "John Doe",
  "age": 30
}
```

## Visual Feedback

When you click the copy button:

1. **Before Copy**: Shows a clipboard icon
2. **After Copy**: Shows a checkmark icon ✓
3. **Auto-reset**: Returns to clipboard icon after 1.5 seconds

## Copy Different Node Types

### Copying Objects

```json
// Copies the entire object with formatting
{
  "user": {
    "name": "John",
    "email": "john@example.com"
  }
}
```

### Copying Arrays

```json
// Copies the full array
["reading", "traveling", "coding"]
```

### Copying Primitives

```json
// String
"Hello World"

// Number
42

// Boolean
true
```

## Example Usage

```vue
<script setup lang="ts">
  import { JsonViewer } from '@anilkumarthakur/vue3-json-viewer';
  import '@anilkumarthakur/vue3-json-viewer/styles.css';

  const apiResponse = {
    status: 200,
    data: {
      users: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ],
    },
    timestamp: new Date().toISOString(),
  };
</script>

<template>
  <div>
    <p>Hover over any value and click the copy icon to copy it!</p>
    <JsonViewer
      :data="apiResponse"
      :darkMode="true"
    />
  </div>
</template>
```

## Browser Compatibility

The copy feature uses the modern Clipboard API (`navigator.clipboard.writeText`). This is supported in:

- Chrome 66+
- Firefox 63+
- Safari 13.1+
- Edge 79+

::: warning HTTPS Required
The Clipboard API requires a secure context (HTTPS) or localhost. It won't work on plain HTTP connections.
:::

## Styling

The copy button styling adapts to the theme:

### Dark Mode

- Icon color: `#89b4fa` (blue)
- Hover background: `rgba(137, 180, 250, 0.15)`

### Light Mode

- Icon color: `#1971c2` (blue)
- Hover background: `rgba(25, 113, 194, 0.1)`
