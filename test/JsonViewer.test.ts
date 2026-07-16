import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import JsonViewer from '../src/components/JsonViewer/JsonViewer';

/**
 * Click the clickable key of a container node whose key matches `keyName`.
 * Container keys carry both `jv-key` and `jv-clickable`; primitive keys do not,
 * so this only ever targets expandable containers.
 */
async function toggleContainer(
  wrapper: VueWrapper,
  keyName: string,
): Promise<void> {
  const keys = wrapper.findAll('.jv-key.jv-clickable');
  const target = keys.find((k) => k.text() === `"${keyName}"`);
  if (!target) {
    throw new Error(`No collapsible container with key "${keyName}" found`);
  }
  await target.trigger('click');
}

/** Number of currently-visible collapsed containers (each renders a count label). */
function collapsedCount(wrapper: VueWrapper): number {
  return wrapper.findAll('.jv-count').length;
}

describe('JsonViewer expand/collapse state', () => {
  it('preserves a nested node’s collapsed state when an ancestor is collapsed and re-expanded', async () => {
    const wrapper = mount(JsonViewer, {
      props: { data: { a: { b: { c: 1 } } }, expanded: true },
    });

    // Everything starts expanded.
    expect(collapsedCount(wrapper)).toBe(0);

    // Collapse the deeply-nested container $.a.b.
    await toggleContainer(wrapper, 'b');
    expect(collapsedCount(wrapper)).toBe(1);

    // Collapse the ancestor $.a — this unmounts the subtree containing b.
    await toggleContainer(wrapper, 'a');
    expect(collapsedCount(wrapper)).toBe(1); // only $.a's own label is visible

    // Re-expand $.a: b is remounted. Before the fix, b came back expanded
    // (its local state was destroyed). Now it must still be collapsed.
    await toggleContainer(wrapper, 'a');
    expect(collapsedCount(wrapper)).toBe(1);

    // Confirm the surviving collapsed node is indeed b (its subtree is hidden,
    // so its child key "c" is not in the DOM).
    const visibleKeys = wrapper
      .findAll('.jv-key')
      .map((k) => k.text());
    expect(visibleKeys).toContain('"b"');
    expect(visibleKeys).not.toContain('"c"');
  });

  it('collapseAll then expandAll restores the fully-expanded tree', async () => {
    const wrapper = mount(JsonViewer, {
      props: { data: { a: { b: 1 }, c: { d: 2 } }, expanded: true },
    });

    const [expandAllBtn, collapseAllBtn] = wrapper.findAll('.jv-control-btn');

    await collapseAllBtn!.trigger('click');
    // Root is collapsed; its children are unmounted, so only the root label shows.
    expect(collapsedCount(wrapper)).toBe(1);

    await expandAllBtn!.trigger('click');
    expect(collapsedCount(wrapper)).toBe(0);
    const keys = wrapper.findAll('.jv-key').map((k) => k.text());
    expect(keys).toEqual(
      expect.arrayContaining(['"a"', '"b"', '"c"', '"d"']),
    );
  });

  it('reacts to changes in the `expanded` prop', async () => {
    const wrapper = mount(JsonViewer, {
      props: { data: { a: { b: 1 } }, expanded: true },
    });
    expect(collapsedCount(wrapper)).toBe(0);

    await wrapper.setProps({ expanded: false });
    // Whole tree collapses to the root.
    expect(collapsedCount(wrapper)).toBe(1);

    await wrapper.setProps({ expanded: true });
    expect(collapsedCount(wrapper)).toBe(0);
  });
});

describe('JsonViewer events', () => {
  it('emits a typed `toggle` event with path, key and new state', async () => {
    const wrapper = mount(JsonViewer, {
      props: { data: { address: { city: 'NY' } }, expanded: true },
    });

    await toggleContainer(wrapper, 'address');

    const toggles = wrapper.emitted('toggle');
    expect(toggles).toBeTruthy();
    expect(toggles![0]![0]).toEqual({
      path: '$.address',
      key: 'address',
      expanded: false,
    });
  });

  it('emits a `toggle` event for an array item with its index as key', async () => {
    const wrapper = mount(JsonViewer, {
      props: { data: { items: [{ x: 1 }] }, expanded: true },
    });

    // Toggle the array element container ($.items[0]). Its key is hidden in the
    // UI, so click its type indicator rather than a key label. Containers are
    // $, $.items, $.items[0] — the deepest one is the array element.
    const rows = wrapper.findAll('.jv-toggle');
    await rows[rows.length - 1]!.trigger('click');

    const toggles = wrapper.emitted('toggle');
    expect(toggles).toBeTruthy();
    expect(toggles![0]![0]).toEqual({
      path: '$.items[0]',
      key: '0',
      expanded: false,
    });
  });

  it('emits a `copy` event when a value is copied', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    // jsdom has no clipboard by default — provide a minimal stub.
    Object.assign(navigator, { clipboard: { writeText } });

    const wrapper = mount(JsonViewer, {
      props: { data: { name: 'John' }, expanded: true },
    });

    // The first copy button belongs to the root object.
    const copyBtn = wrapper.find('.jv-copy-btn');
    await copyBtn.trigger('click');
    // Let the clipboard promise resolve.
    await Promise.resolve();
    await Promise.resolve();

    const copies = wrapper.emitted('copy');
    expect(copies).toBeTruthy();
    expect(copies![0]![0]).toMatchObject({ path: '$', key: '' });
  });
});

beforeEach(() => {
  vi.restoreAllMocks();
});
