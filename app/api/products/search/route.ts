// import { prisma } from '@/prisma/prisma-client';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(req: NextRequest) {
//   const query = req.nextUrl.searchParams.get('query') || '';

//   const products = await prisma.product.findMany({
//     where: {
//       name: {
//         contains: query,
//         mode: 'insensitive',
//       },
//     },
//     take: 5,
//   });

//   return NextResponse.json(products);
// }

// Работающий вариант ниже с пагинацией

// import { prisma } from '@/prisma/prisma-client';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(req: NextRequest) {
//   const searchParams = req.nextUrl.searchParams;
//   const query = searchParams.get('query') || '';
//   const page = Number(searchParams.get('page') || 1);
//   const limit = Number(searchParams.get('limit') || 5);

//   const skip = (page - 1) * limit;

//   // Получаем продукты с пагинацией
//   const products = await prisma.product.findMany({
//     where: {
//       name: {
//         contains: query,
//         mode: 'insensitive',
//       },
//     },
//     skip,
//     take: limit,
//   });

//   // Общее количество продуктов (для фронта)
//   const total = await prisma.product.count({
//     where: {
//       name: {
//         contains: query,
//         mode: 'insensitive',
//       },
//     },
//   });

//   return NextResponse.json({
//     data: products,
//     page,
//     limit,
//     total,
//     totalPages: Math.ceil(total / limit),
//   });
// }


// рабочий код ниже

// import { prisma } from '@/prisma/prisma-client';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(req: NextRequest) {
//   const searchParams = req.nextUrl.searchParams;
//   const query = searchParams.get('query') || '';
//   const page = searchParams.get('page');
//   const limit = searchParams.get('limit');

//   // Если page/limit нет → просто вернуть первые 5 результатов
//   if (!page || !limit) {
//     const suggestions = await prisma.product.findMany({
//       where: {
//         name: {
//           contains: query,
//           mode: 'insensitive',
//         },
//       },
//       take: 5,
//     });
//     return NextResponse.json(suggestions);
//   }

//   // Если есть пагинация → считаем skip/take
//   const pageNum = Number(page);
//   const limitNum = Number(limit);
//   const skip = (pageNum - 1) * limitNum;

//   const products = await prisma.product.findMany({
//     where: {
//       name: {
//         contains: query,
//         mode: 'insensitive',
//       },
//     },
//     skip,
//     take: limitNum,
//   });

//   const total = await prisma.product.count({
//     where: {
//       name: {
//         contains: query,
//         mode: 'insensitive',
//       },
//     },
//   });

//   return NextResponse.json({
//     data: products,
//     page: pageNum,
//     limit: limitNum,
//     total,
//     totalPages: Math.ceil(total / limitNum),
//   });
// }


import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const query = searchParams.get('query') || '';       // строка поиска
  const category = searchParams.get('category') || ''; // выбранная категория
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  // Фильтр по категории (если указана)
  const where: any = {
    name: {
      contains: query,
      mode: 'insensitive',
    },
  };

  if (category) {
    where.category = { name: category };
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
