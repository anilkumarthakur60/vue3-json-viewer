import { ref, computed, type Ref } from 'vue';
import {
  JsonViewerProps,
  JsonValue,
  defaultDarkTheme,
  defaultLightTheme,
} from '../types/jsonViewerTypes';

export interface UseJsonViewerReturn {
  expanded: Ref<boolean>;
  copySuccess: Ref<boolean>;
  isObject: Ref<boolean>;
  isArray: Ref<boolean>;
  isRegExp: Ref<boolean>;
  isDate: Ref<boolean>;
  isMap: Ref<boolean>;
  isSet: Ref<boolean>;
  isCopyable: Ref<boolean>;
  displayValue: Ref<string>;
  valueClass: Ref<string>;
  displayDataType: Ref<string>;
  collapsedPreview: Ref<string>;
  toggle: () => void;
  copyNode: () => Promise<void>;
  getBracketColor: (level: number) => string;
  formatValue: (value: JsonValue) => string;
  formatDisplayValue: (value: JsonValue) => string;
}

export function useJsonViewer(props: JsonViewerProps): UseJsonViewerReturn {
  const expanded = ref<boolean>(props.expanded ?? false);
  const copySuccess = ref<boolean>(false);

  // Type checking computeds
  const isObject = computed<boolean>(
    () =>
      typeof props.data === 'object' &&
      !Array.isArray(props.data) &&
      props.data !== null &&
      !(props.data instanceof RegExp) &&
      !(props.data instanceof Date) &&
      !(props.data instanceof Map) &&
      !(props.data instanceof Set),
  );

  const isArray = computed<boolean>(() => Array.isArray(props.data));
  const isRegExp = computed<boolean>(() => props.data instanceof RegExp);
  const isDate = computed<boolean>(() => props.data instanceof Date);
  const isMap = computed<boolean>(() => props.data instanceof Map);
  const isSet = computed<boolean>(() => props.data instanceof Set);

  const isCopyable = computed<boolean>(
    () =>
      ['string', 'number', 'boolean', 'object'].includes(typeof props.data) &&
      props.data !== null,
  );

  // Value formatting
  const formatValue = (value: JsonValue): string => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'number' || typeof value === 'boolean')
      return String(value);
    if (value instanceof Date) return (value as Date).toISOString();
    if (value instanceof RegExp) return (value as RegExp).toString();
    if (Array.isArray(value)) return '[...]';
    if (typeof value === 'object') return '{...}';
    return String(value);
  };

  const formatDisplayValue = (value: JsonValue): string => {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'number' || typeof value === 'boolean')
      return String(value);
    if (value instanceof RegExp) return (value as RegExp).toString();
    if (value instanceof Date) return (value as Date).toISOString();
    return String(value);
  };

  const displayValue = computed<string>(() => formatDisplayValue(props.data));

  const valueClass = computed<string>(() => {
    if (typeof props.data === 'string') return 'string-value';
    if (typeof props.data === 'number') return 'number-value';
    if (typeof props.data === 'boolean') return 'boolean-value';
    if (props.data === null) return 'null-value';
    if (props.data instanceof Date) return 'date-value';
    if (props.data instanceof RegExp) return 'regexp-value';
    return '';
  });

  const displayDataType = computed<string>(() => {
    if (typeof props.data === 'string') return 'string';
    if (typeof props.data === 'number') return 'number';
    if (typeof props.data === 'boolean') return 'boolean';
    if (props.data === null) return 'null';
    if (props.data instanceof Date) return 'date';
    if (props.data instanceof RegExp) return 'regexp';
    if (Array.isArray(props.data)) return 'array';
    if (props.data instanceof Map) return 'map';
    if (props.data instanceof Set) return 'set';
    if (typeof props.data === 'function') return 'function';
    if (typeof props.data === 'undefined') return 'undefined';
    if (typeof props.data === 'object') return 'object';
    return 'unknown';
  });

  const collapsedPreview = computed<string>(() => {
    if (isObject.value) {
      const keys = Object.keys(props.data as object);
      const previewKeys = keys
        .slice(0, 2)
        .map((key) => `${key}: ${formatValue((props.data as any)[key])}`);
      return `{ ${previewKeys.join(', ')}${keys.length > 2 ? ', ...' : ''} }`;
    } else if (isArray.value) {
      const previewItems = (props.data as any[])
        .slice(0, 2)
        .map((item) => formatValue(item));
      return `[${previewItems.join(', ')}${(props.data as any[]).length > 2 ? ', ...' : ''}]`;
    } else if (isMap.value) {
      const entries = Array.from((props.data as Map<any, any>).entries());
      const previewEntries = entries.slice(0, 2).map((entry) => {
        const [key, value] = entry;
        return `${key}: ${formatValue(value)}`;
      });
      return `Map { ${previewEntries.join(', ')}${entries.length > 2 ? ', ...' : ''} }`;
    } else if (isSet.value) {
      const values = Array.from((props.data as Set<any>).values());
      const previewValues = values
        .slice(0, 2)
        .map((value) => formatValue(value));
      return `Set { ${previewValues.join(', ')}${values.length > 2 ? ', ...' : ''} }`;
    }
    return '';
  });

  // Actions
  const toggle = (): void => {
    expanded.value = !expanded.value;
  };

  const copyNode = async (): Promise<void> => {
    try {
      const nodeData = JSON.stringify(props.data, null, 2);
      await navigator.clipboard.writeText(nodeData);
      copySuccess.value = true;
      setTimeout(() => (copySuccess.value = false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = JSON.stringify(props.data, null, 2);
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      copySuccess.value = true;
      setTimeout(() => (copySuccess.value = false), 2000);
    }
  };

  const getBracketColor = (level: number): string => {
    const theme = props.darkMode ? defaultDarkTheme : defaultLightTheme;
    return theme.bracket[level % theme.bracket.length];
  };

  return {
    expanded,
    copySuccess,
    isObject,
    isArray,
    isRegExp,
    isDate,
    isMap,
    isSet,
    isCopyable,
    displayValue,
    valueClass,
    displayDataType,
    collapsedPreview,
    toggle,
    copyNode,
    getBracketColor,
    formatValue,
    formatDisplayValue,
  };
}

// Default export for backward compatibility
export default useJsonViewer;
