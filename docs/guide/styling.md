# Custom Styling

The viewer ships a single stylesheet and exposes stable, prefixed CSS classes
(`jv-*`) you can target to customize its appearance beyond the built-in themes.

## Importing the Stylesheet

The component's styles are **not** injected automatically — import them once,
anywhere in your app:

```ts
import '@anilkumarthakur/vue3-json-viewer/styles.css';
```

::: tip One import is enough
Import it a single time (e.g. in your entry file). The package marks CSS as a
side effect so bundlers keep it.
:::

## Overriding Styles

Every element carries a `jv-`-prefixed class. Override them in your own
(non-scoped) CSS. For example, to enlarge the font and tweak the container:

```css
.jv-node {
  font-size: 14px;
  font-family: 'SFMono-Regular', ui-monospace, monospace;
}

.jv-root {
  padding: 24px;
  border-radius: 12px;
}
```

## Class Reference

### Layout

| Class            | Element                                             |
| ---------------- | --------------------------------------------------- |
| `jv-node`        | Every node wrapper (sets base font)                 |
| `jv-root`        | The outermost node (padding, radius, scroll)        |
| `jv-dark`        | Applied to the root in dark mode                    |
| `jv-light`       | Applied to the root in light mode                   |
| `jv-item`        | A single object/array entry                         |
| `jv-children`    | The indented container of a node's children         |
| `jv-row`         | One line (key + value / bracket)                    |

### Keys, values & punctuation

| Class          | Element                                        |
| -------------- | ---------------------------------------------- |
| `jv-key`       | Object key label                               |
| `jv-clickable` | Applied to clickable keys/colons               |
| `jv-colon`     | The `:` between key and value                  |
| `jv-comma`     | Trailing commas                                |
| `jv-bracket`   | Closing `}` / `]`                              |
| `jv-string`    | String values (+ `jv-string-dark`/`-light`)    |
| `jv-number`    | Number values (+ `-dark`/`-light`)             |
| `jv-boolean`   | Boolean values (+ `-dark`/`-light`)            |
| `jv-null`      | `null` / `undefined` (+ `-dark`/`-light`)      |
| `jv-date`      | `Date` values (+ `-dark`/`-light`)             |
| `jv-regexp`    | `RegExp` values (+ `-dark`/`-light`)           |

### Controls & badges

| Class                | Element                                              |
| -------------------- | ---------------------------------------------------- |
| `jv-root-controls`   | The "Expand All / Collapse All" bar                  |
| `jv-control-btn`     | A root control button (+ `-dark`/`-light`)           |
| `jv-toggle`          | The clickable type indicator (`{`, `[…]`)            |
| `jv-type-indicator`  | Wrapper around badge + brackets                      |
| `jv-type-badge`      | The small `obj` / count badge                        |
| `jv-type-object`     | Object badge variant                                 |
| `jv-type-array`      | Array badge variant                                  |
| `jv-count`           | Collapsed "N keys / N items" label (+ `-dark`/`-light`) |
| `jv-copy-btn`        | The copy button (+ `-dark`/`-light`)                 |
| `jv-primitive`       | Wrapper for a primitive row                          |

## Example: Compact, Bordered Theme

```css
.jv-root {
  padding: 12px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
}

.jv-node {
  font-size: 12px;
  line-height: 1.5;
}

/* Always show copy buttons instead of on hover */
.jv-copy-btn {
  opacity: 0.4 !important;
}
.jv-copy-btn:hover {
  opacity: 1 !important;
}
```

## What You Can't Change with Props (Yet)

Value colors are applied inline from a built-in palette (see
[Dark / Light Mode](/guide/theming)); there is currently **no prop to pass a
custom color theme**. To recolor values, override the `jv-string`,
`jv-number`, etc. classes with `!important` where needed:

```css
.jv-string-dark {
  color: #7ee787 !important;
}
```

The exported [`ThemeColors` / `JsonViewerTheme`](/api/types#theme-types) types
describe the shape of the built-in palettes for reference.
