# Sparkling SDK - Android

This page documents the native Android SDK APIs for hosting Sparkling content.
For the `hybrid://...` URL format, see [Scheme](./scheme.md).

## Dependency

```kotlin
dependencies {
  implementation("com.tiktok.sparkling:sparkling:2.0.0")
}
```

## Initialization (Application.onCreate)

Sparkling containers require HybridKit to be initialized before opening any pages:

```kotlin
HybridKit.init(this)

val baseInfoConfig = BaseInfoConfig(isDebug = BuildConfig.DEBUG)
val lynxConfig = SparklingLynxConfig.build(this) {
  // optional: add global Lynx behaviors/modules, template provider, etc.
}
val hybridConfig = SparklingHybridConfig.build(baseInfoConfig) {
  setLynxConfig(lynxConfig)
}

HybridKit.setHybridConfig(hybridConfig, this)
HybridKit.initLynxKit()
```

## Open a page (full-screen Activity)

Create a `SparklingContext`, set a scheme, then navigate:

```kotlin
val context = SparklingContext().apply {
  scheme = "hybrid://lynxview_page?bundle=main.lynx.bundle&title=Home"
  // optional initial data for the page:
  // withInitData("{\"initial_data\":{}}")
}

Sparkling.build(this, context).navigate()
```

Key APIs:
- `Sparkling.build(context, sparklingContext)`: constructs a Sparkling instance.
- `Sparkling.navigate()`: starts `SparklingActivity` and loads the scheme.

## Embed a container view

Instead of starting an Activity, you can create a `SparklingView`:

```kotlin
val ctx = SparklingContext().apply {
  scheme = "hybrid://lynxview_page?bundle=main.lynx.bundle"
}

val view = Sparkling.build(this, ctx).createView()
// add `view` into your layout, then:
view?.loadUrl()
```

## Customize loading/error/toolbars

Implement `SparklingUIProvider` and attach it to `SparklingContext`:

- `getLoadingView(context)`: loading UI
- `getErrorView(context)`: error UI
- `getToolBar(context)`: optional custom `Toolbar` used by `SparklingActivity`
