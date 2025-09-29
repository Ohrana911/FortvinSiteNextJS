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
          <Link href="/catalog">
            <button className="home-button">Перейти в каталог</button>
          </Link>
        </div>
      </div>

      <div>
        <div className="flex justify-between w-full items-end">
          <h1 className="underline">Акции и скидки</h1>
          <Link href="/catalog">
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
    
      {/* <TopBar /> */}
{/* 
    <Container className="mt-10 pb-14">
      <div className="flex gap-[60px]">
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            <Button>
            <Link href={"/api/products"}>Перейти в Каталог</Link>
            </Button>
            <ProductsGroupList title={"Бетонные блоки"} items={[
              {
              id: 1,
              name: 'Бетон блок',
              imageUrl: 'https://expres-beton.by/doc/images/tovar/m350.png',
              price: 5550,
              items: [{price: 5550}],

            },
            {
              id: 2,
              name: 'Бетон блок',
              imageUrl: 'https://expres-beton.by/doc/images/tovar/m350.png',
              price: 5550,
              items: [{price: 5550}],

            },
            {
              id: 3,
              name: 'Бетон блок',
              imageUrl: 'https://expres-beton.by/doc/images/tovar/m350.png',
              price: 5550,
              items: [{price: 5550}],

            },
            ]} categoryId={1} />
          </div>
          <div className="flex flex-col gap-16">
            <ProductsGroupList title={"Кирпичи"} items={[
              {
              id: 1,
              name: 'Бетон блок',
              imageUrl: 'https://expres-beton.by/doc/images/tovar/m350.png',
              price: 5550,
              items: [{price: 5550}],

      <div>
        <div className="flex justify-between w-full items-end">
          <h1 className="underline">Каталог</h1>
          <Link href="/catalog">
              <button className="small-button mb-[40px]">Перейти в раздел</button>
          </Link>
        </div>
        <div className="service-blocks">

        </div>
      </div>
    </Container> */}

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
