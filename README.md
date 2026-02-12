<img align="center" src="TikTok_Sparkling.png" alt="alt text" />

<p align="center">
  ❇️ The Cross-platform Infrastructure behind TikTok
</p>


## Content
- [About Sparkling](#about-sparkling)
- [Documentation](#documentation)
- [Project Layout](#project-layout)
- [How to Contribute](#how-to-contribute)
- [License](#license)

## About Sparkling
Large-scale apps like TikTok are never built with a single technology. Sparkling is the cross-platform infrastructure we built to power the TikTok app. It unlocks [Lynx](https://lynxjs.org) at our scale, and we believe it can do the same for your app.

- 📦 **Scaffold in minutes.** Create a Lynx app targeting Android & iOS with a single CLI command.
- 🔀 **Scheme-driven navigation.** Route between Lynx pages and native screens with a unified URL scheme.
- 🧩 **Production-proven native APIs.** Access media, storage, and more through the same bridges used by TikTok.

## Documentation
The full documentation for Sparkling can be found in [`docs`](/docs)
- [Get Started](./docs/en/guide/get-started/create-new-app.md)
- [Integrate Sparkling into an existing app](./docs/en/guide/get-started/integrate-sparkling-into-existing-app.md)
- [API Reference](./docs/en/apis/)

## Project Layout

- [`packages/sparkling-sdk`](/packages/sparkling-sdk) Core Sparkling SDK
- [`packages/sparkling-method`](/packages/sparkling-method) Sparkling Method SDK
- [`packages/methods`](/packages/methods) Built-in Sparkling methods packages
- [`packages/sparkling-app-cli`](/packages/sparkling-app-cli) CLI for build and run Sparkling apps.
- [`packages/create-sparkling-app`](/packages/create-sparkling-app) App scaffolding CLI
- [`packages/sparkling-method-cli`](/packages/sparkling-method-cli) Sparkling Method tooling
- [`packages/playground`](/packages/playground) Playground app for local development
- [`template/sparkling-app-template`](/template/sparkling-app-template) App template used by `npx create sparkling-app`

## How to Contribute
### [Code of Conduct][coc]
We are devoted to ensuring a positive, inclusive, and safe environment for all contributors. Please find our [Code of Conduct][coc] for detailed information.

[coc]: CODE_OF_CONDUCT.md

### [Contributing Guide][contributing]
We welcome you to join and become a member of Sparkling Authors. It's people like you that make this project great.

Please refer to our [contributing guide][contributing] for details.

[contributing]: CONTRIBUTING.md


## License
Sparkling is Apache licensed, as found in the [`LICENSE`](/LICENSE) file.
