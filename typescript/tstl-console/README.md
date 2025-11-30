# @gamely/tstl-console

A [TypeScriptToLua](https://typescripttolua.github.io/) plugin that provides `console.log` functionality for standard Lua or [GlyEngine](https://github.com/gly-engine/gly-engine) environments without needing the `"dom"` library.

## The Problem

When using `typescript-to-lua`, you might want to use `console.log` for debugging. The standard way to make the TypeScript compiler recognize `console` is by adding the `"dom"` library to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "lib": ["esnext", "dom"]
  }
}
```

However, this pollutes your project's global namespace with many browser-specific types (like `window`, `document`, etc.), which is undesirable for non-browser environments like a game engine or a standalone Lua script.

This package provides plugins to map `console` methods directly to environment-specific functions, allowing you to remove `"dom"` from your `tsconfig.json`.

## Installation

```bash
npm install --save-dev @gamely/tstl-console
```

## Available Plugins

There are two plugins available, depending on your target environment.

### 1. Generic Lua (`@gamely/tstl-console/lua`)

This plugin is for general-purpose **Lua** projects. It transforms `console` calls directly into Lua's native `print()` function.

#### Output

| TypeScript Input | Lua Output |
| ---------------- | ---------- |
| `console.log("hello")` | `print("hello")` |
| `console.warn("hello")` | `print("hello")` |
| `console.error("hello")`| `print("hello")` |

#### `tsconfig.json` Configuration

To use it, add it to the `plugins` section in your `tsconfig.json`. Make sure to remove `"dom"` from your `lib` array.

```json
{
  "compilerOptions": {
    "lib": ["es2016"],
    "types": ["@gamely/tstl-console", "other-types"],
  },
  "tstl": {
    "plugins": [
      { "transform": "@gamely/tstl-console/lua" }
    ]
  }
}
```

### 2. Gly Engine (`@gamely/tstl-console/gly`)

This plugin is specifically designed for the [GlyEngine](https://github.com/gly-engine/gly-engine). It maps `console` methods to the engine's `std.log` module.

#### Output

| TypeScript Input | Lua Output |
| ---------------- | ---------- |
| `console.log("event")` | `std.log.debug("event")` |
| `console.warn("uh oh")` | `std.log.warn("uh oh")` |
| `console.error("failed")`| `std.log.error("failed")`|

Any other `console` method (e.g., `console.table`) will result in a transformation error, as they are not supported by the Gly engine's logger.

#### `tsconfig.json` Configuration

To use it, add it to the `plugins` section in your `tsconfig.json`.

```json
{
  "compilerOptions": {
    "lib": ["es2016"],
    "types": ["@gamely/tstl-console", "@gamely/gly-types", "other-types"],
  },
  "tstl": {
    "plugins": [
      { "transform": "@gamely/tstl-console/gly" }
    ]
  }
}
```