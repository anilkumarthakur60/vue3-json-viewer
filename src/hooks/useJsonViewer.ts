import { ref, computed } from 'vue';
import { JsonViewerProps } from '../package';

export default function useJsonViewer(props: JsonViewerProps) {
  const expanded = ref(false);

  const isObject = computed(
    () =>
      typeof props.data === 'object' &&
      !Array.isArray(props.data) &&
      props.data !== null,
  );
  const isArray = computed(() => Array.isArray(props.data));
  const isCopyable = computed(
    () =>
      ['string', 'number', 'boolean', 'object'].includes(typeof props.data) &&
      props.data !== null,
  );
  const displayValue = computed(() => {
    if (typeof props.data === 'string') return `"${props.data}"`;
    if (props.data instanceof Date) return props.data.toISOString();
    if (props.data instanceof RegExp) return props.data.toString();
    return props.data;
  });
  const valueClass = computed(() => {
    if (typeof props.data === 'string') return 'string-value';
    if (typeof props.data === 'number') return 'number-value';
    if (typeof props.data === 'boolean') return 'boolean-value';
    if (props.data === null) return 'null-value';
    if (props.data instanceof Date) return 'date-value';
    if (props.data instanceof RegExp) return 'regexp-value';
    return '';
  });
  const displayDataType = computed(() => {
    if (typeof props.data === 'string') return 'string';
    if (typeof props.data === 'number') return 'number';
    if (typeof props.data === 'boolean') return 'boolean';
    if (props.data === null) return 'null';
    if (props.data instanceof Date) return 'date';
    if (props.data instanceof RegExp) return 'regexp';
    if (Array.isArray(props.data)) return 'array';
    if (typeof props.data === 'function') return 'function';
    if (typeof props.data === 'undefined') return 'undefined';
    if (typeof props.data === 'object') return 'object';
    return 'unknown';
  });

  function toggle() {
    expanded.value = !expanded.value;
  }

  function copyNode() {
    const nodeData = JSON.stringify(props.data, null, 2);
    navigator.clipboard.writeText(nodeData);
  }

  function getBracketColor(level: number) {
    const colors = props.darkMode
      ? ['#e06c75', '#e5c07b', '#98c379', '#56b6c2', '#61afef', '#c678dd']
      : ['#d32f2f', '#fbc02d', '#388e3c', '#0288d1', '#1976d2', '#7b1fa2'];
    return colors[level % colors.length];
  }

  return {
    expanded,
    isObject,
    isArray,
    isCopyable,
    displayValue,
    valueClass,
    displayDataType,
    toggle,
    copyNode,
    getBracketColor,
  };
}
