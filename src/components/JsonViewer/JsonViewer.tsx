import { defineComponent, ref, watch, type PropType } from 'vue';
import type {
  JsonValue,
  JsonViewerProps,
  ToggleEventPayload,
  CopyEventPayload,
} from '../../types';
import JsonNode from './JsonNode';
import {
  createJsonViewerContext,
  provideJsonViewerContext,
} from './context';

/** Root path assigned to the top-level node (JSONPath-style). */
const ROOT_PATH = '$';

export default defineComponent({
  name: 'JsonViewer',
  props: {
    data: {
      type: [Object, Array, String, Number, Boolean] as PropType<JsonValue>,
      default: () => ({}),
    },
    level: {
      type: Number,
      default: 0,
    },
    parentKey: {
      type: [String, Number] as PropType<string | number>,
      default: '',
    },
    darkMode: {
      type: Boolean,
      default: true,
    },
    expanded: {
      type: Boolean,
      default: true,
    },
  },
  // Typed validators make `emit` type-safe and match the JsonViewerEmits API.
  emits: {
    toggle: (payload: ToggleEventPayload): boolean =>
      typeof payload.path === 'string' && typeof payload.expanded === 'boolean',
    copy: (payload: CopyEventPayload): boolean =>
      typeof payload.path === 'string',
  },
  setup(props: JsonViewerProps, { emit }) {
    // The baseline lives here, at the root, which is never unmounted when a
    // child collapses — this is what makes per-node expand state persist.
    const defaultExpanded = ref(props.expanded ?? true);

    const ctx = createJsonViewerContext({
      defaultExpanded,
      onToggle: (payload) => emit('toggle', payload),
      onCopy: (payload) => emit('copy', payload),
    });
    provideJsonViewerContext(ctx);

    // When the consumer changes the `expanded` prop, re-seed the baseline and
    // drop per-node overrides so the new default propagates to the whole tree.
    watch(
      () => props.expanded,
      (newValue: boolean | undefined): void => {
        ctx.reset(newValue ?? true);
      },
    );

    return () => (
      <JsonNode
        darkMode={props.darkMode ?? true}
        data={props.data ?? {}}
        level={props.level ?? 0}
        path={ROOT_PATH}
      />
    );
  },
});
