import { defineComponent } from 'vue';
import type { RootControlsProps } from '../../../types';

const ExpandIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const CollapseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

export default defineComponent({
  name: 'RootControls',
  props: {
    darkMode: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['expand-all', 'collapse-all'],
  setup(props: RootControlsProps, { emit }) {
    const handleExpandAll = (): void => emit('expand-all');
    const handleCollapseAll = (): void => emit('collapse-all');

    const buttonClass = (darkMode: boolean): string[] => [
      'jv-control-btn',
      darkMode ? 'jv-control-btn-dark' : 'jv-control-btn-light',
    ];

    return () => (
      <div class="jv-root-controls">
        <button
          class={buttonClass(props.darkMode)}
          onClick={handleExpandAll}
          title="Expand All"
        >
          <ExpandIcon />
          Expand All
        </button>
        <button
          class={buttonClass(props.darkMode)}
          onClick={handleCollapseAll}
          title="Collapse All"
        >
          <CollapseIcon />
          Collapse All
        </button>
      </div>
    );
  },
});
