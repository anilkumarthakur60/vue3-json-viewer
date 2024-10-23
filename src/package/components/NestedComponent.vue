<template>
  <div
    :class="{
      'json-viewer-dark': darkMode && level === 0,
      'json-viewer-light': !darkMode && level === 0,
    }"
    :style="{ marginLeft: (level as number) * 10 + 'px', padding: '2px 0' }"
  >
    <div v-if="isObject && !isRegExp && !isDate && !isMap && !isSet">
      <span
        class="cursor-pointer"
        @click="toggle"
      >
        <ChevronDownIcon
          v-if="expanded"
          :class="[
            'toggle-btn',
            darkMode ? 'toggle-btn-dark' : 'toggle-btn-light',
            'cursor-pointer',
          ]"
          class="margin-lr-5 height10 width10"
        />
        <ChevronRightIcon
          :class="[
            'toggle-btn',
            darkMode ? 'toggle-btn-dark' : 'toggle-btn-light',
            'cursor-pointer',
          ]"
          v-if="!expanded"
          class="margin-lr-5 height10 width10"
        />
        <span
          :style="{ color: getBracketColor(level as number) }"
          class="type-label key"
          >{{ parentKey }}
          <span v-if="level !== 0">:</span>
          {
        </span>
        <span
          v-if="!expanded"
          class="preview"
          :class="{
            'preview-dark': darkMode,
            'preview-light': !darkMode,
          }"
          >{{ collapsedPreview }}</span
        >

        <span
          v-if="level !== 0"
          :style="{ color: getBracketColor(level as number) }"
          class="key key-count margin-lr-5 cursor-pointer"
          >{{ Object.keys(data as object).length }} ...</span
        >
      </span>

      <DocumentDuplicateIcon
        :class="[
          'copy-icon margin-lr-5 cursor-pointer',
          darkMode ? 'copy-icon-dark' : 'copy-icon-light',
        ]"
        @click.stop="copyNode"
      />
      <transition name="fade">
        <span
          v-if="copySuccess"
          class="copy-tooltip"
          :class="{
            'copy-tooltip-dark': darkMode,
            'copy-tooltip-light': !darkMode,
          }"
          >Copied!</span
        >
      </transition>

      <div
        v-show="expanded"
        :class="[
          'node-children',
          darkMode ? 'node-children-dark' : 'node-children-light',
        ]"
      >
        <NestedComponent
          v-for="(value, key) in data"
          :key="key"
          :darkMode="darkMode"
          :data="value"
          :level="(level as number) + 1"
          :parentKey="key"
          :expanded="expanded"
        />
      </div>

      <span
        :class="[
          'toggle-btn cursor-pointer',
          darkMode ? 'toggle-btn-dark' : 'toggle-btn-light',
        ]"
        @click="toggle"
        >},</span
      >
    </div>
    <div v-else-if="isArray">
      <span
        @click="toggle"
        class="cursor-pointer"
      >
        <ChevronDownIcon
          v-if="expanded"
          :class="[
            'toggle-btn',
            darkMode ? 'toggle-btn-dark' : 'toggle-btn-light',
            'cursor-pointer',
          ]"
          class="margin-lr-5 height10 width10"
        />
        <ChevronRightIcon
          v-else
          :class="[
            'toggle-btn',
            darkMode ? 'toggle-btn-dark' : 'toggle-btn-light',
            'cursor-pointer',
          ]"
          class="margin-lr-5 height10 width10"
        />
        <span
          :style="{ color: getBracketColor(level as number) }"
          class="key type-label"
          >{{ parentKey }}:<span
            :style="{ color: getBracketColor(level as number) }"
            class="key key-count cursor-pointer"
          >
            [{{ (data as unknown[]).length }}]...</span
          >
        </span>
      </span>
      <DocumentDuplicateIcon
        :class="[
          'copy-icon margin-lr-5 cursor-pointer',
          darkMode ? 'copy-icon-dark' : 'copy-icon-light',
        ]"
        @click="copyNode"
      />
      <transition name="fade">
        <span
          v-if="copySuccess"
          class="copy-tooltip"
          :class="{
            'copy-tooltip-dark': darkMode,
            'copy-tooltip-light': !darkMode,
          }"
          >Copied!</span
        >
      </transition>
      <div
        v-show="expanded"
        :class="[
          'node-children',
          darkMode ? 'node-children-dark' : 'node-children-light',
        ]"
      >
        <NestedComponent
          v-for="(item, index) in data"
          :key="index"
          :darkMode="darkMode"
          :data="item"
          :level="(level as number) + 1"
          :parentKey="`${parentKey}[${index}]`"
          :expanded="expanded"
        />
      </div>
    </div>
    <div v-else-if="isMap">
      <span
        @click="toggle"
        class="cursor-pointer"
      >
        <ChevronDownIcon
          v-if="expanded"
          :class="[
            'toggle-btn',
            darkMode ? 'toggle-btn-dark' : 'toggle-btn-light',
            'cursor-pointer',
          ]"
          class="margin-lr-5 height10 width10"
        />
        <ChevronRightIcon
          v-else
          :class="[
            'toggle-btn',
            darkMode ? 'toggle-btn-dark' : 'toggle-btn-light',
            'cursor-pointer',
          ]"
          class="margin-lr-5 height10 width10"
        />
        <span
          :style="{ color: getBracketColor(level as number) }"
          class="key type-label"
          >{{ parentKey }}:
          <span
            :style="{ color: getBracketColor(level as number) }"
            class="key key-count cursor-pointer"
          >
            [Map]</span
          >
        </span>
      </span>
      <DocumentDuplicateIcon
        :class="[
          'copy-icon margin-lr-5 cursor-pointer',
          darkMode ? 'copy-icon-dark' : 'copy-icon-light',
        ]"
        @click="copyNode"
      />
      <transition name="fade">
        <span
          v-if="copySuccess"
          class="copy-tooltip"
          :class="{
            'copy-tooltip-dark': darkMode,
            'copy-tooltip-light': !darkMode,
          }"
          >Copied!</span
        >
      </transition>
      <div
        v-show="expanded"
        :class="[
          'node-children',
          darkMode ? 'node-children-dark' : 'node-children-light',
        ]"
      >
        <NestedComponent
          v-for="(value, key) in Array.from(data.entries())"
          :key="key"
          :darkMode="darkMode"
          :data="value"
          :level="(level as number) + 1"
          :parentKey="key"
          :expanded="expanded"
        />
      </div>
    </div>
    <div v-else-if="isSet">
      <span
        @click="toggle"
        class="cursor-pointer"
      >
        <ChevronDownIcon
          v-if="expanded"
          :class="[
            'toggle-btn',
            darkMode ? 'toggle-btn-dark' : 'toggle-btn-light',
            'cursor-pointer',
          ]"
          class="margin-lr-5 height10 width10"
        />
        <ChevronRightIcon
          v-else
          :class="[
            'toggle-btn',
            darkMode ? 'toggle-btn-dark' : 'toggle-btn-light',
            'cursor-pointer',
          ]"
          class="margin-lr-5 height10 width10"
        />
        <span
          :style="{ color: getBracketColor(level as number) }"
          class="key type-label"
          >{{ parentKey }}:
          <span
            :style="{ color: getBracketColor(level as number) }"
            class="key key-count cursor-pointer"
          >
            [Set]</span
          >
        </span>
      </span>
      <DocumentDuplicateIcon
        :class="[
          'copy-icon margin-lr-5 cursor-pointer',
          darkMode ? 'copy-icon-dark' : 'copy-icon-light',
        ]"
        @click="copyNode"
      />
      <transition name="fade">
        <span
          v-if="copySuccess"
          class="copy-tooltip"
          :class="{
            'copy-tooltip-dark': darkMode,
            'copy-tooltip-light': !darkMode,
          }"
          >Copied!</span
        >
      </transition>
      <div
        v-show="expanded"
        :class="[
          'node-children',
          darkMode ? 'node-children-dark' : 'node-children-light',
        ]"
      >
        <NestedComponent
          v-for="(item, index) in Array.from(data.values())"
          :key="index"
          :darkMode="darkMode"
          :data="item"
          :level="(level as number) + 1"
          :parentKey="`${parentKey}[${index}]`"
          :expanded="expanded"
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
        <span
          :class="['key', valueClass, darkMode ? 'value-dark' : 'value-light']"
        >
          {{ data }}
        </span>
      </span>
      <DocumentDuplicateIcon
        v-if="isCopyable"
        :class="[
          'copy-icon margin-lr-5 cursor-pointer',
          darkMode ? 'copy-icon-dark' : 'copy-icon-light',
        ]"
        @click="copyNode"
      />
      <transition name="fade">
        <span
          v-if="copySuccess"
          class="copy-tooltip"
          :class="{
            'copy-tooltip-dark': darkMode,
            'copy-tooltip-light': !darkMode,
          }"
          >Copied!</span
        >
      </transition>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import {
    DocumentDuplicateIcon,
    ChevronDownIcon,
    ChevronRightIcon,
  } from '@heroicons/vue/24/solid';
  import { JsonViewerProps } from '../types/jsonViewerTypes';

  const props = withDefaults(defineProps<JsonViewerProps>(), {
    data: () => {},
    level: 0,
    parentKey: '',
    darkMode: true,
    expanded: false,
  });

  const expanded = ref<boolean>(props.expanded ?? false);

  onMounted(() => {
    if (props.level === 0) {
      expanded.value = true;
    }
  });

  const isObject = computed<boolean>(
    () =>
      typeof props.data === 'object' &&
      !Array.isArray(props.data) &&
      props.data !== null &&
      !(props.data instanceof RegExp) &&
      !(props.data instanceof Map) &&
      !(props.data instanceof Set),
  );
  const isArray = computed<boolean>(() => Array.isArray(props.data));
  const isRegExp = computed<boolean>(() => props.data instanceof RegExp);
  const isMap = computed<boolean>(() => props.data instanceof Map);
  const isSet = computed<boolean>(() => props.data instanceof Set);
  const isCopyable = computed<boolean>(
    () =>
      ['string', 'number', 'boolean', 'object', 'regexp'].includes(
        typeof props.data,
      ) && props.data !== null,
  );

  const valueClass = computed<string>(() => {
    if (typeof props.data === 'string') return 'string-value';
    if (typeof props.data === 'number') return 'number-value';
    if (typeof props.data === 'boolean') return 'boolean-value';
    if (props.data === null) return 'null-value';
    if (props.data instanceof Date) return 'date-value';
    if (props.data instanceof RegExp) return 'regexp-value';
    return '';
  });

  function toggle(): void {
    expanded.value = !expanded.value;
  }

  function copyNode(): void {
    const nodeData = JSON.stringify(props.data, null, 2);
    navigator.clipboard.writeText(nodeData).then(() => {
      copySuccess.value = true;
      setTimeout(() => (copySuccess.value = false), 2000);
    });
  }

  function getBracketColor(level: number): string {
    const colors = props.darkMode
      ? ['#e06c75', '#e5c07b', '#98c379', '#56b6c2', '#61afef', '#c678dd']
      : ['#d32f2f', '#fbc02d', '#388e3c', '#0288d1', '#1976d2', '#7b1fa2'];
    return colors[level % colors.length];
  }
  const copySuccess = ref(false);
  const collapsedPreview = computed(() => {
    if (isObject.value) {
      const keys = Object.keys(props.data as object);
      const previewKeys = keys
        .slice(0, 2)
        .map((key) => `${key}: ${formatValue((props.data as any)[key])}`);
      return `{ ${previewKeys.join(', ')}${keys.length > 2 ? ', ...' : ''} }`;
    } else if (isArray.value) {
      const previewItems = (props.data as any[])
        .slice(0, 2)
        .map((item) => formatValue(item));
      return `[${previewItems.join(', ')}${(props.data as any[]).length > 2 ? ', ...' : ''}]`;
    } else if (isMap.value) {
      const entries = Array.from(props.data.entries());
      const previewEntries = entries.slice(0, 2).map((entry) => {
        const [key, value] = entry as [any, any];
        return `${key}: ${formatValue(value)}`;
      });
      return `Map { ${previewEntries.join(', ')}${entries.length > 2 ? ', ...' : ''} }`;
    } else if (isSet.value) {
      const values = Array.from(props.data.values());
      const previewValues = values
        .slice(0, 2)
        .map((value) => formatValue(value));
      return `Set { ${previewValues.join(', ')}${values.length > 2 ? ', ...' : ''} }`;
    }
    return '';
  });

  function formatValue(value: any) {
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'number' || typeof value === 'boolean') return value;
    if (Array.isArray(value)) return '[...]';
    if (typeof value === 'object') return '{...}';
    if (value instanceof RegExp) return value.toString();
    if (value instanceof Date) return value.toISOString();
    return String(value);
  }
  const isDate = computed<boolean>(() => props.data instanceof Date);
</script>
