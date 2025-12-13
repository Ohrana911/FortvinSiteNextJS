import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { productId, field, value } = await request.json();

    if (!productId || !field || value === undefined) {
      return NextResponse.json(
        { error: "Не указаны productId, field или value" },
        { status: 400 }
      );
    }

    // Преобразуем productId в число
    const id = parseInt(productId);

    if (isNaN(id)) {
      return NextResponse.json(
        { error: "ID товара должно быть числом" },
        { status: 400 }
      );
    }

    // Список допустимых полей из модели Product
    const allowedFields = [
      "name",
      "imageUrl",
      "color",
      "frostResistance",
      "waterAbsorption",
      "size",
      "weightKg",
      "quantityPerPallet",
      "palletsPerTruck",
      "totalPerTruck",
      "retailPriceRubWithVAT",
      "city",
      "isOnSale",
      "saleDescription",
      "densityKgPerM3",
      "description",
      "manufacturer",
      "strengthClass",
      "quantityPerPalletKvM",
      "weightOnePalletKg",
      "heightMm",
      "form",
    ];

    if (!allowedFields.includes(field)) {
      return NextResponse.json(
        { error: "Недопустимое поле для обновления" },
        { status: 400 }
      );
    }

    // Проверяем существование товара
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Товар не найден" }, { status: 404 });
    }

    // Подготавливаем значение в зависимости от типа поля
    let processedValue: string | number | boolean = value;

    // Числовые поля
    const numericFields = [
      "weightKg",
      "quantityPerPallet",
      "palletsPerTruck",
      "totalPerTruck",
      "retailPriceRubWithVAT",
      "heightMm",
    ];
    if (numericFields.includes(field)) {
      const numericValue = parseFloat(value as string);
      if (isNaN(numericValue)) {
        return NextResponse.json(
          { error: `Поле "${field}" должно быть числом` },
          { status: 400 }
        );
      }
      processedValue = numericValue;
    }

    // Булево поле
    if (field === "isOnSale") {
      processedValue = value === "true" || value === "1";
    }

    // Обновляем поле
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        [field]: processedValue,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Товар успешно обновлен",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Ошибка при обновлении товара:", error);
    return NextResponse.json(
      { error: "Ошибка при обновлении товара" },
      { status: 500 }
    );
  }
}
