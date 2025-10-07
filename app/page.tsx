"use client";

import React from "react";
import Link from "next/link";
import { Heart } from 'lucide-react';
import Carousel from "@/components/ui/carousel";
import RequestForm from "@/components/shared/request-form"
import { Button } from "@/components/ui";
import { useEffect, useState } from 'react';
import { useCartStore } from '@/store/cart';

type Product = {
  id: number;
  name: string;
  imageUrl?: string;
  quantityPerPallet?: number;
  
  retailPriceRubWithVAT?: number;
  isOnSale: boolean;
  saleDescription?: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('ALL');

  const [favorites, setFavorites] = useState<number[]>([]);
  const [loadingFav, setLoadingFav] = useState(false);

  const addToCart = async (productItemId: number) => {
    try {
      await useCartStore.getState().addCartItem({ productItemId });
      console.log('Товар добавлен в корзину');
    } catch (err) {
      console.error('Ошибка при добавлении товара в корзину', err);
    }
  };

  // Получаем продукты
  useEffect(() => {
    const fetchProducts = async () => {
      const query = category === 'ALL'
        ? `/api/products/search?page=${page}&limit=6`
        : `/api/products/search?page=${page}&limit=6&category=${category}`;

      const res = await fetch(query);
      const data = await res.json();

      setProducts(data.data);
      setTotalPages(data.totalPages);
    };

    fetchProducts();
  }, [page, category]);

  // Получаем избранное
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch('/api/favorites');
        if (res.ok) {
          const data = await res.json();
          setFavorites(data.map((f: { productId: number }) => f.productId));
        }
      } catch (err) {
        console.error('Error fetching favorites', err);
      }
    };

    fetchFavorites();
  }, []);

  const toggleFavorite = async (productId: number) => {
    if (loadingFav) return;

    setLoadingFav(true);
    try {
      if (favorites.includes(productId)) {
        // удалить из избранного
        const res = await fetch(`/api/favorites/${productId}`, { method: 'DELETE' });
        if (res.ok) setFavorites(favorites.filter((id) => id !== productId));
      } else {
        // добавить в избранное
        const res = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        });
        if (res.ok) setFavorites([...favorites, productId]);
      }
    } catch (err) {
      console.error('Error toggling favorite', err);
    } finally {
      setLoadingFav(false);
    }
  };

  return (
    <div className="gap-[80px] flex flex-col">
      <div className="full-width background-img w-full">
        <div className="home-img-block">
          <div className="flex flex-col gap-[15px]">
            <div className="pr-[10px] pl-[10px] pt-[5px] pb-[5px] bg-[var(--color-blue)] text-[var(--background)] w-fit">
              <h3 className="font-bold">Фортвин</h3>
            </div>
            <h1 className="leading-[90%] text-[var(--background)]">Ваш надежный поставщик<br/>строительных материалов</h1>
          </div>
          <h3 className="text-[var(--background)]">Работаем напрямую с производителями с 2003 года</h3>
          <Link href="/api/products">
            <button className="home-button">Перейти в каталог</button>
          </Link>
        </div>
      </div>

      <div>
        <h1 className="underline">О нас</h1>
        <div className="flex justify-between flex-col sm:flex-row w-full sm:gap-[120px] gap-[40px] items-center">
          <div className="request-left w-full">
              <p>Специализируемся на поставках высококачественных строительных материалов для частного и коммерческого строительства.</p>
              <p>Мы не просто поставляем строительные материалы — мы воплощаем мечты о идеальном доме в реальность.</p>
          </div>
          <div className="flex flex-col sm:w-[480px] w-full gap-[40px]">
            <div className="flex justify-between w-full">
              <div className="flex flex-col">
                <h1>20+</h1>
                <p>лет опыта работы</p>
              </div>
              <div className="flex flex-col">
                <h1>1200+</h1>
                <p>выполненных заказов</p>
              </div>
            </div>
            <Link href="/about_us">
              <Button className="cursor-pointer 
              hover:bg-[var(--background)] hover:text-[var(--color-dark)] hover:border-black
              border border-transparent" 
              variant="request" size="request">Подробнее о компании</Button>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between w-full items-end">
          <h1 className="underline">Акции и скидки</h1>
          <Link href="/api/products">
              <button className="small-button mb-[40px]">Перейти в раздел</button>
          </Link>
        </div>
        <div className="service-blocks">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[20px]">
            {products
              .filter(p => p.isOnSale)  // оставляем только товары со скидкой
              .slice(0, 4)               // берём первые 4
              .map((p) => {
                const isFav = favorites.includes(p.id);
                return (
                  <div key={p.id} className="flex flex-col cursor-pointer relative">
                    <Link href={`/product/${p.id}`}>
                      {p.isOnSale && p.saleDescription && (
                        <span className="absolute top-2 left-2 bg-[var(--color-sale)] text-white text-xs font-bold px-2 py-1">
                          {p.saleDescription}
                        </span>
                      )}
                      <img src={p.imageUrl ?? '/placeholder.png'} alt={p.name} className="w-full h-fit object-cover mb-4" />
                      <p>{p.name}</p>
                      <div className='flex flex-col gap-1 mb-[10px] mt-[10px] w-full'>
                        <p className='small-text'>{p.retailPriceRubWithVAT ? `${p.quantityPerPallet} шт x ${p.retailPriceRubWithVAT} ₽/шт` : ' '}</p>
                        <h2 className='font-semibold'>{(p.quantityPerPallet ?? 1) * (p.retailPriceRubWithVAT ?? 1)} ₽</h2>
                      </div>
                    </Link>
                    <div className="flex items-center justify-end w-full mt-auto gap-2">
                      <button
                        onClick={() => toggleFavorite(p.id)}
                        className="cursor-pointer p-1 rounded-full transition-colors"
                        data-testid={`favorite-btn-${p.id}`}
                      >
                        <Heart size={24} className={isFav ? 'text-[var(--color-blue)] fill-current' : 'text-gray-400'} />
                      </button>
                      <button 
                        className="cursor-pointer 
                                    bg-[var(--color-blue)] hover:bg-[var(--color-blue-dark)]
                                    text-white hover:text-[var(--color-dark)] 
                                    px-[20px] py-[8px]
                                    border border-transparent 
                                    hover:border-[var(--color-gray)]"
                        onClick={() => addToCart(p.id)}
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      </div>

      <Carousel className="full-width" />

      <div>
        <div className="flex justify-between w-full items-end">
          <h1 className="underline">Каталог</h1>
          <Link href="/api/products">
              <button className="small-button mb-[40px]">Перейти в раздел</button>
          </Link>
        </div>
        <div className="service-blocks">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[20px]">
            {products
              .slice(0, 4)               // берём первые 4
              .map((p) => {
                const isFav = favorites.includes(p.id);
                return (
                  <div key={p.id} className="flex flex-col cursor-pointer relative">
                    <Link href={`/product/${p.id}`}>
                      {p.isOnSale && p.saleDescription && (
                        <span className="absolute top-2 left-2 bg-[var(--color-sale)] text-white text-xs font-bold px-2 py-1">
                          {p.saleDescription}
                        </span>
                      )}
                      <img src={p.imageUrl ?? '/placeholder.png'} alt={p.name} className="w-full h-[280px] object-cover mb-4" />
                      <p>{p.name}</p>
                      <div className='flex flex-col gap-1 mb-[10px] mt-[10px] w-full'>
                        <p className='small-text'>{p.retailPriceRubWithVAT ? `${p.quantityPerPallet} шт x ${p.retailPriceRubWithVAT} ₽/шт` : ' '}</p>
                        <h2 className='font-semibold'>{(p.quantityPerPallet ?? 1) * (p.retailPriceRubWithVAT ?? 1)} ₽</h2>
                      </div>
                    </Link>
                    <div className="flex items-center justify-end w-full mt-auto gap-2">
                      <button
                        onClick={() => toggleFavorite(p.id)}
                        className="cursor-pointer p-1 rounded-full transition-colors"
                        data-testid={`favorite-btn-${p.id}`}
                      >
                        <Heart size={24} className={isFav ? 'text-[var(--color-blue)] fill-current' : 'text-gray-400'} />
                      </button>
                      <button 
                        className="cursor-pointer 
                                    bg-[var(--color-blue)] hover:bg-[var(--color-blue-dark)]
                                    text-white hover:text-[var(--color-dark)] 
                                    px-[20px] py-[8px]
                                    border border-transparent 
                                    hover:border-[var(--color-gray)]"
                        onClick={() => addToCart(p.id)}
                      >
                        В корзину
                      </button>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      </div>

      <div>
        <h1 className="underline">Услуги</h1>
        <div className="service-blocks">
          <div className="blue-card gap-[20px]">
            <img src="./home/profservis1.jpg" alt="Строительство" />
            <h2>Строительство домов под ключ</h2>
            <div className="flex justify-end">
              <Link href="/services#house" className="scroll-mt-[120px]">
                <button className="colored-button">Подробнее</button>
              </Link>
            </div>
          </div>

          <div className="blue-card gap-[20px]">
            <img src="./home/mosh2.jpg" alt="Благоустройство" />
            <h2>Благоустройство и мощение</h2>
            <div className="flex justify-end">
              <Link href="/services#landscape" className="scroll-mt-[120px]">
                <button className="colored-button">Подробнее</button>
              </Link>
            </div>
          </div>

          <div className="blue-card gap-[20px]">
            <img src="./home/intereir.jpeg" alt="Дизайн" />
            <h2>Дизайн интерьеров</h2>
            <div className="flex justify-end">
              <Link href="/services#design" className="scroll-mt-[120px]">
                <button className="colored-button">Подробнее</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <RequestForm />
    </div>
  )
}
