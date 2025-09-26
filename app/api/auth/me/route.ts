// import { authOptions } from '@/components/constants/auth-options';
// import { prisma } from '@/prisma/prisma-client';

// import { getServerSession } from 'next-auth/next';
// import { NextResponse } from 'next/server';

// export const dynamic = 'force-dynamic';

// export async function GET(req: any, res: any) {
//   try {
//     const user = await getServerSession(req, res, authOptions);

//     if (!user) {
//       return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });
//     }
//     console.log('user from session:', user);

//     const data = await prisma.user.findUnique({
//       where: {
//         id: Number(user.user.id),
//       },
//       select: {
//         fullName: true,
//         email: true,
//         password: false,
//       },
//     });

//     return NextResponse.json(data);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 });
//   }
// }


import { authOptions } from '@/components/constants/auth-options';
import { prisma } from '@/prisma/prisma-client';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    // В App Router просто передаём authOptions, req/res не нужны
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });
    }

    console.log('user from session:', session);

    const data = await prisma.user.findUnique({
      where: {
        id: Number(session.user.id), // session.user.id уже строка
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });

    if (!data) {
      return NextResponse.json({ message: 'Пользователь не найден' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[USER_GET]', error);
    return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 });
  }
}
