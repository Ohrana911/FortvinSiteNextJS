"use client";

import { cn } from "@/lib/utils";
import React, { useEffect } from "react";
import { Container } from "./container";
import Image from 'next/image'
import { Button } from "../ui";
import { Heart, ShoppingCart, Star, User } from "lucide-react";
import { SearchInput } from "./search-input";
import { CartDrawer } from "./cart-drawer";
import { CartButton } from "./cart-button";
import { MapPin } from "lucide-react";
import { Search } from "lucide-react";
import { useState } from "react";

interface Props {
    className?: string;
    onOpenModal: () => void; // функция открытия модалки
}

export const Header: React.FC<Props> = ({ className, onOpenModal }) => {
    const [hideTop, setHideTop] = useState(false);

    useEffect(() => {
        let lastScroll = 0;

        const handleScroll = () => {
        const currentScroll = window.scrollY;

        if (currentScroll > lastScroll && currentScroll > 50) {
            // Скроллим вниз → скрыть верхнюю панель
            setHideTop(true);
        } else {
            // Скроллим вверх → показать обратно
            setHideTop(false);
        }

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
                <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    <span>Санкт-Петербург</span>
                </div>
                <nav className="flex gap-6">
                    <a href="#" className="hover:underline">Акции и скидки</a>
                    <a href="about_us" className="hover:underline">О нас</a>
                    <a href="articles" className="hover:underline">Статьи</a>
                    <a href="/" className="hover:underline">Производители</a>
                </nav>
                <div className="flex items-center gap-2">
                    <a href="tel:+79588582747" className="font-medium hover:underline"> +7 (958) 858-27-47 </a>
                </div>
                </div>
            </div>

            {/* Нижняя панель */}
            <div className={`bg-gray-100 transition-all duration-500 ease-in-out ${hideTop ? "translate-y-0" : "translate-y-0"}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
                {/* Лого */}
                <div className="flex items-center" >
                    <a href="/"><img src="/logo-removebg.png" alt="Логотип" className="h-15" /></a>
                </div>

                {/* Поиск */}
                <div className="flex-1 mx-8">
                    <input
                    type="text"
                    placeholder="Поиск по товарам"
                    className="w-full border border-gray-400 px-4 py-2 rounded-none focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                </div>

                {/* Навигация */}
                <nav className="flex gap-6 text-gray-700 font-medium  mx-8">
                    <a href="#">Каталог</a>
                    <a href="services">Услуги</a>
                    <a href="/">Контакты</a>
                </nav>

                {/* Иконки */}
                <div className="flex items-center gap-3">
                    <button onClick={onOpenModal} className="linear cursor-pointer"><User size={24}/></button>
                    <button className="linear cursor-pointer"><Heart size={24}/></button>
                    <CartButton className="cursor-pointer" />
                </div>
            </div>
        </div>
        </header>
    )
}