declare namespace JSX {
  type childElement = JSX.Element | object

  interface Element {
    __brand: JSX.IntrinsicElements['node'] | JSX.IntrinsicElements['grid'];
  }

  interface IntrinsicElements {
    grid: { class: string, span?: number, style?: string, dir?: 1 | 0, children?: childElement | Array<childElement>};
    item: { span?: number, style?: string, children: childElement}
    node: { children?: never, [key: string]: unknown;};
    style: { class: string, children?: never} | {[key: string]: number};
  }
  
  interface ElementChildrenAttribute {
    children: {};
  }
}
