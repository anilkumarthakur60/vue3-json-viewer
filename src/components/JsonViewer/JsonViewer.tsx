import { defineComponent, type PropType } from 'vue';
import type { JsonValue, JsonViewerProps } from '../../types';
import JsonNode from './JsonNode';

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
  setup(props: JsonViewerProps) {
    return () => (
      <JsonNode
        darkMode={props.darkMode ?? true}
        data={props.data ?? {}}
        level={props.level ?? 0}
        expanded={props.expanded ?? true}
      />
    );
  },
});
