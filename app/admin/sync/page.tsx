'use client'
import { useState } from 'react'

export default function SyncProductItemsPage() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [mismatched, setMismatched] = useState<
    { productItemId: number; productId: number; productName: string }[]
  >([])

  const handleCheck = async () => {
    setLoading(true)
    setStatus('⏳ Проверяем несоответствия...')
    setMismatched([])

    try {
      const res = await fetch('/api/admin/sync-product-items', { method: 'POST' })
      const data = await res.json()

      if (res.ok) {
        if (data.mismatched.length === 0) {
          setStatus('✅ Все записи совпадают. Ошибок не найдено.')
        } else {
          setMismatched(data.mismatched)
          setStatus(`⚠️ Найдено несоответствий: ${data.mismatched.length}`)
        }
      } else {
        setStatus(`❌ Ошибка: ${data.error || 'Не удалось выполнить проверку'}`)
      }
    } catch (err) {
      console.error(err)
      setStatus('❌ Ошибка при подключении к серверу')
    } finally {
      setLoading(false)
    }
  }

  const handleFix = async () => {
    if (!confirm('Исправить все несоответствия?')) return

    setLoading(true)
    setStatus('🔧 Исправляем несоответствия...')

    try {
      const res = await fetch('/api/admin/fix-product-items', { method: 'POST' })
      const data = await res.json()

      if (res.ok) {
        setStatus(`✅ Исправлено записей: ${data.updated}`)
        setMismatched([])
      } else {
        setStatus(`❌ Ошибка: ${data.error || 'Не удалось выполнить исправление'}`)
      }
    } catch (err) {
      console.error(err)
      setStatus('❌ Ошибка при подключении к серверу')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Проверка и исправление ProductItem</h1>
      <p style={{ marginTop: '10px', color: '#555' }}>
        Проверка выявляет несоответствия между <b>Product.id</b> и{' '}
        <b>ProductItem.productId</b>. Исправление обновит productId = id.
      </p>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button
          onClick={handleCheck}
          disabled={loading}
          style={{
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          {loading ? '⏳ Проверка...' : '🔍 Проверить'}
        </button>

        {mismatched.length > 0 && (
          <button
            onClick={handleFix}
            disabled={loading}
            style={{
              backgroundColor: '#10b981',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '10px 20px',
              cursor: 'pointer',
            }}
          >
            {loading ? '🔧 Исправляем...' : '✅ Исправить все'}
          </button>
        )}
      </div>

      {status && (
        <p style={{ marginTop: '20px', fontWeight: '500' }}>{status}</p>
      )}

      {mismatched.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Список несовпадающих записей:</h3>
          <ul style={{ marginTop: '10px', lineHeight: '1.6' }}>
            {mismatched.map((m, i) => (
              <li key={i}>
                ProductItem ID: {m.productItemId} → Product ID: {m.productId}{' '}
                <b>({m.productName})</b>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
