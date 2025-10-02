import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/lib/get-user-session';

// GET /api/favorites -> список избранного
export async function GET() {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      return NextResponse.json({ message: 'Не авторизован' }, { status: 401 });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: Number(currentUser.id) },
      include: { product: true }, // подтянем товары
    });

    return NextResponse.json(favorites);
  } catch (err) {
    console.error('[FAVORITES_GET]', err);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}

// POST /api/favorites -> добавить в избранное
export async function POST(req: Request) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      return NextResponse.json({ message: 'Не авторизован' }, { status: 401 });
    }

    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json({ message: 'productId обязателен' }, { status: 400 });
    }

    const existing = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId: Number(currentUser.id),
          productId: Number(productId),
        },
      },
    });

    if (existing) {
      return NextResponse.json({ message: 'Уже в избранном' }, { status: 400 });
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: Number(currentUser.id),
        productId: Number(productId),
      },
    });

    return NextResponse.json(favorite, { status: 201 });
  } catch (err) {
    console.error('[FAVORITES_POST]', err);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}
