import { defineComponent, type PropType } from 'vue';
import type { JsonValue, PrimitiveValueProps } from '../../../types';
import { formatValue, getValueCssClass } from '../../../utils/formatters';
import CopyButton from './CopyButton';

export default defineComponent({
  name: 'PrimitiveValue',
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
      required: true,
    },
    isArrayItem: {
      type: Boolean,
      required: true,
    },
    isLast: {
      type: Boolean,
      required: true,
    },
    darkMode: {
      type: Boolean,
      required: true,
    },
    keyColor: {
      type: String,
      required: true,
    },
  },
  setup(props: PrimitiveValueProps) {
    return () => {
      const showKey = !props.isArrayItem && props.parentKey;

      return (
        <div class="jv-item jv-primitive">
          <div class="jv-row">
            {showKey && (
              <span
                class="jv-key"
                style={{ color: props.keyColor }}
              >
                "{props.parentKey}"
              </span>
            )}
            {showKey && <span class="jv-colon">: </span>}
            <span class={getValueCssClass(props.data, props.darkMode)}>
              {formatValue(props.data)}
            </span>
            {!props.isLast && <span class="jv-comma">,</span>}
            <CopyButton
              darkMode={props.darkMode}
              data={props.data}
            />
          </div>
        </div>
      );
    };
  },
});
