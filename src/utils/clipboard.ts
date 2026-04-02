import type { JsonValue } from '../types';

/** Serializes a JSON value and copies it to the clipboard */
export const copyJsonToClipboard = (data: JsonValue): Promise<void> => {
  const text = JSON.stringify(data, null, 2);
  return navigator.clipboard.writeText(text);
};
