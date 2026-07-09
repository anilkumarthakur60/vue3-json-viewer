/**
 * Shared expand/collapse state for the JSON tree.
 *
 * The state is owned by the root component (which never unmounts) and shared
 * with every descendant node via provide/inject. This is what lets a node's
 * expanded/collapsed state survive a collapse of one of its ancestors: because
 * the store lives above the part of the tree that gets unmounted, the state is
 * not destroyed when children are torn down, and is restored on re-expand.
 *
 * @packageDocumentation
 */

import {
  inject,
  provide,
  reactive,
  type InjectionKey,
  type Ref,
} from 'vue';
import type {
  JsonValue,
  ToggleEventPayload,
  CopyEventPayload,
} from '../../types';

/** Matches keys safe to serialize with dot notation (`$.foo`). */
const SAFE_KEY = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/**
 * Builds a unique, JSONPath-style path for a child node.
 *
 * Identifier-safe object keys use dot notation (`$.address.city`); any other
 * key (containing `.`, `[`, quotes, spaces, etc.) is bracket-quoted
 * (`$["a.b"]`) so it can never collide with a genuinely nested path. Array
 * items always use bracket-index notation (`$.items[0]`).
 */
export function buildChildPath(
  basePath: string,
  key: string,
  isArrayItem: boolean,
): string {
  if (isArrayItem) return `${basePath}[${key}]`;
  return SAFE_KEY.test(key)
    ? `${basePath}.${key}`
    : `${basePath}[${JSON.stringify(key)}]`;
}

/** The reactive expand/collapse store shared across the tree. */
export interface JsonViewerContext {
  /** Whether the node at `path` is currently expanded. */
  isExpanded: (path: string) => boolean;
  /** Explicitly set the expanded state for a node and notify listeners. */
  setExpanded: (path: string, key: string, expanded: boolean) => void;
  /** Flip the expanded state for a node and notify listeners. */
  toggle: (path: string, key: string) => void;
  /** Expand every node (clears per-node overrides, baseline → expanded). */
  expandAll: () => void;
  /** Collapse every node (clears per-node overrides, baseline → collapsed). */
  collapseAll: () => void;
  /** Reset all state to a given baseline (used when the `expanded` prop changes). */
  reset: (expanded: boolean) => void;
  /** Notify listeners that a node's value was copied. */
  notifyCopy: (path: string, key: string, value: JsonValue) => void;
}

/** Injection key for the shared {@link JsonViewerContext}. */
export const JSON_VIEWER_CONTEXT: InjectionKey<JsonViewerContext> =
  Symbol('json-viewer-context');

/** Options for {@link createJsonViewerContext}. */
export interface CreateContextOptions {
  /**
   * The baseline expanded state applied to any node without an explicit
   * override. Passing a ref lets the root keep it in sync with the `expanded`
   * prop.
   */
  defaultExpanded: Ref<boolean>;
  /** Called whenever a node is toggled/set. */
  onToggle?: (payload: ToggleEventPayload) => void;
  /** Called whenever a node's value is copied. */
  onCopy?: (payload: CopyEventPayload) => void;
}

/**
 * Creates the reactive expand/collapse store.
 *
 * State model: a per-node override map layered over a single baseline value.
 * A node with no override falls back to the baseline, so "expand all" /
 * "collapse all" is just clearing overrides and flipping the baseline — no need
 * to enumerate every node in the tree.
 */
export function createJsonViewerContext(
  options: CreateContextOptions,
): JsonViewerContext {
  const { defaultExpanded, onToggle, onCopy } = options;

  // Reactive Map: reads (get/has) are tracked and writes (set/clear) trigger
  // re-renders in the nodes that depend on them.
  const overrides = reactive(new Map<string, boolean>());

  const isExpanded = (path: string): boolean => {
    const override = overrides.get(path);
    return override === undefined ? defaultExpanded.value : override;
  };

  const setExpanded = (path: string, key: string, expanded: boolean): void => {
    overrides.set(path, expanded);
    onToggle?.({ path, key, expanded });
  };

  const toggle = (path: string, key: string): void => {
    setExpanded(path, key, !isExpanded(path));
  };

  const reset = (expanded: boolean): void => {
    overrides.clear();
    defaultExpanded.value = expanded;
  };

  const expandAll = (): void => reset(true);
  const collapseAll = (): void => reset(false);

  const notifyCopy = (path: string, key: string, value: JsonValue): void => {
    onCopy?.({ path, key, value });
  };

  return {
    isExpanded,
    setExpanded,
    toggle,
    expandAll,
    collapseAll,
    reset,
    notifyCopy,
  };
}

/** Provides the context to descendants. Must be called during `setup`. */
export function provideJsonViewerContext(ctx: JsonViewerContext): void {
  provide(JSON_VIEWER_CONTEXT, ctx);
}

/**
 * Injects the shared context, or `null` when a component is used outside of a
 * provider (e.g. an internal component rendered in isolation).
 */
export function useJsonViewerContext(): JsonViewerContext | null {
  return inject(JSON_VIEWER_CONTEXT, null);
}
