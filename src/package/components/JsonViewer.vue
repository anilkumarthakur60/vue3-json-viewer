<script lang="ts" setup>
  import { JsonViewerProps } from '../types/jsonViewerTypes';
  import NestedComponent from './NestedComponent.vue';

  withDefaults(defineProps<JsonViewerProps>(), {
    data: () => {},
    level: 0,
    parentKey: '',
    darkMode: true,
    expanded: false,
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
