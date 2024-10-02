<template>
  <div
    :class="{
      'json-viewer-dark': darkMode && level === 0,
      'json-viewer-light': !darkMode && level === 0,
    }"
    :style="{ marginLeft: level * 10 + 'px', padding: '2px 0' }"
  >
    <div v-if="isObject">
      <span
        v-if="level !== 0"
        :class="[
          'toggle-btn',
          darkMode ? 'toggle-btn-dark' : 'toggle-btn-light',
        ]"
        @click="toggle"
        >{{ expanded ? '-' : '+' }}</span
      >
      <span
        :style="{ color: getBracketColor(level) }"
        class="type-label"
        @click="toggle"
        >{{ parentKey }}: {</span
      >
      <DocumentDuplicateIcon
        :class="['copy-icon', darkMode ? 'copy-icon-dark' : 'copy-icon-light']"
        @click="copyNode"
      />
      <span
        :style="{ color: getBracketColor(level) }"
        class="key-count"
        @click="toggle"
        >({{ Object.keys(props.data).length }}...)</span
      >
      <div
        v-show="expanded"
        :class="[
          'node-children',
          darkMode ? 'node-children-dark' : 'node-children-light',
        ]"
      >
        <JsonNode
          v-for="(value, key) in props.data"
          :key="key"
          :darkMode="darkMode"
          :data="value"
          :level="level + 1"
          :parentKey="key"
        />
      </div>
      <span
        :style="{
          color: getBracketColor(level),
          marginLeft: level * 12 + 'px',
        }"
        class="type-label"
        @click="toggle"
        >},</span
      >
    </div>
    <div v-else-if="isArray">
      <span
        v-if="level !== 0"
        :class="[
          'toggle-btn',
          darkMode ? 'toggle-btn-dark' : 'toggle-btn-light',
        ]"
        @click="toggle"
        >{{ expanded ? '-' : '+' }}</span
      >
      <span
        :style="{ color: getBracketColor(level) }"
        class="type-label"
        @click="toggle"
        >{{ parentKey }} [
        <span
          :style="{ color: getBracketColor(level) }"
          class="key-count"
          @click="toggle"
          >({{ Object.keys(props.data).length }}...)</span
        >
        ]</span
      >
      <DocumentDuplicateIcon
        :class="['copy-icon', darkMode ? 'copy-icon-dark' : 'copy-icon-light']"
        @click="copyNode"
      />
      <div
        v-show="expanded"
        :class="[
          'node-children',
          darkMode ? 'node-children-dark' : 'node-children-light',
        ]"
      >
        <JsonNode
          v-for="(item, index) in props.data"
          :key="index"
          :darkMode="darkMode"
          :data="item"
          :level="level + 1"
          :parentKey="index"
        />
      </div>
    </div>
    <div
      v-else
      :class="['leaf-node', darkMode ? 'leaf-node-dark' : 'leaf-node-light']"
    >
      <span
        class="key"
        @click="toggle"
        >{{ parentKey }}</span
      >:
      <span :class="[valueClass, darkMode ? 'value-dark' : 'value-light']">
        {{ displayDataType }} {{ displayValue }}</span
      >
      <DocumentDuplicateIcon
        v-if="isCopyable"
        :class="['copy-icon', darkMode ? 'copy-icon-dark' : 'copy-icon-light']"
        @click="copyNode"
      />
    </div>
  </div>
</template>
<script setup>
  import { computed, defineProps, onMounted, ref } from 'vue';
  import { DocumentDuplicateIcon } from '@heroicons/vue/24/solid';

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

  const expanded = ref(false);

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
