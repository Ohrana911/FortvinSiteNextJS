import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { city } = await req.json();

  if (!city) {
    return NextResponse.json({ error: 'City not provided' }, { status: 400 });
  }

  // Сохраняем город в cookie (живёт 7 дней)
  const res = NextResponse.json({ success: true });
  res.cookies.set('city', city, {
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  });
  return res;
}
