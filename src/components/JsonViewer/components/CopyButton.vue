<template>
  <button
    class="jv-copy-btn"
    :class="darkMode ? 'jv-copy-btn-dark' : 'jv-copy-btn-light'"
    @click.stop="handleCopy"
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
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { JsonValue } from '../../../types';

const props = defineProps<{
  darkMode: boolean;
  data: JsonValue;
}>();

const copySuccess = ref<boolean>(false);

function handleCopy(): void {
  const text = JSON.stringify(props.data, null, 2);
  navigator.clipboard.writeText(text).then((): void => {
    copySuccess.value = true;
    setTimeout((): void => {
      copySuccess.value = false;
    }, 1500);
  });
}
</script>
