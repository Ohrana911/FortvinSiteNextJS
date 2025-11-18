import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'


export async function POST() {
  try {
    const items = await prisma.productItem.findMany({
      select: { id: true, productId: true },
    })

    const mismatched = items.filter(item => item.id !== item.productId)
    let updatedCount = 0
    const errors: string[] = []

    for (const item of mismatched) {
      // Проверяем, есть ли Product с таким id
      const product = await prisma.product.findUnique({
        where: { id: item.id },
      })

      if (product) {
        // Если Product с таким id существует — обновляем
        await prisma.productItem.update({
          where: { id: item.id },
          data: { productId: product.id },
        })
        updatedCount++
      } else {
        // Иначе — пропускаем (логируем)
        errors.push(`Нет Product с id=${item.id}, пропущено`)
      }
    }

    return NextResponse.json({
      updated: updatedCount,
      skipped: errors.length,
      errors,
    })
  } catch (error) {
    console.error('Ошибка при исправлении ProductItem:', error)
    return NextResponse.json(
      { error: 'Ошибка при исправлении ProductItem' },
      { status: 500 }
    )
  }
}
