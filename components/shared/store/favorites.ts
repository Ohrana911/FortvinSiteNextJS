import { create } from 'zustand';

interface Favorite {
  productId: number;
}

interface FavoritesState {
  favorites: number[];
  loading: boolean;

  fetchFavorites: () => Promise<void>;
  toggleFavorite: (productId: number) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  loading: false,

  // Загружаем избранное при монтировании
  fetchFavorites: async () => {
    try {
      const res = await fetch('/api/favorites');
      if (res.ok) {
        const data: Favorite[] = await res.json();
        set({ favorites: data.map(f => f.productId) });
      }
    } catch (err) {
      console.error('Ошибка при получении избранного:', err);
    }
  },

  // Добавление / удаление товара из избранного
  toggleFavorite: async (productId: number) => {
    const { favorites, loading } = get();
    if (loading) return;

    set({ loading: true });

    try {
      if (favorites.includes(productId)) {
        const res = await fetch(`/api/favorites/${productId}`, { method: 'DELETE' });
        if (res.ok) {
          set({ favorites: favorites.filter(id => id !== productId) });
        }
      } else {
        const res = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        });
        if (res.ok) {
          set({ favorites: [...favorites, productId] });
        }
      }
    } catch (err) {
      console.error('Ошибка при изменении избранного:', err);
    } finally {
      set({ loading: false });
    }
  },
}));
