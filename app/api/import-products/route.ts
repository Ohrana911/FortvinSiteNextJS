// import { NextResponse } from 'next/server'
// import { PrismaClient } from '@prisma/client'
// import { parse } from 'csv-parse/sync'

// export const config = {
//   api: { bodyParser: false },
// }

// const prisma = new PrismaClient()

// export async function POST(req: Request) {
//   try {
//     // Получаем form-data
//     const formData = await req.formData()
//     const file = formData.get('file') as File | null
//     if (!file) return NextResponse.json({ error: 'Файл не найден' }, { status: 400 })

//     // Читаем CSV и парсим в массив объектов
//     const text = await file.text()
//     const recordsRaw = parse(text, { columns: true, skip_empty_lines: true })

//     // Преобразуем строки CSV в формат Product
//     const productsData = recordsRaw.map((row: any) => ({
//       name: row.name,
//       imageUrl: row.imageUrl || null,
//       color: row.color,
//       frostResistance: row.frostResistance || null,
//       waterAbsorption: row.waterAbsorption || null,
//       size: row.size || null,
//       weightKg: row.weightKg ? parseFloat(row.weightKg) : null,
//       quantityPerPallet: row.quantityPerPallet ? parseInt(row.quantityPerPallet) : null,
//       palletsPerTruck: row.palletsPerTruck ? parseInt(row.palletsPerTruck) : null,
//       totalPerTruck: row.totalPerTruck ? parseInt(row.totalPerTruck) : null,
//       retailPriceRubWithVAT: row.retailPriceRubWithVAT ? parseFloat(row.retailPriceRubWithVAT) : null,
//       city: row.city || null,
//       categoryId: parseInt(row.categoryId),
//       isOnSale: row.isOnSale === 'true' || row.isOnSale === '1',
//       saleDescription: row.saleDescription || null,
//       densityKgPerM3: row.densityKgPerM3 || null,
//       description: row.description || null,
//       manufacturer: row.manufacturer || null,
//       strengthClass: row.strengthClass || null,
//       quantityPerPalletKvM: row.quantityPerPalletKvM || null,
//       weightOnePalletKg: row.weightOnePalletKg || null,
//       heightMm: row.heightMm || null,
//     }))

//     // 1️⃣ Добавляем продукты (без дублей)
//     await prisma.product.createMany({
//       data: productsData,
//       skipDuplicates: true,
//     })

//     // 2️⃣ Получаем все продукты, чтобы узнать их id
//     const allProducts = await prisma.product.findMany({
//       select: { id: true, retailPriceRubWithVAT: true },
//     })

//     // 3️⃣ Получаем уже существующие ProductItem
//     const existingItems = await prisma.productItem.findMany({
//       select: { productId: true },
//     })
//     const existingIds = new Set(existingItems.map((i) => i.productId))

//     // 4️⃣ Готовим ProductItem только для новых товаров
//     const newItems = allProducts
//       .filter((p) => !existingIds.has(p.id))
//       .map((p) => ({
//         productId: p.id,
//         price: Math.round(p.retailPriceRubWithVAT ?? 0),
//       }))

//     if (newItems.length > 0) {
//       await prisma.productItem.createMany({ data: newItems })
//     }

//     return NextResponse.json({
//       success: true,
//       imported: productsData.length,
//       itemsCreated: newItems.length,
//     })
//   } catch (err: any) {
//     console.error('Ошибка импорта:', err)
//     return NextResponse.json({ error: err.message || 'Ошибка сервера' }, { status: 500 })
//   }
// }

import { NextResponse } from 'next/server'
import { PrismaClient, Product } from '@prisma/client'
import { parse } from 'csv-parse/sync'

export const config = {
  api: { bodyParser: false },
}

const prisma = new PrismaClient()

// Определяем тип строки CSV
type CsvRow = {
  name: string
  imageUrl?: string
  color?: string
  frostResistance?: string
  waterAbsorption?: string
  size?: string
  weightKg?: string
  quantityPerPallet?: string
  palletsPerTruck?: string
  totalPerTruck?: string
  retailPriceRubWithVAT?: string
  city?: string
  categoryId: string
  isOnSale?: string
  saleDescription?: string
  densityKgPerM3?: string
  description?: string
  manufacturer?: string
  strengthClass?: string
  quantityPerPalletKvM?: string
  weightOnePalletKg?: string
  heightMm?: string
  form?: string
}

export async function POST(req: Request) {
  try {
    // Получаем form-data
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) {
      return NextResponse.json({ error: 'Файл не найден' }, { status: 400 })
    }

    // Читаем CSV и парсим в массив объектов
    const text = await file.text()
    const recordsRaw = parse(text, {
      columns: true,
      skip_empty_lines: true,
    }) as CsvRow[]

    // Преобразуем строки CSV в формат Product
    const productsData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'favorites' | 'category' | 'items'>[] =
      recordsRaw.map((row) => ({
        name: row.name,
        imageUrl: row.imageUrl || null,
        color: row.color || '',
        frostResistance: row.frostResistance || null,
        waterAbsorption: row.waterAbsorption || null,
        size: row.size || null,
        weightKg: row.weightKg ? parseFloat(row.weightKg) : null,
        quantityPerPallet: row.quantityPerPallet ? parseInt(row.quantityPerPallet) : null,
        palletsPerTruck: row.palletsPerTruck ? parseInt(row.palletsPerTruck) : null,
        totalPerTruck: row.totalPerTruck ? parseInt(row.totalPerTruck) : null,
        retailPriceRubWithVAT: row.retailPriceRubWithVAT ? parseFloat(row.retailPriceRubWithVAT) : null,
        city: row.city || null,
        categoryId: parseInt(row.categoryId),
        isOnSale: row.isOnSale === 'true' || row.isOnSale === '1',
        saleDescription: row.saleDescription || null,
        densityKgPerM3: row.densityKgPerM3 || null,
        description: row.description || null,
        manufacturer: row.manufacturer || null,
        strengthClass: row.strengthClass || null,
        quantityPerPalletKvM: row.quantityPerPalletKvM || null,
        weightOnePalletKg: row.weightOnePalletKg || null,
        heightMm: row.heightMm ? parseInt(row.heightMm) : null,
        form: row.form || null,
      }))

    // Добавляем продукты (без дублей)
    await prisma.product.createMany({
      data: productsData,
      skipDuplicates: true,
    })

    // Получаем все продукты, чтобы узнать их id
    const allProducts = await prisma.product.findMany({
      select: { id: true, retailPriceRubWithVAT: true },
    })

    // Получаем уже существующие ProductItem
    const existingItems = await prisma.productItem.findMany({
      select: { productId: true },
    })
    const existingIds = new Set(existingItems.map((i) => i.productId))

    // Готовим ProductItem только для новых товаров
    const newItems = allProducts
      .filter((p) => !existingIds.has(p.id))
      .map((p) => ({
        productId: p.id,
        price: Math.round(p.retailPriceRubWithVAT ?? 0),
      }))

    if (newItems.length > 0) {
      await prisma.productItem.createMany({ data: newItems })
    }

    return NextResponse.json({
      success: true,
      imported: productsData.length,
      itemsCreated: newItems.length,
    })
  } catch (err) {
    console.error('Ошибка импорта:', err)
    const message = err instanceof Error ? err.message : 'Неизвестная ошибка'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
