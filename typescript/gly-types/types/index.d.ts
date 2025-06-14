export type GlyNode = Record<string, unknown>;
export type GlyApp = GlyNode & { width: number; height: number };
export type GlyStdJsx = (el: string | object, attributes?: object | null, ...childs: Array<object>) => GlyApp;

declare class GlyHttp {
  public json(): GlyHttp;
  public fast(): GlyHttp;
  public noforce(): GlyHttp;
  public param(key: string, value: string): GlyHttp;
  public header(key: string, value: string): GlyHttp;
  public body(content: string): GlyHttp;
  public success(std: GlyStd, data: GlyApp): GlyHttp;
  public failed(std: GlyStd, data: GlyApp): GlyHttp;
  public error(std: GlyStd, data: GlyApp): GlyHttp;
  public run(): void;
}

declare class GlyMedia {
  public src(url: string): GlyMedia;
  public play(): GlyMedia;
  public pause(): GlyMedia;
  public resume(): GlyMedia;
  public stop(): GlyMedia;
  public resize(width: number, height: number): GlyMedia;
  public position(pos_x: number, pos_y: number): GlyMedia;
}

declare class GlyStorage {
  public as(key: string, cast?: (value: string) => unknown): GlyStorage;
  public default(value: string): void;
  public callbacks(handler: (value: string) => void): GlyStorage;
  public run(): void;
}

declare class GlyUi {
  public add(node: GlyNode): GlyUi;
  public style(classlist): GlyUi;
  public get_item(id: number): GlyApp;
  public add_items(nodes: GlyNode[]): GlyUi;
  public gap(size: number): GlyUi;
  public margin(size: number): GlyUi;
  public apply(): GlyUi;
}

interface GlyStdApp {
  exit(): void;
  height: number;
  reset(): void;
  width: number;
}

interface GlyStdArray {
  each<T>(array: T[], func: (item: T, index: number, array: T[]) => void): void;
  every<T>(array: T[], func: (item: T, index: number, array: T[]) => boolean): boolean;
  filter<T>(array: T[], func: (item: T, index: number, array: T[]) => boolean): T[];
  first<T>(array: T[], func?: (item: T, index: number, array: T[]) => boolean): T | undefined;
  index<T>(array: T[], func: (item: T, index: number, array: T[]) => boolean, reverse?: boolean): number;
  map<T, U>(array: T[], func: (item: T, index: number, array: T[]) => U): U[];
  reducer<T, U>(array: T[], func: (acc: U, item: T, index: number, array: T[]) => U, value: U): U;
  some<T>(array: T[], func: (item: T, index: number, array: T[]) => boolean, reverse?: boolean): boolean;
  unique<T>(array: T[]): T[];
}

interface GlyStdBus {
  abort(): void;
  emit(key: string, ...args: unknown[]): void;
  listen(key: string, handler: (...args: unknown[]) => void): void;
  trigger(key: string): void;
}

interface GlyStdColor {
  beige: number;
  black: number;
  blank: number;
  blue: number;
  brown: number;
  darkblue: number;
  darkbrown: number;
  darkgray: number;
  darkgreen: number;
  darkpurple: number;
  gold: number;
  gray: number;
  green: number;
  lightgray: number;
  lime: number;
  magenta: number;
  maroon: number;
  orange: number;
  pink: number;
  purple: number;
  red: number;
  skyblue: number;
  violet: number;
  white: number;
  yellow: number;
}

interface GlyStdDraw {
  clear(hex: number): void;
  color(hex: number): void;
  line(x1: number, y1: number, x2: number, y2: number): void;
  poly(mode: number, verts: Array<number>, x?: number, y?: number, scale?: number, angle?: number, ox?: number, oy?: number): void;
  rect(mode: number, x: number, y: number, w: number, h: number): void;
}

interface GlyStdHash {
  djb2(digest: string): number;
  fingerprint(): number;
}

interface GlyStdHttp {
  delete(url: string): GlyHttp;
  get(url: string): GlyHttp;
  head(url: string): GlyHttp;
  patch(url: string): GlyHttp;
  post(url: string): GlyHttp;
  put(url: string): GlyHttp;
}

interface GlyStdI18n {
  back(): void;
  get_language(): string;
  get_text(old_text: string): string;
  next(): void;
  set_language(language: string): void;
}

interface GlyStdImage {
  draw(src: string, x?: number, y?: number): void;
  load(src: string): boolean;
}

interface GlyStdKey {
  axis: {
    a: 0 | 1;
    b: 0 | 1;
    c: 0 | 1;
    d: 0 | 1;
    down: 0 | 1;
    left: 0 | 1;
    menu: 0 | 1;
    right: 0 | 1;
    up: 0 | 1;
    x: -1 | 0 | 1;
    y: -1 | 0 | 1;
  };
  press: {
    a: boolean;
    any: boolean;
    b: boolean;
    c: boolean;
    d: boolean;
    down: boolean;
    left: boolean;
    menu: boolean;
    right: boolean;
    up: boolean;
  };
}

interface GlyStdLog {
  debug(message: string): void;
  error(message: string): void;
  fatal(message: string): void;
  info(message: string): void;
  level(level: 'none' | 'fatal' | 'error' | 'warn' | 'debug' | 'info'): void;
  warn(message: string): void;
}

interface GlyStdMath {
  abs(n: number): number;
  clamp(n: number, min: number, max: number): number;
  clamp2(n: number, min: number, max: number): number;
  dir(n: number): -1 | 0 | 1;
  dis(n: number): number;
  dis2(n: number): number;
  dis3(n: number): number;
  lerp(start: number, end: number, alpha: number): number;
  map(n: number, in_min: number, in_max: number, out_min: number, out_max: number): number;
  max(n: number[]): number;
  max(n1: number, n2: number, ...nx: number[]): number;
  min(n: number[]): number;
  min(n1: number, n2: number, ...nx: number[]): number;
}

interface GlyStdMathLibC {
  acos(x: number): number;
  asin(x: number): number;
  atan(x: number): number;
  atan2(y: number, x: number): number;
  ceil(x: number): number;
  cos(x: number): number;
  cosh(x: number): number;
  deg(x: number): number;
  exp(x: number): number;
  floor(x: number): number;
  fmod(x: number, y: number): number;
  frexp(x: number): [number, number];
  huge: number;
  ldexp(mantissa: number, exponent: number): number;
  log(x: number): number;
  log10(x: number): number;
  modf(x: number): [number, number];
  pi: number;
  pow(base: number, exponent: number): number;
  rad(x: number): number;
  sin(x: number): number;
  sinh(x: number): number;
  sqrt(x: number): number;
  tan(x: number): number;
  tanh(x: number): number;
}

interface GlyStdMathWave {
  saw(t: number, freq: number): number;
  sine(t: number, freq: number): number;
  square(t: number, freq: number): number;
  triangule(t: number, freq: number): number;
}

interface GlyStdMedia {
  video(channel?: number): GlyMedia;
}

interface GlyStdMemory {
  cache(key: string, load: () => unknown, unload?: (value: unknown) => void): unknown;
  cache_get(key: string): unknown;
  cache_set(key: string, load: () => unknown, unload?: (value: unknown) => void): void;
  gc_clear_all(): void;
  unset(key: string): void;
}

interface GlyStdNode {
  emit(application: GlyApp, key: string, ...args: unknown[]): void;
  kill(application: GlyApp): void;
  load(application: GlyNode): GlyNode;
  pause(application: GlyApp, key: string): void;
  resume(application: GlyApp, key: string): void;
  spawn(application: GlyNode): GlyApp;
}

interface GlyStdStorage {
  get(key: string): GlyStorage;
  set(key: string, value: unknown): GlyStorage;
}

interface GlyStdText {
  font_default(size: number): void;
  font_name(face: string): void;
  font_previous(): void;
  font_size(size: number): void;
  mensure(text: string | number): [number, number];
  print(x: number, y: number, text: string | number): void;
  print_ex(x: number, y: number, text: string | number, align_x?: -1 | 0 | 1, align_y?: -1 | 0 | 1): [number, number];
  put(x: number, y: number, text: string | number, size?: number): void;
}

interface GlyStdUi {
  grid(classlist: string): GlyUi;
  slide(classlist: string): GlyUi;
}

export interface GlyStdNano {
  color: GlyStdColor;
  draw: GlyStdDraw;
  image: GlyStdImage;
  key: GlyStdKey;
  text: GlyStdText;
}

export interface GlyStdMicro extends GlyStdNano {
  app: GlyStdApp;
  array: GlyStdArray;
  math: GlyStdMath & GlyStdMathLibC & GlyStdMathWave;
  mem: GlyStdMemory;
}

export interface GlyStdLite extends GlyStdMicro {
  getenv(key: string): string;
  hash: GlyStdHash;
  http: GlyStdHttp;
  i18n: GlyStdI18n;
  log: GlyStdLog;
  media: GlyStdMedia;
  storage: GlyStdStorage;
}

export interface GlyStd extends GlyStdLite {
  bus: GlyStdBus;
  h: GlyStdJsx;
  node: GlyStdNode;
  ui: GlyStdUi;
}
