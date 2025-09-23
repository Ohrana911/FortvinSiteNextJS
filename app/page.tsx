import { Button } from "@/components/ui/button"
import { Container, Title } from "@/components/shared";
import { LibraryBig } from "lucide-react";
import { Categories } from "@/components/shared/categories";
import { SortPopup } from "@/components/shared";
import { TopBar } from "@/components/shared/top-bar";
import { Filters } from "@/components/shared/filters";
import { ProductCard } from "@/components/shared/product-card";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import Link from "next/link";
import Carousel from "@/components/ui/carousel";
import RequestForm from "@/components/shared/request-form";

export default function Home() {
  return (
    <div className="gap-[80px] flex flex-col">
      <Container className="mt-5">
        <div className="flex items-center gap-3">
          <Title text="Каталог" size="lg" className="font-extrabold" /><LibraryBig size={45}/>
        </div>
      </Container>
            <Button>
            <Link href={"/api/products"}>Перейти в Каталог</Link>
            </Button>
    
    <TopBar />
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
            <ProductsGroupList title={"Плитка"} items={[
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
        </div>

        
      </div>
    </Container> */}

    <Carousel className="full-width" />
    <RequestForm />
  </div>
  )
}
