# Sparkling Method SDK - Android

Sparkling Method SDK 是 Android 原生"管道"/桥接层，用于实现 **JS 与原生之间**的方法调用。
Sparkling 方法包（如 `sparkling-navigation` 和 `sparkling-storage`）通过此层进行调用。

## 概念

- **方法名**：如 `router.open` 或 `storage.setItem` 的字符串。
- **原生实现**：为某个方法名注册处理函数的 Android 代码。
- **管道/桥接绑定**：创建 Lynx 容器时，Sparkling 容器会自动完成桥接的建立。

## 注册原生 IDL 方法

使用 `SparklingBridgeManager.registerIDLMethod(...)` 注册实现：

```kotlin
SparklingBridgeManager.registerIDLMethod(RouterOpenMethod::class.java)
SparklingBridgeManager.registerIDLMethod(RouterCloseMethod::class.java)
```

核心 API：
- `SparklingBridgeManager.registerIDLMethod(clazz, scope, namespace)`
- `SparklingBridgeManager.getIDLMethodList(platformType, namespace)`

说明：
- `scope` 使用 `BridgePlatformType`（`LYNX`、`WEB`、`ALL` 等）。
- `namespace` 默认为 `"DEFAULT"`。

## 桥接生命周期（容器绑定）

当 Sparkling 创建 Lynx 容器时，会创建 `SparklingBridge` 并绑定到容器。
在宿主应用中通常不需要手动调用，但以下是关键入口：

- `SparklingBridge.init(view, containerId, jsBridgeProtocols)`
- `SparklingBridge.prepareLynxJSRuntime(containerId, options, context)`（后台运行时）
- `SparklingBridge.bindWithBusinessNamespace(namespace)`（命名空间注册）
