<template>
  <div class="jv-item jv-primitive">
    <div class="jv-row">
      <span
        v-if="!isArrayItem && parentKey"
        class="jv-key"
        :style="{ color: keyColor }"
        >"{{ parentKey }}"</span
      >
      <span v-if="!isArrayItem && parentKey" class="jv-colon">: </span>
      <span :class="valueClass">{{ formattedValue }}</span>
      <span v-if="!isLast" class="jv-comma">,</span>
      <CopyButton :darkMode="darkMode" :data="data" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { JsonValue } from '../../../types';
import CopyButton from './CopyButton.vue';

const props = defineProps<{
  data: JsonValue;
  parentKey: string | number;
  isArrayItem: boolean;
  isLast: boolean;
  darkMode: boolean;
  keyColor: string;
}>();

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
</script>
