# Sparkling Method SDK - iOS

Sparkling Method SDK 是 iOS 原生"管道"/桥接层，用于实现 **JS 与原生之间**的方法调用。
Sparkling 方法包（如 `sparkling-navigation` 和 `sparkling-storage`）通过此层进行调用。

## 概念

- **方法名**：如 `router.open` 或 `storage.setItem` 的字符串。
- **原生实现**：为某个方法名注册处理函数的 iOS 代码。
- **管道/桥接绑定**：创建 Lynx 容器时，Sparkling 容器会自动完成桥接的建立。

## 注册方法（全局或局部）

核心类型：
- `MethodPipe`：执行方法和触发事件
- `MethodRegistry`：存放已注册的方法
- `PipeMethod`：方法实现的基类

常见模式：

1) **自动注册所有全局方法**（模板方式）：

```swift
MethodRegistry.autoRegisterGlobalMethods()
```

2) **手动注册方法类型**：

```swift
MethodRegistry.global.register(methodType: MyMethod.self)
```

3) **在特定管道实例上注册方法**：

```swift
let pipe = MethodPipe()
pipe.register(localMethod: MyMethod())
```

## Lynx 集成（容器绑定）

Sparkling 的 Lynx 容器封装会自动设置方法管道集成：

- `MethodPipe.setupLynxPipe(config:)` 在 Lynx 视图初始化时被调用。
- `MethodPipe(withLynxView:)` 为每个容器创建以处理调用/事件。
