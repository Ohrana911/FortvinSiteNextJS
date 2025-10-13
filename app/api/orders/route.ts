import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || token.role !== "ADMIN") {
    return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
  }

  const orders = await prisma.order.findMany({
    where: { user: { role: { not: "ADMIN" } } }, // не показываем заказы админа
    include: {
      user: {
        select: { id: true, fullName: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}
