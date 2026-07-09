# FAQ & Troubleshooting

## The viewer has no styling / looks unstyled

You almost certainly forgot to import the stylesheet. Add this once in your app:

```ts
import '@anilkumarthakur/vue3-json-viewer/styles.css';
```

## Do I still need `:key` to make expand/collapse work?

**No.** Older examples used `:key="String(expanded)"` to force a remount. That
was a workaround for a bug where collapsing a parent wiped nested state. It's
fixed — the `expanded` prop is reactive and node state persists on its own.
Remove the `:key` hack:

```vue
<!-- ❌ No longer needed -->
<JsonViewer :data="data" :expanded="expanded" :key="String(expanded)" />

<!-- ✅ Just bind the prop -->
<JsonViewer :data="data" :expanded="expanded" />
```

## Copy does nothing / "Copied" never appears

The copy button reflects success only when the write actually succeeds. It uses
the async Clipboard API when available and falls back to `execCommand('copy')`
otherwise. If both fail (rare), nothing is copied and no `copy` event fires.
Common causes:

- Some browsers restrict clipboard writes to user-initiated events — the button
  click qualifies, so this is usually fine.
- A value that can't be serialized (a circular reference) resolves to a failed
  copy by design. See [Copy to Clipboard](/guide/copy).

## Does it emit an event when I expand/collapse?

Yes — the [`toggle` event](/api/events). There's also a [`copy` event](/api/events).
Both are fully typed.

## My object shows as `{}` even though it has data

Non-plain objects (`Map`, `Set`, class instances) are enumerated with
`Object.entries()`, which returns their **own enumerable** properties only.
Convert them to plain objects/arrays first:

```ts
const plain = Object.fromEntries(myMap);
const arr = [...mySet];
```

## Can I customize the colors?

There's no color-theme prop yet. Toggle the two built-in themes with
`darkMode`, and override the `jv-*` CSS classes for anything else. See
[Custom Styling](/guide/styling).

## Is it accessible / keyboard-navigable?

Toggling is currently mouse/tap driven (click on keys, brackets, badges, or the
count label). Full keyboard navigation and ARIA roles are not yet implemented;
contributions are welcome.

## How big is it?

About **3.7 KB gzipped** (ESM). The only dependency is Vue 3 as a peer
dependency.

## Which Vue version is required?

Vue **3.3.0** or higher (declared as a peer dependency).

## How do I show a huge JSON file without jank?

Collapsed subtrees aren't rendered, so start collapsed for large payloads:

```vue
<JsonViewer :data="bigData" :expanded="false" />
```

There is no built-in virtualization; for very large arrays consider paginating
the data yourself. See [Large JSON](/examples/large-json).

## TypeScript can't find the types

Types ship with the package (`types` field in `package.json`). Ensure your
`moduleResolution` is `bundler` or `node16`/`nodenext`, and import types from
the package root:

```ts
import type { JsonViewerProps } from '@anilkumarthakur/vue3-json-viewer';
```
