// Copyright (c) 2022 TikTok Pte. Ltd.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
import pipe from 'sparkling-method';
import type { CloseRequest, CloseResponse } from './close.d';

/**
 * Close the current page
 * @param params 
 * @param callback 
 */
export function close(params?: CloseRequest, callback?: (result: CloseResponse) => void): void {
    if (callback !== undefined && typeof callback !== 'function') {
        console.error('[sparkling-navigation] close: callback must be a function');
        return;
    }

    pipe.call('router.close', {
        ...(params ?? {}),
    }, (v: unknown) => {
        if (typeof callback === 'function') {
            const response = v as CloseResponse;
            const code = response?.code ?? -1;
            // Pipe status codes: 1 = succeeded, 0 = failed, negative = various errors.
            // When the native side reports success it may omit `msg`, so fall back to
            // 'ok' instead of the misleading 'Unknown error'.
            const isSuccess = code === 1;
            const msg = response?.msg ?? (isSuccess ? 'ok' : 'Unknown error');
            callback({ code, msg });
        }
    });
}
