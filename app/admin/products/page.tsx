'use client'
import { useEffect, useState } from 'react'
import AdminSaleForm from './AdminSaleForm'

interface Product {
  id: number
  name: string
  isOnSale: boolean
  saleDescription?: string
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch('/api/admin/products')
        if (!res.ok) throw new Error('Ошибка загрузки товаров')
        const data: Product[] = await res.json()
        setProducts(data)
      } catch (err) {
        console.error(err)
      }
    }

    loadProducts()
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
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Список товаров</h1>
      {products.length === 0 ? (
        <p>Нет товаров</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {products.map((p) => (
            <li
              key={p.id}
              style={{
                cursor: 'pointer',
                marginBottom: '10px',
                border: '1px solid #ccc',
                padding: '10px 15px',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onClick={() => setSelectedProduct(p)}
            >
              <span>
                <strong>{p.name}</strong>
              </span>
              {p.isOnSale && (
                <span style={{ color: 'red', fontWeight: 'bold' }}>🔥 На акции</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
