import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const lastCode = await prisma.verificationCode.findFirst({
      orderBy: { createdAt: 'desc' },
      include: { user: true },
    });

    return NextResponse.json(lastCode);
  } catch (err) {
    console.log('Error fetching verification code', err);
    return NextResponse.json({ error: 'Failed to fetch code' }, { status: 500 });
  }
}
