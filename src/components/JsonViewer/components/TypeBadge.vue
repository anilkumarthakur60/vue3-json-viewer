<template>
  <span class="jv-type-badge" :class="typeClass">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  type: 'object' | 'array';
}>();

const typeClass = computed<string>(() => {
  return props.type === 'object' ? 'jv-type-object' : 'jv-type-array';
});
</script>
