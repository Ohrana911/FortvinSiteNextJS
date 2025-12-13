import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Экспорт всех данных
    const data = {
      products: await prisma.product.findMany({
        include: {
          category: true,
          items: true,
          favorites: true,
        },
      }),
      categories: await prisma.category.findMany(),
      productItems: await prisma.productItem.findMany(),
      favorites: await prisma.favorite.findMany(),
      // добавьте другие таблицы по необходимости
    };

    // Создаем Response с JSON данными
    const response = new Response(JSON.stringify(data, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": 'attachment; filename="backup-data.json"',
      },
    });

    return response;
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json(
      { error: "Failed to export data" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
