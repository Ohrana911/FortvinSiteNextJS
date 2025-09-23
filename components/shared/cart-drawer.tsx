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

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };


    React.useEffect(() => {
        fetchCartItems();
    }, []);

  return (
    <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
            <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
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
                            price={item.productItem.product.retailPriceRubWithVAT}
                            quantity={item.quantity}
                            onClickCountButton={(type) =>
                                onClickCountButton(item.id, item.quantity, type)
                            }
                            onClickRemove={() => removeCartItem(item.id)}
                            />
                        ))
                    }
                </div>
            </div>




            <SheetFooter className="bg-white p-8">
                <div>
                    <div className="flex mb-4">
                        <span className="flex flex-1 text-lg text-neutral-500">
                            Итого
                            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                        </span>

                        <span className="font-bold text-lg">{totalAmount} Рублей</span>
                    </div>

                    <Link href="/cart">
                        <Button type="submit" className="w-full h-12 text-base">
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