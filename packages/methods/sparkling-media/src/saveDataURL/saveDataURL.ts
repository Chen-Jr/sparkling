// Copyright (c) 2025 TikTok Pte. Ltd.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
import pipe from 'sparkling-method';
import type { SaveDataURLRequest, SaveDataURLResponse } from './saveDataURL.d';
import { validateParams, validationRules, isValidCallback, logInvalidCallback, mapPipeResponse } from '../utils/validation';

/**
 * Save a base64 data URL to local file
 * @param params - Save data URL parameters
 * @param callback - Callback function with result
 */
export function saveDataURL(params: SaveDataURLRequest, callback: (result: SaveDataURLResponse) => void): void {
    const error = validateParams<SaveDataURLRequest, SaveDataURLResponse>(params, callback, [
        validationRules.paramsRequired(),
        validationRules.requiredString('dataURL'),
        validationRules.requiredString('filename'),
        validationRules.requiredString('extension'),
    ]);
    if (error) return;

    if (!isValidCallback(callback)) {
        logInvalidCallback('saveDataURL');
        return;
    }

    const pipeParams = {
        dataURL: params.dataURL.trim(),
        filename: params.filename.trim(),
        extension: params.extension.trim(),
        saveToAlbum: params.saveToAlbum,
    };
    pipe.call('media.saveDataURL', pipeParams, (v: unknown) => {
        callback(mapPipeResponse<SaveDataURLResponse>(v));
    });
}
