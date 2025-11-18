import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Загружаем все продукты и их item'ы
    const products = await prisma.product.findMany({
      select: { id: true, name: true },
    })
    const productItems = await prisma.productItem.findMany({
      select: { id: true, productId: true },
    })

    // Находим расхождения
    const mismatched = productItems
      .filter(item => item.id !== item.productId)
      .map(item => {
        const product = products.find(p => p.id === item.productId)
        return {
          productItemId: item.id,
          productId: item.productId,
          productName: product?.name || '(не найдено)',
        }
      })

    return NextResponse.json({ mismatched })
  } catch (error) {
    console.error('Ошибка при проверке синхронизации:', error)
    return NextResponse.json(
      { error: 'Ошибка при проверке синхронизации' },
      { status: 500 }
    )
  }
}
