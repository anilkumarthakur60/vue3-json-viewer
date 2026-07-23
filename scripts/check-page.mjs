#!/usr/bin/env node
// Post-build guard for the vue3-json-viewer landing page.
//
// vue-tsc validates the template bindings and props at build time, but it
// cannot catch a demo that compiles and then renders nothing — a viewer handed
// the wrong ref, a v-model that doesn't reach the tree, a theme toggle wired to
// a dead handler. So this mounts the REAL built bundle in jsdom (the repo's own
// test DOM), lets Vue run, and asserts the trees actually render and react.
//
// Usage:  node scripts/check-page.mjs [outDir]     (default: demo-dist)

import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { readFileSync } from 'node:fs';

const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = resolve(here, '..');
const require = createRequire(resolve(pkgRoot, 'package.json'));

const outDir = resolve(pkgRoot, process.argv[2] ?? 'demo-dist');

const failures = [];
const check = (condition, msg) => {
  if (!condition) failures.push(msg);
};
const tick = () => new Promise((r) => setTimeout(r, 0));

// ------------------------------------------------------------------ bootstrap

const html = readFileSync(resolve(outDir, 'index.html'), 'utf8');

const scriptSrc = html.match(
  /<script[^>]+type="module"[^>]+src="([^"]+)"/,
)?.[1];
if (!scriptSrc) {
  console.error('✗ check-page: no module script found in index.html');
  process.exit(1);
}

const { JSDOM } = require('jsdom');
const dom = new JSDOM(html, {
  url: 'http://localhost/',
  pretendToBeVisual: true,
});

for (const key of [
  'window',
  'document',
  'navigator',
  'getComputedStyle',
  'requestAnimationFrame',
  'cancelAnimationFrame',
  'MutationObserver',
  'HTMLElement',
  'SVGElement',
  'MathMLElement',
  'Element',
  'Node',
  'DocumentFragment',
  'Text',
  'Event',
  'CustomEvent',
  'MouseEvent',
]) {
  if (dom.window[key] === undefined) continue;
  Object.defineProperty(globalThis, key, {
    value: dom.window[key] ?? dom.window,
    configurable: true,
    writable: true,
  });
}

// The built app mounts createApp(App).mount('#app') on import.
await import(
  pathToFileURL(resolve(outDir, scriptSrc.replace(/^\.?\//, ''))).href
);
await tick();
await tick();

const doc = dom.window.document;
const $ = (sel) => doc.querySelector(sel);
const $$ = (sel) => [...doc.querySelectorAll(sel)];
const text = (sel) => $(sel)?.textContent ?? '';
const click = (el) =>
  el?.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));

// --------------------------------------------------------------- app mounted

check(
  $('#app')?.childElementCount > 0,
  '#app is empty — the Vue app did not mount.',
);
check(
  /^v\d/.test(text('#version-badge')),
  '#version-badge: version was not injected.',
);

// The hero viewer must render the data, not an empty shell: a known key from
// the hero payload has to appear in its DOM.
check(
  ($('#hero-viewer')?.textContent ?? '').includes('Ada Lovelace'),
  '#hero-viewer: rendered no data (expected a value from the hero payload).',
);
check(
  ($('#types-viewer')?.textContent ?? '').includes('hello, world'),
  '#types-viewer: rendered no data.',
);

// Several viewers should be present (hero + demos + theming pair).
check(
  $$('#app .json-viewer, #app [class*="json"]').length > 0,
  'no JsonViewer roots found in the app.',
);

// --------------------------------------------------------------- theme toggle

const beforeTheme = $('.page')?.getAttribute('data-theme');
click($('#theme-toggle'));
await tick();
const afterTheme = $('.page')?.getAttribute('data-theme');
check(
  beforeTheme === 'dark' && afterTheme === 'light',
  `theme toggle: data-theme did not flip (was ${beforeTheme}, now ${afterTheme}).`,
);

// --------------------------------------------------------------- paste-your-own

const input = $('#json-input');
check(input != null, '#json-input: the paste-your-own textarea is missing.');
if (input) {
  // Drive v-model: set value + dispatch input, then assert the custom viewer
  // reflects the new JSON.
  input.value = '{"pastedKey":"pastedValue"}';
  input.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
  await tick();
  await tick();
  check(
    ($('#user-viewer')?.textContent ?? '').includes('pastedKey'),
    '#user-viewer: editing the JSON input did not update the viewer (v-model → viewer is broken).',
  );

  // And an invalid payload must surface the error branch, not crash.
  input.value = '{ not valid';
  input.dispatchEvent(new dom.window.Event('input', { bubbles: true }));
  await tick();
  await tick();
  check(
    $('#parse-error') != null,
    '#user-viewer: invalid JSON did not show the error message.',
  );
}

// ---------------------------------------------------------------------- report

if (failures.length > 0) {
  console.error(`\n✗ check-page: ${failures.length} problem(s) in ${outDir}\n`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(`✓ check-page: landing demos verified in ${outDir}`);
