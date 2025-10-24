'use client'
import { useEffect, useState } from 'react'
import AdminSaleForm from './AdminSaleForm'


export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null)

  useEffect(() => {
    fetch('/api/admin/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  if (selectedProduct) {
    return (
      <AdminSaleForm
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Список товаров</h1>
      {products.length === 0 ? (
        <p>Нет товаров</p>
      ) : (
        <ul>
          {products.map(p => (
            <li
              key={p.id}
              style={{
                cursor: 'pointer',
                marginBottom: '10px',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '8px'
              }}
              onClick={() => setSelectedProduct(p)}
            >
              <strong>{p.name}</strong>
              {p.isOnSale && (
                <span style={{ color: 'red', marginLeft: '10px' }}>
                  🔥 На акции
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
