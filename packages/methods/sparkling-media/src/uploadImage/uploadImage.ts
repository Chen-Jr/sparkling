// Copyright (c) 2025 TikTok Pte. Ltd.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
import pipe from 'sparkling-method';
import type { UploadImageRequest, UploadImageResponse } from './uploadImage.d';
import { validateParams, validationRules, isValidCallback, logInvalidCallback } from '../utils/validation';

/**
 * Upload an image to server
 * @param params - Upload image parameters
 * @param callback - Callback function with result
 */
export function uploadImage(params: UploadImageRequest, callback: (result: UploadImageResponse) => void): void {
    const error = validateParams<UploadImageRequest, UploadImageResponse>(params, callback, [
        validationRules.paramsRequired(),
        validationRules.requiredString('url'),
    ]);
    if (error) return;

    if (!isValidCallback(callback)) {
        logInvalidCallback('uploadImage');
        return;
    }

    pipe.call('media.uploadImage', {
        url: params.url.trim(),
        filePath: params.filePath,
        params: params.params,
        header: params.header,
        paramsOption: params.paramsOption,
        formDataBody: params.formDataBody,
    }, (v: unknown) => {
        const response = v as UploadImageResponse;
        callback({
            code: response?.code ?? -1,
            msg: response?.msg ?? 'Unknown error',
            data: response?.data,
        });
    });
}
