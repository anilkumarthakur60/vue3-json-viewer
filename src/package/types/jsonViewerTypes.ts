export interface JsonViewerProps {
  data:
    | Object
    | Array<any>
    | string
    | number
    | boolean
    | Function
    | Date
    | RegExp
    | null;
  level?: number;
  parentKey?: string | number;
  darkMode?: boolean;
}
