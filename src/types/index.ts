/**
 * Vue3 JSON Viewer - Type Definitions
 * @packageDocumentation
 */

// ============================================================================
// Core Props Interfaces
// ============================================================================

/**
 * Main props interface for the JsonViewer component
 */
export interface JsonViewerProps {
  /**
   * The JSON data to display. Can be any valid JSON value.
   */
  data: JsonValue;

  /**
   * The nesting level of the current node (used internally for recursion)
   * @default 0
   */
  level?: number;

  /**
   * The key name of the current property in parent object
   * @default ''
   */
  parentKey?: string | number;

  /**
   * Enable dark mode theme
   * @default true
   */
  darkMode?: boolean;

  /**
   * Initial expanded state for all nodes
   * @default true
   */
  expanded?: boolean;
}

/**
 * Props interface for the internal NestedComponent
 * @internal
 */
export interface NestedComponentProps extends JsonViewerProps {
  /**
   * Whether this node is an item in an array (hides key display)
   * @default false
   */
  isArrayItem?: boolean;

  /**
   * Whether this is the last item in the parent container
   * @default true
   */
  isLast?: boolean;
}

// ============================================================================
// JSON Value Types
// ============================================================================

/**
 * Represents any valid JSON primitive value
 */
export type JsonPrimitive = string | number | boolean | null | undefined;

/**
 * Represents a JSON object with string keys
 */
export interface JsonObject {
  [key: string]: JsonValue;
}

/**
 * Represents a JSON array
 */
export type JsonArray = JsonValue[];

/**
 * Represents any valid JSON value including objects, arrays, and primitives
 */
export type JsonValue =
  | JsonPrimitive
  | JsonObject
  | JsonArray
  | Date
  | RegExp
  | ((...args: unknown[]) => unknown);

// ============================================================================
// Theme Configuration
// ============================================================================

/**
 * Color configuration for a specific theme
 */
export interface ThemeColors {
  /** Background color */
  background: string;
  /** Default text color */
  text: string;
  /** Color for string values */
  string: string;
  /** Color for number values */
  number: string;
  /** Color for boolean values */
  boolean: string;
  /** Color for null/undefined values */
  null: string;
  /** Color for date values */
  date: string;
  /** Color for regexp values */
  regexp: string;
  /** Color for object keys */
  objectKey: string;
  /** Color for array keys */
  arrayKey: string;
  /** Color for brackets */
  bracket: string;
}

/**
 * Complete theme configuration
 */
export interface JsonViewerTheme {
  /** Dark mode color scheme */
  dark: ThemeColors;
  /** Light mode color scheme */
  light: ThemeColors;
}

// ============================================================================
// Component Events
// ============================================================================

/**
 * Events emitted by the JsonViewer component
 */
export interface JsonViewerEmits {
  /**
   * Emitted when a node is expanded or collapsed
   */
  (event: 'toggle', payload: { key: string; expanded: boolean }): void;

  /**
   * Emitted when content is copied to clipboard
   */
  (event: 'copy', payload: { key: string; value: JsonValue }): void;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Type guard to check if a value is a plain object
 */
export type IsPlainObject<T> = T extends object
  ? T extends Array<unknown>
    ? false
    : T extends Date
      ? false
      : T extends RegExp
        ? false
        : T extends (...args: unknown[]) => unknown
          ? false
          : true
  : false;

/**
 * Extract keys from a JSON object type
 */
export type JsonKeys<T extends JsonObject> = keyof T & string;
