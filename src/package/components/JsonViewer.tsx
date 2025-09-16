import { defineComponent, h } from 'vue';
import { JsonViewerProps } from '../types/jsonViewerTypes';
import NestedComponent from './NestedComponent';

export default defineComponent<JsonViewerProps>({
  name: 'JsonViewer',
  props: {
    data: {
      type: [Object, Array, String, Number, Boolean],
      default: () => ({}),
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
    return () =>
      h(NestedComponent, {
        darkMode: props.darkMode,
        data: props.data,
        level: props.level,
        expanded: props.expanded,
        parentKey: props.parentKey,
      });
  },
});
