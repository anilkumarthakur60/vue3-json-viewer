<script lang="ts" setup>
  import { JsonViewerProps } from '../types/jsonViewerTypes';
  import JsonViewer from './JsonViewer.vue';

  type JsonViewerType = {
    data: JsonViewerProps['data'];
    level: number;
    parentKey?: string | number;
    darkMode?: boolean;
  };

  withDefaults(defineProps<JsonViewerType>(), {
    data: () => {},
    level: 0,
    parentKey: '',
    darkMode: true,
  });
</script>

<template>
  <JsonViewer
    :darkMode="darkMode"
    :data="data"
    :level="1"
  />
</template>

<style scoped></style>
