<template>
  <div
    :class="[
      'jv-node',
      {
        'jv-root': level === 0,
        'jv-dark': darkMode && level === 0,
        'jv-light': !darkMode && level === 0,
      },
    ]"
  >
    <!-- Root Controls -->
    <RootControls
      v-if="level === 0 && (isObject || isArray)"
      :darkMode="darkMode"
      @expand-all="expandAll"
      @collapse-all="collapseAll"
    />

    <!-- Object -->
    <div v-if="isObject && !isDate && !isRegExp" class="jv-item">
      <ObjectRow
        :parentKey="parentKey"
        :isArrayItem="isArrayItem"
        :isEmpty="isEmpty"
        :isExpanded="isExpanded"
        :objectSize="objectSize"
        :darkMode="darkMode"
        :keyColor="getKeyColorByType()"
        :bracketColor="getBracketColor(level)"
        :data="data"
        @toggle="toggle"
      />
      <div
        v-if="isExpanded && !isEmpty"
        class="jv-children"
        :style="{ borderColor: getBracketColor(level) + '40' }"
      >
        <NestedComponent
          v-for="(value, key, index) in data as Record<string, JsonValue>"
          :key="key"
          :data="value"
          :parentKey="String(key)"
          :level="level + 1"
          :darkMode="darkMode"
          :expanded="props.expanded"
          :isArrayItem="false"
          :isLast="index === objectSize - 1"
        />
      </div>
      <div v-if="isExpanded && !isEmpty" class="jv-row">
        <span class="jv-bracket" :style="{ color: getBracketColor(level) }">
          }{{ isLast ? '' : ',' }}
        </span>
      </div>
    </div>

    <!-- Array -->
    <div v-else-if="isArray" class="jv-item">
      <ArrayRow
        :parentKey="parentKey"
        :isArrayItem="isArrayItem"
        :isEmpty="isEmpty"
        :isExpanded="isExpanded"
        :arrayLength="arrayLength"
        :darkMode="darkMode"
        :keyColor="getKeyColorByType()"
        :bracketColor="getBracketColor(level)"
        :data="data"
        @toggle="toggle"
      />
      <div
        v-if="isExpanded && !isEmpty"
        class="jv-children"
        :style="{ borderColor: getBracketColor(level) + '40' }"
      >
        <NestedComponent
          v-for="(item, index) in data as JsonValue[]"
          :key="index"
          :data="item"
          :parentKey="''"
          :level="level + 1"
          :darkMode="darkMode"
          :expanded="props.expanded"
          :isArrayItem="true"
          :isLast="index === arrayLength - 1"
        />
      </div>
      <div v-if="isExpanded && !isEmpty" class="jv-row">
        <span class="jv-bracket" :style="{ color: getBracketColor(level) }">
          ]{{ isLast ? '' : ',' }}
        </span>
      </div>
    </div>

    <!-- Primitive Values -->
    <PrimitiveValue
      v-else
      :data="data"
      :parentKey="parentKey"
      :isArrayItem="isArrayItem"
      :isLast="isLast"
      :darkMode="darkMode"
      :keyColor="getKeyColorByType()"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import type { JsonValue, NestedComponentProps } from '../../types';

// Sub-components
import RootControls from './components/RootControls.vue';
import ObjectRow from './components/ObjectRow.vue';
import ArrayRow from './components/ArrayRow.vue';
import PrimitiveValue from './components/PrimitiveValue.vue';

// Styles
import './styles/json-viewer.scss';

const props = withDefaults(defineProps<NestedComponentProps>(), {
  parentKey: '',
  level: 0,
  darkMode: true,
  expanded: true,
  isArrayItem: false,
  isLast: true,
});

const isExpanded = ref<boolean>(props.expanded ?? true);

onMounted((): void => {
  // Always expand root level
  if (props.level === 0) {
    isExpanded.value = true;
  }
});

// Watch for changes to the expanded prop - cascade to all children
watch(
  () => props.expanded,
  (newValue: boolean | undefined): void => {
    isExpanded.value = newValue ?? true;
  },
  { immediate: true },
);

function expandAll(): void {
  if (props.level === 0) {
    isExpanded.value = true;
  }
}

function collapseAll(): void {
  if (props.level === 0) {
    isExpanded.value = false;
  }
}

const isObject = computed<boolean>(
  (): boolean =>
    props.data !== null &&
    typeof props.data === 'object' &&
    !Array.isArray(props.data) &&
    !(props.data instanceof Date) &&
    !(props.data instanceof RegExp),
);

const isArray = computed<boolean>((): boolean => Array.isArray(props.data));
const isDate = computed<boolean>((): boolean => props.data instanceof Date);
const isRegExp = computed<boolean>(
  (): boolean => props.data instanceof RegExp,
);

const isEmpty = computed<boolean>((): boolean => {
  if (isArray.value) return (props.data as JsonValue[]).length === 0;
  if (isObject.value) return Object.keys(props.data as object).length === 0;
  return false;
});

const objectSize = computed<number>((): number =>
  isObject.value ? Object.keys(props.data as object).length : 0,
);

const arrayLength = computed<number>((): number =>
  isArray.value ? (props.data as JsonValue[]).length : 0,
);

function toggle(): void {
  isExpanded.value = !isExpanded.value;
}

// Color keys based on value data type
function getKeyColorByType(): string {
  const val = props.data;

  if (props.darkMode) {
    // Dark mode colors
    if (val === null || val === undefined) return '#f38ba8'; // Red/Pink - null/undefined
    if (typeof val === 'string') return '#a6e3a1'; // Green - string
    if (typeof val === 'number') return '#fab387'; // Peach/Orange - number
    if (typeof val === 'boolean') return '#f9e2af'; // Yellow - boolean
    if (val instanceof Date) return '#94e2d5'; // Teal - date
    if (val instanceof RegExp) return '#cba6f7'; // Purple - regexp
    if (Array.isArray(val)) {
      return val.length === 0 ? '#9399b2' : '#89b4fa'; // Gray for empty, Blue for array
    }
    if (typeof val === 'object' && val !== null) {
      return Object.keys(val).length === 0 ? '#9399b2' : '#f5c2e7'; // Gray for empty, Pink for object
    }
    return '#cdd6f4'; // Default
  } else {
    // Light mode colors
    if (val === null || val === undefined) return '#e03131'; // Red - null/undefined
    if (typeof val === 'string') return '#2f9e44'; // Green - string
    if (typeof val === 'number') return '#e8590c'; // Orange - number
    if (typeof val === 'boolean') return '#f59f00'; // Yellow/Amber - boolean
    if (val instanceof Date) return '#0c8599'; // Teal - date
    if (val instanceof RegExp) return '#7048e8'; // Purple - regexp
    if (Array.isArray(val)) {
      return val.length === 0 ? '#868e96' : '#1971c2'; // Gray for empty, Blue for array
    }
    if (typeof val === 'object' && val !== null) {
      return Object.keys(val).length === 0 ? '#868e96' : '#c2255c'; // Gray for empty, Pink for object
    }
    return '#343a40'; // Default
  }
}

// Rainbow colors for brackets (based on level)
function getBracketColor(level: number): string {
  const darkColors: string[] = [
    '#f38ba8', // Red
    '#fab387', // Peach
    '#f9e2af', // Yellow
    '#a6e3a1', // Green
    '#89dceb', // Sky
    '#cba6f7', // Mauve
  ];
  const lightColors: string[] = [
    '#e03131', // Red
    '#e8590c', // Orange
    '#f59f00', // Yellow
    '#2f9e44', // Green
    '#1098ad', // Cyan
    '#7048e8', // Purple
  ];
  const colors = props.darkMode ? darkColors : lightColors;
  return colors[level % colors.length] ?? colors[0] ?? '#cdd6f4';
}
</script>
