// Copyright (c) 2025 TikTok Pte. Ltd.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

export const TEST_CONSTANTS = {
  MOCK_PROJECT_ROOT: '/mock/project/root',
  MOCK_PROJECT_NAME: 'test-project',
  MOCK_TEMPLATE_PATH: '/fake/path/to/sparkling-app-template',
} as const;

export const withMockArgv = (args: string[], testFn: () => void | Promise<void>) => {
  const originalArgv = process.argv;
  process.argv = ['node', 'cli', ...args];

  try {
    return testFn();
  } finally {
    process.argv = originalArgv;
  }
};
