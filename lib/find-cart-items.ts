import { prisma } from '@/prisma/prisma-client';

export const findCartItems = async (cartToken: string) => {
  if (!cartToken) {
    return { totalAmount: 0, items: [] };
  }

  const userCart = await prisma.cart.findFirst({
    where: { token: cartToken },
    include: {
      items: {
        orderBy: { createdAt: 'desc' },
        include: {
          productItem: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (!userCart) {
    return { totalAmount: 0, items: [] };
  }

  // фильтруем CartItem без Product
  const validItems = userCart.items.filter(
    (i) => i.productItem?.product != null
  );

  // считаем totalAmount заново на случай битых данных
  const totalAmount = validItems.reduce(
    (sum, i) => sum + (i.productItem?.product?.retailPriceRubWithVAT ?? 0) * i.quantity,
    0
  );

  return {
    ...userCart,
    items: validItems,
    totalAmount,
  };
};
