'use client';

import React, { useState, useEffect } from "react";
import { Heart, Menu, X } from "lucide-react";
import { CartButton } from "./cart-button";
import { CityDropdown } from "./city-dropdown";
import { SearchInput } from "./search-input";
import { AuthModal } from "./modals/auth-modal";
import { ProfileButton } from "./profile-button";
import { FavoritesSidebar } from "./favorites-sidebar";
import toast from "react-hot-toast";

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
  onOpenModal: () => void;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className, onOpenModal }) => {
  const [hideTop, setHideTop] = useState(false);
  const [city, setCity] = useState("Санкт-Петербург");
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCityChange = async (selectedCity: string) => {
    setCity(selectedCity);
    await fetch("/api/city", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: selectedCity }),
    });
  };

    useEffect(() => {
        let lastScroll = 0;
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setHideTop(currentScroll > lastScroll && currentScroll > 50);
            lastScroll = currentScroll;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleFavoritesClick = async () => {
    const res = await fetch('/api/favorites');
    if (res.status === 401) {
        toast.error('Чтобы открыть избранное, войдите в аккаунт');
        return;
    }
    setShowFavorites(true);
    };


  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Верхняя панель */}
      <div
        className={`hidden sm:block text-gray-100 text-sm transition-all duration-500 ease-in-out overflow-hidden 
                ${hideTop ? "h-0 opacity-0 py-0 px-0" : "h-10 opacity-100 py-2 px-4"}`}
        style={{ backgroundColor: "#63696F" }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <CityDropdown value={city} onChange={handleCityChange} />
          <nav className="flex gap-6">
            <a href="/api/products" className="hover:underline">Акции и скидки</a>
            <a href="/about_us" className="hover:underline">О нас</a>
            <a href="/articles" className="hover:underline">Статьи</a>
            <a href="/#carousel" className="hover:underline">Производители</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="tel:+79588582747" className="font-medium hover:underline">
              +7 (958) 858-27-47
            </a>
          </div>
        </div>
      </div>

      {/* Нижняя панель */}
      <div className="bg-gray-100 transition-all duration-500 ease-in-out">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
          {/* Лого */}
          <div className="flex items-center">
            <a href="/">
              <img src="/logo-removebg.png" alt="Логотип" className="h-15" />
            </a>
          </div>

          {/* Поиск */}
          <div className="hidden sm:flex flex-1 mx-8">
            <SearchInput />
          </div>

          {/* Навигация (desktop) */}
          <nav className="hidden sm:flex gap-6 text-gray-700 font-medium mx-8">
            <a className="hover:text-[var(--color-blue)]" href="/api/products">Каталог</a>
            <a className="hover:text-[var(--color-blue)]" href="/services">Услуги</a>
            <a className="hover:text-[var(--color-blue)]" href="#footer">Контакты</a>
          </nav>

          

                    {/* Иконки */}
                    <div className="flex items-center gap-3">
                        {/* Кнопка открытия избранного */}
                        <button
                            className="linear cursor-pointer"
                            onClick={handleFavoritesClick}
                        >
                            <Heart size={24} className="lucide lucide-heart text-black hover:text-[var(--color-blue)] transition duration-300" suppressHydrationWarning/>
                        </button>

            {hasCart && <CartButton className="cursor-pointer" />}

            <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
            <ProfileButton
              className="b-0 cursor-pointer"
              onClickSignIn={() => setOpenAuthModal(true)}
            />
            {/* Бургер для мобильных */}
            <button
                className="sm:hidden p-2"
                onClick={() => setIsMenuOpen((prev) => !prev)}
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="sm:hidden bg-white shadow-md border-t border-gray-200 flex flex-col items-center py-4 gap-3">
            <a className="hover:text-[var(--color-blue)]" href="/catalog">Каталог</a>
            <a className="hover:text-[var(--color-blue)]" href="/services">Услуги</a>
            <a className="hover:text-[var(--color-blue)]" href="#footer">Контакты</a>
          </div>
        )}
      </div>

      {/* Сайдбар с избранным */}
      <FavoritesSidebar open={showFavorites} onClose={() => setShowFavorites(false)} />
    </header>
  );
};
