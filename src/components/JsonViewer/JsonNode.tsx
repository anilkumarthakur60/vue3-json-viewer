import { defineComponent, ref, watch, type PropType, type VNode } from 'vue';
import type { JsonValue, JsonNodeProps, ContainerKind } from '../../types';
import { isJsonObject, isJsonArray } from '../../utils/type-guards';
import { getKeyColor, getBracketColor } from '../../utils/theme';

import RootControls from './components/RootControls';
import ContainerRow from './components/ContainerRow';
import PrimitiveValue from './components/PrimitiveValue';

import './styles/json-viewer.scss';

const JsonNode = defineComponent({
  name: 'JsonNode',
  props: {
    data: {
      type: [Object, Array, String, Number, Boolean] as PropType<JsonValue>,
      required: true,
    },
    parentKey: {
      type: [String, Number] as PropType<string | number>,
      default: '',
    },
    level: {
      type: Number,
      default: 0,
    },
    darkMode: {
      type: Boolean,
      default: true,
    },
    expanded: {
      type: Boolean,
      default: true,
    },
    isArrayItem: {
      type: Boolean,
      default: false,
    },
    isLast: {
      type: Boolean,
      default: true,
    },
  },
  setup(props: JsonNodeProps) {
    const isExpanded = ref(props.expanded ?? true);

    watch(
      () => props.expanded,
      (newValue: boolean | undefined): void => {
        isExpanded.value = newValue ?? true;
      },
      { immediate: true },
    );

    const toggle = (): void => {
      isExpanded.value = !isExpanded.value;
    };

    const expandAll = (): void => {
      isExpanded.value = true;
    };

    const collapseAll = (): void => {
      isExpanded.value = false;
    };

    const renderContainer = (
      kind: ContainerKind,
      entries: ReadonlyArray<readonly [string, JsonValue]>,
      closeBracket: string,
    ): VNode => {
      const level = props.level ?? 0;
      const darkMode = props.darkMode ?? true;
      const bracketColor = getBracketColor(level, darkMode);
      const isEmpty = entries.length === 0;
      const isArray = kind === 'array';

      return (
        <div class="jv-item">
          <ContainerRow
            parentKey={props.parentKey ?? ''}
            isArrayItem={props.isArrayItem ?? false}
            isEmpty={isEmpty}
            isExpanded={isExpanded.value}
            size={entries.length}
            darkMode={darkMode}
            keyColor={getKeyColor(props.data, darkMode)}
            bracketColor={bracketColor}
            data={props.data}
            kind={kind}
            onToggle={toggle}
          />
          {isExpanded.value && !isEmpty && (
            <div
              class="jv-children"
              style={{ borderColor: bracketColor + '40' }}
            >
              {entries.map(([key, value], index) => (
                <JsonNode
                  key={key}
                  data={value}
                  parentKey={isArray ? '' : key}
                  level={level + 1}
                  darkMode={props.darkMode}
                  expanded={props.expanded}
                  isArrayItem={isArray}
                  isLast={index === entries.length - 1}
                />
              ))}
            </div>
          )}
          {isExpanded.value && !isEmpty && (
            <div class="jv-row">
              <span
                class="jv-bracket"
                style={{ color: bracketColor }}
              >
                {closeBracket}
                {props.isLast ? '' : ','}
              </span>
            </div>
          )}
        </div>
      );
    };

    return () => {
      const level = props.level ?? 0;
      const darkMode = props.darkMode ?? true;
      const isRoot = level === 0;
      const data = props.data;

      const nodeClass = [
        'jv-node',
        {
          'jv-root': isRoot,
          'jv-dark': darkMode && isRoot,
          'jv-light': !darkMode && isRoot,
        },
      ];

      const showRootControls =
        isRoot && (isJsonObject(data) || isJsonArray(data));

      if (isJsonObject(data)) {
        const entries = Object.entries(data);
        return (
          <div class={nodeClass}>
            {showRootControls && (
              <RootControls
                darkMode={darkMode}
                onExpand-all={expandAll}
                onCollapse-all={collapseAll}
              />
            )}
            {renderContainer('object', entries, '}')}
          </div>
        );
      }

      if (isJsonArray(data)) {
        const entries: ReadonlyArray<readonly [string, JsonValue]> = data.map(
          (item, i) => [String(i), item] as const,
        );
        return (
          <div class={nodeClass}>
            {showRootControls && (
              <RootControls
                darkMode={darkMode}
                onExpand-all={expandAll}
                onCollapse-all={collapseAll}
              />
            )}
            {renderContainer('array', entries, ']')}
          </div>
        );
      }

      return (
        <div class={nodeClass}>
          <PrimitiveValue
            data={data}
            parentKey={props.parentKey ?? ''}
            isArrayItem={props.isArrayItem ?? false}
            isLast={props.isLast ?? true}
            darkMode={darkMode}
            keyColor={getKeyColor(data, darkMode)}
          />
        </div>
      );
    };
  },
});

export default JsonNode;
