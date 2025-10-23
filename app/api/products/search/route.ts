import { prisma } from '@/prisma/prisma-client';
import { Prisma, CategoryName } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const query = searchParams.get('query') || '';       
  const category = searchParams.get('category') || ''; 
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  const city = req.cookies.get('city')?.value || 'Санкт-Петербург';

  // Массивы для фильтров
  const heightParam = searchParams.getAll('height'); // ["40","60"]
  const shapeParam = searchParams.getAll('shape');   // ["квадрат","прямоугольник"]

  const where: Prisma.ProductWhereInput = {
    name: { contains: query, mode: 'insensitive' },
    city,
    heightMm: heightParam.length ? { in: heightParam.map(Number) } : undefined,
    form: shapeParam.length ? { in: shapeParam } : undefined,
  };

  if (category && category !== 'ALL') {
    if (category === 'SALES') {
      where.isOnSale = true;
    } else if (Object.values(CategoryName).includes(category as CategoryName)) {
      where.category = { name: category as CategoryName };
    }
  }

  if (!page || !limit) {
    const suggestions = await prisma.product.findMany({ where, take: 5 });
    return NextResponse.json(suggestions);
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const products = await prisma.product.findMany({ where, skip, take: limitNum });
  const total = await prisma.product.count({ where });

  return NextResponse.json({
    data: products,
    page: pageNum,
    limit: limitNum,
    total,
    totalPages: Math.ceil(total / limitNum),
  });
}
