import { DefineComponent, VNode } from 'vue';

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends DefineComponent {}
    interface ElementAttributesProperty {
      $props: {};
    }
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {}
}

export {};
