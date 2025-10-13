import { prisma } from '@/prisma/prisma-client';
import { Prisma, CategoryName } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const query = searchParams.get('query') || '';       // строка поиска
  const category = searchParams.get('category') || ''; // выбранная категория
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  const city = req.cookies.get('city')?.value || 'Санкт-Петербург';

  // Типизированный where
  // const where: Prisma.ProductWhereInput = {
  //   name: {
  //     contains: query,
  //     mode: 'insensitive',
  //   },
  // };

  const where: Prisma.ProductWhereInput = {
    name: {
      contains: query,
      mode: 'insensitive',
    },
    city: city, // фильтруем по городу
  };

  // Фильтр по категории
  if (category && category !== 'ALL') {
    if (category === 'SALES') {
      where.isOnSale = true; // фильтр по акции
    } else if (Object.values(CategoryName).includes(category as CategoryName)) {
      // Приведение строки к enum CategoryName только если оно валидное
      where.category = { name: category as CategoryName };
    }
  }

  // Если page/limit нет → автоподсказки (5 штук)
  if (!page || !limit) {
    const suggestions = await prisma.product.findMany({
      where,
      take: 5,
    });
    return NextResponse.json(suggestions);
  }

  // Пагинация
  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const products = await prisma.product.findMany({
    where,
    skip,
    take: limitNum,
  });

  const total = await prisma.product.count({ where });

  return NextResponse.json({
    data: products,
    page: pageNum,
    limit: limitNum,
    total,
    totalPages: Math.ceil(total / limitNum),
  });
}