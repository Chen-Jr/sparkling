// Copyright (c) 2025 TikTok Pte. Ltd.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

export default async () => {
  console.log(`Usage: create-sparkling-app [project-name] [options]

Commands:
  init [name]   Scaffold a new Sparkling project (alias: create)
  help          Displays this help message

Options:
  -v, --verbose  Enable verbose logging for debugging

Quick start:
  npx create-sparkling-app my-app

After creating your project, use sparkling-cli to build and run:
  npx sparkling run:android
  npx sparkling run:ios`);
};
