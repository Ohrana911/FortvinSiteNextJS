"use client";

import React from "react";
import { useParams } from "next/navigation";

interface ProfileType {
    name: string;
    phone: string;
    email: string;
}

const mockProfiles: Record<string, ProfileType> = {
    "1": { name: "Мищенко Евгения Павловна", phone: "+7 (999) 696-40-11", email: "evgeniyalike@yandex.ru" },
    "2": { name: "Иванов Иван Иванович", phone: "+7 (987) 654-32-10", email: "ivanov@example.com" },
};

export default function ProfilePage() {
    const params = useParams();
    const { id } = params as { id: string };
    const profile = mockProfiles[id] || null;

    if (!profile) {
        return (
            <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-4">Профиль не найден</h1>
                <p>Запрашиваемый профиль пользователя не существует.</p>
            </div>
        );
    }

    return (
        <div className="container">
            <nav className="breadcrumb">
                <ol>
                    <li>
                        <a href="/" className="breadcrumb-link">Главная</a>
                    </li>
                    <li className="breadcrumb-separator">→</li>
                    <li className="breadcrumb-current">Личный кабинет</li>
                </ol>
            </nav>
            <div>
                <h1 className="underline">Личный кабинет</h1>
                <div className="gap-[40px] flex flex-col">
                    <div className="profile-block">
                        <p className="font-bold">Персональные данные</p>
                        <div className="w-full flex flex-row gap-10">
                            <div className="blue-card gap-[5px]">
                                <p className="small-bold-text text-[var(--color-blue)]">ФИО</p>
                                <h3>{profile.name}</h3>
                            </div>
                            <div className="blue-card gap-[5px]">
                                <p className="small-bold-text text-[var(--color-blue)]">Номер телефона</p>
                                <h3>{profile.phone}</h3>
                            </div>
                            <div className="blue-card gap-[5px]">
                                <p className="small-bold-text text-[var(--color-blue)]">Email</p>
                                <h3>{profile.email}</h3>
                            </div>
                        </div>
                        <div className="flex flex-row gap-[10px]">
                            <button className="small-button pl-[20px] pr-[20px] pt-[8px] pb-[8px] w-auto">Редактировать</button>
                            <button className="small-button pl-[20px] pr-[20px] pt-[8px] pb-[8px] w-auto">Выйти из профиля</button>
                        </div>
                        </div>
                    <div className="profile-block">
                        <p className="font-bold">История заявок</p>
                        <div className="blue-card gap-[5px]">
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-row w-full justify-between items-start">
                                    <div className="flex flex-col gap-[5px]">
                                        <p className="small-bold-text text-[var(--color-blue)]">Адрес заявки</p>
                                        <h3>г. Санкт-Петербург, ул. Ленина, д. 1</h3>
                                    </div>
                                    <div className="bg-[var(--color-light-blue)] pl-[20px] pr-[20px] pt-[8px] pb-[8px] w-auto">
                                        <h3>01.01.2023</h3>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[5px]">
                                    <p className="small-bold-text text-[var(--color-blue)]">Состав заявки</p>
                                    <h3>Бетон М300 - 5 м3, Бетон М400 - 3 м3</h3>
                                </div>
                                <div className="flex flex-col gap-[5px]">
                                    <p className="small-bold-text text-[var(--color-blue)]">Сумма</p>
                                    <p className="big-text">45000 ₽</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}