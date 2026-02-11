# Sparkling SDK - iOS

本页面介绍用于承载 Sparkling 内容的 iOS 原生 SDK API。
关于 `hybrid://...` URL 格式，请参阅 [Scheme](./scheme.md)。

## 依赖（CocoaPods）

```ruby
pod 'Sparkling', '2.0.0'
```

## 初始化（App 启动时）

模板应用在启动时注册服务并执行引导任务：

```swift
SPKServiceRegister.registerAll()
SPKExecuteAllPrepareBootTask()
```

说明：
- `SPKServiceRegister` 通常在你的 App Target 中定义（参见模板
  `template/sparkling-app-template/ios/.../MethodServices/SPKServiceRegistrar.swift`）。

## 打开页面（路由）

```swift
let url = "hybrid://lynxview_page?bundle=main.lynx.bundle&title=Home"
SPKRouter.open(withURL: url, context: nil)
```

## 嵌入容器视图

```swift
let view = SPKContainerView(frame: UIScreen.main.bounds)
let context = SPKContext()
view.load(withURL: "hybrid://lynxview_page?bundle=main.lynx.bundle", context)
```

## 自定义加载/错误/导航/主题

通过 `SPKContext` 自定义容器行为，例如：
- 加载/错误视图构建器（`loadingViewBuilder`、`failedViewBuilder`）
- 导航栏（`naviBar`）
- 主题（`appTheme`）
- 生命周期回调（`containerLifecycleDelegate`）
