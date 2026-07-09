import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import {
  createJsonViewerContext,
  buildChildPath,
} from '../src/components/JsonViewer/context';

describe('buildChildPath', () => {
  it('uses dot notation for identifier-safe object keys', () => {
    expect(buildChildPath('$', 'address', false)).toBe('$.address');
    expect(buildChildPath('$.address', 'city', false)).toBe('$.address.city');
    expect(buildChildPath('$', '_private$1', false)).toBe('$._private$1');
  });

  it('uses bracket-index notation for array items', () => {
    expect(buildChildPath('$', '0', true)).toBe('$[0]');
    expect(buildChildPath('$.items', '3', true)).toBe('$.items[3]');
  });

  it('bracket-quotes keys that are not identifier-safe', () => {
    expect(buildChildPath('$', 'a.b', false)).toBe('$["a.b"]');
    expect(buildChildPath('$', 'has space', false)).toBe('$["has space"]');
    expect(buildChildPath('$', '123', false)).toBe('$["123"]');
  });

  it('never lets a dotted key collide with a genuinely nested path', () => {
    // key "a.b" at root vs. nested root.a -> b
    const dotted = buildChildPath('$', 'a.b', false);
    const nested = buildChildPath(buildChildPath('$', 'a', false), 'b', false);
    expect(dotted).not.toBe(nested);
    expect(dotted).toBe('$["a.b"]');
    expect(nested).toBe('$.a.b');
  });
});

describe('createJsonViewerContext', () => {
  it('falls back to the baseline when a path has no override', () => {
    const ctx = createJsonViewerContext({ defaultExpanded: ref(true) });
    expect(ctx.isExpanded('$.anything')).toBe(true);

    const collapsed = createJsonViewerContext({ defaultExpanded: ref(false) });
    expect(collapsed.isExpanded('$.anything')).toBe(false);
  });

  it('remembers an explicit per-path override', () => {
    const ctx = createJsonViewerContext({ defaultExpanded: ref(true) });
    ctx.setExpanded('$.a', 'a', false);

    expect(ctx.isExpanded('$.a')).toBe(false);
    // Siblings without an override still follow the baseline.
    expect(ctx.isExpanded('$.b')).toBe(true);
  });

  it('toggle() flips the current state', () => {
    const ctx = createJsonViewerContext({ defaultExpanded: ref(true) });
    ctx.toggle('$.a', 'a');
    expect(ctx.isExpanded('$.a')).toBe(false);
    ctx.toggle('$.a', 'a');
    expect(ctx.isExpanded('$.a')).toBe(true);
  });

  it('expandAll / collapseAll reset the baseline and clear overrides', () => {
    const ctx = createJsonViewerContext({ defaultExpanded: ref(true) });
    ctx.setExpanded('$.a', 'a', false);

    ctx.collapseAll();
    expect(ctx.isExpanded('$.a')).toBe(false);
    expect(ctx.isExpanded('$.untouched')).toBe(false);

    ctx.expandAll();
    // The previous override on $.a must be gone, not just masked.
    expect(ctx.isExpanded('$.a')).toBe(true);
    expect(ctx.isExpanded('$.untouched')).toBe(true);
  });

  it('reset() drops overrides and applies a new baseline', () => {
    const ctx = createJsonViewerContext({ defaultExpanded: ref(true) });
    ctx.setExpanded('$.a', 'a', false);
    ctx.reset(false);
    expect(ctx.isExpanded('$.a')).toBe(false);
    ctx.reset(true);
    expect(ctx.isExpanded('$.a')).toBe(true);
  });

  it('invokes onToggle with the full payload', () => {
    const onToggle = vi.fn();
    const ctx = createJsonViewerContext({
      defaultExpanded: ref(true),
      onToggle,
    });
    ctx.toggle('$.address', 'address');
    expect(onToggle).toHaveBeenCalledWith({
      path: '$.address',
      key: 'address',
      expanded: false,
    });
  });

  it('invokes onCopy with the full payload', () => {
    const onCopy = vi.fn();
    const ctx = createJsonViewerContext({
      defaultExpanded: ref(true),
      onCopy,
    });
    ctx.notifyCopy('$.name', 'name', 'John');
    expect(onCopy).toHaveBeenCalledWith({
      path: '$.name',
      key: 'name',
      value: 'John',
    });
  });
});
