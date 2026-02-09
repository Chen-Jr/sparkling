# sparkling-storage

[![npm version](https://img.shields.io/npm/v/sparkling-storage.svg)](https://npmjs.com/package/sparkling-storage)
[![license](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../../../LICENSE)

Persistent storage methods for Sparkling applications, providing key-value data persistence across app sessions.

## Installation

```bash
npm install sparkling-storage@latest
```

After installing, run `sparkling-app-cli autolink` to automatically link the native modules:

```bash
npx sparkling autolink
```

## Usage

```typescript
import { setStorageItem, getStorageItem } from 'sparkling-storage';

// Store data
setStorageItem({ key: 'user', data: { name: 'John' } }, (result) => {
  console.log(result);
});

// Retrieve data
getStorageItem({ key: 'user' }, (result) => {
  console.log(result.data);
});
```

## Documentation

- [API Reference](./API.md) - Detailed API documentation, parameters, and response formats
- [Manual Installation](./API.md#manual-installation-fallback) - Fallback installation if autolink fails
