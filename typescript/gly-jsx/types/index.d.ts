/**
 * @version 0.2.3
 */

declare namespace JSX {
  interface Element extends Record<string, Function> {
  }

  interface IntrinsicElements {
    grid: { class: string, span?: number, offset?: number, after?: number, style?: string, dir?: 1 | 0, children?: JSX.Element | Array<JSX.Element>};
    item: ({ span: number} | {offset: number} | {after: number} | {style: string}) & {children: JSX.Element}
    node: { children?: never, [key: string]: unknown;};
    style: { class: string, children?: never} | {[key: string]: number};
  }
  
  interface ElementChildrenAttribute {
    children: {};
  }
}
