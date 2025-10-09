import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/lib/get-user-session';

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse<{ success?: boolean; message?: string }>> {
  try {
    const { id } = await context.params; // вытаскиваем id из промиса
    const numericId = Number(id);

    const currentUser = await getUserSession();
    if (!currentUser) {
      return NextResponse.json({ message: 'Не авторизован' }, { status: 401 });
    }

    const favorite = await prisma.favorite.findUnique({
      where: { id: numericId },
    });

    if (!favorite || favorite.userId !== Number(currentUser.id)) {
      return NextResponse.json({ message: 'Не найдено или нет доступа' }, { status: 404 });
    }

    await prisma.favorite.delete({ where: { id: numericId } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[FAVORITES_DELETE]', err);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}