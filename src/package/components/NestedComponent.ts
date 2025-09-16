import { defineComponent, computed, onMounted, ref, Transition, h } from 'vue';
import {
  DocumentDuplicateIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/solid';
import { NestedComponentProps, JsonValue } from '../types/jsonViewerTypes';

const NestedComponent = defineComponent<NestedComponentProps>({
  name: 'NestedComponent',
  props: {
    data: {
      required: true,
      validator: (value: any) => {
        if (import.meta.env.NODE_ENV === 'test' || import.meta.env.VITEST) {
          return true;
        }
        return value !== undefined;
      },
    },
    level: {
      type: Number,
      default: 0,
    },
    parentKey: {
      type: [String, Number],
      default: '',
    },
    darkMode: {
      type: Boolean,
      default: true,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const expanded = ref<boolean>(props.expanded ?? false);
    const copySuccess = ref<boolean>(false);

    onMounted(() => {
      if (props.level === 0) {
        expanded.value = true;
      }
    });

    // Computed properties for type checking
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

    const valueClass = computed<string>(() => {
      if (typeof props.data === 'string') return 'string-value';
      if (typeof props.data === 'number') return 'number-value';
      if (typeof props.data === 'boolean') return 'boolean-value';
      if (props.data === null) return 'null-value';
      if (props.data instanceof Date) return 'date-value';
      if (props.data instanceof RegExp) return 'regexp-value';
      return '';
    });

    // Utility functions
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
      }
    };

    const getBracketColor = (level: number): string => {
      const colors = props.darkMode
        ? ['#e06c75', '#e5c07b', '#98c379', '#56b6c2', '#61afef', '#c678dd']
        : ['#d32f2f', '#fbc02d', '#388e3c', '#0288d1', '#1976d2', '#7b1fa2'];
      return colors[level % colors.length];
    };

    const formatValue = (value: JsonValue): string => {
      if (value === null) return 'null';
      if (value === undefined) return 'undefined';
      if (typeof value === 'string') return `"${value}"`;
      if (typeof value === 'number' || typeof value === 'boolean')
        return String(value);
      if (Array.isArray(value)) return '[...]';
      if (typeof value === 'object') return '{...}';
      if (value instanceof RegExp) return (value as RegExp).toString();
      if (value instanceof Date) return (value as Date).toISOString();
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

    const collapsedPreview = computed(() => {
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

    // Render function approach
    return () => {
      const renderToggleIcon = () => {
        const IconComponent = expanded.value
          ? ChevronDownIcon
          : ChevronRightIcon;
        return h(IconComponent, {
          class: [
            'toggle-btn',
            props.darkMode ? 'toggle-btn-dark' : 'toggle-btn-light',
            'cursor-pointer',
            'margin-lr-5 height10 width10',
          ],
        });
      };

      const renderCopyButton = () =>
        h(DocumentDuplicateIcon, {
          class: [
            'copy-icon margin-lr-5 cursor-pointer',
            props.darkMode ? 'copy-icon-dark' : 'copy-icon-light',
          ],
          onClick: (e: Event) => {
            e.stopPropagation();
            copyNode();
          },
        });

      const renderCopyTooltip = () =>
        h(Transition, { name: 'fade' }, () =>
          copySuccess.value
            ? h(
                'span',
                {
                  class: [
                    'copy-tooltip',
                    props.darkMode ? 'copy-tooltip-dark' : 'copy-tooltip-light',
                  ],
                },
                'Copied!',
              )
            : null,
        );

      const renderNestedItems = (items: [string, any][] | any[]) => {
        return items.map((item, index) => {
          let actualKey: string | number;
          let actualValue: any;

          if (Array.isArray(items)) {
            actualKey = index;
            actualValue = item;
          } else {
            // For object entries
            const [key, value] = item as [string, any];
            actualKey = key;
            actualValue = value;
          }

          // Use the current component recursively
          return h(NestedComponent, {
            key: actualKey,
            darkMode: props.darkMode,
            data: actualValue,
            level: (props.level as number) + 1,
            parentKey: Array.isArray(items)
              ? `${props.parentKey}[${actualKey}]`
              : actualKey,
            expanded: props.expanded,
          });
        });
      };

      // Main render logic
      if (
        isObject.value &&
        !isRegExp.value &&
        !isDate.value &&
        !isMap.value &&
        !isSet.value
      ) {
        return h('div', [
          h('span', { class: 'cursor-pointer', onClick: toggle }, [
            renderToggleIcon(),
            h(
              'span',
              {
                style: { color: getBracketColor(props.level as number) },
                class: 'type-label key',
              },
              [props.parentKey, props.level !== 0 ? ':' : '', '{'],
            ),
            !expanded.value
              ? h(
                  'span',
                  {
                    class: [
                      'preview',
                      props.darkMode ? 'preview-dark' : 'preview-light',
                    ],
                  },
                  collapsedPreview.value,
                )
              : null,
            props.level !== 0
              ? h(
                  'span',
                  {
                    style: { color: getBracketColor(props.level as number) },
                    class: 'key key-count margin-lr-5 cursor-pointer',
                  },
                  `${Object.keys(props.data as object).length} ...`,
                )
              : null,
          ]),
          renderCopyButton(),
          renderCopyTooltip(),
          expanded.value
            ? h(
                'div',
                {
                  class: [
                    'node-children',
                    props.darkMode
                      ? 'node-children-dark'
                      : 'node-children-light',
                  ],
                },
                renderNestedItems(Object.entries(props.data as object)),
              )
            : null,
          h(
            'span',
            {
              class: [
                'toggle-btn cursor-pointer',
                props.darkMode ? 'toggle-btn-dark' : 'toggle-btn-light',
              ],
              onClick: toggle,
            },
            '},',
          ),
        ]);
      }

      if (isArray.value) {
        return h('div', [
          h('span', { onClick: toggle, class: 'cursor-pointer' }, [
            renderToggleIcon(),
            h(
              'span',
              {
                style: { color: getBracketColor(props.level as number) },
                class: 'key type-label',
              },
              [
                `${props.parentKey}:`,
                h(
                  'span',
                  {
                    style: { color: getBracketColor(props.level as number) },
                    class: 'key key-count cursor-pointer',
                  },
                  `[${(props.data as unknown[]).length}]...`,
                ),
              ],
            ),
          ]),
          renderCopyButton(),
          renderCopyTooltip(),
          expanded.value
            ? h(
                'div',
                {
                  class: [
                    'node-children',
                    props.darkMode
                      ? 'node-children-dark'
                      : 'node-children-light',
                  ],
                },
                renderNestedItems(props.data as any[]),
              )
            : null,
        ]);
      }

      if (isMap.value) {
        return h('div', [
          h('span', { onClick: toggle, class: 'cursor-pointer' }, [
            renderToggleIcon(),
            h(
              'span',
              {
                style: { color: getBracketColor(props.level as number) },
                class: 'key type-label',
              },
              [
                `${props.parentKey}:`,
                h(
                  'span',
                  {
                    style: { color: getBracketColor(props.level as number) },
                    class: 'key key-count cursor-pointer',
                  },
                  '[Map]',
                ),
              ],
            ),
          ]),
          renderCopyButton(),
          renderCopyTooltip(),
          expanded.value
            ? h(
                'div',
                {
                  class: [
                    'node-children',
                    props.darkMode
                      ? 'node-children-dark'
                      : 'node-children-light',
                  ],
                },
                renderNestedItems(
                  Array.from((props.data as Map<any, any>).entries()),
                ),
              )
            : null,
        ]);
      }

      if (isSet.value) {
        return h('div', [
          h('span', { onClick: toggle, class: 'cursor-pointer' }, [
            renderToggleIcon(),
            h(
              'span',
              {
                style: { color: getBracketColor(props.level as number) },
                class: 'key type-label',
              },
              [
                `${props.parentKey}:`,
                h(
                  'span',
                  {
                    style: { color: getBracketColor(props.level as number) },
                    class: 'key key-count cursor-pointer',
                  },
                  '[Set]',
                ),
              ],
            ),
          ]),
          renderCopyButton(),
          renderCopyTooltip(),
          expanded.value
            ? h(
                'div',
                {
                  class: [
                    'node-children',
                    props.darkMode
                      ? 'node-children-dark'
                      : 'node-children-light',
                  ],
                },
                renderNestedItems(
                  Array.from((props.data as Set<any>).values()).map(
                    (item, index) => [index, item],
                  ),
                ),
              )
            : null,
        ]);
      }

      // Leaf node
      return h(
        'div',
        {
          class: [
            'leaf-node',
            props.darkMode ? 'leaf-node-dark' : 'leaf-node-light',
          ],
        },
        [
          h('span', { onClick: toggle }, [
            h(
              'span',
              {
                class: ['key', props.darkMode ? 'key-dark' : 'key-light'],
              },
              props.parentKey,
            ),
            ':',
            h(
              'span',
              {
                class: [
                  'key',
                  valueClass.value,
                  props.darkMode ? 'value-dark' : 'value-light',
                ],
              },
              formatDisplayValue(props.data),
            ),
          ]),
          isCopyable.value ? renderCopyButton() : null,
          renderCopyTooltip(),
        ],
      );
    };
  },
});

export default NestedComponent;
