# sparkling-method

[![npm version](https://img.shields.io/npm/v/sparkling-method.svg)](https://npmjs.com/package/sparkling-method)
[![license](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](../../LICENSE)

SDK for building Sparkling methods that bridge JavaScript and native code through LynxPipe.

## Installation

```bash
npm install sparkling-method@latest
```

## Usage

```typescript
import LynxPipe from 'sparkling-method';

// Callback-based call
LynxPipe.call('methodName', { param: 'value' }, (response) => {
  console.log(response);
});

// Promise-based call
const result = await LynxPipe.callAsync('methodName', { param: 'value' });

// Event handling
const handler = LynxPipe.on('eventName', (data) => console.log(data));
LynxPipe.off('eventName', handler);
```

## API

| Method | Description |
|--------|-------------|
| `call(method, params, callback)` | Call native method with callback |
| `callAsync(method, params)` | Call native method with Promise |
| `on(event, callback)` | Subscribe to native event |
| `off(event, callback)` | Unsubscribe from native event |