// app/api/cart/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { updateCartTotalAmount } from '@/lib/update-cart-total';

interface PatchBody {
  quantity: number;
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // вместо { id: string }
): Promise<NextResponse> {
  try {
    const { id } = await context.params; // вытаскиваем id из промиса
    const numericId = Number(id);

    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;

    if (!token) return NextResponse.json({ error: 'Cart token not found' }, { status: 400 });

    const cartItem = await prisma.cartItem.findUnique({ where: { id: numericId } });
    if (!cartItem) return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });

    await prisma.cartItem.update({ where: { id: numericId }, data: { quantity: data.quantity } });

    const updatedCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error('[CART_PATCH] Server error', error);
    return NextResponse.json({ message: 'Не удалось обновить корзину' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    const token = req.cookies.get('cartToken')?.value;

    if (!token) return NextResponse.json({ error: 'Cart token not found' }, { status: 400 });

    const cartItem = await prisma.cartItem.findUnique({ where: { id: numericId } });
    if (!cartItem) return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });

    await prisma.cartItem.delete({ where: { id: numericId } });

    const updatedCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error('[CART_DELETE] Server error', error);
    return NextResponse.json({ message: 'Не удалось удалить корзину' }, { status: 500 });
  }
}
