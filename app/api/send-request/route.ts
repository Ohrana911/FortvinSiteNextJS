// app/api/send-request/route.ts
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/send-email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, city, service } = body;

    if (!name || !phone || !city || !service) {
      return NextResponse.json({ error: 'Заполните все поля' }, { status: 400 });
    }

    // отправляем письмо админу
    await sendEmail(
      process.env.ADMIN_EMAIL as string,
      'Новая заявка с сайта',
      `
      📩 Получена новая заявка:

      👤 ФИО: ${name}
      📞 Телефон: ${phone}
      🏙️ Город: ${city}
      🛠️ Услуга: ${service}
      `
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Error [SEND_REQUEST]', err);
    return NextResponse.json({ error: 'Ошибка отправки' }, { status: 500 });
  }
}
