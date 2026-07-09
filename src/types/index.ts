/**
 * Vue3 JSON Viewer - Type Definitions
 * @packageDocumentation
 */

// ============================================================================
// JSON Value Types
// ============================================================================

/** Represents any valid JSON primitive value */
export type JsonPrimitive = string | number | boolean | null | undefined;

/** Represents a JSON object with string keys */
export interface JsonObject {
  [key: string]: JsonValue;
}

/** Represents a JSON array */
export type JsonArray = JsonValue[];

/** Represents any displayable value including objects, arrays, primitives, and special types */
export type JsonValue =
  | JsonPrimitive
  | JsonObject
  | JsonArray
  | Date
  | RegExp
  | ((...args: unknown[]) => unknown);

// ============================================================================
// Container Types
// ============================================================================

/** Discriminates between object and array containers */
export type ContainerKind = 'object' | 'array';

// ============================================================================
// Component Props
// ============================================================================

/** Main props interface for the JsonViewer component */
export interface JsonViewerProps {
  /** The JSON data to display */
  data: JsonValue;
  /** The nesting level of the current node (used internally for recursion) @default 0 */
  level?: number;
  /** The key name of the current property in parent object @default '' */
  parentKey?: string | number;
  /** Enable dark mode theme @default true */
  darkMode?: boolean;
  /** Initial expanded state for all nodes @default true */
  expanded?: boolean;
}

/** Props interface for the internal JsonNode component @internal */
export interface JsonNodeProps extends JsonViewerProps {
  /** Whether this node is an item in an array (hides key display) @default false */
  isArrayItem?: boolean;
  /** Whether this is the last item in the parent container @default true */
  isLast?: boolean;
  /**
   * Unique path identifying this node within the tree (JSONPath-style, e.g.
   * `$.address.city` or `$.items[0]`). Used as the key for shared
   * expand/collapse state so it survives collapse of an ancestor. @default '$'
   */
  path?: string;
}

/** Props for ContainerRow (unified object/array header) */
export interface ContainerRowProps {
  parentKey: string | number;
  isArrayItem: boolean;
  isEmpty: boolean;
  isExpanded: boolean;
  size: number;
  darkMode: boolean;
  keyColor: string;
  bracketColor: string;
  data: JsonValue;
  kind: ContainerKind;
  /** Path of this container node, forwarded to CopyButton for copy events. */
  path: string;
}

/** Props for PrimitiveValue */
export interface PrimitiveValueProps {
  data: JsonValue;
  parentKey: string | number;
  isArrayItem: boolean;
  isLast: boolean;
  darkMode: boolean;
  keyColor: string;
  /** Path of this primitive node, forwarded to CopyButton for copy events. */
  path: string;
}

/** Props for CopyButton */
export interface CopyButtonProps {
  darkMode: boolean;
  data: JsonValue;
  /** Path of the node this button copies (used for the `copy` event). @default '$' */
  path?: string;
  /** Key of the node this button copies (used for the `copy` event). @default '' */
  parentKey?: string | number;
}

/** Props for TypeBadge */
export interface TypeBadgeProps {
  type: ContainerKind;
}

/** Props for RootControls */
export interface RootControlsProps {
  darkMode: boolean;
}

// ============================================================================
// Theme Configuration
// ============================================================================

/** Color configuration for a specific theme mode */
export interface ThemeColors {
  background: string;
  text: string;
  string: string;
  number: string;
  boolean: string;
  null: string;
  date: string;
  regexp: string;
  objectKey: string;
  arrayKey: string;
  bracket: string;
}

/** Complete theme configuration */
export interface JsonViewerTheme {
  dark: ThemeColors;
  light: ThemeColors;
}

// ============================================================================
// Component Events
// ============================================================================

/** Payload emitted when a node is expanded or collapsed */
export interface ToggleEventPayload {
  /** JSONPath-style path of the toggled node (e.g. `$.address`) */
  path: string;
  /** Key/index of the toggled node within its parent */
  key: string;
  /** The node's new expanded state */
  expanded: boolean;
}

/** Payload emitted when a node's value is copied to the clipboard */
export interface CopyEventPayload {
  /** JSONPath-style path of the copied node */
  path: string;
  /** Key/index of the copied node within its parent */
  key: string;
  /** The copied value */
  value: JsonValue;
}

/** Events emitted by the JsonViewer component */
export interface JsonViewerEmits {
  (event: 'toggle', payload: ToggleEventPayload): void;
  (event: 'copy', payload: CopyEventPayload): void;
}

// ============================================================================
// Utility Types
// ============================================================================

/** Type guard to check if a value is a plain object */
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

/** Extract keys from a JSON object type */
export type JsonKeys<T extends JsonObject> = keyof T & string;
