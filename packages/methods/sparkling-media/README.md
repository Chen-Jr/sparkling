# sparkling-media

[![npm version](https://img.shields.io/npm/v/sparkling-media.svg)](https://npmjs.com/package/sparkling-media)
[![license](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../../../LICENSE)

Media handling methods for Sparkling applications, enabling image/video selection, upload, and download.

## Installation

```bash
npm install sparkling-media@latest
```

After installing, run `sparkling-app-cli autolink` to automatically link the native modules:

```bash
npx sparkling autolink
```

## Usage

```typescript
import { chooseMedia, uploadFile, downloadFile } from 'sparkling-media';

// Select media from album
chooseMedia({
  mediaTypes: ['image'],
  sourceType: 'album',
  maxCount: 9,
}, (result) => {
  console.log(result.data?.tempFiles);
});

// Upload file
uploadFile({
  url: 'https://api.example.com/upload',
  filePath: '/path/to/file.jpg',
}, (result) => {
  console.log(result);
});

// Download file
downloadFile({
  url: 'https://example.com/image.png',
  extension: 'png',
}, (result) => {
  console.log(result.data?.filePath);
});
```

## Documentation

- [API Reference](./API.md) - Detailed API documentation, parameters, and response formats
- [Manual Installation](./API.md#manual-installation-fallback) - Fallback installation if autolink fails
