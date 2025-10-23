'use client';

import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Heart, Trash2, ShoppingCart, X } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import Link from "next/link";

type FavoriteItem = {
  id: number;
  product: {
    id: number;
    name: string;
    imageUrl?: string;
    retailPriceRubWithVAT?: number;
    form?: string;
    quantityPerPallet?: number;
    quantityPerPalletKvM?: number;
  };
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export const FavoritesSidebar: React.FC<Props> = ({ open, onClose }) => {
  const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { addCartItem, isInCart, fetchCartItems } = useCartStore();

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

  useEffect(() => {
      fetchCartItems();
    }, [fetchCartItems]);

  const handleAddToCart = async (productId: number) => {
    const inCart = isInCart(productId);
    console.log('inCart: ', inCart);

    if (inCart) return;
    await addCartItem({ productItemId: productId });
  };

  const handleClose = () => {
    onClose();           // закрываем модальное окно
    window.location.reload(); // обновляем страницу
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content
          className="
            fixed left-1/2 top-1/2 z-50
            sm:w-[50%] h-[80%]
            w-[90%]
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
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <X size={20} />
            </button>
          </div>

          {/* Список товаров */}
          <div className="flex-1 overflow-auto p-[20px] flex flex-col gap-[20px]">
            {favoriteItems.length === 0 && <p>Нет товаров в избранном</p>}
            {favoriteItems.map((item) => {
              const inCart = isInCart(item.product.id); // объявляем переменную внутри функции
              return (
                <div key={item.product.id} className="flex gap-4 items-center p-2 bg-[var(--color-gray-lightest)] hover:shadow border">
                  <Link href={`/product/${item.product.id}`}>
                    <img
                      src={item.product.imageUrl ?? '/placeholder.png'}
                      alt={item.product.name}
                      className="sm:w-20 sm:h-20 w-20 h-20 object-cover"
                    />
                  </Link>
                  <div className='flex flex-col w-full sm:h-[70px] h-[100px] justify-between'>
                    <Link href={`/product/${item.product.id}`}>
                      <h4 className="font-semibold">{item.product.name}</h4>
                    </Link>
                    <div className="flex sm:flex-row flex-col sm:items-center justify-between w-full gap-2">
                      <span className="text-gray-600 sm:text-[16px] text-[12px]">
                        {item.product.form === null
                          ? `${item.product.quantityPerPallet} шт. х ${item.product.retailPriceRubWithVAT} ₽/шт.`
                          : `Поддон: ${item.product.quantityPerPalletKvM} кв.м.`}
                      </span>
                      <div className="flex flex-row items-end sm:items-center gap-4">
                        <Trash2
                          className="cursor-pointer text-gray-400 hover:text-[var(--color-blue)] self-center mt-1"
                          size={20}
                          onClick={() => removeFavorite(item.id)}
                        />
                        <button
                          className={`text-white sm:text-[16px] text-[12px] sm:font-bold sm:px-[20px] px-[10px] sm:py-[10px] py-[8px] border cursor-pointer 
                            ${
                              inCart
                                ? 'bg-[var(--color-gray)] text-[var(--color-dark)] cursor-not-allowed'
                                : 'bg-[var(--color-blue)] hover:text-[var(--color-dark)] hover:bg-[var(--color-blue-dark)] hover:border-[var(--color-gray)]'
                            }`}
                          onClick={() => handleAddToCart(item.id)}
                          disabled={inCart}
                        >
                          {inCart ? 'Уже в корзине' : 'В корзину'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
