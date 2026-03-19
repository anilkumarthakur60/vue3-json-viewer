import { defineComponent, type PropType } from 'vue';
import type { JsonValue, JsonViewerProps } from '../../types';
import NestedComponent from './NestedComponent';

export default defineComponent({
  name: 'JsonViewer',
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
      default: () => ({}),
    },
    level: {
      type: Number,
      default: 0,
    },
    parentKey: {
      type: String,
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
      <NestedComponent
        darkMode={props.darkMode ?? true}
        data={props.data ?? {}}
        level={props.level ?? 0}
        expanded={props.expanded ?? true}
      />
    );
  },
});
