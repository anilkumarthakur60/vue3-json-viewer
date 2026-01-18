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
    <!-- Root Controls -->
    <div
      v-if="level === 0 && (isObject || isArray)"
      class="jv-root-controls"
    >
      <button
        class="jv-control-btn"
        :class="darkMode ? 'jv-control-btn-dark' : 'jv-control-btn-light'"
        @click="expandAll"
        title="Expand All"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
        Expand All
      </button>
      <button
        class="jv-control-btn"
        :class="darkMode ? 'jv-control-btn-dark' : 'jv-control-btn-light'"
        @click="collapseAll"
        title="Collapse All"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
        Collapse All
      </button>
    </div>

    <!-- Object -->
    <div
      v-if="isObject && !isDate && !isRegExp"
      class="jv-item"
    >
      <div class="jv-row">
        <span
          v-if="!isArrayItem && parentKey"
          class="jv-key"
          :style="{ color: getKeyColorByType() }"
          @click="toggle"
          :class="isObject || isArray ? 'jv-clickable' : ''"
          >"{{ parentKey }}"</span
        >
        <span
          v-if="!isArrayItem && parentKey"
          class="jv-colon"
          @click="toggle"
          :class="isObject || isArray ? 'jv-clickable' : ''"
          >:
        </span>
        <span
          class="jv-toggle jv-type-indicator"
          :style="{ color: getBracketColor(level) }"
          @click="toggle"
        >
          <span class="jv-type-badge jv-type-object">obj</span>
          <span v-if="isEmpty">{}</span>
          <span v-else>{{ isExpanded ? '{' : '{...}' }}</span>
        </span>
        <span
          v-if="!isEmpty && !isExpanded"
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
            <rect
              x="9"
              y="9"
              width="13"
              height="13"
              rx="2"
              ry="2"
            ></rect>
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
      <div
        v-if="isExpanded && !isEmpty"
        class="jv-children"
        :style="{ borderColor: getBracketColor(level) + '40' }"
      >
        <NestedComponent
          v-for="(value, key, index) in data as Record<string, JsonValue>"
          :key="key"
          :data="value"
          :parentKey="String(key)"
          :level="level + 1"
          :darkMode="darkMode"
          :expanded="props.expanded"
          :isArrayItem="false"
          :isLast="index === objectSize - 1"
        />
      </div>
      <div
        v-if="isExpanded && !isEmpty"
        class="jv-row"
      >
        <span
          class="jv-bracket"
          :style="{ color: getBracketColor(level) }"
          >}{{ isLast ? '' : ',' }}</span
        >
      </div>
    </div>

    <!-- Array -->
    <div
      v-else-if="isArray"
      class="jv-item"
    >
      <div class="jv-row">
        <span
          v-if="!isArrayItem && parentKey"
          class="jv-key"
          :style="{ color: getKeyColorByType() }"
          @click="toggle"
          :class="isObject || isArray ? 'jv-clickable' : ''"
          >"{{ parentKey }}"</span
        >
        <span
          v-if="!isArrayItem && parentKey"
          class="jv-colon"
          @click="toggle"
          :class="isObject || isArray ? 'jv-clickable' : ''"
          >:
        </span>
        <span
          class="jv-toggle jv-type-indicator"
          :style="{ color: getBracketColor(level) }"
          @click="toggle"
        >
          <span class="jv-type-badge jv-type-array">{{
            isEmpty ? 'empty' : arrayLength
          }}</span>
          <span v-if="isEmpty">[]</span>
          <span v-else>{{ isExpanded ? '[' : '[...]' }}</span>
        </span>
        <span
          v-if="!isEmpty && !isExpanded"
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
            <rect
              x="9"
              y="9"
              width="13"
              height="13"
              rx="2"
              ry="2"
            ></rect>
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
      <div
        v-if="isExpanded && !isEmpty"
        class="jv-children"
        :style="{ borderColor: getBracketColor(level) + '40' }"
      >
        <NestedComponent
          v-for="(item, index) in data as JsonValue[]"
          :key="index"
          :data="item"
          :parentKey="''"
          :level="level + 1"
          :darkMode="darkMode"
          :expanded="props.expanded"
          :isArrayItem="true"
          :isLast="index === arrayLength - 1"
        />
      </div>
      <div
        v-if="isExpanded && !isEmpty"
        class="jv-row"
      >
        <span
          class="jv-bracket"
          :style="{ color: getBracketColor(level) }"
          >]{{ isLast ? '' : ',' }}</span
        >
      </div>
    </div>

    <!-- Primitive Values -->
    <div
      v-else
      class="jv-item jv-primitive"
    >
      <div class="jv-row">
        <span
          v-if="!isArrayItem && parentKey"
          class="jv-key"
          :style="{ color: getKeyColorByType() }"
          >"{{ parentKey }}"</span
        >
        <span
          v-if="!isArrayItem && parentKey"
          class="jv-colon"
          >:
        </span>
        <span :class="valueClass">{{ formattedValue }}</span>
        <span
          v-if="!isLast"
          class="jv-comma"
          >,</span
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
            <rect
              x="9"
              y="9"
              width="13"
              height="13"
              rx="2"
              ry="2"
            ></rect>
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
  import { computed, ref, onMounted, watch } from 'vue';
  import type { JsonValue, NestedComponentProps } from '../../types';

  const props = withDefaults(defineProps<NestedComponentProps>(), {
    parentKey: '',
    level: 0,
    darkMode: true,
    expanded: true,
    isArrayItem: false,
    isLast: true,
  });

  const isExpanded = ref<boolean>(props.expanded ?? true);
  const copySuccess = ref<boolean>(false);

  onMounted((): void => {
    // Always expand root level
    if (props.level === 0) {
      isExpanded.value = true;
    }
  });

  // Watch for changes to the expanded prop - cascade to all children
  watch(
    () => props.expanded,
    (newValue: boolean | undefined): void => {
      isExpanded.value = newValue ?? true;
    },
    { immediate: true },
  );

  function expandAll(): void {
    if (props.level === 0) {
      isExpanded.value = true;
    }
  }

  function collapseAll(): void {
    if (props.level === 0) {
      isExpanded.value = false;
    }
  }

  const isObject = computed<boolean>(
    (): boolean =>
      props.data !== null &&
      typeof props.data === 'object' &&
      !Array.isArray(props.data) &&
      !(props.data instanceof Date) &&
      !(props.data instanceof RegExp),
  );

  const isArray = computed<boolean>((): boolean => Array.isArray(props.data));
  const isDate = computed<boolean>((): boolean => props.data instanceof Date);
  const isRegExp = computed<boolean>(
    (): boolean => props.data instanceof RegExp,
  );

  const isEmpty = computed<boolean>((): boolean => {
    if (isArray.value) return (props.data as JsonValue[]).length === 0;
    if (isObject.value) return Object.keys(props.data as object).length === 0;
    return false;
  });

  const objectSize = computed<number>((): number =>
    isObject.value ? Object.keys(props.data as object).length : 0,
  );

  const arrayLength = computed<number>((): number =>
    isArray.value ? (props.data as JsonValue[]).length : 0,
  );

  const formattedValue = computed<string>((): string => {
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

  const valueClass = computed<string>((): string => {
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

  function toggle(): void {
    isExpanded.value = !isExpanded.value;
  }

  // Color keys based on value data type
  function getKeyColorByType(): string {
    const val = props.data;

    if (props.darkMode) {
      // Dark mode colors
      if (val === null || val === undefined) return '#f38ba8'; // Red/Pink - null/undefined
      if (typeof val === 'string') return '#a6e3a1'; // Green - string
      if (typeof val === 'number') return '#fab387'; // Peach/Orange - number
      if (typeof val === 'boolean') return '#f9e2af'; // Yellow - boolean
      if (val instanceof Date) return '#94e2d5'; // Teal - date
      if (val instanceof RegExp) return '#cba6f7'; // Purple - regexp
      if (Array.isArray(val)) {
        return val.length === 0 ? '#9399b2' : '#89b4fa'; // Gray for empty, Blue for array
      }
      if (typeof val === 'object' && val !== null) {
        return Object.keys(val).length === 0 ? '#9399b2' : '#f5c2e7'; // Gray for empty, Pink for object
      }
      return '#cdd6f4'; // Default
    } else {
      // Light mode colors
      if (val === null || val === undefined) return '#e03131'; // Red - null/undefined
      if (typeof val === 'string') return '#2f9e44'; // Green - string
      if (typeof val === 'number') return '#e8590c'; // Orange - number
      if (typeof val === 'boolean') return '#f59f00'; // Yellow/Amber - boolean
      if (val instanceof Date) return '#0c8599'; // Teal - date
      if (val instanceof RegExp) return '#7048e8'; // Purple - regexp
      if (Array.isArray(val)) {
        return val.length === 0 ? '#868e96' : '#1971c2'; // Gray for empty, Blue for array
      }
      if (typeof val === 'object' && val !== null) {
        return Object.keys(val).length === 0 ? '#868e96' : '#c2255c'; // Gray for empty, Pink for object
      }
      return '#343a40'; // Default
    }
  }

  // Rainbow colors for brackets (based on level)
  function getBracketColor(level: number): string {
    const darkColors: string[] = [
      '#f38ba8', // Red
      '#fab387', // Peach
      '#f9e2af', // Yellow
      '#a6e3a1', // Green
      '#89dceb', // Sky
      '#cba6f7', // Mauve
    ];
    const lightColors: string[] = [
      '#e03131', // Red
      '#e8590c', // Orange
      '#f59f00', // Yellow
      '#2f9e44', // Green
      '#1098ad', // Cyan
      '#7048e8', // Purple
    ];
    const colors = props.darkMode ? darkColors : lightColors;
    return colors[level % colors.length] ?? colors[0] ?? '#cdd6f4';
  }

  function copyToClipboard(): void {
    const text = JSON.stringify(props.data, null, 2);
    navigator.clipboard.writeText(text).then((): void => {
      copySuccess.value = true;
      setTimeout((): void => {
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

  .jv-root-controls {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  }

  .jv-control-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border: 1px solid;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    transition: all 0.2s;
  }

  .jv-control-btn-dark {
    background: rgba(137, 180, 250, 0.1);
    border-color: rgba(137, 180, 250, 0.3);
    color: #89b4fa;
  }

  .jv-control-btn-dark:hover {
    background: rgba(137, 180, 250, 0.2);
    border-color: rgba(137, 180, 250, 0.5);
  }

  .jv-control-btn-light {
    background: rgba(25, 113, 194, 0.1);
    border-color: rgba(25, 113, 194, 0.3);
    color: #1971c2;
  }

  .jv-control-btn-light:hover {
    background: rgba(25, 113, 194, 0.2);
    border-color: rgba(25, 113, 194, 0.5);
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
    font-weight: 600;
    cursor: pointer;
  }

  .jv-clickable {
    transition: opacity 0.2s;
  }

  .jv-clickable:hover {
    opacity: 0.7;
  }

  /* Type badges */
  .jv-type-indicator {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .jv-type-badge {
    font-size: 9px;
    font-weight: 600;
    padding: 1px 4px;
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .jv-type-object {
    background: rgba(245, 194, 231, 0.2);
    color: #f5c2e7;
  }

  .jv-light .jv-type-object {
    background: rgba(194, 37, 92, 0.1);
    color: #c2255c;
  }

  .jv-type-array {
    background: rgba(137, 180, 250, 0.2);
    color: #89b4fa;
  }

  .jv-light .jv-type-array {
    background: rgba(25, 113, 194, 0.1);
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
