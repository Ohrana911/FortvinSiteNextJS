'use client'
import { useState } from 'react'

interface Product {
  id: number
  name: string
  isOnSale: boolean
  saleDescription?: string
}

interface AdminSaleFormProps {
  product: Product
  onBack: () => void
}

export default function AdminSaleForm({ product, onBack }: AdminSaleFormProps) {
  const [isOnSale, setIsOnSale] = useState<boolean>(product.isOnSale)
  const [saleDescription, setSaleDescription] = useState<string>(product.saleDescription || '')
  const [status, setStatus] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Сохраняем...')

    try {
      const res = await fetch(`/api/admin/products/${product.id}/sale`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isOnSale, saleDescription })
      })

      if (res.ok) {
        setStatus('✅ Изменения сохранены')
      } else {
        setStatus('❌ Ошибка при сохранении')
      }
    } catch (error) {
      setStatus('❌ Ошибка соединения с сервером')
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <button onClick={onBack} style={{ marginBottom: '10px' }}>← Назад к списку</button>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{product.name}</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={isOnSale}
            onChange={(e) => setIsOnSale(e.target.checked)}
          />
          Активировать скидку
        </label>

        {isOnSale && (
          <div>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
              Описание скидки:
            </label>
            <textarea
              value={saleDescription}
              onChange={(e) => setSaleDescription(e.target.value)}
              placeholder="Например: Скидка 10% до конца месяца"
              style={{
                width: '100%',
                height: '100px',
                padding: '10px',
                border: '1.5px solid #ccc',
                borderRadius: '6px',
                fontSize: '1rem',
                resize: 'vertical',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.border = '1.5px solid #0070f3')}
              onBlur={(e) => (e.target.style.border = '1.5px solid #ccc')}
            />
          </div>
        )}

        <button
          type="submit"
          style={{
            alignSelf: 'start',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          Сохранить
        </button>
      </form>

      {status && (
        <p
          style={{
            marginTop: '15px',
            color: status.startsWith('✅') ? 'green' : 'red',
          }}
        >
          {status}
        </p>
      )}
    </div>
  )
}
