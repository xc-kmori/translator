'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

type ExplanationData = {
  line: number
  code: string
  explanation: string
}

type CodeExplainerProps = {
  explanationData: ExplanationData[]
}

export default function CodeExplainer({ explanationData }: CodeExplainerProps) {
  const [selectedLine, setSelectedLine] = useState<number | null>(null)
  
  const selectedExplanation = selectedLine 
    ? explanationData.find(item => item.line === selectedLine)?.explanation
    : null

  // ファイル拡張子を推測してシンタックスハイライトの言語を決定
  const detectLanguage = (code: string): string => {
    if (code.includes('function') && code.includes('const')) return 'javascript'
    if (code.includes('def ') && code.includes(':')) return 'python'
    if (code.includes('class ') && code.includes('public')) return 'java'
    if (code.includes('#include') && code.includes('int main')) return 'cpp'
    if (code.includes('package ') && code.includes('func ')) return 'go'
    if (code.includes('<html') || code.includes('<!DOCTYPE')) return 'html'
    if (code.includes('{') && code.includes('}') && code.includes(';')) return 'javascript'
    return 'javascript' // デフォルト
  }

  const fullCode = explanationData.map(item => item.code).join('\n')
  const language = detectLanguage(fullCode)

  return (
    <div className="grid grid-cols-2 gap-6 h-[calc(100vh-200px)]">
      {/* 左カラム: コード表示 */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-800 text-white px-4 py-2 flex items-center space-x-2">
          <span className="text-green-400">●</span>
          <span className="text-yellow-400">●</span>
          <span className="text-red-400">●</span>
          <span className="ml-3 text-sm">ソースコード</span>
        </div>
        <div className="h-full overflow-auto">
          <div className="relative">
            {/* 行番号エリア */}
            <div className="absolute left-0 top-0 bg-gray-50 border-r border-gray-200 px-3 py-4 select-none">
              {explanationData.map((item) => (
                <div
                  key={item.line}
                  className={`
                    text-sm text-gray-500 leading-6 cursor-pointer hover:bg-blue-100 px-2 py-0.5 rounded
                    ${selectedLine === item.line ? 'bg-blue-200 text-blue-800' : ''}
                  `}
                  onClick={() => setSelectedLine(item.line)}
                >
                  {item.line}
                </div>
              ))}
            </div>
            
            {/* コードエリア */}
            <div className="ml-16">
              <SyntaxHighlighter
                language={language}
                style={oneDark}
                showLineNumbers={false}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  background: 'transparent',
                  fontSize: '14px',
                  lineHeight: '1.5',
                }}
                lineProps={(lineNumber) => ({
                  style: { 
                    display: 'block',
                    cursor: 'pointer',
                    padding: '0.125rem 0.5rem',
                  },
                  className: `code-line ${selectedLine === lineNumber ? 'selected' : ''}`,
                  onClick: () => setSelectedLine(lineNumber)
                })}
              >
                {fullCode}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>

      {/* 右カラム: 解説表示 */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-800 text-white px-4 py-2">
          <span className="text-sm">解説</span>
        </div>
        <div className="h-full overflow-auto p-6">
          {selectedExplanation ? (
            <div className="space-y-4">
              <div className="text-sm text-gray-500 border-b border-gray-200 pb-2">
                {selectedLine}行目の解説
              </div>
              <div className="text-gray-800 leading-relaxed">
                {selectedExplanation}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-4">👈</div>
                <p>左側のコードの行番号をクリックしてください</p>
                <p className="text-sm mt-2">その行の詳しい解説が表示されます</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}