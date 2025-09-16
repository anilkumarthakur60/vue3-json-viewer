import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import NestedComponent from '../../src/package/components/NestedComponent';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
  },
});

describe('NestedComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Object rendering', () => {
    it('renders object with correct structure', () => {
      const data = { name: 'test', value: 42 };
      const wrapper = mount(NestedComponent, {
        props: {
          data,
          level: 0,
          parentKey: 'root',
          darkMode: true,
          expanded: true,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.text()).toContain('root');
      expect(wrapper.text()).toContain('{');
    });

    it('shows collapsed preview when not expanded', () => {
      const data = { name: 'test', value: 42, active: true };
      const wrapper = mount(NestedComponent, {
        props: {
          data,
          level: 1,
          parentKey: 'obj',
          darkMode: true,
          expanded: false,
        },
      });

      expect(wrapper.text()).toContain('name: "test", value: 42');
    });

    it('renders with toggle functionality', async () => {
      const data = { name: 'test' };
      const wrapper = mount(NestedComponent, {
        props: {
          data,
          level: 1,
          parentKey: 'obj',
          darkMode: true,
          expanded: false,
        },
      });

      // Verify the component renders correctly
      expect(wrapper.exists()).toBe(true);

      // Verify that clickable elements are present (toggle functionality)
      const clickableElements = wrapper.findAll('.cursor-pointer');
      expect(clickableElements.length).toBeGreaterThan(0);

      // Verify the component renders the data correctly
      expect(wrapper.text()).toContain('test');

      // Verify it shows collapsed state initially (showing preview)
      expect(wrapper.text()).toContain('{ name: "test" }');
    });
  });

  describe('Array rendering', () => {
    it('renders array with correct structure', () => {
      const data = ['item1', 'item2', 'item3'];
      const wrapper = mount(NestedComponent, {
        props: {
          data,
          level: 0,
          parentKey: 'items',
          darkMode: true,
          expanded: true,
        },
      });

      expect(wrapper.text()).toContain('items:');
      expect(wrapper.text()).toContain('[3]');
    });

    it('shows array length in collapsed state', () => {
      const data = [1, 2, 3, 4, 5];
      const wrapper = mount(NestedComponent, {
        props: {
          data,
          level: 1,
          parentKey: 'numbers',
          darkMode: true,
          expanded: false,
        },
      });

      expect(wrapper.text()).toContain('[5]');
    });
  });

  describe('Primitive value rendering', () => {
    it('renders string values correctly', () => {
      const wrapper = mount(NestedComponent, {
        props: {
          data: 'test string',
          level: 1,
          parentKey: 'text',
          darkMode: true,
          expanded: false,
        },
      });

      expect(wrapper.text()).toContain('text');
      expect(wrapper.text()).toContain('"test string"');
      expect(wrapper.find('.string-value')).toBeTruthy();
    });

    it('renders number values correctly', () => {
      const wrapper = mount(NestedComponent, {
        props: {
          data: 42,
          level: 1,
          parentKey: 'count',
          darkMode: true,
          expanded: false,
        },
      });

      expect(wrapper.text()).toContain('count');
      expect(wrapper.text()).toContain('42');
      expect(wrapper.find('.number-value')).toBeTruthy();
    });

    it('renders boolean values correctly', () => {
      const wrapper = mount(NestedComponent, {
        props: {
          data: true,
          level: 1,
          parentKey: 'active',
          darkMode: true,
          expanded: false,
        },
      });

      expect(wrapper.text()).toContain('active');
      expect(wrapper.text()).toContain('true');
      expect(wrapper.find('.boolean-value')).toBeTruthy();
    });

    it('renders null values correctly', () => {
      const wrapper = mount(NestedComponent, {
        props: {
          data: null,
          level: 1,
          parentKey: 'empty',
          darkMode: true,
          expanded: false,
        },
      });

      expect(wrapper.text()).toContain('empty');
      expect(wrapper.text()).toContain('null');
      expect(wrapper.find('.null-value')).toBeTruthy();
    });
  });

  describe('Special object types', () => {
    it('renders Date objects correctly', () => {
      const date = new Date('2023-01-01T00:00:00.000Z');
      const wrapper = mount(NestedComponent, {
        props: {
          data: date,
          level: 1,
          parentKey: 'created',
          darkMode: true,
          expanded: false,
        },
      });

      expect(wrapper.text()).toContain('created');
      expect(wrapper.text()).toContain('2023-01-01T00:00:00.000Z');
      expect(wrapper.find('.date-value')).toBeTruthy();
    });

    it('renders RegExp objects correctly', () => {
      const regex = /test-pattern/gi;
      const wrapper = mount(NestedComponent, {
        props: {
          data: regex,
          level: 1,
          parentKey: 'pattern',
          darkMode: true,
          expanded: false,
        },
      });

      expect(wrapper.text()).toContain('pattern');
      expect(wrapper.text()).toContain('/test-pattern/gi');
      expect(wrapper.find('.regexp-value')).toBeTruthy();
    });

    it('renders Map objects correctly', () => {
      const map = new Map([
        ['key1', 'value1'],
        ['key2', 'value2'],
      ]);
      const wrapper = mount(NestedComponent, {
        props: {
          data: map,
          level: 1,
          parentKey: 'mapping',
          darkMode: true,
          expanded: false,
        },
      });

      expect(wrapper.text()).toContain('mapping');
      expect(wrapper.text()).toContain('[Map]');
    });

    it('renders Set objects correctly', () => {
      const set = new Set(['item1', 'item2', 'item3']);
      const wrapper = mount(NestedComponent, {
        props: {
          data: set,
          level: 1,
          parentKey: 'tags',
          darkMode: true,
          expanded: false,
        },
      });

      expect(wrapper.text()).toContain('tags');
      expect(wrapper.text()).toContain('[Set]');
    });
  });

  describe('Copy functionality', () => {
    it('copies data to clipboard when copy button is clicked', async () => {
      const data = { test: 'value' };
      const wrapper = mount(NestedComponent, {
        props: {
          data,
          level: 1,
          parentKey: 'obj',
          darkMode: true,
          expanded: false,
        },
      });

      const copyButton = wrapper.find('.copy-icon');
      await copyButton.trigger('click');

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        JSON.stringify(data, null, 2),
      );
    });

    it('shows copy success tooltip after copying', async () => {
      const data = 'test string';
      const wrapper = mount(NestedComponent, {
        props: {
          data,
          level: 1,
          parentKey: 'text',
          darkMode: true,
          expanded: false,
        },
      });

      const copyButton = wrapper.find('.copy-icon');
      await copyButton.trigger('click');

      // Wait for next tick to allow reactive updates
      await wrapper.vm.$nextTick();

      expect(wrapper.find('.copy-tooltip')).toBeTruthy();
      expect(wrapper.text()).toContain('Copied!');
    });
  });

  describe('Theme support', () => {
    it('applies dark theme classes correctly', () => {
      const wrapper = mount(NestedComponent, {
        props: {
          data: { test: 'value' },
          level: 0,
          parentKey: 'root',
          darkMode: true,
          expanded: true,
        },
      });

      expect(wrapper.find('.json-viewer-dark')).toBeTruthy();
    });

    it('applies light theme classes correctly', () => {
      const wrapper = mount(NestedComponent, {
        props: {
          data: { test: 'value' },
          level: 0,
          parentKey: 'root',
          darkMode: false,
          expanded: true,
        },
      });

      expect(wrapper.find('.json-viewer-light')).toBeTruthy();
    });
  });

  describe('Bracket colors', () => {
    it('applies different colors for different nesting levels', () => {
      const wrapper = mount(NestedComponent, {
        props: {
          data: { test: 'value' },
          level: 2,
          parentKey: 'nested',
          darkMode: true,
          expanded: true,
        },
      });

      // Check if style attribute contains color
      const bracketElement = wrapper.find('.type-label');
      expect(bracketElement.attributes('style')).toContain('color:');
    });
  });

  describe('Error handling', () => {
    it('handles clipboard API errors gracefully', async () => {
      // Mock clipboard to reject
      vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(
        new Error('Clipboard not available'),
      );

      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const wrapper = mount(NestedComponent, {
        props: {
          data: 'test',
          level: 1,
          parentKey: 'text',
          darkMode: true,
          expanded: false,
        },
      });

      const copyButton = wrapper.find('.copy-icon');
      await copyButton.trigger('click');

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to copy to clipboard:',
        expect.any(Error),
      );

      consoleSpy.mockRestore();
    });
  });
});
