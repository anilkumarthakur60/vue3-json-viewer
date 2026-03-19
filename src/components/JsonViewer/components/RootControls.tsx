import { defineComponent } from 'vue';

export interface RootControlsProps {
  darkMode: boolean;
}

export interface RootControlsEmits {
  'expand-all': () => void;
  'collapse-all': () => void;
}

export default defineComponent({
  name: 'RootControls',
  props: {
    darkMode: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['expand-all', 'collapse-all'],
  setup(props, { emit }) {
    const handleExpandAll = (): void => {
      emit('expand-all');
    };

    const handleCollapseAll = (): void => {
      emit('collapse-all');
    };

    return () => (
      <div class="jv-root-controls">
        <button
          class={[
            'jv-control-btn',
            props.darkMode ? 'jv-control-btn-dark' : 'jv-control-btn-light',
          ]}
          onClick={handleExpandAll}
          title="Expand All"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          Expand All
        </button>
        <button
          class={[
            'jv-control-btn',
            props.darkMode ? 'jv-control-btn-dark' : 'jv-control-btn-light',
          ]}
          onClick={handleCollapseAll}
          title="Collapse All"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
          Collapse All
        </button>
      </div>
    );
  },
});
