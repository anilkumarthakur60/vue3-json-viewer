import { defineComponent, type PropType } from 'vue';
import type { ContainerKind, TypeBadgeProps } from '../../../types';

export default defineComponent({
  name: 'TypeBadge',
  props: {
    type: {
      type: String as PropType<ContainerKind>,
      required: true,
    },
  },
  setup(props: TypeBadgeProps, { slots }) {
    return () => (
      <span class={['jv-type-badge', props.type === 'object' ? 'jv-type-object' : 'jv-type-array']}>
        {slots['default']?.()}
      </span>
    );
  },
});
