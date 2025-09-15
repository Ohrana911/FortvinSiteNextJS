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

export default function Home() {
  return <>
  <main>
    <Container className="mt-5">
      <div className="flex items-center gap-3">
        <Title text="Каталог" size="lg" className="font-extrabold" /><LibraryBig size={45}/>
      </div>
    </Container>
    
    <TopBar />

    <Container className="mt-10 pb-14">
      <div className="flex gap-[60px]">
        {/* Фильтрация */}
        <div className="w-[250px]">
          <Filters />
        </div>
        
        

        {/* Список товаров */}
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            <Button>
            <Link href={"/api/products"}>Перейти в Каталог</Link>
            </Button>
            {/* <ProductCard id={0} name="Бетон блок" price={5550} imageUrl="https://expres-beton.by/doc/images/tovar/m350.png" /> */}
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
            {/* <ProductCard id={0} name="Бетон блок" price={5550} imageUrl="https://expres-beton.by/doc/images/tovar/m350.png" /> */}
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
            {/* <ProductCard id={0} name="Бетон блок" price={5550} imageUrl="https://expres-beton.by/doc/images/tovar/m350.png" /> */}
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
    </Container>
  </main>
  </>;
}
