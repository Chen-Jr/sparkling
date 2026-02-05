// Copyright (c) 2025 TikTok Pte. Ltd.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.

import { withMockArgv } from './test-utils';

const mockHelp = jest.fn();
const mockInit = jest.fn();

jest.mock('../help', () => mockHelp);
jest.mock('../init', () => mockInit);

describe('CLI', () => {
  let consoleLogSpy: jest.SpyInstance;
  let processExitSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    mockHelp.mockClear();
    mockInit.mockClear();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    processExitSpy = jest.spyOn(process, 'exit').mockImplementation((() => {}) as any);
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  const testMainFunction = async (args: string[], expectedCall: () => void) => {
    await withMockArgv(args, async () => {
      const { main } = require('../index');
      await main();
      expectedCall();
    });
  };

  it('defaults to init when no command is provided', async () => {
    await testMainFunction([], () => {
      expect(mockInit).toHaveBeenCalledWith([], { verbose: false });
    });
  });

  it('should call init when command is "init"', async () => {
    await testMainFunction(['init'], () => {
      expect(mockInit).toHaveBeenCalledWith([], { verbose: false });
      expect(mockHelp).not.toHaveBeenCalled();
    });
  });

  it('should call init when command is "create"', async () => {
    await testMainFunction(['create', 'my-app'], () => {
      expect(mockInit).toHaveBeenCalledWith(['my-app'], { verbose: false });
    });
  });

  it('should call help when command is "help"', async () => {
    await testMainFunction(['help'], () => {
      expect(mockHelp).toHaveBeenCalledTimes(1);
      expect(mockInit).not.toHaveBeenCalled();
    });
  });

  it('should treat unrecognized first argument as init project name', async () => {
    await testMainFunction(['my-app', '--force'], () => {
      expect(mockInit).toHaveBeenCalledWith(['my-app', '--force'], { verbose: false });
      expect(mockHelp).not.toHaveBeenCalled();
    });
  });

  it('should handle errors in command execution', async () => {
    mockInit.mockRejectedValue(new Error('Test error'));
    
    await withMockArgv(['init'], async () => {
      const { main } = require('../index');
      
      try {
        await main();
        fail('Expected main() to throw an error');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect((error as Error).message).toBe('Test error');
      }
    });
  });
});
