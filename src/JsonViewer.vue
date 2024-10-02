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
        >({{ Object.keys(data).length }}...)</span
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
          >({{ Object.keys(data).length }}...)</span
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
<script setup lang="ts">
  import { defineProps, onMounted } from 'vue';
  import { DocumentDuplicateIcon } from '@heroicons/vue/24/solid';
  import { JsonViewerProps } from './types/jsonViewerTypes';

  const props = withDefaults(defineProps<JsonViewerProps>(), {
    data: () => ({}),
    level: 0,
    parentKey: '',
    darkMode: false,
  });

  onMounted(() => {
    if (props.level === 0) {
      expanded.value = true;
    }
  });
  import { useJsonViewer } from './hooks/useJsonViewer';

  const {
    expanded,
    isObject,
    isArray,
    isCopyable,
    displayValue,
    valueClass,
    displayDataType,
    toggle,
    copyNode,
    getBracketColor,
  } = useJsonViewer(props);
</script>
