# sparkling-router

[![npm version](https://img.shields.io/npm/v/sparkling-router.svg)](https://npmjs.com/package/sparkling-router)
[![license](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../../../LICENSE)

Navigation methods for Sparkling applications, enabling page routing and navigation control.

## Installation

```bash
npm install sparkling-router@latest
```

After installing, run `sparkling-cli autolink` to automatically link the native modules:

```bash
npx sparkling autolink
```

## Usage

```typescript
import { open, navigate, close } from 'sparkling-router';

// Navigate to a page using default scheme (hybrid://lynxview_page)
// This builds: hybrid://lynxview_page?bundle=second.lynx.bundle
navigate({ path: '/second' }, (result) => {
  console.log(result);
});

// Navigate with custom base scheme
navigate({
  path: '/detail',
  baseScheme: 'myapp://custom_page',
}, (result) => {
  console.log(result);
});

// Open any URL scheme directly
open({ scheme: 'hybrid://lynxview_page?bundle=main.lynx.bundle' }, (result) => {
  console.log(result);
});

// Close current page
close({}, (result) => {
  console.log(result);
});
```

## Documentation

- [API Reference](./API.md) - Detailed API documentation, parameters, and response formats
- [Custom Scheme Handler](./API.md#custom-scheme-handler) - How to implement custom URL scheme handlers
- [Manual Installation](./API.md#manual-installation-fallback) - Fallback installation if autolink fails
