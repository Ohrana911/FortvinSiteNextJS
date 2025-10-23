'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  imageUrl?: string;
  quantityPerPallet?: number;
  retailPriceRubWithVAT?: number;
  isOnSale: boolean;
  saleDescription?: string;
  heightMm?: number;
  tileShape?: string;
};

const thicknessOptions = [
  { value: '40', label: '40 мм' },
  { value: '60', label: '60 мм' },
  { value: '80', label: '80 мм' },
  { value: '100', label: '100 мм' },
];

const shapeOptions = [
  { value: 'квадрат', label: 'Квадрат' },
  { value: 'прямоугольник', label: 'Прямоугольник' },
];

const categories = [
  { key: 'ALL', label: 'Все товары' },
  { key: 'SALES', label: 'Акции и скидки' },
  { key: 'GAZOBETONNYE_BLOKI', label: 'Газобетонные блоки' },
  { key: 'OBLITSOVOCHNYY_KIRPICH', label: 'Облицовочный кирпич' },
  { key: 'TROTUARNAYA_PLITKA', label: 'Тротуарная плитка' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('ALL');
  const [height, setHeight] = useState<string[]>([]);
  const [shape, setShape] = useState<string[]>([]);

  const [favorites, setFavorites] = useState<number[]>([]);
  const [loadingFav, setLoadingFav] = useState(false);

  const { addCartItem, isInCart, fetchCartItems } = useCartStore();

  useEffect(() => { fetchCartItems(); }, [fetchCartItems]);

  const handleAddToCart = async (productId: number) => {
    if (isInCart(productId)) return;
    await addCartItem({ productItemId: productId });
  };

  // Fetch products с учетом фильтров
  useEffect(() => {
    const fetchProducts = async () => {
      const params = new URLSearchParams();
      params.append('page', String(page));
      params.append('limit', '12');
      if (category !== 'ALL') params.append('category', category);
      height.forEach((h) => params.append('height', h));
      shape.forEach((s) => params.append('shape', s));

      const res = await fetch(`/api/products/search?${params.toString()}`, { cache: 'no-store' });
      const data = await res.json();

      setProducts(data.data);
      setTotalPages(data.totalPages);
    };

    fetchProducts();
    const handleCityChange = () => { setPage(1); fetchProducts(); };
    window.addEventListener('cityChanged', handleCityChange);
    return () => window.removeEventListener('cityChanged', handleCityChange);
  }, [page, category, height, shape]);

  // Избранное
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch('/api/favorites');
        if (res.ok) {
          const data = await res.json();
          setFavorites(data.map((f: { productId: number }) => f.productId));
        }
      } catch (err) { console.error(err); }
    };
    fetchFavorites();
  }, []);

  const toggleFavorite = async (productId: number) => {
    if (loadingFav) return;
    setLoadingFav(true);
    try {
      if (favorites.includes(productId)) {
        const res = await fetch(`/api/favorites/${productId}`, { method: 'DELETE' });
        if (res.ok) setFavorites(favorites.filter((id) => id !== productId));
        else if (res.status === 401) toast.error('Авторизуйтесь чтобы удалить');
      } else {
        const res = await fetch('/api/favorites', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId }) });
        if (res.ok) setFavorites([...favorites, productId]);
        else if (res.status === 401) toast.error('Авторизуйтесь чтобы добавить');
      }
    } catch (err) { console.error(err); }
    finally { setLoadingFav(false); }
  };

  useEffect(() => {
    const anchor = document.getElementById('products-top');
    if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [products]);

  return (
    <div className="container">
      <nav id="products-top" className="breadcrumb">
        <ol>
          <li><Link href="/" className="breadcrumb-link">Главная</Link></li>
          <li className="breadcrumb-separator">→</li>
          <li className="breadcrumb-current">Каталог</li>
        </ol>
      </nav>

      <div>
        <h1 className="underline">Каталог</h1>

        <div className="flex gap-3 mb-6 flex-wrap">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => { setCategory(c.key); setPage(1); }}
              className={`special px-4 py-2 border-1 border-[var(--color-gray)] transition cursor-pointer ${category === c.key ? 'bg-[var(--color-blue)] text-white' : 'bg-[var(--color-light-gray)] hover:bg-[var(--color-light-blue)]'}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* ✅ Чекбоксы для фильтров */}
        <div className='flex sm:flex-row flex-col sm:gap-4 gap-2'>
          <div className="mb-6 flex flex-row items-center gap-2">
            <p className="font-medium">Толщина:</p>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-auto justify-between cursor-pointer">
                  {height.length > 0
                    ? height.map((h) => thicknessOptions.find((o) => o.value === h)?.label).join(", ")
                    : "..."}
                  <ChevronDown className="h-4 w-4 opacity-50 cursor-pointer" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-auto cursor-pointer">
                {thicknessOptions.map((opt) => (
                  <DropdownMenuCheckboxItem
                    key={opt.value}
                    checked={height.includes(opt.value)}
                    onCheckedChange={(checked) => {
                      if (checked) setHeight([...height, opt.value]);
                      else setHeight(height.filter((h) => h !== opt.value));
                      setPage(1);
                    }}
                  >
                    {opt.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mb-6 flex flex-row items-center gap-2">
            <p className="font-medium">Форма плитки:</p>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-auto justify-between cursor-pointer">
                  {shape.length > 0
                    ? shape.map((s) => shapeOptions.find((o) => o.value === s)?.label).join(", ")
                    : "..."}
                  <ChevronDown className="h-4 w-4 opacity-50 cursor-pointer" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-auto cursor-pointer">
                {shapeOptions.map((opt) => (
                  <DropdownMenuCheckboxItem
                    key={opt.value}
                    checked={shape.includes(opt.value)}
                    onCheckedChange={(checked) => {
                      if (checked) setShape([...shape, opt.value]);
                      else setShape(shape.filter((s) => s !== opt.value));
                      setPage(1);
                    }}
                  >
                    {opt.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg py-10">
            В выбранной категории нет товаров 😔
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-[20px]">
              {products.map((p) => {
                const isFav = favorites.includes(p.id);
                const inCart = isInCart(p.id);
                return (
                  <div key={p.id} className="flex flex-col cursor-pointer relative">
                    <Link href={`/product/${p.id}`}>
                      {p.isOnSale && p.saleDescription && (
                        <span className="absolute top-2 left-2 bg-[var(--color-sale)] text-white text-xs font-bold px-2 py-1">{p.saleDescription}</span>
                      )}
                      <img src={p.imageUrl ?? '/placeholder.png'} alt={p.name} className="w-full h-[280px] object-cover mb-4" />
                      <p>{p.name}</p>
                      <div className="flex flex-col gap-1 mb-[10px] mt-[10px] w-full">
                        {p.quantityPerPallet == null ? (
                          ''
                        ) : (
                          <p className="small-text">
                            {p.retailPriceRubWithVAT
                              ? `${p.quantityPerPallet} шт x ${p.retailPriceRubWithVAT} ₽/шт`
                              : ' '}
                          </p>
                        )}
                        {/* <h2 className="font-semibold">
                          {(p.quantityPerPallet ?? 1) * (p.retailPriceRubWithVAT ?? 1)} ₽
                          {p.quantityPerPallet == null ? '/куб.м' : ''}
                        </h2> */}
                        <h2 className="font-semibold">
                          {p.retailPriceRubWithVAT
                            ? (((p.quantityPerPallet ?? 1) * p.retailPriceRubWithVAT)
                                .toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 1 })) + ' ₽'
                            : '—'}
                          {p.quantityPerPallet == null ? '/куб.м' : '/поддон'}
                        </h2>

                      </div>
                    </Link>
                    <div className="flex items-center justify-end w-full mt-auto gap-2">
                      <button onClick={() => toggleFavorite(p.id)} className="cursor-pointer p-1 rounded-full transition-colors">
                        <Heart size={24} className={isFav ? 'text-[var(--color-blue)] fill-current' : 'text-gray-400'} />
                      </button>
                      <button className={`text-white text-[16px] font-bold px-[20px] py-[10px] border cursor-pointer ${inCart ? 'bg-[var(--color-gray)] text-[var(--color-dark)] cursor-not-allowed' : 'bg-[var(--color-blue)] hover:text-[var(--color-dark)] hover:bg-[var(--color-blue-dark)] hover:border-[var(--color-gray)]'}`} onClick={() => handleAddToCart(p.id)} disabled={inCart}>
                        {inCart ? 'Уже в корзине' : 'В корзину'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center items-center gap-4 mt-8">
              <button disabled={page === 1} onClick={() => setPage(page - 1)} className="cursor-pointer px-3 py-1 border disabled:opacity-50">Предыдущая</button>
              <span>{page} из {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="cursor-pointer px-3 py-1 border disabled:opacity-50">Следующая</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
