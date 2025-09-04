'use client'

import { useState, useCallback } from 'react'

type FileUploadProps = {
  onFileUpload: (content: string) => Promise<void>
}

export default function FileUpload({ onFileUpload }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleFileRead = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      onFileUpload(content)
    }
    reader.readAsText(file, 'UTF-8')
  }, [onFileUpload])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileRead(files[0])
    }
  }, [handleFileRead])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileRead(files[0])
    }
  }, [handleFileRead])

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={`upload-area p-12 rounded-lg text-center ${
          isDragOver ? 'dragover' : ''
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="space-y-4">
          <div className="text-6xl text-gray-400">📄</div>
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              コードファイルをアップロード
            </h3>
            <p className="text-gray-500 mb-4">
              ファイルをドラッグ&ドロップするか、クリックして選択してください
            </p>
            <input
              type="file"
              id="fileInput"
              accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.cs,.php,.rb,.go,.rs,.html,.css,.sql"
              onChange={handleFileInput}
              className="hidden"
            />
            <label
              htmlFor="fileInput"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
            >
              ファイルを選択
            </label>
          </div>
          <div className="text-sm text-gray-400">
            対応ファイル: .js, .jsx, .ts, .tsx, .py, .java, .cpp, .c, .cs, .php, .rb, .go, .rs, .html, .css, .sql
          </div>
        </div>
      </div>
    </div>
  )
}