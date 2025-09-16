export type JsonValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JsonObject
  | JsonArray
  | Date
  | RegExp
  | Map<any, any>
  | Set<any>
  | any;

export interface JsonObject {
  [key: string]: JsonValue;
}

export interface JsonArray extends Array<JsonValue> {}

export interface JsonViewerProps {
  data: JsonValue;
  level?: number;
  parentKey?: string | number;
  darkMode?: boolean;
  expanded?: boolean;
}

export interface NestedComponentProps extends JsonViewerProps {
  // Additional props specific to nested components can be added here
}

export type ThemeMode = 'light' | 'dark';

export interface JsonViewerTheme {
  background: string;
  text: string;
  key: string;
  string: string;
  number: string;
  boolean: string;
  null: string;
  bracket: string[];
}

export const defaultDarkTheme: JsonViewerTheme = {
  background: '#1e1e1e',
  text: '#d4d4d4',
  key: '#9cdcfe',
  string: '#ce9178',
  number: '#b5cea8',
  boolean: '#569cd6',
  null: '#569cd6',
  bracket: ['#e06c75', '#e5c07b', '#98c379', '#56b6c2', '#61afef', '#c678dd'],
};

export const defaultLightTheme: JsonViewerTheme = {
  background: '#ffffff',
  text: '#333333',
  key: '#0451a5',
  string: '#a31515',
  number: '#098658',
  boolean: '#0000ff',
  null: '#0000ff',
  bracket: ['#d32f2f', '#fbc02d', '#388e3c', '#0288d1', '#1976d2', '#7b1fa2'],
};
