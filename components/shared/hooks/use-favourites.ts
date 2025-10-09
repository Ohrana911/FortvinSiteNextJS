'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

interface FavoriteItem {
  id: number;
  productId: number;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  // Получаем список избранного при монтировании
  // useEffect(() => {
  //   fetch('/api/favorites')
  //     .then(res => res.json())
  //     .then((data) => {
  //       const ids = data.map((fav: any) => fav.productId);
  //       setFavorites(ids);
  //     });
  // }, []);

    // Получаем список избранного при монтировании
  useEffect(() => {
    fetch('/api/favorites')
      .then(res => res.json())
      .then((data: FavoriteItem[]) => {
        const ids = data.map(fav => fav.productId);
        setFavorites(ids);
      });
  }, []);

  const addFavorite = async (productId: number) => {
    setLoading(true);
    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) throw new Error('Не удалось добавить в избранное');

      setFavorites(prev => [...prev, productId]);
      toast.success('Добавлено в избранное');
    } catch (err) {
      console.error(err);
      toast.error('Ошибка добавления');
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (productId: number) => {
    setLoading(true);
    try {
      // Нужно знать ID favorite, для простоты будем искать его у сервера по productId
      const favListRes = await fetch('/api/favorites');
      // const favList = await favListRes.json();
      const favList: FavoriteItem[] = await favListRes.json();
      const fav = favList.find(f => f.productId === productId);
      if (!fav) throw new Error('Не найдено в избранном');

      await fetch(`/api/favorites/${fav.id}`, { method: 'DELETE' });
      setFavorites(prev => prev.filter(id => id !== productId));
      toast.success('Удалено из избранного');
    } catch (err) {
      console.error(err);
      toast.error('Ошибка удаления');
    } finally {
      setLoading(false);
    }
  };

  return { favorites, addFavorite, removeFavorite, loading };
}



