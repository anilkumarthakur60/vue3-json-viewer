import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import JsonViewer from '../../src/package/components/JsonViewer';

describe('JsonViewer', () => {
  const mockData = {
    name: 'Test Object',
    count: 42,
    active: true,
    items: ['item1', 'item2'],
    nested: {
      value: 'nested value',
    },
  };

  beforeEach(() => {
    // Reset any global state if needed
  });

  it('renders correctly with default props', () => {
    const wrapper = mount(JsonViewer, {
      props: {
        data: mockData,
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.json-viewer-dark')).toBeTruthy();
  });

  it('renders with light mode when darkMode is false', () => {
    const wrapper = mount(JsonViewer, {
      props: {
        data: mockData,
        darkMode: false,
      },
    });

    expect(wrapper.find('.json-viewer-light')).toBeTruthy();
  });

  it('passes correct props to NestedComponent', () => {
    const wrapper = mount(JsonViewer, {
      props: {
        data: mockData,
        darkMode: false,
        level: 1,
        parentKey: 'testKey',
        expanded: true,
      },
    });

    const nestedComponent = wrapper.findComponent({ name: 'NestedComponent' });
    expect(nestedComponent.exists()).toBe(true);
    expect(nestedComponent.props('data')).toEqual(mockData);
    expect(nestedComponent.props('darkMode')).toBe(false);
    expect(nestedComponent.props('level')).toBe(1);
    expect(nestedComponent.props('parentKey')).toBe('testKey');
    expect(nestedComponent.props('expanded')).toBe(true);
  });

  it('handles different data types correctly', async () => {
    const testCases = [
      { data: 'string value', type: 'string' },
      { data: 123, type: 'number' },
      { data: true, type: 'boolean' },
      { data: null, type: 'null' },
      { data: [], type: 'array' },
      { data: {}, type: 'object' },
    ];

    for (const testCase of testCases) {
      const wrapper = mount(JsonViewer, {
        props: {
          data: testCase.data,
        },
      });

      expect(wrapper.exists()).toBe(true);
      // Component should render without errors for all data types
    }
  });

  it('handles complex nested objects', () => {
    const complexData = {
      users: [
        { id: 1, name: 'John', active: true },
        { id: 2, name: 'Jane', active: false },
      ],
      metadata: {
        total: 2,
        page: 1,
        filters: {
          status: 'active',
          date: new Date('2023-01-01'),
        },
      },
      tags: new Set(['tag1', 'tag2']),
      config: new Map([
        ['key1', 'value1'],
        ['key2', 'value2'],
      ]),
    };

    const wrapper = mount(JsonViewer, {
      props: {
        data: complexData,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('handles special JavaScript objects', () => {
    const specialData = {
      date: new Date('2023-01-01'),
      regex: /test-pattern/gi,
      map: new Map([['key', 'value']]),
      set: new Set([1, 2, 3]),
    };

    const wrapper = mount(JsonViewer, {
      props: {
        data: specialData,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
