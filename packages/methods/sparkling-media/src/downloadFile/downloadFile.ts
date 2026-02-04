// Copyright (c) 2025 TikTok Pte. Ltd.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
import pipe from 'sparkling-method';
import type { DownloadFileRequest, DownloadFileResponse } from './downloadFile.d';
import { validateParams, validationRules, isValidCallback, logInvalidCallback } from '../utils/validation';

/**
 * Download a file from server
 * @param params - Download file parameters
 * @param callback - Callback function with result
 */
export function downloadFile(params: DownloadFileRequest, callback: (result: DownloadFileResponse) => void): void {
    const error = validateParams<DownloadFileRequest, DownloadFileResponse>(params, callback, [
        validationRules.paramsRequired(),
        validationRules.requiredString('url'),
        validationRules.requiredString('extension'),
    ]);
    if (error) return;

    if (!isValidCallback(callback)) {
        logInvalidCallback('downloadFile');
        return;
    }

    pipe.call('media.downloadFile', {
        url: params.url.trim(),
        params: params.params,
        header: params.header,
        extension: params.extension,
        saveToAlbum: params.saveToAlbum,
        needCommonParams: params.needCommonParams ?? true,
        timeoutInterval: params.timeoutInterval,
    }, (v: unknown) => {
        const response = v as DownloadFileResponse;
        callback({
            code: response?.code ?? -1,
            msg: response?.msg ?? 'Unknown error',
            data: response?.data,
        });
    });
}
