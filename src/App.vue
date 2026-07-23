<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { JsonViewer } from './components';
  import type { CopyEventPayload, JsonValue } from './types';

  // Replaced at build time by `define` in vite.demo.config.ts; declared for
  // TypeScript in vite-env.d.ts. This tells ESLint's no-undef it's a global.
  /* global __PKG_VERSION__ */
  const version = __PKG_VERSION__;

  // --- Page theme -----------------------------------------------------------
  // One ref drives both the page chrome and every viewer's `darkMode`, except
  // the side-by-side theming demo, which pins each side deliberately.
  const dark = ref(true);

  // --- Hero payload ---------------------------------------------------------
  // A realistic API response — objects, arrays, and a spread of value types.
  const hero: JsonValue = {
    id: 'usr_9f8c1a',
    name: 'Ada Lovelace',
    active: true,
    roles: ['admin', 'author'],
    profile: {
      title: 'Countess of Lovelace',
      joined: new Date('1843-07-10T09:00:00Z'),
      location: { city: 'London', lat: 51.5074, lng: -0.1278 },
    },
    posts: [
      { id: 1, title: 'Notes on the Analytical Engine', views: 1843 },
      { id: 2, title: 'On Poetical Science', views: 512 },
    ],
    balance: -27.5,
    lastSeen: null,
  };

  // --- Every value type it renders -----------------------------------------
  const types: JsonValue = {
    string: 'hello, world',
    number: 42,
    float: -2.757,
    boolean: true,
    nullValue: null,
    undefinedValue: undefined,
    date: new Date('2026-01-01T12:00:00Z'),
    regex: /[a-z]\d+/gi,
    fn: function greet() {
      return 'hi';
    },
    emptyObject: {},
    emptyArray: [],
    emptyString: '',
    zero: 0,
  };

  // --- Deep nesting (shows the rainbow bracket colours) ---------------------
  const deep: JsonValue = {
    level1: {
      level2: { level3: { level4: { level5: { deepKey: 'you made it' } } } },
    },
    siblings: [{ a: 1 }, { b: 2 }, { c: 3 }],
  };

  // --- Collapse / expand all ------------------------------------------------
  const expanded = ref(true);

  // --- Copy: reflect the last copied path -----------------------------------
  const lastCopied = ref<string | null>(null);
  const onCopy = (payload: CopyEventPayload): void => {
    lastCopied.value = payload.path;
  };

  // --- Paste-your-own -------------------------------------------------------
  const sampleInput = JSON.stringify(
    {
      product: 'Widget',
      price: 19.99,
      tags: ['new', 'featured'],
      inStock: true,
      meta: { sku: 'WdgT-01', dimensions: { w: 10, h: 4 } },
    },
    null,
    2,
  );
  const userInput = ref(sampleInput);
  const parsed = computed<{ data: JsonValue; error: string | null }>(() => {
    if (!userInput.value.trim()) return { data: {}, error: null };
    try {
      return { data: JSON.parse(userInput.value) as JsonValue, error: null };
    } catch (err) {
      return {
        data: {},
        error: err instanceof Error ? err.message : 'Invalid JSON',
      };
    }
  });

  const copyInstall = ref(false);
  const install = 'npm i @anilkumarthakur/vue3-json-viewer';
  const doCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(install);
      copyInstall.value = true;
      setTimeout(() => (copyInstall.value = false), 1400);
    } catch {
      // clipboard is permission-gated; ignore
    }
  };
</script>

<template>
  <div
    class="page"
    :class="dark ? 'is-dark' : 'is-light'"
    :data-theme="dark ? 'dark' : 'light'"
  >
    <header class="site-header">
      <div class="shell header-inner">
        <div class="brand">
          <span
            class="brand-mark"
            aria-hidden="true"
            >{ }</span
          >
          <span class="brand-name">vue3-json-viewer</span>
          <span
            class="brand-version"
            id="version-badge"
            >v{{ version }}</span
          >
        </div>
        <div class="header-actions">
          <button
            type="button"
            class="theme-toggle"
            id="theme-toggle"
            :aria-pressed="dark"
            @click="dark = !dark"
          >
            {{ dark ? '🌙 Dark' : '☀️ Light' }}
          </button>
          <nav
            class="header-links"
            aria-label="Project"
          >
            <a
              href="https://www.npmjs.com/package/@anilkumarthakur/vue3-json-viewer"
              >npm</a
            >
            <a href="https://github.com/anilkumarthakur60/vue3-json-viewer"
              >GitHub</a
            >
          </nav>
        </div>
      </div>
    </header>

    <main>
      <!-- ---------------------------------------------------------------- -->
      <section class="hero">
        <div class="shell hero-inner">
          <div class="hero-copy">
            <p class="eyebrow">Vue 3 · TypeScript</p>
            <h1>Read JSON<br />at a glance.</h1>
            <p class="lead">
              A fast, type-aware JSON tree viewer for Vue 3. Colour-coded by
              value type, rainbow-bracketed by depth, collapsible per node,
              click-to-copy — light or dark, with zero dependencies beyond Vue.
            </p>
            <div class="install">
              <code id="install-cmd">{{ install }}</code>
              <button
                type="button"
                class="copy-btn"
                id="install-copy"
                @click="doCopy"
              >
                {{ copyInstall ? 'Copied' : 'Copy' }}
              </button>
            </div>
            <ul class="hero-stats">
              <li><strong>0</strong><span>deps beyond Vue</span></li>
              <li><strong>every</strong><span>JSON type rendered</span></li>
              <li><strong>light + dark</strong><span>built in</span></li>
            </ul>
          </div>
          <div class="hero-demo">
            <div
              class="viewer-card"
              id="hero-viewer"
            >
              <JsonViewer
                :data="hero"
                :dark-mode="dark"
                :expanded="true"
                @copy="onCopy"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- ---------------------------------------------------------------- -->
      <section
        class="section"
        id="demos"
      >
        <div class="shell">
          <div class="section-head">
            <h2>Live demos</h2>
            <p>
              Every viewer below is the real component. Click a key to copy,
              click a bracket to collapse.
            </p>
          </div>

          <div class="demo-grid">
            <article class="panel">
              <div class="panel-head"
                ><span class="panel-title">Every value type</span></div
              >
              <div class="panel-body">
                <p class="panel-note">
                  Strings, numbers, booleans, <code>null</code>,
                  <code>undefined</code>, <code>Date</code>,
                  <code>RegExp</code>, functions and empty containers — each
                  coloured by what it is.
                </p>
                <div
                  class="viewer-card"
                  id="types-viewer"
                >
                  <JsonViewer
                    :data="types"
                    :dark-mode="dark"
                    :expanded="true"
                  />
                </div>
              </div>
            </article>

            <article class="panel">
              <div class="panel-head"
                ><span class="panel-title">Deep nesting</span></div
              >
              <div class="panel-body">
                <p class="panel-note">
                  Bracket colours cycle by depth so you never lose your place.
                  Collapse any level and the rest keeps its own state.
                </p>
                <div class="viewer-card">
                  <JsonViewer
                    :data="deep"
                    :dark-mode="dark"
                    :expanded="true"
                  />
                </div>
              </div>
            </article>

            <article class="panel">
              <div class="panel-head">
                <span class="panel-title">Collapse / expand all</span>
                <button
                  type="button"
                  class="btn-small"
                  id="toggle-expanded"
                  @click="expanded = !expanded"
                >
                  {{ expanded ? 'Collapse all' : 'Expand all' }}
                </button>
              </div>
              <div class="panel-body">
                <p class="panel-note">
                  Drive it from a prop — flip <code>:expanded</code> and the
                  whole tree follows, while per-node overrides survive.
                </p>
                <div class="viewer-card">
                  <JsonViewer
                    :data="hero"
                    :dark-mode="dark"
                    :expanded="expanded"
                  />
                </div>
              </div>
            </article>

            <article class="panel">
              <div class="panel-head">
                <span class="panel-title">Click to copy</span>
                <span
                  class="panel-hint"
                  id="copy-status"
                >
                  {{ lastCopied ? `copied ${lastCopied}` : 'click any key' }}
                </span>
              </div>
              <div class="panel-body">
                <p class="panel-note">
                  Every key copies its JSONPath (or value) and emits a
                  <code>copy</code> event with the path.
                </p>
                <div class="viewer-card">
                  <JsonViewer
                    :data="types"
                    :dark-mode="dark"
                    :expanded="true"
                    @copy="onCopy"
                  />
                </div>
              </div>
            </article>
          </div>

          <div class="demo-grid demo-grid-wide">
            <article class="panel">
              <div class="panel-head"
                ><span class="panel-title">Paste your own JSON</span></div
              >
              <div class="panel-body">
                <div class="paste-split">
                  <textarea
                    id="json-input"
                    class="json-input"
                    spellcheck="false"
                    v-model="userInput"
                    aria-label="JSON input"
                  ></textarea>
                  <div
                    class="viewer-card"
                    id="user-viewer"
                  >
                    <p
                      v-if="parsed.error"
                      class="parse-error"
                      id="parse-error"
                    >
                      ⚠ {{ parsed.error }}
                    </p>
                    <JsonViewer
                      v-else
                      :data="parsed.data"
                      :dark-mode="dark"
                      :expanded="true"
                    />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ---------------------------------------------------------------- -->
      <section
        class="section section-alt"
        id="theming"
      >
        <div class="shell">
          <div class="section-head">
            <h2>Light &amp; dark</h2>
            <p>
              One <code>:dark-mode</code> prop. Both palettes ship in the box —
              here they are, side by side.
            </p>
          </div>
          <div class="theme-split">
            <div class="viewer-card viewer-card--light">
              <JsonViewer
                :data="hero"
                :dark-mode="false"
                :expanded="true"
              />
            </div>
            <div class="viewer-card viewer-card--dark">
              <JsonViewer
                :data="hero"
                :dark-mode="true"
                :expanded="true"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- ---------------------------------------------------------------- -->
      <section
        class="section"
        id="features"
      >
        <div class="shell">
          <div class="section-head"><h2>Why this one</h2></div>
          <div class="feature-grid">
            <div class="feature">
              <h3>Type-aware colouring</h3>
              <p>
                Strings, numbers, booleans, null, dates, regexes and functions
                each get their own colour — in both themes.
              </p>
            </div>
            <div class="feature">
              <h3>Rainbow brackets</h3>
              <p>
                Nested brackets cycle through a palette by depth, so matching
                pairs are obvious even five levels down.
              </p>
            </div>
            <div class="feature">
              <h3>Per-node collapse</h3>
              <p>
                Collapse any object or array. Each node remembers its own state,
                so it survives collapsing an ancestor.
              </p>
            </div>
            <div class="feature">
              <h3>Click to copy</h3>
              <p
                >Copy a value or its JSONPath in one click, with a
                <code>copy</code> event you can hook into.</p
              >
            </div>
            <div class="feature">
              <h3>Handles everything</h3>
              <p>
                Dates, RegExps, functions, <code>undefined</code>, empty
                containers — no crash on the awkward shapes.
              </p>
            </div>
            <div class="feature">
              <h3>Tiny &amp; typed</h3>
              <p
                >Vue is the only peer; the component is fully typed over your
                data. Import the ESM or UMD build.</p
              >
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="shell">
        <p>
          Built by
          <a href="https://github.com/anilkumarthakur60">Anil Kumar Thakur</a> ·
          MIT licensed · <code>@anilkumarthakur/vue3-json-viewer</code>
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
  .hero-inner {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 48px;
    align-items: center;
  }
  .hero h1 {
    margin: 0 0 18px;
    font-size: clamp(34px, 5.5vw, 54px);
    line-height: 1.06;
    letter-spacing: -0.03em;
    font-weight: 750;
  }
  .eyebrow {
    margin: 0 0 14px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--jv-accent);
  }
  .lead {
    margin: 0 0 24px;
    font-size: 17px;
    color: var(--pg-fg-muted);
    max-width: 52ch;
  }
  .install {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 8px 8px 14px;
    border: 1px solid var(--pg-border);
    border-radius: 10px;
    background: var(--pg-panel);
    margin-bottom: 22px;
    max-width: 100%;
  }
  .install code {
    font-size: 14px;
    white-space: nowrap;
    overflow-x: auto;
  }
  .copy-btn {
    flex: none;
    border: 1px solid var(--pg-border);
    background: var(--pg-code-bg);
    color: var(--pg-fg);
    font: inherit;
    font-size: 13px;
    padding: 4px 12px;
    border-radius: 7px;
    cursor: pointer;
  }
  .hero-stats {
    display: flex;
    gap: 30px;
    margin: 0;
    padding: 0;
    list-style: none;
    flex-wrap: wrap;
  }
  .hero-stats li {
    display: flex;
    flex-direction: column;
  }
  .hero-stats strong {
    font-size: 20px;
    letter-spacing: -0.02em;
  }
  .hero-stats span {
    font-size: 13px;
    color: var(--pg-fg-muted);
  }

  .demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 20px;
  }
  .demo-grid-wide {
    margin-top: 20px;
    grid-template-columns: minmax(0, 1fr);
  }
  .panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 16px;
    border-bottom: 1px solid var(--pg-border);
  }
  .panel-title {
    font-size: 13px;
    font-weight: 650;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .panel-hint {
    font-size: 12px;
    color: var(--pg-fg-muted);
  }
  .panel-body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .panel-note {
    margin: 0;
    font-size: 13px;
    color: var(--pg-fg-muted);
  }
  .btn-small {
    border: 1px solid var(--pg-border-strong);
    background: var(--pg-panel);
    color: var(--pg-fg);
    font: inherit;
    font-size: 12px;
    padding: 4px 11px;
    border-radius: 7px;
    cursor: pointer;
  }

  .paste-split {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 14px;
    align-items: stretch;
  }
  .json-input {
    min-height: 260px;
    resize: vertical;
    border: 1px solid var(--pg-border);
    border-radius: 10px;
    background: var(--pg-code-bg);
    color: var(--pg-fg);
    font-family: 'SFMono-Regular', ui-monospace, Menlo, monospace;
    font-size: 13px;
    line-height: 1.6;
    padding: 12px 14px;
  }
  .parse-error {
    margin: 0;
    color: #e5484d;
    font-size: 13px;
    font-family: 'SFMono-Regular', ui-monospace, Menlo, monospace;
  }

  .theme-split {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
  .viewer-card--light {
    background: #ffffff;
    color: #1f2733;
    border-color: rgba(15, 23, 42, 0.12);
  }
  .viewer-card--dark {
    background: #0f1420;
    color: #e7e9ee;
    border-color: rgba(255, 255, 255, 0.12);
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 26px;
  }
  .feature h3 {
    margin: 0 0 8px;
    font-size: 16px;
    letter-spacing: -0.01em;
  }
  .feature p {
    margin: 0;
    font-size: 14px;
    color: var(--pg-fg-muted);
  }

  @media (max-width: 860px) {
    .hero-inner,
    .paste-split {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
