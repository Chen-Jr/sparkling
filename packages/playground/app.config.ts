import { defineConfig } from '@lynx-js/rspeedy'
import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin'
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin'

const lynxConfig = defineConfig({
  source: {
    entry: {
      main: './src/index.tsx',
      second: './src/pages/second/index.tsx',
      'card-view': './src/pages/card-view/index.tsx',
      'media-test': './src/pages/media-test/index.tsx',
      'card-view-demo': './src/pages/card-view-demo/index.tsx',
      'debug-tool-switch': './src/pages/debug-tool-switch/index.tsx',
    },
  },
  output: {
    assetPrefix: 'asset:///',
    filename: {
      bundle: '[name].lynx.bundle',
    },
  },
  plugins: [
    pluginQRCode({
      schema(url: string): string {
        return `${url}?fullscreen=true`
      },
    }),
    pluginReactLynx(),
  ],
})

const config = {
  lynxConfig,
  appName: 'SparklingGo',
  devtool: true,
  platform: {
    android: {
      packageName: 'com.tiktok.sparkling.playground',
    },
    ios: {
      bundleIdentifier: 'com.sparkling.playground',
    },
  },
  paths: {
    androidAssets: 'android/app/src/main/assets',
    iosAssets: 'ios/LynxResources',
  },
  router: {
    main: { path: './lynxPages/main' },
    second: { path: './lynxPages/second' },
    'card-view': { path: './lynxPages/card-view' },
    'media-test': { path: './lynxPages/media-test' },
    'card-view-demo': { path: './lynxPages/card-view-demo' },
    'debug-tool-switch': { path: './lynxPages/debug-tool-switch' },
  },
}

export default config
