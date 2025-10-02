import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/lib/get-user-session';

// DELETE /api/favorites/:id -> удалить из избранного
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      return NextResponse.json({ message: 'Не авторизован' }, { status: 401 });
    }

    const favorite = await prisma.favorite.findUnique({
      where: { id: Number(params.id) },
    });

    if (!favorite || favorite.userId !== Number(currentUser.id)) {
      return NextResponse.json({ message: 'Не найдено или нет доступа' }, { status: 404 });
    }

    await prisma.favorite.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[FAVORITES_DELETE]', err);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}
