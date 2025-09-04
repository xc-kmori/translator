'use client'

import { useState } from 'react'
import FileUpload from '../components/FileUpload'
import CodeExplainer from '../components/CodeExplainer'

type ExplanationData = {
  line: number
  code: string
  explanation: string
}

export default function Home() {
  const [explanationData, setExplanationData] = useState<ExplanationData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (fileContent: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://YOUR_N8N_WEBHOOK_URL'
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: fileContent }),
      })
      
      if (!response.ok) {
        throw new Error('API通信に失敗しました')
      }
      
      const data: ExplanationData[] = await response.json()
      setExplanationData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          コード解説ツール
        </h1>
        
        {loading && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600">コードを解析中...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {explanationData.length === 0 && !loading && !error && (
          <FileUpload onFileUpload={handleFileUpload} />
        )}
        
        {explanationData.length > 0 && !loading && (
          <CodeExplainer explanationData={explanationData} />
        )}
      </div>
    </div>
  )
}
