// Copyright 2025 TikTok Inc.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
package com.tiktok.sparkling.method.media.utils

object FConstants {
    const val EXTERNAL_DOCUMENTS: String = "com.android.externalstorage.documents"
    const val DOWNLOADS_DOCUMENTS: String = "com.android.providers.downloads.documents"
    const val MEDIA_DOCUMENTS: String = "com.android.providers.media.documents"
    const val URI_DOWNLOADS: String = "content://downloads/public_downloads"
    const val HTTP_SCHEMA: String = "http"
    const val URI_RAW: String = "raw:"
    const val URI_IMAGE: String = "image"
    const val URI_VIDEO: String = "video"
    const val URI_AUDIO: String = "audio"
    const val SELECTION: String = "_id=?"
    const val ID_SELECTION: String = "= ?"
    const val DATA_COLUMN: String = "_data"
    const val URI_TEMP_FILE: String = "uri_tmp"
    const val COMPRESS_SIZE: Int = 2048
    const val BUFF_SIZE: Int = 4096
    const val FILE_STREAM_BUFFER: Int = 4096
    const val DOWNLOAD_BUFFER_SIZE: Int = 8192

    const val DUP_HANDLE_CODE: Int = 100
    const val EMPTY_RES_CODE: Int = 200
    const val EMPTY_PATH_CODE: Int = 300
    const val DECOMPRESS_FAIL_CODE: Int = 400
    const val URI_FAIL_CODE: Int = 500
    const val DOWNLOAD_FAIL_CODE: Int = 600
}
