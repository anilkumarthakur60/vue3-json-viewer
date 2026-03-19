import { defineComponent, ref, type PropType } from 'vue';
import type { JsonValue } from '../../../types';

export interface CopyButtonProps {
  darkMode: boolean;
  data: JsonValue;
}

export default defineComponent({
  name: 'CopyButton',
  props: {
    darkMode: {
      type: Boolean,
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
  setup(props) {
    const copySuccess = ref<boolean>(false);

    const handleCopy = (event: Event): void => {
      event.stopPropagation();
      const text = JSON.stringify(props.data, null, 2);
      navigator.clipboard.writeText(text).then((): void => {
        copySuccess.value = true;
        setTimeout((): void => {
          copySuccess.value = false;
        }, 1500);
      });
    };

    return () => (
      <button
        class={[
          'jv-copy-btn',
          props.darkMode ? 'jv-copy-btn-dark' : 'jv-copy-btn-light',
        ]}
        onClick={handleCopy}
        title={copySuccess.value ? 'Copied!' : 'Copy'}
      >
        {!copySuccess.value ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect
              x="9"
              y="9"
              width="13"
              height="13"
              rx="2"
              ry="2"
            ></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </button>
    );
  },
});
