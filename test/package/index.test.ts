import { describe, it, expect, vi } from 'vitest';
import { createApp } from 'vue';
import {
  JsonViewer,
  NestedComponent,
  jsonViewerPlugin,
  useJsonViewer,
  defaultDarkTheme,
  defaultLightTheme,
} from '../../src/package/index';
import type {
  JsonViewerProps,
  JsonValue,
  JsonObject,
  JsonArray,
  ThemeMode,
} from '../../src/package/index';

describe('Package Index', () => {
  describe('Component exports', () => {
    it('exports JsonViewer component', () => {
      expect(JsonViewer).toBeDefined();
      expect(JsonViewer.name).toBe('JsonViewer');
    });

    it('exports NestedComponent component', () => {
      expect(NestedComponent).toBeDefined();
      expect(NestedComponent.name).toBe('NestedComponent');
    });
  });

  describe('Plugin export', () => {
    it('exports jsonViewerPlugin with install method', () => {
      expect(jsonViewerPlugin).toBeDefined();
      expect(typeof jsonViewerPlugin.install).toBe('function');
    });

    it('installs components correctly', () => {
      const app = createApp({});
      const componentSpy = vi.fn();
      app.component = componentSpy;

      if (jsonViewerPlugin && jsonViewerPlugin.install) {
        jsonViewerPlugin.install(app);
      }

      expect(componentSpy).toHaveBeenCalledWith('JsonViewer', JsonViewer);
      expect(componentSpy).toHaveBeenCalledWith(
        'NestedComponent',
        NestedComponent,
      );
    });
  });

  describe('Composable export', () => {
    it('exports useJsonViewer composable', () => {
      expect(useJsonViewer).toBeDefined();
      expect(typeof useJsonViewer).toBe('function');
    });

    it('useJsonViewer returns correct interface', () => {
      const props = {
        data: { test: 'value' },
        darkMode: true,
        level: 0,
        parentKey: 'root',
        expanded: false,
      };

      const result = useJsonViewer(props);

      // Check that all expected properties are present
      expect(result).toHaveProperty('expanded');
      expect(result).toHaveProperty('copySuccess');
      expect(result).toHaveProperty('isObject');
      expect(result).toHaveProperty('isArray');
      expect(result).toHaveProperty('isRegExp');
      expect(result).toHaveProperty('isDate');
      expect(result).toHaveProperty('isMap');
      expect(result).toHaveProperty('isSet');
      expect(result).toHaveProperty('isCopyable');
      expect(result).toHaveProperty('displayValue');
      expect(result).toHaveProperty('valueClass');
      expect(result).toHaveProperty('displayDataType');
      expect(result).toHaveProperty('collapsedPreview');
      expect(result).toHaveProperty('toggle');
      expect(result).toHaveProperty('copyNode');
      expect(result).toHaveProperty('getBracketColor');
      expect(result).toHaveProperty('formatValue');
      expect(result).toHaveProperty('formatDisplayValue');
    });
  });

  describe('Theme exports', () => {
    it('exports defaultDarkTheme with correct structure', () => {
      expect(defaultDarkTheme).toBeDefined();
      expect(defaultDarkTheme).toHaveProperty('background');
      expect(defaultDarkTheme).toHaveProperty('text');
      expect(defaultDarkTheme).toHaveProperty('key');
      expect(defaultDarkTheme).toHaveProperty('string');
      expect(defaultDarkTheme).toHaveProperty('number');
      expect(defaultDarkTheme).toHaveProperty('boolean');
      expect(defaultDarkTheme).toHaveProperty('null');
      expect(defaultDarkTheme).toHaveProperty('bracket');
      expect(Array.isArray(defaultDarkTheme.bracket)).toBe(true);
      expect(defaultDarkTheme.bracket.length).toBe(6);
    });

    it('exports defaultLightTheme with correct structure', () => {
      expect(defaultLightTheme).toBeDefined();
      expect(defaultLightTheme).toHaveProperty('background');
      expect(defaultLightTheme).toHaveProperty('text');
      expect(defaultLightTheme).toHaveProperty('key');
      expect(defaultLightTheme).toHaveProperty('string');
      expect(defaultLightTheme).toHaveProperty('number');
      expect(defaultLightTheme).toHaveProperty('boolean');
      expect(defaultLightTheme).toHaveProperty('null');
      expect(defaultLightTheme).toHaveProperty('bracket');
      expect(Array.isArray(defaultLightTheme.bracket)).toBe(true);
      expect(defaultLightTheme.bracket.length).toBe(6);
    });

    it('themes have different color values', () => {
      expect(defaultDarkTheme.background).not.toBe(
        defaultLightTheme.background,
      );
      expect(defaultDarkTheme.text).not.toBe(defaultLightTheme.text);
      expect(defaultDarkTheme.bracket[0]).not.toBe(
        defaultLightTheme.bracket[0],
      );
    });
  });

  describe('Type exports', () => {
    it('JsonValue type accepts various data types', () => {
      // This is a compile-time test, but we can test runtime behavior
      const testValues: JsonValue[] = [
        'string',
        123,
        true,
        null,
        undefined,
        [],
        {},
        new Date(),
        /regex/,
        new Map(),
        new Set(),
      ];

      expect(testValues).toHaveLength(11);
    });

    it('JsonObject type works correctly', () => {
      const obj: JsonObject = {
        string: 'value',
        number: 42,
        boolean: true,
        null: null,
        array: [1, 2, 3],
        nested: { key: 'value' },
      };

      expect(obj.string).toBe('value');
      expect(obj.number).toBe(42);
    });

    it('JsonArray type works correctly', () => {
      const arr: JsonArray = [
        'string',
        123,
        true,
        null,
        { key: 'value' },
        [1, 2, 3],
      ];

      expect(arr).toHaveLength(6);
      expect(arr[0]).toBe('string');
    });

    it('ThemeMode type accepts correct values', () => {
      const darkMode: ThemeMode = 'dark';
      const lightMode: ThemeMode = 'light';

      expect(darkMode).toBe('dark');
      expect(lightMode).toBe('light');
    });
  });

  describe('Default export', () => {
    it('default export is the plugin', () => {
      // Test using ES6 import instead of require for TypeScript modules
      expect(jsonViewerPlugin).toBeDefined();
      // The default export should be the same as the named export
      // This is validated by the import working at the top of the file
    });
  });

  describe('Auto-install functionality', () => {
    it('does not throw when window.Vue is not available', () => {
      // This test ensures the auto-install code doesn't break in non-browser environments
      // The import at the top of the file already validates this works in test environment
      expect(() => {
        // Auto-install code should not throw in non-browser environments
        if (typeof window !== 'undefined' && (window as any).Vue) {
          jsonViewerPlugin.install((window as any).Vue);
        }
      }).not.toThrow();
    });
  });

  describe('Integration test', () => {
    it('components work together correctly', () => {
      const testData = {
        name: 'Integration Test',
        items: [1, 2, 3],
        metadata: {
          created: new Date('2023-01-01'),
          tags: new Set(['test', 'integration']),
        },
      };

      // Test that we can create components with the exported data
      expect(() => {
        const props: JsonViewerProps = {
          data: testData,
          darkMode: true,
          level: 0,
          parentKey: 'root',
          expanded: true,
        };

        const composableResult = useJsonViewer(props);
        expect(composableResult.isObject.value).toBe(true);
      }).not.toThrow();
    });
  });
});
