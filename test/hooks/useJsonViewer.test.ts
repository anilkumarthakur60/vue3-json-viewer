import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useJsonViewer } from '../../src/hooks/useJsonViewer';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
  },
});

describe('useJsonViewer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic functionality', () => {
    it('initializes with correct default values', () => {
      const props = {
        data: { test: 'value' },
        darkMode: true,
        level: 0,
        parentKey: 'root',
        expanded: false,
      };

      const {
        expanded,
        copySuccess,
        isObject,
        isArray,
        isRegExp,
        isDate,
        isMap,
        isSet,
        isCopyable,
      } = useJsonViewer(props);

      expect(expanded.value).toBe(false);
      expect(copySuccess.value).toBe(false);
      expect(isObject.value).toBe(true);
      expect(isArray.value).toBe(false);
      expect(isRegExp.value).toBe(false);
      expect(isDate.value).toBe(false);
      expect(isMap.value).toBe(false);
      expect(isSet.value).toBe(false);
      expect(isCopyable.value).toBe(true);
    });

    it('correctly identifies different data types', () => {
      const testCases = [
        {
          data: 'string',
          expected: {
            isObject: false,
            isArray: false,
            isRegExp: false,
            isDate: false,
            isMap: false,
            isSet: false,
          },
        },
        {
          data: 123,
          expected: {
            isObject: false,
            isArray: false,
            isRegExp: false,
            isDate: false,
            isMap: false,
            isSet: false,
          },
        },
        {
          data: true,
          expected: {
            isObject: false,
            isArray: false,
            isRegExp: false,
            isDate: false,
            isMap: false,
            isSet: false,
          },
        },
        {
          data: null,
          expected: {
            isObject: false,
            isArray: false,
            isRegExp: false,
            isDate: false,
            isMap: false,
            isSet: false,
          },
        },
        {
          data: [],
          expected: {
            isObject: false,
            isArray: true,
            isRegExp: false,
            isDate: false,
            isMap: false,
            isSet: false,
          },
        },
        {
          data: {},
          expected: {
            isObject: true,
            isArray: false,
            isRegExp: false,
            isDate: false,
            isMap: false,
            isSet: false,
          },
        },
        {
          data: new Date(),
          expected: {
            isObject: false,
            isArray: false,
            isRegExp: false,
            isDate: true,
            isMap: false,
            isSet: false,
          },
        },
        {
          data: /test/,
          expected: {
            isObject: false,
            isArray: false,
            isRegExp: true,
            isDate: false,
            isMap: false,
            isSet: false,
          },
        },
        {
          data: new Map(),
          expected: {
            isObject: false,
            isArray: false,
            isRegExp: false,
            isDate: false,
            isMap: true,
            isSet: false,
          },
        },
        {
          data: new Set(),
          expected: {
            isObject: false,
            isArray: false,
            isRegExp: false,
            isDate: false,
            isMap: false,
            isSet: true,
          },
        },
      ];

      testCases.forEach(({ data, expected }) => {
        const props = {
          data,
          darkMode: true,
          level: 0,
          parentKey: 'test',
          expanded: false,
        };
        const { isObject, isArray, isRegExp, isDate, isMap, isSet } =
          useJsonViewer(props);

        expect(isObject.value).toBe(expected.isObject);
        expect(isArray.value).toBe(expected.isArray);
        expect(isRegExp.value).toBe(expected.isRegExp);
        expect(isDate.value).toBe(expected.isDate);
        expect(isMap.value).toBe(expected.isMap);
        expect(isSet.value).toBe(expected.isSet);
      });
    });
  });

  describe('Value formatting', () => {
    it('formats different value types correctly', () => {
      const props = {
        data: 'test',
        darkMode: true,
        level: 0,
        parentKey: 'root',
        expanded: false,
      };

      const { formatValue } = useJsonViewer(props);

      expect(formatValue('string')).toBe('"string"');
      expect(formatValue(123)).toBe('123');
      expect(formatValue(true)).toBe('true');
      expect(formatValue(null)).toBe('null');
      expect(formatValue(undefined)).toBe('undefined');
      expect(formatValue([])).toBe('[...]');
      expect(formatValue({})).toBe('{...}');

      const date = new Date('2023-01-01T00:00:00.000Z');
      expect(formatValue(date)).toBe('2023-01-01T00:00:00.000Z');

      const regex = /test/gi;
      expect(formatValue(regex)).toBe('/test/gi');
    });

    it('generates correct display values', () => {
      const testCases = [
        { data: 'test string', expected: '"test string"' },
        { data: 42, expected: '42' },
        { data: true, expected: 'true' },
        { data: false, expected: 'false' },
        { data: null, expected: 'null' },
        { data: undefined, expected: 'undefined' },
      ];

      testCases.forEach(({ data, expected }) => {
        const props = {
          data,
          darkMode: true,
          level: 0,
          parentKey: 'test',
          expanded: false,
        };
        const { displayValue } = useJsonViewer(props);
        expect(displayValue.value).toBe(expected);
      });
    });

    it('generates correct value classes', () => {
      const testCases = [
        { data: 'string', expected: 'string-value' },
        { data: 123, expected: 'number-value' },
        { data: true, expected: 'boolean-value' },
        { data: null, expected: 'null-value' },
        { data: new Date(), expected: 'date-value' },
        { data: /test/, expected: 'regexp-value' },
      ];

      testCases.forEach(({ data, expected }) => {
        const props = {
          data,
          darkMode: true,
          level: 0,
          parentKey: 'test',
          expanded: false,
        };
        const { valueClass } = useJsonViewer(props);
        expect(valueClass.value).toBe(expected);
      });
    });
  });

  describe('Collapsed preview generation', () => {
    it('generates correct preview for objects', () => {
      const data = { name: 'test', value: 42, active: true };
      const props = {
        data,
        darkMode: true,
        level: 0,
        parentKey: 'obj',
        expanded: false,
      };
      const { collapsedPreview } = useJsonViewer(props);

      expect(collapsedPreview.value).toContain('name: "test"');
      expect(collapsedPreview.value).toContain('value: 42');
      expect(collapsedPreview.value).toContain('...');
    });

    it('generates correct preview for arrays', () => {
      const data = ['item1', 'item2', 'item3'];
      const props = {
        data,
        darkMode: true,
        level: 0,
        parentKey: 'arr',
        expanded: false,
      };
      const { collapsedPreview } = useJsonViewer(props);

      expect(collapsedPreview.value).toContain('"item1"');
      expect(collapsedPreview.value).toContain('"item2"');
      expect(collapsedPreview.value).toContain('...');
    });

    it('generates correct preview for Maps', () => {
      const data = new Map([
        ['key1', 'value1'],
        ['key2', 'value2'],
        ['key3', 'value3'],
      ]);
      const props = {
        data,
        darkMode: true,
        level: 0,
        parentKey: 'map',
        expanded: false,
      };
      const { collapsedPreview } = useJsonViewer(props);

      expect(collapsedPreview.value).toContain('Map {');
      expect(collapsedPreview.value).toContain('key1: "value1"');
      expect(collapsedPreview.value).toContain('...');
    });

    it('generates correct preview for Sets', () => {
      const data = new Set(['item1', 'item2', 'item3']);
      const props = {
        data,
        darkMode: true,
        level: 0,
        parentKey: 'set',
        expanded: false,
      };
      const { collapsedPreview } = useJsonViewer(props);

      expect(collapsedPreview.value).toContain('Set {');
      expect(collapsedPreview.value).toContain('"item1"');
      expect(collapsedPreview.value).toContain('...');
    });
  });

  describe('Actions', () => {
    it('toggles expanded state correctly', () => {
      const props = {
        data: { test: 'value' },
        darkMode: true,
        level: 0,
        parentKey: 'root',
        expanded: false,
      };

      const { expanded, toggle } = useJsonViewer(props);

      expect(expanded.value).toBe(false);
      toggle();
      expect(expanded.value).toBe(true);
      toggle();
      expect(expanded.value).toBe(false);
    });

    it('copies data to clipboard successfully', async () => {
      const data = { test: 'value', number: 42 };
      const props = {
        data,
        darkMode: true,
        level: 0,
        parentKey: 'root',
        expanded: false,
      };
      const { copyNode, copySuccess } = useJsonViewer(props);

      await copyNode();

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        JSON.stringify(data, null, 2),
      );
      expect(copySuccess.value).toBe(true);

      // Test that copySuccess resets after timeout
      await new Promise((resolve) => setTimeout(resolve, 2100));
      expect(copySuccess.value).toBe(false);
    });

    it('handles clipboard errors gracefully', async () => {
      vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(
        new Error('Clipboard not available'),
      );

      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const props = {
        data: 'test',
        darkMode: true,
        level: 0,
        parentKey: 'root',
        expanded: false,
      };

      const { copyNode } = useJsonViewer(props);
      await copyNode();

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to copy to clipboard:',
        expect.any(Error),
      );

      consoleSpy.mockRestore();
    });
  });

  describe('Theme integration', () => {
    it('returns correct bracket colors for dark theme', () => {
      const props = {
        data: {},
        darkMode: true,
        level: 0,
        parentKey: 'root',
        expanded: false,
      };

      const { getBracketColor } = useJsonViewer(props);

      expect(getBracketColor(0)).toBe('#e06c75');
      expect(getBracketColor(1)).toBe('#e5c07b');
      expect(getBracketColor(2)).toBe('#98c379');
    });

    it('returns correct bracket colors for light theme', () => {
      const props = {
        data: {},
        darkMode: false,
        level: 0,
        parentKey: 'root',
        expanded: false,
      };

      const { getBracketColor } = useJsonViewer(props);

      expect(getBracketColor(0)).toBe('#d32f2f');
      expect(getBracketColor(1)).toBe('#fbc02d');
      expect(getBracketColor(2)).toBe('#388e3c');
    });

    it('cycles through colors correctly for deep nesting', () => {
      const props = {
        data: {},
        darkMode: true,
        level: 0,
        parentKey: 'root',
        expanded: false,
      };

      const { getBracketColor } = useJsonViewer(props);

      // Test that colors cycle after 6 levels
      expect(getBracketColor(0)).toBe(getBracketColor(6));
      expect(getBracketColor(1)).toBe(getBracketColor(7));
    });
  });

  describe('Data type detection', () => {
    it('correctly identifies copyable values', () => {
      const testCases = [
        { data: 'string', expected: true },
        { data: 123, expected: true },
        { data: true, expected: true },
        { data: { obj: 'value' }, expected: true },
        { data: null, expected: false },
        { data: undefined, expected: false },
      ];

      testCases.forEach(({ data, expected }) => {
        const props = {
          data,
          darkMode: true,
          level: 0,
          parentKey: 'test',
          expanded: false,
        };
        const { isCopyable } = useJsonViewer(props);
        expect(isCopyable.value).toBe(expected);
      });
    });

    it('correctly identifies display data types', () => {
      const testCases = [
        { data: 'string', expected: 'string' },
        { data: 123, expected: 'number' },
        { data: true, expected: 'boolean' },
        { data: null, expected: 'null' },
        { data: undefined, expected: 'undefined' },
        { data: [], expected: 'array' },
        { data: {}, expected: 'object' },
        { data: new Date(), expected: 'date' },
        { data: /test/, expected: 'regexp' },
        { data: new Map(), expected: 'map' },
        { data: new Set(), expected: 'set' },
      ];

      testCases.forEach(({ data, expected }) => {
        const props = {
          data,
          darkMode: true,
          level: 0,
          parentKey: 'test',
          expanded: false,
        };
        const { displayDataType } = useJsonViewer(props);
        expect(displayDataType.value).toBe(expected);
      });
    });
  });
});
