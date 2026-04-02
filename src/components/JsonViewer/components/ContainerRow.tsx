import { defineComponent, type PropType } from 'vue';
import type { JsonValue, ContainerKind, ContainerRowProps } from '../../../types';
import { getBrackets, getBadgeContent, getCountLabel } from '../../../utils/formatters';
import CopyButton from './CopyButton';
import TypeBadge from './TypeBadge';

export default defineComponent({
  name: 'ContainerRow',
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
    size: {
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
      type: [Object, Array, String, Number, Boolean] as PropType<JsonValue>,
      required: true,
    },
    kind: {
      type: String as PropType<ContainerKind>,
      required: true,
    },
  },
  emits: ['toggle'],
  setup(props: ContainerRowProps, { emit }) {
    const handleToggle = (): void => {
      emit('toggle');
    };

    return () => {
      const [open, close] = getBrackets(props.kind);
      const badgeContent = getBadgeContent(props.kind, props.isEmpty, props.size);
      const countLabel = getCountLabel(props.kind, props.size);
      const showKey = !props.isArrayItem && props.parentKey;

      return (
        <div class="jv-row">
          {showKey && (
            <span
              class="jv-key jv-clickable"
              style={{ color: props.keyColor }}
              onClick={handleToggle}
            >
              "{props.parentKey}"
            </span>
          )}
          {showKey && (
            <span class="jv-colon jv-clickable" onClick={handleToggle}>
              :
            </span>
          )}
          <span
            class="jv-toggle jv-type-indicator"
            style={{ color: props.bracketColor }}
            onClick={handleToggle}
          >
            <TypeBadge type={props.kind}>{badgeContent}</TypeBadge>
            {props.isEmpty ? (
              <span>{open}{close}</span>
            ) : (
              <span>{props.isExpanded ? open : `${open}...${close}`}</span>
            )}
          </span>
          {!props.isEmpty && !props.isExpanded && (
            <span
              class={['jv-count', props.darkMode ? 'jv-count-dark' : 'jv-count-light']}
              onClick={handleToggle}
            >
              {countLabel}
            </span>
          )}
          <CopyButton darkMode={props.darkMode} data={props.data} />
        </div>
      );
    };
  },
});
