<template>
  <div
    :class="[
      'jv-node',
      {
        'jv-root': level === 0,
        'jv-dark': darkMode && level === 0,
        'jv-light': !darkMode && level === 0,
      },
    ]"
  >
    <!-- Object -->
    <div v-if="isObject && !isDate && !isRegExp" class="jv-item">
      <div class="jv-row">
        <span
          v-if="!isArrayItem && parentKey"
          class="jv-key"
          :style="{ color: getKeyColor(level) }"
          >"{{ parentKey }}"</span
        >
        <span v-if="!isArrayItem && parentKey" class="jv-colon">: </span>
        <span
          class="jv-toggle"
          :style="{ color: getBracketColor(level) }"
          @click="toggle"
        >
          <span v-if="isEmpty">{}</span>
          <span v-else>{{ expanded ? '{' : '{...}' }}</span>
        </span>
        <span
          v-if="!isEmpty && !expanded"
          class="jv-count"
          :class="darkMode ? 'jv-count-dark' : 'jv-count-light'"
          @click="toggle"
          >{{ objectSize }} {{ objectSize === 1 ? 'key' : 'keys' }}</span
        >
        <button
          class="jv-copy-btn"
          :class="darkMode ? 'jv-copy-btn-dark' : 'jv-copy-btn-light'"
          @click.stop="copyToClipboard"
          :title="copySuccess ? 'Copied!' : 'Copy'"
        >
          <svg
            v-if="!copySuccess"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path
              d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
            ></path>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
      </div>
      <div v-if="expanded && !isEmpty" class="jv-children" :style="{ borderColor: getBracketColor(level) + '40' }">
        <NestedComponent
          v-for="(value, key, index) in data"
          :key="key"
          :data="value"
          :parentKey="String(key)"
          :level="level + 1"
          :darkMode="darkMode"
          :expanded="expanded"
          :isArrayItem="false"
          :isLast="index === objectSize - 1"
        />
      </div>
      <div v-if="expanded && !isEmpty" class="jv-row">
        <span
          class="jv-bracket"
          :style="{ color: getBracketColor(level) }"
          >}{{ isLast ? '' : ',' }}</span
        >
      </div>
    </div>

    <!-- Array -->
    <div v-else-if="isArray" class="jv-item">
      <div class="jv-row">
        <span
          v-if="!isArrayItem && parentKey"
          class="jv-key"
          :style="{ color: getKeyColor(level) }"
          >"{{ parentKey }}"</span
        >
        <span v-if="!isArrayItem && parentKey" class="jv-colon">: </span>
        <span
          class="jv-toggle"
          :style="{ color: getBracketColor(level) }"
          @click="toggle"
        >
          <span v-if="isEmpty">[]</span>
          <span v-else>{{ expanded ? '[' : '[...]' }}</span>
        </span>
        <span
          v-if="!isEmpty && !expanded"
          class="jv-count"
          :class="darkMode ? 'jv-count-dark' : 'jv-count-light'"
          @click="toggle"
          >{{ arrayLength }} {{ arrayLength === 1 ? 'item' : 'items' }}</span
        >
        <button
          class="jv-copy-btn"
          :class="darkMode ? 'jv-copy-btn-dark' : 'jv-copy-btn-light'"
          @click.stop="copyToClipboard"
          :title="copySuccess ? 'Copied!' : 'Copy'"
        >
          <svg
            v-if="!copySuccess"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path
              d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
            ></path>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
      </div>
      <div v-if="expanded && !isEmpty" class="jv-children" :style="{ borderColor: getBracketColor(level) + '40' }">
        <NestedComponent
          v-for="(item, index) in data"
          :key="index"
          :data="item"
          :parentKey="''"
          :level="level + 1"
          :darkMode="darkMode"
          :expanded="expanded"
          :isArrayItem="true"
          :isLast="index === arrayLength - 1"
        />
      </div>
      <div v-if="expanded && !isEmpty" class="jv-row">
        <span
          class="jv-bracket"
          :style="{ color: getBracketColor(level) }"
          >]{{ isLast ? '' : ',' }}</span
        >
      </div>
    </div>

    <!-- Primitive Values -->
    <div v-else class="jv-item jv-primitive">
      <div class="jv-row">
        <span
          v-if="!isArrayItem && parentKey"
          class="jv-key"
          :style="{ color: getKeyColor(level) }"
          >"{{ parentKey }}"</span
        >
        <span v-if="!isArrayItem && parentKey" class="jv-colon">: </span>
        <span :class="valueClass">{{ formattedValue }}</span>
        <span v-if="!isLast" class="jv-comma">,</span>
        <button
          class="jv-copy-btn"
          :class="darkMode ? 'jv-copy-btn-dark' : 'jv-copy-btn-light'"
          @click.stop="copyToClipboard"
          :title="copySuccess ? 'Copied!' : 'Copy'"
        >
          <svg
            v-if="!copySuccess"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path
              d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
            ></path>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';

interface Props {
  data: any;
  parentKey?: string;
  level?: number;
  darkMode?: boolean;
  expanded?: boolean;
  isArrayItem?: boolean;
  isLast?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  parentKey: '',
  level: 0,
  darkMode: true,
  expanded: true,
  isArrayItem: false,
  isLast: true,
});

const isExpanded = ref(props.expanded);
const copySuccess = ref(false);

onMounted(() => {
  // Always expand root level
  if (props.level === 0) {
    isExpanded.value = true;
  }
});

const expanded = computed(() => isExpanded.value);

const isObject = computed(
  () =>
    props.data !== null &&
    typeof props.data === 'object' &&
    !Array.isArray(props.data) &&
    !(props.data instanceof Date) &&
    !(props.data instanceof RegExp)
);

const isArray = computed(() => Array.isArray(props.data));
const isDate = computed(() => props.data instanceof Date);
const isRegExp = computed(() => props.data instanceof RegExp);

const isEmpty = computed(() => {
  if (isArray.value) return (props.data as any[]).length === 0;
  if (isObject.value) return Object.keys(props.data as object).length === 0;
  return false;
});

const objectSize = computed(() =>
  isObject.value ? Object.keys(props.data as object).length : 0
);

const arrayLength = computed(() =>
  isArray.value ? (props.data as any[]).length : 0
);

const formattedValue = computed(() => {
  const val = props.data;
  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (typeof val === 'string') return `"${val}"`;
  if (typeof val === 'boolean') return val ? 'true' : 'false';
  if (typeof val === 'number') return String(val);
  if (val instanceof Date) return `"${val.toISOString()}"`;
  if (val instanceof RegExp) return val.toString();
  return String(val);
});

const valueClass = computed(() => {
  const val = props.data;

  if (val === null || val === undefined)
    return `jv-null ${props.darkMode ? 'jv-null-dark' : 'jv-null-light'}`;
  if (typeof val === 'string')
    return `jv-string ${props.darkMode ? 'jv-string-dark' : 'jv-string-light'}`;
  if (typeof val === 'number')
    return `jv-number ${props.darkMode ? 'jv-number-dark' : 'jv-number-light'}`;
  if (typeof val === 'boolean')
    return `jv-boolean ${props.darkMode ? 'jv-boolean-dark' : 'jv-boolean-light'}`;
  if (val instanceof Date)
    return `jv-date ${props.darkMode ? 'jv-date-dark' : 'jv-date-light'}`;
  if (val instanceof RegExp)
    return `jv-regexp ${props.darkMode ? 'jv-regexp-dark' : 'jv-regexp-light'}`;

  return props.darkMode ? 'jv-value-dark' : 'jv-value-light';
});

function toggle() {
  isExpanded.value = !isExpanded.value;
}

// Rainbow colors for nested keys (based on level)
function getKeyColor(level: number): string {
  const darkColors = [
    '#89b4fa', // Blue
    '#f5c2e7', // Pink
    '#a6e3a1', // Green
    '#fab387', // Peach
    '#cba6f7', // Mauve
    '#94e2d5', // Teal
    '#f9e2af', // Yellow
    '#89dceb', // Sky
  ];
  const lightColors = [
    '#1971c2', // Blue
    '#c2255c', // Pink
    '#2f9e44', // Green
    '#e8590c', // Orange
    '#7048e8', // Purple
    '#0c8599', // Teal
    '#f59f00', // Yellow
    '#1098ad', // Cyan
  ];
  const colors = props.darkMode ? darkColors : lightColors;
  return colors[level % colors.length];
}

// Rainbow colors for brackets (based on level)
function getBracketColor(level: number): string {
  const darkColors = [
    '#f38ba8', // Red
    '#fab387', // Peach
    '#f9e2af', // Yellow
    '#a6e3a1', // Green
    '#89dceb', // Sky
    '#cba6f7', // Mauve
  ];
  const lightColors = [
    '#e03131', // Red
    '#e8590c', // Orange
    '#f59f00', // Yellow
    '#2f9e44', // Green
    '#1098ad', // Cyan
    '#7048e8', // Purple
  ];
  const colors = props.darkMode ? darkColors : lightColors;
  return colors[level % colors.length];
}

function copyToClipboard() {
  const text = JSON.stringify(props.data, null, 2);
  navigator.clipboard.writeText(text).then(() => {
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 1500);
  });
}
</script>

<style scoped>
.jv-node {
  font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', monospace;
  font-size: 13px;
  line-height: 1.6;
}

.jv-root {
  padding: 16px;
  border-radius: 8px;
  overflow: auto;
}

.jv-dark {
  background: linear-gradient(135deg, #1e1e2e 0%, #2d2d3f 100%);
  color: #cdd6f4;
}

.jv-light {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  color: #343a40;
}

.jv-item {
  margin-left: 0;
}

.jv-children {
  margin-left: 20px;
  padding-left: 12px;
  border-left: 2px solid;
}

.jv-row {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 2px 0;
  position: relative;
}

.jv-row:hover .jv-copy-btn {
  opacity: 1;
}

.jv-key {
  font-weight: 500;
}

.jv-key-dark {
  color: #89b4fa;
}

.jv-key-light {
  color: #1971c2;
}

.jv-colon {
  margin-right: 4px;
}

.jv-toggle {
  cursor: pointer;
  font-weight: 600;
  transition: color 0.2s;
}

.jv-toggle:hover {
  opacity: 0.8;
}

.jv-toggle-dark {
  color: #cdd6f4;
}

.jv-toggle-light {
  color: #495057;
}

.jv-bracket {
  font-weight: 600;
}

.jv-bracket-dark {
  color: #cdd6f4;
}

.jv-bracket-light {
  color: #495057;
}

.jv-count {
  margin-left: 8px;
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.jv-count-dark {
  background: rgba(137, 180, 250, 0.15);
  color: #89b4fa;
}

.jv-count-light {
  background: rgba(25, 113, 194, 0.1);
  color: #1971c2;
}

.jv-count:hover {
  opacity: 0.8;
}

/* Value Colors */
.jv-string-dark {
  color: #a6e3a1;
}
.jv-string-light {
  color: #2f9e44;
}

.jv-number-dark {
  color: #fab387;
}
.jv-number-light {
  color: #e8590c;
}

.jv-boolean-dark {
  color: #f9e2af;
}
.jv-boolean-light {
  color: #f59f00;
}

.jv-null-dark {
  color: #f38ba8;
  font-style: italic;
}
.jv-null-light {
  color: #e03131;
  font-style: italic;
}

.jv-date-dark {
  color: #94e2d5;
}
.jv-date-light {
  color: #0c8599;
}

.jv-regexp-dark {
  color: #cba6f7;
}
.jv-regexp-light {
  color: #7048e8;
}

.jv-comma {
  color: inherit;
  opacity: 0.6;
}

.jv-copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  padding: 4px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s;
  background: transparent;
}

.jv-copy-btn:hover {
  transform: scale(1.1);
}

.jv-copy-btn-dark {
  color: #89b4fa;
}

.jv-copy-btn-dark:hover {
  background: rgba(137, 180, 250, 0.15);
}

.jv-copy-btn-light {
  color: #1971c2;
}

.jv-copy-btn-light:hover {
  background: rgba(25, 113, 194, 0.1);
}

.jv-primitive .jv-copy-btn {
  opacity: 0;
}

.jv-primitive:hover .jv-copy-btn {
  opacity: 1;
}
</style>
