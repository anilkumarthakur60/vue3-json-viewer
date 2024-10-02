<template>
  <div
    :class="{
      'json-viewer-dark': darkMode && level === 0,
      'json-viewer-light': !darkMode && level === 0,
    }"
    :style="{ marginLeft: level * 10 + 'px', padding: '2px 0' }"
  >
    <div v-if="isObject">
      <span @click="toggle">
        <ChevronDownIcon
          v-if="expanded"
          :class="[
            'toggle-btn',
            darkMode ? 'toggle-btn-dark' : 'toggle-btn-light',
          ]"
          class="margin-lr-5 height10 width10"
        />
        <ChevronRightIcon
          :class="[
            'toggle-btn',
            darkMode ? 'toggle-btn-dark' : 'toggle-btn-light',
          ]"
          v-if="!expanded"
          class="margin-lr-5 height10 width10"
        />
        <span
          :style="{ color: getBracketColor(level) }"
          class="type-label"
          >{{ parentKey }} {</span
        >
        <span
          v-if="level !== 0"
          :style="{ color: getBracketColor(level) }"
          class="key-count margin-lr-5"
          >{{ Object.keys(props.data).length }} ...</span
        >
      </span>

      <DocumentDuplicateIcon
        :class="[
          'copy-icon margin-lr-5',
          darkMode ? 'copy-icon-dark' : 'copy-icon-light',
        ]"
        @click="copyNode"
      />

      <div
        v-show="expanded"
        :class="[
          'node-children',
          darkMode ? 'node-children-dark' : 'node-children-light',
        ]"
      >
        <JsonViewer
          v-for="(value, key) in props.data"
          :key="key"
          :darkMode="darkMode"
          :data="value"
          :level="level + 1"
          :parentKey="key"
        />
      </div>

      <span
        :class="[
          'toggle-btn',
          darkMode ? 'toggle-btn-dark' : 'toggle-btn-light',
        ]"
        @click="toggle"
        >},</span
      >
    </div>
    <div v-else-if="isArray">
      <span @click="toggle">
        <ChevronDownIcon
          v-if="expanded"
          :class="[
            'toggle-btn',
            darkMode ? 'toggle-btn-dark' : 'toggle-btn-light',
          ]"
          class="margin-lr-5 height10 width10"
        />
        <ChevronRightIcon
          v-else
          :class="[
            'toggle-btn',
            darkMode ? 'toggle-btn-dark' : 'toggle-btn-light',
          ]"
          class="margin-lr-5 height10 width10"
        />
        <span
          :style="{ color: getBracketColor(level) }"
          class="type-label"
          >{{ parentKey }}
          <span
            :style="{ color: getBracketColor(level) }"
            class="key-count"
          >
            [{{ Object.keys(props.data).length }}]...</span
          >
        </span>
      </span>
      <DocumentDuplicateIcon
        :class="[
          'copy-icon margin-lr-5',
          darkMode ? 'copy-icon-dark' : 'copy-icon-light',
        ]"
        @click="copyNode"
      />
      <div
        v-show="expanded"
        :class="[
          'node-children',
          darkMode ? 'node-children-dark' : 'node-children-light',
        ]"
      >
        <JsonViewer
          v-for="(item, index) in props.data"
          :key="index"
          :darkMode="darkMode"
          :data="item"
          :level="level + 1"
          :parentKey="`${parentKey}[${index}]`"
        />
      </div>
    </div>
    <div
      v-else
      :class="['leaf-node', darkMode ? 'leaf-node-dark' : 'leaf-node-light']"
    >
      <span @click="toggle">
        <span :class="['key', darkMode ? 'key-dark' : 'key-light']">{{
          parentKey
        }}</span
        >:
        <span :class="[valueClass, darkMode ? 'value-dark' : 'value-light']">
          {{ displayValue }}
        </span>
      </span>
      <DocumentDuplicateIcon
        v-if="isCopyable"
        :class="[
          'copy-icon margin-lr-5',
          darkMode ? 'copy-icon-dark' : 'copy-icon-light',
        ]"
        @click="copyNode"
      />
    </div>
  </div>
</template>
<script setup>
  import { computed, defineProps, onMounted, ref } from 'vue';
  import {
    DocumentDuplicateIcon,
    ChevronDownIcon,
    ChevronRightIcon,
  } from '@heroicons/vue/24/solid';

  const props = defineProps({
    data: {
      type: [Object, Array, String, Number, Boolean, Function, Date, RegExp],
      required: false,
    },
    level: {
      type: Number,
      default: 0,
    },
    parentKey: {
      type: [String, Number],
      default: '',
    },
    darkMode: {
      type: Boolean,
      default: true,
    },
  });

  const expanded = ref(true);

  onMounted(() => {
    if (props.level === 0) {
      expanded.value = true;
    }
  });

  const isObject = computed(
    () =>
      typeof props.data === 'object' &&
      !Array.isArray(props.data) &&
      props.data !== null,
  );
  const isArray = computed(() => Array.isArray(props.data));
  const isCopyable = computed(
    () =>
      ['string', 'number', 'boolean', 'object'].includes(typeof props.data) &&
      props.data !== null,
  );
  const displayValue = computed(() => {
    if (typeof props.data === 'string') return `"${props.data}"`;
    if (props.data instanceof Date) return props.data.toISOString();
    if (props.data instanceof RegExp) return props.data.toString();
    return props.data;
  });
  const valueClass = computed(() => {
    if (typeof props.data === 'string') return 'string-value';
    if (typeof props.data === 'number') return 'number-value';
    if (typeof props.data === 'boolean') return 'boolean-value';
    if (props.data === null) return 'null-value';
    if (props.data instanceof Date) return 'date-value';
    if (props.data instanceof RegExp) return 'regexp-value';
    return '';
  });
  const displayDataType = computed(() => {
    if (typeof props.data === 'string') return 'string';
    if (typeof props.data === 'number') return 'number';
    if (typeof props.data === 'boolean') return 'boolean';
    if (props.data === null) return 'null';
    if (props.data instanceof Date) return 'date';
    if (props.data instanceof RegExp) return 'regexp';
    if (Array.isArray(props.data)) return 'array';
    if (typeof props.data === 'function') return 'function';
    if (typeof props.data === 'undefined') return 'undefined';
    if (typeof props.data === 'object') return 'object';
    return 'unknown';
  });

  function toggle() {
    expanded.value = !expanded.value;
  }

  function copyNode() {
    const nodeData = JSON.stringify(props.data, null, 2);
    navigator.clipboard.writeText(nodeData);
  }

  function getBracketColor(level) {
    const colors = props.darkMode
      ? ['#e06c75', '#e5c07b', '#98c379', '#56b6c2', '#61afef', '#c678dd']
      : ['#d32f2f', '#fbc02d', '#388e3c', '#0288d1', '#1976d2', '#7b1fa2'];
    return colors[level % colors.length];
  }
</script>

<style lang="scss">
  $json-viewer-font-family: 'Courier New', Courier, monospace;
  $json-viewer-font-size: 14px;
  $dark-mode-color: #f8f8f2;
  $light-mode-color: #282c34;
  $dark-mode-bg-color: #282c34;
  $light-mode-bg-color: #f8f8f2;
  $key-dark-mode-color: #d19a66;
  $key-light-mode-color: #8d6e63;
  $string-dark-mode-color: #98c379;
  $string-light-mode-color: #388e3c;
  $number-dark-mode-color: #d19a66;
  $number-light-mode-color: #f57c00;
  $boolean-dark-mode-color: #56b6c2;
  $boolean-light-mode-color: #0288d1;
  $null-dark-mode-color: #9cdcfe;
  $null-light-mode-color: #00acc1;
  $date-dark-mode-color: #e5c07b;
  $date-light-mode-color: #fbc02d;
  $regexp-dark-mode-color: #c678dd;
  $regexp-light-mode-color: #7b1fa2;
  $toggle-dark-mode-color: #61dafb;
  $toggle-light-mode-color: #1976d2;
  $border-dark-mode-color: #444;
  $border-light-mode-color: #bdbdbd;

  .json-viewer-dark,
  .json-viewer-light {
    font-family: $json-viewer-font-family;
    font-size: $json-viewer-font-size;
    padding: 15px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .json-viewer-dark {
    color: $dark-mode-color;
    background-color: $dark-mode-bg-color;
  }

  .json-viewer-light {
    color: $light-mode-color;
    background-color: $light-mode-bg-color;
  }

  span {
    cursor: pointer;
  }

  .key {
    font-weight: bold;
  }

  .key-dark {
    color: $key-dark-mode-color;
  }

  .key-light {
    color: $key-light-mode-color;
  }

  .string-value {
    color: $string-dark-mode-color;
  }

  .string-value-light {
    color: $string-light-mode-color;
  }

  .number-value {
    color: $number-dark-mode-color;
  }

  .number-value-light {
    color: $number-light-mode-color;
  }

  .boolean-value {
    color: $boolean-dark-mode-color;
  }

  .boolean-value-light {
    color: $boolean-light-mode-color;
  }

  .null-value {
    color: $null-dark-mode-color;
  }

  .null-value-light {
    color: $null-light-mode-color;
  }

  .date-value {
    color: $date-dark-mode-color;
  }

  .date-value-light {
    color: $date-light-mode-color;
  }

  .regexp-value {
    color: $regexp-dark-mode-color;
  }

  .regexp-value-light {
    color: $regexp-light-mode-color;
  }

  .toggle-btn {
    cursor: pointer;
  }

  .toggle-btn-dark {
    color: $toggle-dark-mode-color;
  }

  .toggle-btn-light {
    color: $toggle-light-mode-color;
  }

  .type-label {
    font-style: italic;
    margin-left: 5px;
  }

  .node-children {
    margin-left: 20px;
    padding-left: 10px;
  }

  .node-children-dark {
    border-left: 1px dashed $border-dark-mode-color;
  }

  .node-children-light {
    border-left: 1px dashed $border-light-mode-color;
  }

  .leaf-node {
    padding: 2px 0;
    display: flex;
    align-items: center;
  }

  .leaf-node-dark {
    background-color: $dark-mode-bg-color;
  }

  .leaf-node-light {
    background-color: $light-mode-bg-color;
  }

  .copy-icon {
    cursor: pointer;
    width: 12px;
    height: 12px;
  }

  .copy-icon-dark {
    color: $toggle-dark-mode-color;
  }

  .copy-icon-light {
    color: $toggle-light-mode-color;
  }

  .margin-lr-5 {
    margin-left: 5px;
    margin-right: 5px;
  }

  .height10 {
    height: 10px;
  }

  .width10 {
    width: 10px;
  }

  .node-header {
    display: flex;
    align-items: center;
  }
</style>
