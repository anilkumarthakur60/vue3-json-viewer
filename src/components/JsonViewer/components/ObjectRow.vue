<template>
  <div class="jv-row">
    <span
      v-if="!isArrayItem && parentKey"
      class="jv-key"
      :style="{ color: keyColor }"
      @click="$emit('toggle')"
      :class="'jv-clickable'"
      >"{{ parentKey }}"</span
    >
    <span
      v-if="!isArrayItem && parentKey"
      class="jv-colon"
      @click="$emit('toggle')"
      :class="'jv-clickable'"
      >:
    </span>
    <span
      class="jv-toggle jv-type-indicator"
      :style="{ color: bracketColor }"
      @click="$emit('toggle')"
    >
      <TypeBadge type="object">obj</TypeBadge>
      <span v-if="isEmpty">{}</span>
      <span v-else>{{ isExpanded ? '{' : '{...}' }}</span>
    </span>
    <span
      v-if="!isEmpty && !isExpanded"
      class="jv-count"
      :class="darkMode ? 'jv-count-dark' : 'jv-count-light'"
      @click="$emit('toggle')"
      >{{ objectSize }} {{ objectSize === 1 ? 'key' : 'keys' }}</span
    >
    <CopyButton :darkMode="darkMode" :data="data" />
  </div>
</template>

<script setup lang="ts">
import type { JsonValue } from '../../../types';
import CopyButton from './CopyButton.vue';
import TypeBadge from './TypeBadge.vue';

defineProps<{
  parentKey: string | number;
  isArrayItem: boolean;
  isEmpty: boolean;
  isExpanded: boolean;
  objectSize: number;
  darkMode: boolean;
  keyColor: string;
  bracketColor: string;
  data: JsonValue;
}>();

defineEmits<{
  toggle: [];
}>();
</script>
