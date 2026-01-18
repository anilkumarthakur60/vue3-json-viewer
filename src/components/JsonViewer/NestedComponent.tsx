import {
  defineComponent,
  computed,
  ref,
  onMounted,
  watch,
  type PropType,
} from 'vue';
import type { JsonValue, NestedComponentProps } from '../../types';

// Sub-components
import RootControls from './components/RootControls';
import ObjectRow from './components/ObjectRow';
import ArrayRow from './components/ArrayRow';
import PrimitiveValue from './components/PrimitiveValue';

// Styles
import './styles/json-viewer.scss';

const NestedComponent = defineComponent({
  name: 'NestedComponent',
  props: {
    data: {
      type: [
        Object,
        Array,
        String,
        Number,
        Boolean,
        null,
      ] as PropType<JsonValue>,
      required: true,
    },
    parentKey: {
      type: String,
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
  setup(props: NestedComponentProps) {
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

    const expandAll = (): void => {
      if (props.level === 0) {
        isExpanded.value = true;
      }
    };

    const collapseAll = (): void => {
      if (props.level === 0) {
        isExpanded.value = false;
      }
    };

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

    const toggle = (): void => {
      isExpanded.value = !isExpanded.value;
    };

    // Color keys based on value data type
    const getKeyColorByType = (): string => {
      const val = props.data;

      if (props.darkMode) {
        // Dark mode colors
        if (val === null || val === undefined) return '#f38ba8';
        if (typeof val === 'string') return '#a6e3a1';
        if (typeof val === 'number') return '#fab387';
        if (typeof val === 'boolean') return '#f9e2af';
        if (val instanceof Date) return '#94e2d5';
        if (val instanceof RegExp) return '#cba6f7';
        if (Array.isArray(val)) {
          return val.length === 0 ? '#9399b2' : '#89b4fa';
        }
        if (typeof val === 'object' && val !== null) {
          return Object.keys(val).length === 0 ? '#9399b2' : '#f5c2e7';
        }
        return '#cdd6f4';
      } else {
        // Light mode colors
        if (val === null || val === undefined) return '#e03131';
        if (typeof val === 'string') return '#2f9e44';
        if (typeof val === 'number') return '#e8590c';
        if (typeof val === 'boolean') return '#f59f00';
        if (val instanceof Date) return '#0c8599';
        if (val instanceof RegExp) return '#7048e8';
        if (Array.isArray(val)) {
          return val.length === 0 ? '#868e96' : '#1971c2';
        }
        if (typeof val === 'object' && val !== null) {
          return Object.keys(val).length === 0 ? '#868e96' : '#c2255c';
        }
        return '#343a40';
      }
    };

    // Rainbow colors for brackets (based on level)
    const getBracketColor = (level: number): string => {
      const darkColors: string[] = [
        '#f38ba8',
        '#fab387',
        '#f9e2af',
        '#a6e3a1',
        '#89dceb',
        '#cba6f7',
      ];
      const lightColors: string[] = [
        '#e03131',
        '#e8590c',
        '#f59f00',
        '#2f9e44',
        '#1098ad',
        '#7048e8',
      ];
      const colors = props.darkMode ? darkColors : lightColors;
      return colors[level % colors.length] ?? colors[0] ?? '#cdd6f4';
    };

    return () => {
      const nodeClass = [
        'jv-node',
        {
          'jv-root': props.level === 0,
          'jv-dark': props.darkMode && props.level === 0,
          'jv-light': !props.darkMode && props.level === 0,
        },
      ];

      return (
        <div class={nodeClass}>
          {/* Root Controls */}
          {props.level === 0 && (isObject.value || isArray.value) && (
            <RootControls
              darkMode={props.darkMode ?? true}
              onExpand-all={expandAll}
              onCollapse-all={collapseAll}
            />
          )}

          {/* Object */}
          {isObject.value && !isDate.value && !isRegExp.value ? (
            <div class="jv-item">
              <ObjectRow
                parentKey={props.parentKey ?? ''}
                isArrayItem={props.isArrayItem ?? false}
                isEmpty={isEmpty.value}
                isExpanded={isExpanded.value}
                objectSize={objectSize.value}
                darkMode={props.darkMode ?? true}
                keyColor={getKeyColorByType()}
                bracketColor={getBracketColor(props.level ?? 0)}
                data={props.data}
                onToggle={toggle}
              />
              {isExpanded.value && !isEmpty.value && (
                <div
                  class="jv-children"
                  style={{
                    borderColor: getBracketColor(props.level ?? 0) + '40',
                  }}
                >
                  {Object.entries(props.data as Record<string, JsonValue>).map(
                    ([key, value], index) => (
                      <NestedComponent
                        key={key}
                        data={value}
                        parentKey={String(key)}
                        level={(props.level ?? 0) + 1}
                        darkMode={props.darkMode}
                        expanded={props.expanded}
                        isArrayItem={false}
                        isLast={index === objectSize.value - 1}
                      />
                    ),
                  )}
                </div>
              )}
              {isExpanded.value && !isEmpty.value && (
                <div class="jv-row">
                  <span
                    class="jv-bracket"
                    style={{ color: getBracketColor(props.level ?? 0) }}
                  >
                    {'}'}
                    {props.isLast ? '' : ','}
                  </span>
                </div>
              )}
            </div>
          ) : isArray.value ? (
            /* Array */
            <div class="jv-item">
              <ArrayRow
                parentKey={props.parentKey ?? ''}
                isArrayItem={props.isArrayItem ?? false}
                isEmpty={isEmpty.value}
                isExpanded={isExpanded.value}
                arrayLength={arrayLength.value}
                darkMode={props.darkMode ?? true}
                keyColor={getKeyColorByType()}
                bracketColor={getBracketColor(props.level ?? 0)}
                data={props.data}
                onToggle={toggle}
              />
              {isExpanded.value && !isEmpty.value && (
                <div
                  class="jv-children"
                  style={{
                    borderColor: getBracketColor(props.level ?? 0) + '40',
                  }}
                >
                  {(props.data as JsonValue[]).map((item, index) => (
                    <NestedComponent
                      key={index}
                      data={item}
                      parentKey=""
                      level={(props.level ?? 0) + 1}
                      darkMode={props.darkMode}
                      expanded={props.expanded}
                      isArrayItem={true}
                      isLast={index === arrayLength.value - 1}
                    />
                  ))}
                </div>
              )}
              {isExpanded.value && !isEmpty.value && (
                <div class="jv-row">
                  <span
                    class="jv-bracket"
                    style={{ color: getBracketColor(props.level ?? 0) }}
                  >
                    {']'}
                    {props.isLast ? '' : ','}
                  </span>
                </div>
              )}
            </div>
          ) : (
            /* Primitive Values */
            <PrimitiveValue
              data={props.data}
              parentKey={props.parentKey ?? ''}
              isArrayItem={props.isArrayItem ?? false}
              isLast={props.isLast ?? true}
              darkMode={props.darkMode ?? true}
              keyColor={getKeyColorByType()}
            />
          )}
        </div>
      );
    };
  },
});

export default NestedComponent;
