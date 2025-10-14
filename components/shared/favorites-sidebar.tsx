'use client';

import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Heart, Trash2, ShoppingCart, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useCartStore } from '@/store/cart';
import Link from "next/link";

type FavoriteItem = {
  id: number;
  product: {
    id: number;
    name: string;
    imageUrl?: string;
    retailPriceRubWithVAT?: number;
  };
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export const FavoritesSidebar: React.FC<Props> = ({ open, onClose }) => {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/favorites');
      const data = await res.json();
      setFavoriteItems(data);
    } catch (err) {
      console.error('Failed to fetch favorites', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchFavorites();
  }, [open]);

  const removeFavorite = async (id: number) => {
    try {
      await fetch(`/api/favorites/${id}`, { method: 'DELETE' });
      setFavoriteItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Failed to remove favorite', err);
    }
  };

  const addToCart = async (productItemId: number) => {
    try {
      await useCartStore.getState().addCartItem({ productItemId });
      console.log('Товар добавлен в корзину');
    } catch (err) {
      console.error('Ошибка при добавлении товара в корзину', err);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content
          className="
            fixed left-1/2 top-1/2 z-50
            sm:w-[50%] h-[80%]
            w-[80%]
            -translate-x-1/2 -translate-y-1/2
            bg-white shadow-lg
            flex flex-col
          "
        >
          {/* Заголовок */}
          <div className="flex justify-between items-center p-[20px] border-b">
            <Dialog.Title className="underline font-semibold">
              Избранное
            </Dialog.Title>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <X size={20} />
            </button>
          </div>

          {/* Список товаров */}
          <div className="flex-1 overflow-auto p-[20px] flex flex-col gap-[20px]">
            {favoriteItems.length === 0 && <p>Нет товаров в избранном</p>}
            {favoriteItems.map((item) => (
              // <Link  href={`/product/${item.id}`}>
                <div key={item.id} className="flex gap-4 items-center p-2 bg-[var(--color-gray-lightest)] hover:shadow border">
                  <img
                    src={item.product.imageUrl ?? '/placeholder.png'}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover"
                  />
                  <div className='flex flex-col w-full h-[70px] justify-between'>
                    <h4 className="font-semibold">{item.product.name}</h4>
                    <div className="flex flex-row items-center justify-between w-full">
                      <p className="text-gray-600">
                        {item.product.retailPriceRubWithVAT
                          ? `${item.product.retailPriceRubWithVAT} ₽`
                          : 'Цена по запросу'}
                      </p>
                    
                      <div className="flex flex-row gap-4">
                        <Trash2
                          className="cursor-pointer text-gray-400 hover:text-[var(--color-blue)] self-center mt-1"
                          size={20}
                          onClick={() => removeFavorite(item.id)}
                        />
                        <Button
                          onClick={() => addToCart(item.product.id)}
                          className="cursor-pointer 
                                    bg-[var(--color-blue)] hover:bg-[var(--color-blue-dark)]
                                    text-white hover:text-[var(--color-dark)] 
                                    px-[20px] py-1 
                                    rounded-none
                                    border border-transparent 
                                    hover:border-[var(--color-gray)]"
                        >
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              /* </Link> */
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
