<script setup lang="ts">
import { ref, shallowRef, computed } from 'vue';
import { JsonViewer } from '../../../../src';
import type {
  ToggleEventPayload,
  CopyEventPayload,
} from '../../../../src';

const props = withDefaults(
  defineProps<{
    /** Initial JSON as a string (so it can be passed from script-free markdown). */
    json?: string;
    /** Start in dark mode. */
    dark?: boolean;
    /** Start expanded. */
    expanded?: boolean;
    /** Show the theme + expand/collapse toolbar. */
    controls?: boolean;
    /** Show a live event log for @toggle / @copy. */
    events?: boolean;
    /** Show an editable JSON textarea. */
    editable?: boolean;
  }>(),
  {
    json: '{\n  "name": "Vue3 JSON Viewer",\n  "version": "0.5.1",\n  "features": ["dark mode", "expand/collapse", "events", "copy"],\n  "stats": { "stars": 128, "downloads": 42000, "typescript": true },\n  "createdAt": "2024-01-01T00:00:00.000Z",\n  "maintainer": null\n}',
    dark: true,
    expanded: true,
    controls: false,
    events: false,
    editable: false,
  },
);

const darkMode = ref(props.dark);
const exp = ref(props.expanded);
const raw = ref(props.json);
const error = ref('');
const parsed = shallowRef<unknown>({});

function reparse() {
  try {
    parsed.value = JSON.parse(raw.value);
    error.value = '';
  } catch (e) {
    error.value = (e as Error).message;
  }
}
reparse();

const log = ref<string[]>([]);
function record(type: string, payload: ToggleEventPayload | CopyEventPayload) {
  log.value.unshift(`${type.padEnd(7)} ${JSON.stringify(payload)}`);
  if (log.value.length > 8) log.value.pop();
}

const showLog = computed(() => props.events);
</script>

<template>
  <div>
    <div
      v-if="controls"
      class="demo-toolbar"
    >
      <button @click="darkMode = !darkMode">
        {{ darkMode ? '☀️ Light' : '🌙 Dark' }}
      </button>
      <button @click="exp = true">Expand all</button>
      <button @click="exp = false">Collapse all</button>
      <button
        v-if="events"
        @click="log = []"
      >
        Clear log
      </button>
    </div>

    <textarea
      v-if="editable"
      v-model="raw"
      rows="10"
      spellcheck="false"
      class="demo-editor"
      @input="reparse"
    ></textarea>

    <p
      v-if="error"
      class="demo-error"
    >
      ⚠ {{ error }}
    </p>

    <div class="live-demo">
      <JsonViewer
        :data="parsed"
        :dark-mode="darkMode"
        :expanded="exp"
        @toggle="record('toggle', $event)"
        @copy="record('copy', $event)"
      />
    </div>

    <div
      v-if="showLog"
      class="demo-event-log"
    >
      <div
        v-if="!log.length"
        class="empty"
      >
        Interact with the viewer — toggle a node or copy a value — to see events
        here.
      </div>
      <div
        v-for="(e, i) in log"
        :key="i"
      >
        {{ e }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-editor {
  width: 100%;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  margin-bottom: 12px;
}

.demo-error {
  color: var(--vp-c-danger-1);
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
}
</style>
