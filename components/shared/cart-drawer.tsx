'use client';

import { cn } from '@/lib/utils';
import React from 'react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link';
import { Button } from '../ui';
import { redirect } from 'next/dist/server/api-utils';
import { ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { useCartStore } from '@/store';
import { removeCartItem, updateItemQuantity } from '@/services/cart';

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
    // const [totalAmount, fetchCartItems, items] = useCartStore(state => [state.totalAmount, state.fetchCartItems, state.items]);
    const totalAmount = useCartStore(state => state.totalAmount);
    const fetchCartItems = useCartStore(state => state.fetchCartItems);
    const items = useCartStore(state => state.items);

    const [redirecting, setRedirecting] = React.useState(false);

    // const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    //     console.log(id, quantity, type);
    //     const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    //     updateItemQuantity(id, newQuantity);
    // };

    // const onClickCountButton = async (id: number, quantity: number, type: 'plus' | 'minus') => {
    //     const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

    //     // обновляем на сервере
    //     await updateItemQuantity(id, newQuantity);

    //     // обновляем локальный Zustand store
    //     fetchCartItems(); // если fetchCartItems подтягивает свежие items и totalAmount
    //     console.log(id, quantity, type);
    // };

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;

    // 1. Оптимистически обновляем Zustand store
    useCartStore.setState(state => {
        const updatedItems = state.items.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );

        const newTotal = updatedItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        return { items: updatedItems, totalAmount: newTotal };
    });

        // 2. Асинхронно отправляем запрос на сервер
        updateItemQuantity(id, newQuantity).catch(() => {
            // если ошибка — откатываем обратно, перезапрашиваем с сервера
            fetchCartItems();
        });
    };


    const onClickRemove = (id: number) => {
    // 1. Оптимистически обновляем Zustand store
    useCartStore.setState(state => {
        const updatedItems = state.items.filter(item => item.id !== id);

        const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
        );

        return { items: updatedItems, totalAmount: newTotal };
    });

    // 2. Асинхронно обновляем сервер
    removeCartItem(id).catch(() => {
        // если ошибка — откат
        fetchCartItems();
    });
    };





    React.useEffect(() => {
        fetchCartItems();
    }, []);

  return (
    <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="flex flex-col justify-between pb-0 bg-[var(--background)]">
            <SheetHeader>
                <SheetTitle><h2 className="underline font-semibold">Корзина</h2></SheetTitle>
            </SheetHeader>

            <div className="overflow-auto flex-1">
                <div className="mb-2">
                    {
                        items.map((item) => (
                            <CartDrawerItem
                            key={item.id} // ← обязательно!
                            id={item.id}
                            imageUrl={item.imageUrl}
                            disabled={item.disabled}
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            quantityPerPallet={item.quantityPerPallet}
                            retailPriceRubWithVAT={item.retailPriceRubWithVAT}
                            onClickCountButton={(type) =>
                                onClickCountButton(item.id, item.quantity, type)
                            }
                            onClickRemove={() => onClickRemove(item.id)} // ← используем свою функцию!
                            />
                        ))
                    }
                </div>
            </div>
            <SheetFooter className="bg-white bg-[var(--background)] p-8">
                <div>
                    <div className="flex mb-4">
                        <span className="flex flex-1 text-lg text-neutral-500">
                            Итого
                            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                        </span>

                        <span className="font-bold text-lg">{totalAmount} ₽</span>
                    </div>

                    <Link href="/checkout">
                        <Button
                            onClick={() => setRedirecting(true)}
                            loading={redirecting}
                            
                            type="submit"
                            className="w-full h-12 text-base colored-button rounded-none cursor-pointer">
                            Оформить заказ
                            <ArrowRight className="w-5 ml-2" />
                        </Button>
                    </Link>
                </div>
            </SheetFooter>
        </SheetContent>
    </Sheet>
  );
};