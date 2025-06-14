declare namespace JSX {
  type childElement = JSX.Element | object

  interface Element {
    __brand: JSX.IntrinsicElements['node'] | JSX.IntrinsicElements['grid'];
  }

  interface IntrinsicElements {
    grid: { class: string, children?: childElement | Array<childElement>};
    node: { children?: never, [key: string]: unknown;};
  }
  
  interface ElementChildrenAttribute {
    children: {};
  }
}