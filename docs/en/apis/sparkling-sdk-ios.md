# Sparkling SDK - iOS

This page documents the native iOS SDK APIs for hosting Sparkling content.
For the `hybrid://...` URL format, see [Scheme](./scheme.md).

## Dependency (CocoaPods)

```ruby
pod 'Sparkling', '2.0.0'
```

## Initialization (App startup)

The template app registers services and executes boot tasks during startup:

```swift
SPKServiceRegister.registerAll()
SPKExecuteAllPrepareBootTask()
```

Notes:
- `SPKServiceRegister` is typically defined in your app target (see the template under
  `template/sparkling-app-template/ios/.../MethodServices/SPKServiceRegistrar.swift`).

## Open a page (router)

```swift
let url = "hybrid://lynxview_page?bundle=main.lynx.bundle&title=Home"
SPKRouter.open(withURL: url, context: nil)
```

## Embed a container view

```swift
let view = SPKContainerView(frame: UIScreen.main.bounds)
let context = SPKContext()
view.load(withURL: "hybrid://lynxview_page?bundle=main.lynx.bundle", context)
```

## Customize loading/error/navigation/theme

Use `SPKContext` to customize container behavior, for example:
- loading/error view builders (`loadingViewBuilder`, `failedViewBuilder`)
- navigation bar (`naviBar`)
- theme (`appTheme`)
- lifecycle callbacks (`containerLifecycleDelegate`)
