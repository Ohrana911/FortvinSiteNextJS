'use client';

import { useState, useEffect } from 'react';
import { useFavoritesStore } from '@/components/shared/store/favorites';
import { ProductImage } from '@/components/shared/product-image';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { Product } from '@prisma/client';

export function ProductClient({ product }: { product: Product }) {
  const { favorites, fetchFavorites, toggleFavorite } = useFavoritesStore();
  const isFav = favorites.includes(product.id);
  const { addCartItem, isInCart } = useCartStore();
  const inCart = isInCart(product.id);

  const handleAddToCart = async () => {
    console.log('inCart: ', inCart);
    if (inCart) return;
    await addCartItem({ productItemId: product.id });
  };

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <div className="container">
      <nav className="breadcrumb mb-6 hidden sm:block">
        <ol>
          <li><Link href="/">Главная</Link></li>
          <li className="breadcrumb-separator">→</li>
          <li><Link href="/api/products">Каталог</Link></li>
          <li className="breadcrumb-separator">→</li>
          <li className="breadcrumb-current">{product.name}</li>
        </ol>
      </nav>

      <div className="product_card">
        <ProductImage imageUrl={product.imageUrl ?? '/placeholder.png'} size={20} />
        <div className="flex-1">
            <div className='flex flex-col gap-1 mb-[60px]'>
                <h2 className="font-bold big text-[var(--color-dark)] mb-2">{product.name}</h2>

                <div className="text-gray-600 mb-4">
                    <p><strong>Производитель:</strong> {product.name}</p>
                </div>
            </div>

            <div className="mb-6 flex flex-col gap-1">
                <div className="font-bold flex flex-row gap-[20px] items-center">
                    <h2 className='big'>
                        {product.retailPriceRubWithVAT
                    ? ((product.quantityPerPallet ?? 1) * product.retailPriceRubWithVAT).toLocaleString('ru-RU')
                    : '—'} ₽
                    </h2>
                    {product.isOnSale && (
                    <div className="w-fit h-fit px-2 py-1 sm:text-sm text-xs font-semibold text-white bg-[var(--color-sale)]">
                        + {product.saleDescription}
                    </div>
                    )}
                    <p className='small-text'></p>
                </div>

                <div className="text-[var(--color-blue)]">
                <p>{product.quantityPerPallet 
                ? product.quantityPerPallet + " шт × " + product.retailPriceRubWithVAT + "₽/шт" 
                : ('Цена за 1 куб.м')}</p>
                </div>
            </div>

          <div className="flex items-center gap-4 mb-6">
            <button
              className={`text-white text-[20px] font-bold px-[60px] py-[15px] border cursor-pointer 
                ${inCart
                  ? 'bg-[var(--color-gray)] text-[var(--color-dark)] cursor-not-allowed'
                  : 'bg-[var(--color-blue)] hover:text-[var(--color-dark)] hover:bg-[var(--color-blue-dark)] hover:border-[var(--color-gray)]'
                }`}
              onClick={handleAddToCart}
              disabled={inCart}
            >
              {inCart ? 'Уже в корзине' : 'В корзину'}
            </button>

            <button
              onClick={() => toggleFavorite(product.id)}
              className="cursor-pointer p-1 rounded-full transition-colors"
            >
              <Heart
                size={32}
                className={isFav ? 'text-[var(--color-blue)] fill-current' : 'text-gray-400'}
              />
            </button>
          </div>

          <div className="py-6 flex flex-col gap-[20px]">
            <h2 className='font-bold underline'>Описание</h2>
{/* {             <p>{product.description ?? '—'}</p> } */}
             <p>{product.description ?? '—'}</p> 
          </div>

          <div className="py-6 flex flex-col gap-[20px]">
            <h2 className='font-bold underline'>Характеристики</h2>
            <ul className="space-y-2 text-gray-700">
              <li className='flex flex-row gap-2' ><div className='text-[var(--color-blue)]'>Цвет:</div> {product.color}</li>
              <li className='flex flex-row gap-2' ><div className='text-[var(--color-blue)]'>Морозостойкость:</div> {product.frostResistance ?? '—'}</li>
              <li className='flex flex-row gap-2' ><div className='text-[var(--color-blue)]'>Водопоглащение:</div> {product.waterAbsorption ?? '—'}</li>             
              <li className='flex flex-row gap-2' ><div className='text-[var(--color-blue)]'>Размер:</div> {product.size ?? '—'}</li>
              <li className='flex flex-row gap-2' ><div className='text-[var(--color-blue)]'>Вес:</div> {product.weightKg ?? '—'}</li>
              <li className='flex flex-row gap-2' ><div className='text-[var(--color-blue)]'>Цена (₽ с НДС):</div> {product.retailPriceRubWithVAT ?? '—'}</li>
              <li className='flex flex-row gap-2' ><div className='text-[var(--color-blue)]'>Город:</div> {product.city ?? '—'}</li>
              <li className='flex flex-row gap-2' ><div className='text-[var(--color-blue)]'>Количество в поддоне (шт):</div> {product.quantityPerPallet ?? '—'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
