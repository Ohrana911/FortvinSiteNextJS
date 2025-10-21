'use client'

import { useState, useRef } from 'react'

export default function ImportProductsPage() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setStatus('⚠️ Пожалуйста, выберите CSV-файл.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setStatus('⏳ Импорт выполняется...')

    try {
      const res = await fetch('/api/import-products', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setStatus(`✅ Импорт успешно завершён. Импортировано ${data.imported} товаров.`)
      } else {
        setStatus(`❌ Ошибка: ${data.error || 'Неизвестная ошибка'}`)
      }
    } catch {
      setStatus('❌ Ошибка при отправке файла на сервер.')
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: '140px auto', textAlign: 'center' }}>
      <h1>📦 Импорт товаров</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        {/* Скрытый input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />

        {/* Кастомная кнопка */}
        <button
          type="button"
          onClick={handleFileClick}
          style={{
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: 10,
          }}
        >
          {file ? `Выбран файл: ${file.name}` : 'Выбрать CSV-файл'}
        </button>

        <br />

        <button
          type="submit"
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            marginTop: 10,
          }}
        >
          Импортировать
        </button>
      </form>

      {status && <p style={{ marginTop: 20 }}>{status}</p>}
    </div>
  )
}
