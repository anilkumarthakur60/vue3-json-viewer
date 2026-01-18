<template>
  <div class="jv-root-controls">
    <button
      class="jv-control-btn"
      :class="darkMode ? 'jv-control-btn-dark' : 'jv-control-btn-light'"
      @click="$emit('expand-all')"
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
      @click="$emit('collapse-all')"
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
</template>

<script setup lang="ts">
defineProps<{
  darkMode: boolean;
}>();

defineEmits<{
  'expand-all': [];
  'collapse-all': [];
}>();
</script>
