# sparkling-method

[![npm version](https://img.shields.io/npm/v/sparkling-method.svg)](https://npmjs.com/package/sparkling-method)
[![license](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../../LICENSE)

CLI utilities for creating and managing Sparkling method modules with cross-platform code generation.

## Installation

```bash
npm install -g sparkling-method@latest
```

Or add to your project:

```bash
npm install sparkling-method@latest --save-dev
```

## Usage

```bash
# Create a new method module
sparkling-method init my-method

# Generate native code from TypeScript definitions
sparkling-method codegen
```

Run `sparkling-method --help` to see all available commands and options.

## Workflow

1. Create method module: `sparkling-method init my-method`
2. Define TypeScript interfaces in `src/*.d.ts`
3. Generate native code: `sparkling-method codegen`
4. Implement native handlers in `android/` and `ios/`