import { describe, it, expect, vi, afterEach } from 'vitest';
import { copyJsonToClipboard } from '../src/utils/clipboard';

const originalClipboard = Object.getOwnPropertyDescriptor(
  navigator,
  'clipboard',
);

function setClipboard(value: unknown): void {
  Object.defineProperty(navigator, 'clipboard', {
    value,
    configurable: true,
    writable: true,
  });
}

afterEach(() => {
  if (originalClipboard) {
    Object.defineProperty(navigator, 'clipboard', originalClipboard);
  } else {
    setClipboard(undefined);
  }
  vi.restoreAllMocks();
});

describe('copyJsonToClipboard', () => {
  it('writes pretty-printed JSON via the async Clipboard API', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });

    const ok = await copyJsonToClipboard({ a: 1 });

    expect(ok).toBe(true);
    expect(writeText).toHaveBeenCalledWith('{\n  "a": 1\n}');
  });

  it('resolves false (never throws) on a circular reference', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });

    const circular: Record<string, unknown> = {};
    circular['self'] = circular;

    await expect(copyJsonToClipboard(circular)).resolves.toBe(false);
    expect(writeText).not.toHaveBeenCalled();
  });

  it('falls back to execCommand when the Clipboard API is missing', async () => {
    setClipboard(undefined);
    const execCommand = vi.fn().mockReturnValue(true);
    // @ts-expect-error jsdom does not type execCommand as configurable
    document.execCommand = execCommand;

    const ok = await copyJsonToClipboard({ a: 1 });

    expect(ok).toBe(true);
    expect(execCommand).toHaveBeenCalledWith('copy');
  });

  it('falls back to execCommand when writeText rejects', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    setClipboard({ writeText });
    const execCommand = vi.fn().mockReturnValue(true);
    // @ts-expect-error jsdom does not type execCommand as configurable
    document.execCommand = execCommand;

    const ok = await copyJsonToClipboard({ a: 1 });

    expect(ok).toBe(true);
    expect(writeText).toHaveBeenCalled();
    expect(execCommand).toHaveBeenCalledWith('copy');
  });

  it('resolves false when no copy mechanism succeeds', async () => {
    setClipboard(undefined);
    const execCommand = vi.fn().mockReturnValue(false);
    // @ts-expect-error jsdom does not type execCommand as configurable
    document.execCommand = execCommand;

    await expect(copyJsonToClipboard({ a: 1 })).resolves.toBe(false);
  });
});
