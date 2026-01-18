<script lang="ts" setup>
  import type { JsonViewerProps } from '../../types';
  import NestedComponent from './NestedComponent.vue';

  withDefaults(defineProps<JsonViewerProps>(), {
    data: () => ({}),
    level: 0,
    parentKey: '',
    darkMode: true,
    expanded: true,
  });
</script>

<template>
  <NestedComponent
    :darkMode="darkMode"
    :data="data"
    :level="level"
    :expanded="expanded"
  />
</template>

<style scoped></style>
