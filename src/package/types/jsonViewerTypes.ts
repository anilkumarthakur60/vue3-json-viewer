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
    | null
    | undefined;
  level: number;
  parentKey?: string | number;
  darkMode?: boolean;
}
