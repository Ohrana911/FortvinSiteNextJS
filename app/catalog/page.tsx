import React from "react";
import { Button } from "@/components/ui/button"
import { Container, Title } from "@/components/shared";
import { LibraryBig } from "lucide-react";
import { TopBar } from "@/components/shared/top-bar";
import { Filters } from "@/components/shared/filters";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import Link from "next/link";


export default function CatalogPage() {
  return (
    <>
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
            <Link href={"/api/products"}>Перейти в Каталог</Link> </Button>
          </div>
          </div>
        
      </div>
    </Container>
    </>
    )
}