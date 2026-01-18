import { defineComponent, type PropType } from 'vue';
import type { JsonValue } from '../../../types';
import CopyButton from './CopyButton';
import TypeBadge from './TypeBadge';

export interface ObjectRowProps {
  parentKey: string | number;
  isArrayItem: boolean;
  isEmpty: boolean;
  isExpanded: boolean;
  objectSize: number;
  darkMode: boolean;
  keyColor: string;
  bracketColor: string;
  data: JsonValue;
}

export default defineComponent({
  name: 'ObjectRow',
  props: {
    parentKey: {
      type: [String, Number] as PropType<string | number>,
      required: true,
    },
    isArrayItem: {
      type: Boolean,
      required: true,
    },
    isEmpty: {
      type: Boolean,
      required: true,
    },
    isExpanded: {
      type: Boolean,
      required: true,
    },
    objectSize: {
      type: Number,
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
    bracketColor: {
      type: String,
      required: true,
    },
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
  },
  emits: ['toggle'],
  setup(props, { emit }) {
    const handleToggle = (): void => {
      emit('toggle');
    };

    return () => (
      <div class="jv-row">
        {!props.isArrayItem && props.parentKey && (
          <span
            class="jv-key jv-clickable"
            style={{ color: props.keyColor }}
            onClick={handleToggle}
          >
            "{props.parentKey}"
          </span>
        )}
        {!props.isArrayItem && props.parentKey && (
          <span
            class="jv-colon jv-clickable"
            onClick={handleToggle}
          >
            :
          </span>
        )}
        <span
          class="jv-toggle jv-type-indicator"
          style={{ color: props.bracketColor }}
          onClick={handleToggle}
        >
          <TypeBadge type="object">obj</TypeBadge>
          {props.isEmpty ? (
            <span>{'{}'}</span>
          ) : (
            <span>{props.isExpanded ? '{' : '{...}'}</span>
          )}
        </span>
        {!props.isEmpty && !props.isExpanded && (
          <span
            class={[
              'jv-count',
              props.darkMode ? 'jv-count-dark' : 'jv-count-light',
            ]}
            onClick={handleToggle}
          >
            {props.objectSize} {props.objectSize === 1 ? 'key' : 'keys'}
          </span>
        )}
        <CopyButton
          darkMode={props.darkMode}
          data={props.data}
        />
      </div>
    );
  },
});
