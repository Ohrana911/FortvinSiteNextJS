import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'


export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params
    const { isOnSale, saleDescription } = await request.json()

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        isOnSale,
        saleDescription: isOnSale ? saleDescription : null,
      },
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Ошибка при обновлении скидки:', error)
    return NextResponse.json({ error: 'Ошибка при обновлении скидки' }, { status: 500 })
  }
}
