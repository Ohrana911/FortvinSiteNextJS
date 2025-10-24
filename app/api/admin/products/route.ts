import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'


export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: 'asc' }
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Ошибка при получении товаров:', error)
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
  }
}
