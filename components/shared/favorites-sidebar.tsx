'use client';

import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { useCartStore } from '@/store/cart';

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
      setFavoriteItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Failed to remove favorite', err);
    }
  };

  // const addToCart = async (productItemId: number) => {
  //   try {
  //     const res = await fetch('/api/cart', {
  //       method: 'POST',
  //       body: JSON.stringify({ productItemId }),
  //       headers: { 'Content-Type': 'application/json' },
  //     });

  //     if (!res.ok) throw new Error('Ошибка при добавлении в корзину');

  //     const updatedCart = await res.json();

  //     // Обновляем Zustand
  //     useCartStore.getState().setCart(updatedCart.items, updatedCart.totalAmount);

  //   } catch (err) {
  //     console.error('Failed to add to cart', err);
  //   }
  // };

  const addToCart = async (productItemId: number) => {
    try {
      // вызываем zustand action, он сам сделает запрос и обновит store
      await useCartStore.getState().addCartItem({ productItemId });

      // можно тост/уведомление
      console.log('Товар добавлен в корзину');
    } catch (err) {
      console.error('Ошибка при добавлении товара в корзину', err);
    }
  };


  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="flex flex-col w-[400px] bg-white text-[var(--color-blue-dark)]">
        <SheetHeader className="bg-[var(--color-blue)] text-white p-4">
          <SheetTitle>Избранное</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-auto p-4 flex flex-col gap-4">
          {loading && <p>Загрузка...</p>}
          {!loading && favoriteItems.length === 0 && <p>Нет товаров в избранном</p>}
          {favoriteItems.map(item => (
            <div
              key={item.id}
              className="flex gap-4 items-center p-2 bg-[var(--color-gray-lightest)] rounded hover:shadow"
            >
              <img
                src={item.product.imageUrl ?? '/placeholder.png'}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">
                  {item.product.retailPriceRubWithVAT
                    ? `${item.product.retailPriceRubWithVAT} ₽`
                    : 'Цена по запросу'}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <Button
                  onClick={() => addToCart(item.product.id)}
                  className="bg-[var(--color-blue)] text-white hover:bg-[var(--color-blue-dark)] flex items-center gap-1 px-2 py-1"
                >
                  <ShoppingCart size={16} /> В корзину
                </Button>
                <Trash2
                  className="cursor-pointer text-gray-400 hover:text-red-500 self-center mt-1"
                  size={20}
                  onClick={() => removeFavorite(item.id)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="p-4">
          <Button className="w-full bg-[var(--color-blue)] text-white hover:bg-[var(--color-blue-dark)]" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </SheetContent>

    </Sheet>
  );
};
