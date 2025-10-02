'use server';

import { CheckoutFormValues } from '@/components/constants/checkout-form-schema';
import { VerificationUserTemplate } from '@/components/shared/email-templates/verification-user';
import { getUserSession } from '@/lib/get-user-session';
import { sendEmail } from '@/lib/send-email';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus, Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { cookies } from 'next/headers';

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = (await cookieStore).get('cartToken')?.value;
    const currentUser = await getUserSession();

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    // Находим корзину по токену
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart) {
      throw new Error('Cart not found');
    }

    if (userCart?.totalAmount === 0) {
      throw new Error('Cart is empty');
    }

    const totalAmount = userCart.items.reduce((sum, item) => {
      const product = item.productItem?.product;

      if (!product) return sum;

      const pricePerBrick = Number(product.retailPriceRubWithVAT ?? 0);
      const qtyPerPallet = Number(product.quantityPerPallet ?? 1);
      const palletPrice = pricePerBrick * qtyPerPallet;

      return sum + palletPrice * Number(item.quantity);
    }, 0);


    // Создаем заказ (без оплаты)
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount,
        status: OrderStatus.PENDING,
        // items: JSON.stringify(userCart.items),
        items: userCart.items, // см. ниже про JSON
        user: currentUser ? { connect: { id: Number(currentUser.id) } } : undefined,
      },
    });

    // Очищаем корзину
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // Отправляем письмо-подтверждение без оплаты
    await sendEmail(
      data.email,
      'Заказ #' + order.id,
      `Спасибо за заказ!
       Ваш заказ #${order.id} успешно оформлен.
       Сумма: ${order.totalAmount} ₽`
    );

    return order;
  } catch (err) {
    console.log('[CreateOrder] Server error', err);
    throw err;
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
        phone: (body as any).phone ?? findUser?.phone,
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена');
      }

      throw new Error('Пользователь уже существует');
    }

    // const createdUser = await prisma.user.create({
    //   data: {
    //     fullName: body.fullName,
    //     email: body.email,
    //     password: hashSync(body.password, 10),
    //     phone: body.phone,
    //   },
    // });

    // const code = Math.floor(100000 + Math.random() * 900000).toString();


    // await prisma.verificationCode.create({
    //   data: {
    //     code,
    //     userId: createdUser.id,
    //   },
    // });

  //   const code = Math.floor(100000 + Math.random() * 900000).toString();


  //   const createdUser = await prisma.user.create({
  //     data: {
  //       fullName: body.fullName,
  //       email: body.email,
  //       password: hashSync(body.password, 10),
  //       phone: body.phone,
  //     },
  //   });

  //   try {
  //     const verification = await prisma.verificationCode.create({
  //       data: {
  //         userId: createdUser.id,
  //         code,
  //       },
  //     });
  //     console.log('Verification code created in DB:', verification);
  //   } catch (err) {
  //     console.error('Error creating verification code:', err);
  //   }

  //   await sendEmail(
  //     createdUser.email,
  //     '📝 Подтверждение регистрации',
  //     VerificationUserTemplate({
  //       code,
  //     }),
  //   );

  //   console.log('Verification code created:', code);
  // } catch (err) {
  //   console.log('Error [CREATE_USER]', err);
  //   throw err;
  // }

  // Создаём пользователя
    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
        phone: body.phone,
        // создаём первый код верификации сразу через relation
        verificationCode: {
          create: {
            code: Math.floor(100000 + Math.random() * 900000).toString(),
          },
        },
      },
      include: { verificationCode: true },
    });

    const latestCode = createdUser.verificationCode.at(-1)?.code;

    // Отправляем код на почту
    if (latestCode) {
      await sendEmail(
        createdUser.email,
        '📝 Подтверждение регистрации',
        VerificationUserTemplate({ code: latestCode })
      );
    }

    console.log('User and verification code created:', createdUser);

    return createdUser;
  } catch (err) {
    console.error('Error [CREATE_USER]', err);
    throw err;
  }

  
}
