# Sparkling SDK - Android

本页面介绍用于承载 Sparkling 内容的 Android 原生 SDK API。
关于 `hybrid://...` URL 格式，请参阅 [Scheme](./scheme.md)。

## 依赖

```kotlin
dependencies {
  implementation("com.tiktok.sparkling:sparkling:2.0.0")
}
```

## 初始化（Application.onCreate）

在打开任何页面之前，必须先初始化 HybridKit：

```kotlin
HybridKit.init(this)

val baseInfoConfig = BaseInfoConfig(isDebug = BuildConfig.DEBUG)
val lynxConfig = SparklingLynxConfig.build(this) {
  // 可选：添加全局 Lynx 行为/模块、模板提供者等
}
val hybridConfig = SparklingHybridConfig.build(baseInfoConfig) {
  setLynxConfig(lynxConfig)
}

HybridKit.setHybridConfig(hybridConfig, this)
HybridKit.initLynxKit()
```

## 打开页面（全屏 Activity）

创建 `SparklingContext`，设置 Scheme，然后导航：

```kotlin
val context = SparklingContext().apply {
  scheme = "hybrid://lynxview_page?bundle=main.lynx.bundle&title=Home"
  // 可选：页面初始数据
  // withInitData("{\"initial_data\":{}}")
}

Sparkling.build(this, context).navigate()
```

核心 API：
- `Sparkling.build(context, sparklingContext)`：构建 Sparkling 实例。
- `Sparkling.navigate()`：启动 `SparklingActivity` 并加载 Scheme。

## 嵌入容器视图

也可以不启动 Activity，直接创建 `SparklingView`：

```kotlin
val ctx = SparklingContext().apply {
  scheme = "hybrid://lynxview_page?bundle=main.lynx.bundle"
}

val view = Sparkling.build(this, ctx).createView()
// 将 view 添加到你的布局中，然后：
view?.loadUrl()
```

## 自定义加载/错误/工具栏

实现 `SparklingUIProvider` 并挂载到 `SparklingContext`：

- `getLoadingView(context)`：加载中 UI
- `getErrorView(context)`：错误 UI
- `getToolBar(context)`：`SparklingActivity` 使用的自定义 `Toolbar`（可选）
