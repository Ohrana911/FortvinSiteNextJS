// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Heart, User } from "lucide-react";
// import { CartButton } from "./cart-button";
// import { CityDropdown } from "./city-dropdown";
// import { MapPin } from "lucide-react";
// import { Search } from "lucide-react";
// import { AuthModal } from "./modals/auth-modal";
// import { ProfileButton } from "./profile-button";
// import { useRouter } from "next/router";
// import { SearchInput } from "./search-input";

// interface Props {
//     className?: string;
//     hasSearch?: boolean;
//     hasCart?: boolean;
//     onOpenModal: () => void; // функция открытия модалки
// }

// export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className, onOpenModal }) => {
//     const [hideTop, setHideTop] = useState(false);
//     const [city, setCity] = useState("Санкт-Петербург");

//     const handleCityChange = async (selectedCity: string) => {
//         setCity(selectedCity);

//         // Send to backend
//         await fetch("/api/city", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ city: selectedCity }),
//         });
//     };
//     // const router = useRouter();
//     const [openAuthModal, setOpenAuthModal] = React.useState(false);

//     useEffect(() => {
//         let lastScroll = 0;

//         const handleScroll = () => {
//         const currentScroll = window.scrollY;

//         if (currentScroll > lastScroll && currentScroll > 50) {
//             // Скроллим вниз → скрыть верхнюю панель
//             setHideTop(true);
//         } else {
//             // Скроллим вверх → показать обратно
//             setHideTop(false);
//         }

//         lastScroll = currentScroll;
//         };

//         window.addEventListener("scroll", handleScroll);
//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     return (
//         <header className="fixed top-0 left-0 right-0 z-50">
//             {/* Верхняя панель */}
//             <div className={`text-gray-100 text-sm transition-all duration-500 ease-in-out overflow-hidden 
//                 ${hideTop ? "h-0 opacity-0 py-0 px-0" : "h-10 opacity-100 py-2 px-4"}`} style={{ backgroundColor: "#63696F" }}>

//                 <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
//                     <CityDropdown value={city} onChange={handleCityChange} />
//                     <nav className="flex gap-6">
//                         <a href="/catalog" className="hover:underline">Акции и скидки</a>
//                         <a href="about_us" className="hover:underline">О нас</a>
//                         <a href="articles" className="hover:underline">Статьи</a>
//                         <a href="/#carousel" className="hover:underline">Производители</a>
//                 </nav>
//                 <div className="flex items-center gap-2">
//                     <a href="tel:+79588582747" className="font-medium hover:underline"> +7 (958) 858-27-47 </a>
//                 </div>
//                 </div>
//             </div>

//             {/* Нижняя панель */}
//             <div className={`bg-gray-100 transition-all duration-500 ease-in-out ${hideTop ? "translate-y-0" : "translate-y-0"}`}>
//                 <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
//                 {/* Лого */}
//                 <div className="flex items-center" >
//                     <a href="/"><img src="/logo-removebg.png" alt="Логотип" className="h-15" /></a>
//                 </div>

//                 {/* Поиск */}
//                 <div className="flex-1 mx-8">
//                     <SearchInput />
//                 </div>

//                 {/* Навигация */}
//                 <nav className="flex gap-6 text-gray-700 font-medium  mx-8">
//                     <a className="hover:text-[var(--color-blue)]" href="/catalog">Каталог</a>
//                     <a className="hover:text-[var(--color-blue)]" href="/services">Услуги</a>
//                     <a className="hover:text-[var(--color-blue)]" href="#footer">Контакты</a>
//                 </nav>

//                 {/* Иконки */}
//                 <div className="flex items-center gap-3">
//                     <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
//                         <ProfileButton className="cursor-pointer" onClickSignIn={() => setOpenAuthModal(true)} />
//                     {/* <button onClick={() => setOpenAuthModal(true)} className="linear cursor-pointer"><User size={24}/></button> */}
//                     <button className="linear cursor-pointer"><Heart size={24}/></button>
//                     {hasCart && <CartButton className="cursor-pointer"/>}
//                 </div>                
//             </div>
//         </div>
//         </header>
//     )
// }

'use client';

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { CartButton } from "./cart-button";
import { CityDropdown } from "./city-dropdown";
import { SearchInput } from "./search-input";
import { AuthModal } from "./modals/auth-modal";
import { ProfileButton } from "./profile-button";
import { FavoritesSidebar } from "./favorites-sidebar";

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
    const [showFavorites, setShowFavorites] = useState(false); // открытие сайдбара избранного

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

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* Верхняя панель */}
            <div className={`text-gray-100 text-sm transition-all duration-500 ease-in-out overflow-hidden 
                ${hideTop ? "h-0 opacity-0 py-0 px-0" : "h-10 opacity-100 py-2 px-4"}`} style={{ backgroundColor: "#63696F" }}>
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
                    <CityDropdown value={city} onChange={handleCityChange} />
                    <nav className="flex gap-6">
                        <a href="/catalog" className="hover:underline">Акции и скидки</a>
                        <a href="/about_us" className="hover:underline">О нас</a>
                        <a href="/articles" className="hover:underline">Статьи</a>
                        <a href="/#carousel" className="hover:underline">Производители</a>
                    </nav>
                    <div className="flex items-center gap-2">
                        <a href="tel:+79588582747" className="font-medium hover:underline">+7 (958) 858-27-47</a>
                    </div>
                </div>
            </div>

            {/* Нижняя панель */}
            <div className={`bg-gray-100 transition-all duration-500 ease-in-out ${hideTop ? "translate-y-0" : "translate-y-0"}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
                    {/* Лого */}
                    <div className="flex items-center">
                        <a href="/"><img src="/logo-removebg.png" alt="Логотип" className="h-15" /></a>
                    </div>

                    {/* Поиск */}
                    <div className="flex-1 mx-8">
                        <SearchInput />
                    </div>

                {/* Навигация */}
                <nav className="flex gap-6 text-gray-700 font-medium  mx-8">
                    <a className="hover:text-[var(--color-blue)]" href="/api/products">Каталог</a>
                    <a className="hover:text-[var(--color-blue)]" href="/services">Услуги</a>
                    <a className="hover:text-[var(--color-blue)]" href="#footer">Контакты</a>
                </nav>

                    {/* Иконки */}
                    <div className="flex items-center gap-3">
                        <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
                        <ProfileButton className="cursor-pointer" onClickSignIn={() => setOpenAuthModal(true)} />

                        {/* Кнопка открытия избранного */}
                        <button
                            className="linear cursor-pointer"
                            onClick={() => setShowFavorites(true)}
                        >
                            <Heart size={24} className="lucide lucide-heart text-black" suppressHydrationWarning/>
                        </button>

                        {hasCart && <CartButton className="cursor-pointer" />}
                    </div>
                </div>
            </div>

            {/* Сайдбар с избранным */}
            <FavoritesSidebar open={showFavorites} onClose={() => setShowFavorites(false)} />
        </header>
    );
};
