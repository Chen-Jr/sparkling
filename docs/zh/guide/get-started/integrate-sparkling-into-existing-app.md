# 将 Sparkling 集成到现有应用

本指南介绍如何在现有的 Android/iOS 应用中承载 Sparkling：初始化运行时、提供 Lynx bundle，然后通过 hybrid Scheme 打开内容。

## 快速开始（手动集成）

将 Sparkling 容器嵌入已有的 Android/iOS 项目中，无需从模板重新生成应用。

### Android

1) 添加已发布的 Sparkling SDK 依赖：

   ```kotlin
   // app/build.gradle.kts
   dependencies {
     implementation("com.tiktok.sparkling:sparkling:2.0.0")
   }
   ```

2) 在 JS 项目中构建 Lynx bundle，然后将生成的 `.lynx.bundle` 文件（及引用的资源）复制到
   Android 资源目录（通常为 `app/src/main/assets`）。
3) 启动容器：

   ```kotlin
   val ctx = SparklingContext().apply {
       scheme = "hybrid://lynxview_page?bundle=main.lynx.bundle"
   }
   Sparkling.build(applicationContext, ctx).navigate()
   ```

### iOS

1) 添加已发布的 Pod：

   ```ruby
   pod 'Sparkling', '2.0.0'
   # 可选：仅在使用 Sparkling Method 模块时需要
   pod 'SparklingMethod', '2.0.0', :subspecs => ['Lynx', 'DIProvider', 'Debug']
   ```

2) 执行 `pod install`（如果使用 Bundler 则执行 `bundle exec pod install`）。
3) 打开页面：

   ```swift
   let url = "hybrid://lynxview_page?bundle=main.lynx.bundle&title=Home"
   SPKRouter.open(withURL: url, context: nil)
   ```

4) 根据需要通过 `SPKViewController` 或 `SPKContainerView` 自定义导航/加载/错误视图。

### 构建与验证

- 编译 JS 项目构建 Lynx bundle（生成 `.lynx.bundle` 文件）。
- 将 bundle 复制到 App 的 Android/iOS 资源目录中。
- 运行平台构建（`./gradlew assembleDebug`、`xcodebuild`），打开 `hybrid://` URL 确认
  渲染和管道调用正常。

### 你需要准备

- **原生 Sparkling SDK**（容器 + Lynx 集成）
- **Lynx bundle**（编译后的资源，通常在 `dist/` 目录下）
- 可选：**Sparkling Method 模块**（router/storage/自定义）——如果需要 JS 与原生 API 通信

## Android 集成

### 1) 添加 Sparkling 依赖

模板应用使用 Maven 产物：

```kotlin
dependencies {
  implementation("com.tiktok.sparkling:sparkling:2.0.0")
}
```

### 2) 初始化 HybridKit（Application.onCreate）

宿主必须在打开任何容器之前初始化 HybridKit 并配置 Lynx。
模板在 `SparklingApplication` 中完成此操作：

```kotlin
class SparklingApplication : Application() {
  override fun onCreate() {
    super.onCreate()
    HybridKit.init(this)

    val baseInfoConfig = BaseInfoConfig(isDebug = BuildConfig.DEBUG)
    val lynxConfig = SparklingLynxConfig.build(this) {
      // 可选：添加自定义 Lynx UI 组件和模板提供者
    }
    val hybridConfig = SparklingHybridConfig.build(baseInfoConfig) {
      setLynxConfig(lynxConfig)
    }

    HybridKit.setHybridConfig(hybridConfig, this)
    HybridKit.initLynxKit()
  }
}
```

### 3)（可选）注册 Sparkling Methods

如果使用方法包（router/storage/自定义），还需要在初始化时注册原生方法实现。

模板中注册了路由方法：

```kotlin
SparklingBridgeManager.registerIDLMethod(RouterOpenMethod::class.java)
SparklingBridgeManager.registerIDLMethod(RouterCloseMethod::class.java)
RouterProvider.hostRouterDepend = SparklingHostRouterDepend()
```

### 4) 打开页面（创建 SparklingContext + 导航）

Android SDK 提供了 `SparklingContext` 和 `Sparkling.build(...).navigate()`：

```kotlin
val context = SparklingContext()
context.scheme = "hybrid://lynxview_page?bundle=main.lynx.bundle&title=Home&hide_nav_bar=1"
context.withInitData("{\"initial_data\":{}}")

Sparkling.build(this, context).navigate()
```

### 5) 提供 bundle 资源

Scheme 必须指向 App 资源中存在的 bundle 名称。

在 JS 项目中构建 Lynx bundle，然后将生成的 `.lynx.bundle` 文件复制到 Android 资源目录
（通常为 `app/src/main/assets`）。`hybrid://...` Scheme 中的 `bundle=` 参数
必须与复制到 App 中的资源路径/名称一致。

## iOS 集成

### 1) 通过 CocoaPods 添加 Sparkling

使用已发布的 Pod：

```ruby
pod 'Sparkling', '2.0.0'
pod 'SparklingMethod', '2.0.0', :subspecs => ['Lynx', 'DIProvider', 'Debug']
```

### 2) 初始化服务（App 启动时）

模板的 `AppDelegate` 注册服务和引导任务：

```swift
SPKServiceRegister.registerAll()
SPKExecuteAllPrepareBootTask()
```

### 3) 打开内容

两种常见的承载方式：

- **推送 Sparkling 容器控制器**（路由）：

```swift
let url = "hybrid://lynxview_page?bundle=main.lynx.bundle"
let context = SPKContext()
let vc = SPKRouter.create(withURL: url, context: context, frame: UIScreen.main.bounds)
let naviVC = UINavigationController(rootViewController: vc)
```

- **嵌入容器视图**：

```swift
let view = SPKContainerView(frame: UIScreen.main.bounds)
let context = SPKContext()
view.load(withURL: "hybrid://lynxview_page?bundle=main.lynx.bundle", context)
```

### 4) 提供 bundle 资源

iOS 应用必须包含 Lynx 输出，以便 Sparkling 能解析 `bundle=` 参数。

在 JS 项目中构建 Lynx bundle，然后将生成的 `.lynx.bundle` 文件添加/复制到 Xcode
Target 资源中，使其包含在最终的 App Bundle 内。`hybrid://...` URL 中的 `bundle=` 参数
必须与打包的资源路径/名称一致。

### 故障排查

- **白屏 / 加载失败**：确认 `bundle=` 名称存在于 App 资源中，且 Scheme 匹配正确的
  host 类型（`lynxview_page`、`lynxview_card` 等）。详见 [Scheme](../../apis/scheme.md)。
- **路由方法无响应**：确保已注册原生 IDL 方法，且 JS 端调用的方法名匹配（如 `router.open`）。
