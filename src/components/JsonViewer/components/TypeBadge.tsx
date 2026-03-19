import { defineComponent, computed, type PropType } from 'vue';

export interface TypeBadgeProps {
  type: 'object' | 'array';
}

export default defineComponent({
  name: 'TypeBadge',
  props: {
    type: {
      type: String as PropType<'object' | 'array'>,
      required: true,
    },
  },
  setup(props, { slots }) {
    const typeClass = computed<string>(() => {
      return props.type === 'object' ? 'jv-type-object' : 'jv-type-array';
    });

    return () => (
      <span class={['jv-type-badge', typeClass.value]}>
        {slots['default']?.()}
      </span>
    );
  },
});
