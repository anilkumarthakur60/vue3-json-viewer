import { defineComponent, ref, watch, type PropType, type VNode } from 'vue';
import type { JsonValue, JsonNodeProps, ContainerKind } from '../../types';
import { isJsonObject, isJsonArray } from '../../utils/type-guards';
import { getKeyColor, getBracketColor } from '../../utils/theme';
import {
  createJsonViewerContext,
  provideJsonViewerContext,
  useJsonViewerContext,
  buildChildPath,
  type JsonViewerContext,
} from './context';

import RootControls from './components/RootControls';
import ContainerRow from './components/ContainerRow';
import PrimitiveValue from './components/PrimitiveValue';

import './styles/json-viewer.scss';

/** Root path assigned when a JsonNode is used without a JsonViewer wrapper. */
const ROOT_PATH = '$';

const JsonNode = defineComponent({
  name: 'JsonNode',
  props: {
    data: {
      type: [
        Object,
        Array,
        String,
        Number,
        Boolean,
        Function,
      ] as PropType<JsonValue>,
      default: undefined,
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
    path: {
      type: String,
      default: ROOT_PATH,
    },
  },
  setup(props: JsonNodeProps) {
    // Normally the shared store is provided by <JsonViewer>. When a JsonNode is
    // used on its own, the root node creates and provides one so the whole
    // subtree still shares a single, persistent expand/collapse store. Non-root
    // nodes always find the store via inject and never create their own.
    let context = useJsonViewerContext();
    if (!context) {
      const defaultExpanded = ref(props.expanded ?? true);
      watch(
        () => props.expanded,
        (newValue: boolean | undefined): void => {
          context?.reset(newValue ?? true);
        },
      );
      context = createJsonViewerContext({ defaultExpanded });
      provideJsonViewerContext(context);
    }
    const ctx: JsonViewerContext = context;

    const toggle = (): void => {
      ctx.toggle(props.path ?? ROOT_PATH, String(props.parentKey ?? ''));
    };

    const renderContainer = (
      kind: ContainerKind,
      entries: ReadonlyArray<readonly [string, JsonValue]>,
      closeBracket: string,
    ): VNode => {
      const level = props.level ?? 0;
      const darkMode = props.darkMode ?? true;
      const basePath = props.path ?? ROOT_PATH;
      const bracketColor = getBracketColor(level, darkMode);
      const isEmpty = entries.length === 0;
      const isArray = kind === 'array';
      const isExpanded = ctx.isExpanded(basePath);

      return (
        <div class="jv-item">
          <ContainerRow
            parentKey={props.parentKey ?? ''}
            isArrayItem={props.isArrayItem ?? false}
            isEmpty={isEmpty}
            isExpanded={isExpanded}
            size={entries.length}
            darkMode={darkMode}
            keyColor={getKeyColor(props.data, darkMode)}
            bracketColor={bracketColor}
            data={props.data}
            kind={kind}
            path={basePath}
            onToggle={toggle}
          />
          {isExpanded && !isEmpty && (
            <div
              class="jv-children"
              style={{ borderColor: bracketColor + '40' }}
            >
              {entries.map(([key, value], index) => {
                // Each child gets a unique, structural path so its state is
                // keyed independently and survives an ancestor collapse.
                // `parentKey` carries the key/index for both display (objects)
                // and event payloads (arrays); `isArrayItem` controls display.
                const childPath = buildChildPath(basePath, key, isArray);
                return (
                  <JsonNode
                    key={key}
                    data={value}
                    parentKey={key}
                    level={level + 1}
                    darkMode={props.darkMode}
                    isArrayItem={isArray}
                    isLast={index === entries.length - 1}
                    path={childPath}
                  />
                );
              })}
            </div>
          )}
          {isExpanded && !isEmpty && (
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
                onExpand-all={ctx.expandAll}
                onCollapse-all={ctx.collapseAll}
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
                onExpand-all={ctx.expandAll}
                onCollapse-all={ctx.collapseAll}
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
            path={props.path ?? ROOT_PATH}
          />
        </div>
      );
    };
  },
});

export default JsonNode;
