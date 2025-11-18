import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

// GET endpoint для старых ссылок из email (оставляем как есть)
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const code = req.nextUrl.searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Неверный код' }, { status: 400 });
    }

    const verificationCode = await prisma.verificationCode.findFirst({
      where: { code },
    });

    if (!verificationCode) {
      return NextResponse.json({ error: 'Неверный код' }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: verificationCode.userId },
      data: { verified: new Date() },
    });

    await prisma.verificationCode.delete({
      where: { id: verificationCode.id },
    });

    return NextResponse.redirect(new URL('/?verified=true', req.url));
  } catch (error) {
    console.error('[VERIFY_GET] Server error', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

// POST endpoint для проверки кода с сайта
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Код обязателен' }, { status: 400 });
    }

    // Находим код верификации
    const verificationCode = await prisma.verificationCode.findFirst({
      where: { code },
    });

    if (!verificationCode) {
      return NextResponse.json({ error: 'Неверный код' }, { status: 400 });
    }

    // Обновляем пользователя
    await prisma.user.update({
      where: { id: verificationCode.userId },
      data: { verified: new Date() },
    });

    // Удаляем использованный код
    await prisma.verificationCode.delete({
      where: { id: verificationCode.id },
    });

    return NextResponse.json({ 
      success: true,
      message: 'Email успешно подтвержден' 
    });
  } catch (error) {
    console.error('[VERIFY_POST] Server error', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}