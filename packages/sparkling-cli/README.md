# sparkling-cli

[![npm version](https://img.shields.io/npm/v/sparkling-cli.svg)](https://npmjs.com/package/sparkling-cli)
[![license](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../../LICENSE)

Workspace helper CLI for building, running, and managing Sparkling applications on Android and iOS.

## Installation

> **Note:** Projects created with `create-sparkling-app` already include `sparkling-cli` as a dependency. Manual installation is only needed for existing projects or global usage.

```bash
# Global installation
npm install -g sparkling-cli@latest

# Or add to an existing project
npm install sparkling-cli@latest --save-dev
```

## Usage

```bash
# Build Lynx bundle (uses app.config.ts)
sparkling build

# Copy dist/ assets into Android/iOS resource folders
sparkling copy-assets

# Auto-link sparkling-method modules to native projects
sparkling autolink

# Build and run on Android emulator/device
sparkling run:android

# Build and run on iOS simulator
sparkling run:ios
```

Run `sparkling --help` to see all available commands and options.

## Requirements

- Node.js >= 18

## See Also

- [create-sparkling-app](../create-sparkling-app) - Create new Sparkling projects
- [Sparkling Documentation](../../docs/en/guide/get-started/create-new-app.md)