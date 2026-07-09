import type { JsonValue } from '../types';

/**
 * Copies text via a hidden `<textarea>` and the legacy `execCommand('copy')`.
 * Used as a fallback when the async Clipboard API is unavailable (e.g. an
 * insecure `http://` context or an older browser). Returns whether the copy
 * succeeded and never throws.
 */
const legacyCopyText = (text: string): boolean => {
  if (typeof document === 'undefined') return false;

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.top = '-9999px';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);

  // Preserve any existing selection so copying doesn't disrupt the user.
  const selection = document.getSelection();
  const previousRange =
    selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

  textarea.select();

  let succeeded = false;
  try {
    succeeded = document.execCommand('copy') === true;
  } catch {
    succeeded = false;
  }

  document.body.removeChild(textarea);

  if (selection && previousRange) {
    selection.removeAllRanges();
    selection.addRange(previousRange);
  }

  return succeeded;
};

/**
 * Serializes a JSON value and copies it to the clipboard.
 *
 * Resolves to `true` on success and `false` on any failure — a serialization
 * error (e.g. a circular reference), a missing Clipboard API in insecure or
 * older environments, or a rejected write — so callers can react without an
 * unhandled promise rejection. Falls back to `execCommand('copy')` when the
 * async Clipboard API is unavailable.
 */
export const copyJsonToClipboard = async (
  data: JsonValue,
): Promise<boolean> => {
  let text: string;
  try {
    const serialized = JSON.stringify(data, null, 2);
    // JSON.stringify returns undefined for a top-level function/undefined.
    text = serialized === undefined ? String(data) : serialized;
  } catch {
    // Circular reference or a value with a throwing toJSON/getter.
    return false;
  }

  if (
    typeof navigator !== 'undefined' &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === 'function'
  ) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Permission denied or insecure context — try the legacy fallback.
    }
  }

  return legacyCopyText(text);
};
