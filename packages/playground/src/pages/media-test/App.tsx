import { useCallback, useState } from '@lynx-js/react'

import './App.css'

import * as media from 'sparkling-media'

type ResultEntry = {
  id: number
  method: string
  status: 'success' | 'error'
  detail: string
  timestamp: string
}

type PreviewImage = {
  id: number
  src: string
  mimeType?: string
}

export function App() {
  const [results, setResults] = useState<ResultEntry[]>([])
  const [nextId, setNextId] = useState(1)

  // --- image preview ---
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([])
  const [previewNextId, setPreviewNextId] = useState(1)

  // --- download config ---
  const [downloadUrl, setDownloadUrl] = useState(
    'https://picsum.photos/200/300'
  )
  const [downloadExt, setDownloadExt] = useState('jpg')
  const [saveToAlbum, setSaveToAlbum] = useState(false)

  // --- upload config ---
  const [uploadUrl, setUploadUrl] = useState('')
  const [lastFilePath, setLastFilePath] = useState('')

  // --- saveDataURL config ---
  const [dataURL, setDataURL] = useState('')
  const [saveFilename, setSaveFilename] = useState('test_image')
  const [saveExtension, setSaveExtension] = useState('png')

  const addResult = useCallback(
    (method: string, code: number, detail: string) => {
      'background only'
      const entry: ResultEntry = {
        id: nextId,
        method,
        status: code === 0 ? 'success' : 'error',
        detail,
        timestamp: new Date().toLocaleTimeString(),
      }
      setNextId((prev) => prev + 1)
      setResults((prev) => [entry, ...prev].slice(0, 20))
    },
    [nextId]
  )

  const addPreviewImages = useCallback(
    (tempFiles: media.TempFile[]) => {
      'background only'
      const newImages: PreviewImage[] = []
      let id = previewNextId
      for (const f of tempFiles) {
        if (f.base64Data && f.mediaType === 'image') {
          const mime = f.mimeType || 'image/jpeg'
          newImages.push({
            id: id++,
            src: `data:${mime};base64,${f.base64Data}`,
            mimeType: mime,
          })
        }
      }
      if (newImages.length > 0) {
        setPreviewNextId(id)
        setPreviewImages((prev) => [...newImages, ...prev].slice(0, 10))
      }
    },
    [previewNextId]
  )

  const clearPreview = useCallback(() => {
    'background only'
    setPreviewImages([])
    setPreviewNextId(1)
  }, [])

  // ===================== chooseMedia =====================

  const chooseImageFromAlbum = useCallback(() => {
    media.chooseMedia(
      {
        mediaTypes: ['image'],
        sourceType: 'album',
        maxCount: 3,
        needBase64Data: true,
      },
      (v: media.ChooseMediaResponse) => {
        console.log('chooseMedia(image/album):', v)
        if (v.code === 0 && v.data?.tempFiles?.length) {
          const f = v.data.tempFiles[0]
          setLastFilePath(f.tempFilePath ?? f.tempFileAbsolutePath ?? '')
          addPreviewImages(v.data.tempFiles)
        }
        addResult(
          'chooseMedia (image/album)',
          v.code,
          v.code === 0
            ? `Got ${v.data?.tempFiles?.length ?? 0} file(s)`
            : v.msg
        )
      }
    )
  }, [addResult, addPreviewImages])

  const chooseVideoFromAlbum = useCallback(() => {
    media.chooseMedia(
      {
        mediaTypes: ['video'],
        sourceType: 'album',
        maxCount: 1,
      },
      (v: media.ChooseMediaResponse) => {
        console.log('chooseMedia(video/album):', v)
        if (v.code === 0 && v.data?.tempFiles?.length) {
          const f = v.data.tempFiles[0]
          setLastFilePath(f.tempFilePath ?? f.tempFileAbsolutePath ?? '')
        }
        addResult(
          'chooseMedia (video/album)',
          v.code,
          v.code === 0
            ? `Got ${v.data?.tempFiles?.length ?? 0} file(s)`
            : v.msg
        )
      }
    )
  }, [addResult])

  const takePhotoFromCamera = useCallback(() => {
    media.chooseMedia(
      {
        mediaTypes: ['image'],
        sourceType: 'camera',
        cameraType: 'back',
        maxCount: 1,
        compressImage: true,
        compressQuality: 80,
        needBase64Data: true,
      },
      (v: media.ChooseMediaResponse) => {
        console.log('chooseMedia(camera):', v)
        if (v.code === 0 && v.data?.tempFiles?.length) {
          const f = v.data.tempFiles[0]
          setLastFilePath(f.tempFilePath ?? f.tempFileAbsolutePath ?? '')
          addPreviewImages(v.data.tempFiles)
        }
        addResult(
          'chooseMedia (camera)',
          v.code,
          v.code === 0
            ? `Captured ${v.data?.tempFiles?.length ?? 0} photo(s)`
            : v.msg
        )
      }
    )
  }, [addResult, addPreviewImages])

  const takePhotoFront = useCallback(() => {
    media.chooseMedia(
      {
        mediaTypes: ['image'],
        sourceType: 'camera',
        cameraType: 'front',
        maxCount: 1,
        needBase64Data: true,
      },
      (v: media.ChooseMediaResponse) => {
        console.log('chooseMedia(camera/front):', v)
        if (v.code === 0 && v.data?.tempFiles?.length) {
          const f = v.data.tempFiles[0]
          setLastFilePath(f.tempFilePath ?? f.tempFileAbsolutePath ?? '')
          addPreviewImages(v.data.tempFiles)
        }
        addResult(
          'chooseMedia (front camera)',
          v.code,
          v.code === 0
            ? `Captured ${v.data?.tempFiles?.length ?? 0} photo(s)`
            : v.msg
        )
      }
    )
  }, [addResult, addPreviewImages])

  const chooseWithCrop = useCallback(() => {
    media.chooseMedia(
      {
        mediaTypes: ['image'],
        sourceType: 'album',
        maxCount: 1,
        isNeedCut: true,
        cropRatioWidth: 1,
        cropRatioHeight: 1,
        needBase64Data: true,
      },
      (v: media.ChooseMediaResponse) => {
        console.log('chooseMedia(crop):', v)
        if (v.code === 0 && v.data?.tempFiles?.length) {
          const f = v.data.tempFiles[0]
          setLastFilePath(f.tempFilePath ?? f.tempFileAbsolutePath ?? '')
          addPreviewImages(v.data.tempFiles)
        }
        addResult(
          'chooseMedia (crop 1:1)',
          v.code,
          v.code === 0
            ? `Got ${v.data?.tempFiles?.length ?? 0} file(s)`
            : v.msg
        )
      }
    )
  }, [addResult, addPreviewImages])

  // ===================== downloadFile =====================

  const handleDownload = useCallback(() => {
    if (!downloadUrl.trim()) {
      addResult('downloadFile', -1, 'URL is empty')
      return
    }
    media.downloadFile(
      {
        url: downloadUrl,
        extension: downloadExt,
        ...(saveToAlbum ? { saveToAlbum: 'image' as const } : {}),
      },
      (v: media.DownloadFileResponse) => {
        console.log('downloadFile:', v)
        if (v.code === 0 && v.data?.filePath) {
          setLastFilePath(v.data.filePath)
        }
        addResult(
          'downloadFile',
          v.code,
          v.code === 0
            ? `Saved to: ${v.data?.filePath ?? 'unknown'}`
            : v.msg
        )
      }
    )
  }, [downloadUrl, downloadExt, saveToAlbum, addResult])

  // ===================== uploadFile =====================

  const handleUpload = useCallback(() => {
    if (!uploadUrl.trim()) {
      addResult('uploadFile', -1, 'Upload URL is empty')
      return
    }
    if (!lastFilePath) {
      addResult('uploadFile', -1, 'No file selected. Choose or download a file first.')
      return
    }
    media.uploadFile(
      {
        url: uploadUrl,
        filePath: lastFilePath,
      },
      (v: media.UploadFileResponse) => {
        console.log('uploadFile:', v)
        addResult(
          'uploadFile',
          v.code,
          v.code === 0
            ? `Uploaded: ${v.data?.url ?? v.data?.uri ?? 'done'}`
            : v.msg
        )
      }
    )
  }, [uploadUrl, lastFilePath, addResult])

  // ===================== uploadImage =====================

  const handleUploadImage = useCallback(() => {
    if (!uploadUrl.trim()) {
      addResult('uploadImage', -1, 'Upload URL is empty')
      return
    }
    if (!lastFilePath) {
      addResult('uploadImage', -1, 'No file selected. Choose or download a file first.')
      return
    }
    media.uploadImage(
      {
        url: uploadUrl,
        filePath: lastFilePath,
      },
      (v: media.UploadImageResponse) => {
        console.log('uploadImage:', v)
        addResult(
          'uploadImage',
          v.code,
          v.code === 0
            ? `Uploaded: ${v.data?.url ?? v.data?.uri ?? 'done'}`
            : v.msg
        )
      }
    )
  }, [uploadUrl, lastFilePath, addResult])

  // ===================== saveDataURL =====================

  const handleSaveDataURL = useCallback(() => {
    if (!dataURL.trim()) {
      addResult('saveDataURL', -1, 'Data URL is empty')
      return
    }
    media.saveDataURL(
      {
        dataURL,
        filename: saveFilename,
        extension: saveExtension,
      },
      (v: media.SaveDataURLResponse) => {
        console.log('saveDataURL:', v)
        if (v.code === 0 && v.data?.filePath) {
          setLastFilePath(v.data.filePath)
        }
        addResult(
          'saveDataURL',
          v.code,
          v.code === 0
            ? `Saved to: ${v.data?.filePath ?? 'unknown'}`
            : v.msg
        )
      }
    )
  }, [dataURL, saveFilename, saveExtension, addResult])

  // ===================== actions =====================

  const clearResults = useCallback(() => {
    'background only'
    setResults([])
    setNextId(1)
  }, [])

  return (
    <view>
      <view className="App">
        <scroll-view className="main-scroll" scroll-orientation="vertical">
          {/* ====== Section: Choose Media ====== */}
          <view className="section">
            <text className="section-title">Choose Media</text>
            <text className="section-desc">
              Pick images/videos from album or take photos from camera.
            </text>
            <view className="btn-grid">
              <text className="btn btn-primary" bindtap={chooseImageFromAlbum}>
                Image from Album
              </text>
              <text className="btn btn-primary" bindtap={chooseVideoFromAlbum}>
                Video from Album
              </text>
              <text className="btn btn-primary" bindtap={takePhotoFromCamera}>
                Back Camera
              </text>
              <text className="btn btn-primary" bindtap={takePhotoFront}>
                Front Camera
              </text>
              <text className="btn btn-secondary" bindtap={chooseWithCrop}>
                Image + Crop (1:1)
              </text>
            </view>
          </view>

          {/* ====== Section: Image Preview ====== */}
          {previewImages.length > 0 && (
            <view className="section">
              <view className="preview-header">
                <text className="section-title">Preview</text>
                <text className="clear-preview-btn" bindtap={clearPreview}>
                  Clear
                </text>
              </view>
              <view className="preview-grid">
                {previewImages.map((img) => (
                  <view key={img.id} className="preview-item">
                    <image
                      src={img.src}
                      className="preview-image"
                      mode="aspectFill"
                    />
                  </view>
                ))}
              </view>
            </view>
          )}

          {/* ====== Section: Download File ====== */}
          <view className="section">
            <text className="section-title">Download File</text>
            <text className="section-desc">
              Download a file from a URL and optionally save to album.
            </text>
            <view className="input-group">
              <text className="input-label">URL</text>
              <input
                className="text-input"
                value={downloadUrl}
                bindinput={(e: any) => {
                  'background only'
                  setDownloadUrl(e.detail.value)
                }}
                placeholder="Enter download URL"
                text-color="#333"
              />
            </view>
            <view className="input-group">
              <text className="input-label">Extension</text>
              <input
                className="text-input"
                value={downloadExt}
                bindinput={(e: any) => {
                  'background only'
                  setDownloadExt(e.detail.value)
                }}
                placeholder="e.g. jpg, png, mp4"
                text-color="#333"
              />
            </view>
            <view className="row-center">
              <text className="toggle-label">Save to Album</text>
              <text
                className={`toggle ${saveToAlbum ? 'toggle-on' : 'toggle-off'}`}
                bindtap={() => {
                  'background only'
                  setSaveToAlbum((v) => !v)
                }}
              >
                {saveToAlbum ? 'ON' : 'OFF'}
              </text>
            </view>
            <text className="btn btn-accent" bindtap={handleDownload}>
              Download
            </text>
          </view>

          {/* ====== Section: Upload ====== */}
          <view className="section">
            <text className="section-title">Upload File / Image</text>
            <text className="section-desc">
              Upload the last selected file to a remote server.
            </text>
            {lastFilePath ? (
              <view className="file-badge">
                <text className="file-badge-label">Current file:</text>
                <text className="file-badge-path">{lastFilePath}</text>
              </view>
            ) : (
              <view className="file-badge file-badge-empty">
                <text className="file-badge-label">
                  No file yet — pick or download one above.
                </text>
              </view>
            )}
            <view className="input-group">
              <text className="input-label">Upload URL</text>
              <input
                className="text-input"
                value={uploadUrl}
                bindinput={(e: any) => {
                  'background only'
                  setUploadUrl(e.detail.value)
                }}
                placeholder="Enter upload endpoint URL"
                text-color="#333"
              />
            </view>
            <view className="btn-row">
              <text className="btn btn-accent" bindtap={handleUpload}>
                Upload File
              </text>
              <text className="btn btn-accent" bindtap={handleUploadImage}>
                Upload Image
              </text>
            </view>
          </view>

          {/* ====== Section: Save Data URL ====== */}
          <view className="section">
            <text className="section-title">Save Data URL</text>
            <text className="section-desc">
              Save a base64 data URL to local storage.
            </text>
            <view className="input-group">
              <text className="input-label">Data URL (base64)</text>
              <input
                className="text-input"
                value={dataURL}
                bindinput={(e: any) => {
                  'background only'
                  setDataURL(e.detail.value)
                }}
                placeholder="data:image/png;base64,..."
                text-color="#333"
              />
            </view>
            <view className="input-row">
              <view className="input-group flex-1">
                <text className="input-label">Filename</text>
                <input
                  className="text-input"
                  value={saveFilename}
                  bindinput={(e: any) => {
                    'background only'
                    setSaveFilename(e.detail.value)
                  }}
                  placeholder="my_image"
                  text-color="#333"
                />
              </view>
              <view className="input-group flex-half">
                <text className="input-label">Ext</text>
                <input
                  className="text-input"
                  value={saveExtension}
                  bindinput={(e: any) => {
                    'background only'
                    setSaveExtension(e.detail.value)
                  }}
                  placeholder="png"
                  text-color="#333"
                />
              </view>
            </view>
            <text className="btn btn-accent" bindtap={handleSaveDataURL}>
              Save Data URL
            </text>
          </view>

          {/* ====== Section: Results ====== */}
          <view className="section section-results">
            <text className="section-title">Results</text>
            {results.length === 0 ? (
              <text className="empty-hint">
                No results yet. Tap a button above to test.
              </text>
            ) : (
              results.map((r) => (
                <view
                  key={r.id}
                  className={`result-card ${r.status === 'success' ? 'result-success' : 'result-error'}`}
                >
                  <view className="result-header">
                    <text className="result-method">{r.method}</text>
                    <text className="result-time">{r.timestamp}</text>
                  </view>
                  <text
                    className={`result-status ${r.status === 'success' ? 'status-ok' : 'status-fail'}`}
                  >
                    {r.status === 'success' ? 'SUCCESS' : 'ERROR'}
                  </text>
                  <text className="result-detail">{r.detail}</text>
                </view>
              ))
            )}
          </view>

          {/* bottom spacer */}
          <view style={{ height: '40px' }} />
        </scroll-view>
      </view>
    </view>
  )
}
