// Copyright (c) 2025 TikTok Pte. Ltd.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
import pipe from 'sparkling-method';
import type { UploadFileRequest, UploadFileResponse } from './uploadFile.d';
import { validateParams, validationRules, isValidCallback, logInvalidCallback } from '../utils/validation';

/**
 * Upload a file to server
 * @param params - Upload file parameters
 * @param callback - Callback function with result
 */
export function uploadFile(params: UploadFileRequest, callback: (result: UploadFileResponse) => void): void {
    const error = validateParams<UploadFileRequest, UploadFileResponse>(params, callback, [
        validationRules.paramsRequired(),
        validationRules.requiredString('url'),
    ]);
    if (error) return;

    if (!isValidCallback(callback)) {
        logInvalidCallback('uploadFile');
        return;
    }

    pipe.call('media.uploadFile', {
        url: params.url.trim(),
        filePath: params.filePath,
        params: params.params,
        header: params.header,
        paramsOption: params.paramsOption,
        formDataBody: params.formDataBody,
    }, (v: unknown) => {
        const response = v as UploadFileResponse;
        callback({
            code: response?.code ?? -1,
            msg: response?.msg ?? 'Unknown error',
            data: response?.data,
        });
    });
}
