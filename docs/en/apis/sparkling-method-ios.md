# Sparkling Method SDK - iOS

Sparkling Method SDK is the native "pipe"/bridge layer that enables **JS ↔ native** method calls on iOS.
Sparkling method packages like `sparkling-navigation` and `sparkling-storage` call into this layer.

## Concepts

- **Method name**: a string like `router.open` or `storage.setItem`.
- **Native implementation**: iOS code that registers a handler for a method name.
- **Pipe/bridge wiring**: Sparkling containers set up the bridge automatically when you create a Lynx container.

## Register methods (global or local)

The core types are:
- `MethodPipe`: executes methods and fires events
- `MethodRegistry`: holds registered methods
- `PipeMethod`: base class for method implementations

Common patterns:

1) **Auto-register all global methods** (template approach):

```swift
MethodRegistry.autoRegisterGlobalMethods()
```

2) **Manually register a method type**:

```swift
MethodRegistry.global.register(methodType: MyMethod.self)
```

3) **Register methods on a specific pipe instance**:

```swift
let pipe = MethodPipe()
pipe.register(localMethod: MyMethod())
```

## Lynx integration (container wiring)

Sparkling's Lynx container wrapper sets up method pipe integration automatically:

- `MethodPipe.setupLynxPipe(config:)` is called during Lynx view setup.
- `MethodPipe(withLynxView:)` is created per container to handle calls/events.
