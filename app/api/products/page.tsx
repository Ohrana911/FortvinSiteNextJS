'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';

type Product = {
  id: number;
  name: string;
  imageUrl?: string;
  retailPriceRubWithVAT?: number;
  isOnSale: boolean;
  saleDescription?: string;
};

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
        if (res.ok) {
          setFavorites(favorites.filter((id) => id !== productId));
        } else if (res.status === 401) {
          toast.error('Чтобы удалить из избранного, нужно авторизоваться');
        }
      } else {
        // добавить в избранное
        const res = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        });
        if (res.ok) {
          setFavorites([...favorites, productId]);
        } else if (res.status === 401) {
          toast.error('Чтобы добавить в избранное, нужно авторизоваться');
        }
      }
    } catch (err) {
      console.error('Error toggling favorite', err);
    } finally {
      setLoadingFav(false);
    }
  };

  // Скролл к якорю после обновления продуктов
  useEffect(() => {
    const anchor = document.getElementById('products-top');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [products]); // <-- скролл срабатывает после загрузки продуктов


  return (
    <div className="container">
      <nav id="products-top"  className="breadcrumb">
        <ol>
          <li><a href="/" className="breadcrumb-link">Главная</a></li>
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
              className={`special px-4 py-2 border-1 border-[var(--color-gray)] transition cursor-pointer ${
                category === c.key ? 'bg-[var(--color-blue)] text-white' : 'bg-[var(--color-light-gray)] hover:bg-[var(--color-light-blue)]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => {
            const isFav = favorites.includes(p.id);
            return (
              <div key={p.id} className="border p-4 flex flex-col items-center hover:shadow-md transition relative">
                {p.isOnSale && p.saleDescription && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1">
                    {p.saleDescription}
                  </span>
                )}
                <img src={p.imageUrl ?? '/placeholder.png'} alt={p.name} className="w-40 h-40 object-cover mb-4 rounded" />
                <h2 className="text-lg font-semibold text-center">{p.name}</h2>
                <p className="text-gray-600 mt-2">{p.retailPriceRubWithVAT ? `${p.retailPriceRubWithVAT} ₽` : 'Цена по запросу'}</p>
                {/* <a href={`/product/${p.id}`} className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Подробнее
                </a> */}
                <div className="flex items-center justify-end w-full mt-auto gap-2">
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(p.id)}
                    className="cursor-pointer p-1 rounded-full transition-colors"
                    data-testid={`favorite-btn-${p.id}`}
                  >
                    <Heart size={20} className={isFav ? 'text-[var(--color-blue)] fill-current' : 'text-gray-400'} />
                  </button>
                  
                  {/* Add to Cart Button */}
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
          {products.map((p) => {
            const isFav = favorites.includes(p.id);
            return (
              <div key={p.id} data-testid={`product-card-${p.id}`} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col items-center hover:shadow-md transition-shadow relative">
                {/* Free Delivery Badge */}
                {p.isOnSale && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded" data-testid="free-delivery-badge">
                    Бесплатная доставка
                  </div>
                )}
                
                {/* Product Image */}
                <div className="w-full h-40 mb-4 overflow-hidden rounded">
                  <img 
                    src={p.imageUrl ?? '/placeholder.png'} 
                    alt={p.name} 
                    className="w-full h-full object-cover"
                    data-testid={`product-image-${p.id}`}
                  />
                </div>
                
                {/* Product Name */}
                <h2 className="text-sm font-medium text-gray-900 text-center mb-2 leading-tight" data-testid={`product-name-${p.id}`}>
                  {p.name}
                </h2>
                
                {/* Specification
                <p className="text-xs text-gray-500 mb-2" data-testid={`product-spec-${p.id}`}>
                  {p.specification}
                </p> */}
                
                {/* Price */}
                <p className="text-lg font-bold text-gray-900 mb-4" data-testid={`product-price-${p.id}`}>
                  {p.retailPriceRubWithVAT}
                </p>
                
                {/* Action Buttons */}
                <div className="flex items-center justify-between w-full mt-auto">
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(p.id)}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    data-testid={`favorite-btn-${p.id}`}
                  >
                    <Heart size={20} className={isFav ? 'text-[var(--color-blue)] fill-current' : 'text-gray-400'} />
                  </button>
                  
                  {/* Add to Cart Button */}
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                    data-testid={`add-to-cart-btn-${p.id}`}
                  >
                    В корзину
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button disabled={page === 1} onClick={() => setPage(page - 1)} className="cursor-pointer px-3 py-1 border rounded disabled:opacity-50">
            Предыдущая
          </button>
          <span> {page} из {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="cursor-pointer px-3 py-1 border rounded disabled:opacity-50">
            Следующая
          </button>
        </div>
      </div>
    </div>
  );
}
