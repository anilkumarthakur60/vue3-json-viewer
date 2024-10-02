export interface JsonViewerProps {
  data?:
    | Object
    | Array<any>
    | string
    | number
    | boolean
    | Function
    | Date
    | RegExp;
  level?: number;
  parentKey?: string | number;
  darkMode?: boolean;
}
