"use client";

import React from "react";
import Link from "next/link";
import Carousel from "@/components/ui/carousel";
import RequestForm from "@/components/shared/request-form"
import { Button } from "@/components/ui";

export default function Home() {
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
        <div className="flex justify-between w-full gap-[120px] items-center">
          <div className="request-left w-full">
              <p>Специализируемся на поставках высококачественных строительных материалов для частного и коммерческого строительства.</p>
              <p>Мы не просто поставляем строительные материалы — мы воплощаем мечты о идеальном доме в реальность.</p>
          </div>
          <div className="flex flex-col w-[480px] gap-[40px]">
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
            <Button className="cursor-pointer" variant="request" size="request">Подробнее о компании</Button>
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
