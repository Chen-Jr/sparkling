# Sparkling Method SDK - Android

Sparkling Method SDK is the native "pipe"/bridge layer that enables **JS ↔ native** method calls on Android.
Sparkling method packages like `sparkling-navigation` and `sparkling-storage` call into this layer.

## Concepts

- **Method name**: a string like `router.open` or `storage.setItem`.
- **Native implementation**: Android code that registers a handler for a method name.
- **Pipe/bridge wiring**: Sparkling containers set up the bridge automatically when you create a Lynx container.

## Register native IDL methods

Use `SparklingBridgeManager.registerIDLMethod(...)` to register implementations:

```kotlin
SparklingBridgeManager.registerIDLMethod(RouterOpenMethod::class.java)
SparklingBridgeManager.registerIDLMethod(RouterCloseMethod::class.java)
```

Key APIs:
- `SparklingBridgeManager.registerIDLMethod(clazz, scope, namespace)`
- `SparklingBridgeManager.getIDLMethodList(platformType, namespace)`

Notes:
- `scope` uses `BridgePlatformType` (`LYNX`, `WEB`, `ALL`, ...).
- `namespace` defaults to `"DEFAULT"`.

## Bridge lifecycle (container wiring)

When Sparkling creates a Lynx container, it creates a `SparklingBridge` and binds it to the container.
You generally don't need to call these manually in host apps, but they are the key entrypoints:

- `SparklingBridge.init(view, containerId, jsBridgeProtocols)`
- `SparklingBridge.prepareLynxJSRuntime(containerId, options, context)` (background runtime)
- `SparklingBridge.bindWithBusinessNamespace(namespace)` (namespaced registrations)
