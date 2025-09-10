import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from 'next/image'
import { Button } from "../ui";
import { ShoppingCart, Star, User } from "lucide-react";
import { SearchInput } from "./search-input";
import { CartDrawer } from "./cart-drawer";
import { CartButton } from "./cart-button";

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    return (
        <header className={cn('border border-b', className)}>
            <Container className='flex items-center justify-between py-8'>
                {/* Левая часть */}
                <div className="flex items-center gap-4">
                    <Image src="/Fortvinlogo.svg" alt="Logo" width={85} height={85} />
                    <div>
                        <h1 className="text-2xl uppercase font-black">Fortvin text</h1>
                        <p className="text-sm text-gray-400 leading-3">стройте вместе с нами</p>
                    </div>
                </div>

                <div className="mx-10 flex-1"><SearchInput /></div>
                {/* Правая часть */}
                <div className="flex items-center gap-3">
                    <Button variant="outline"><Star size={16}/></Button>
                    <CartButton />
                    <Button variant="outline"><User size={16}/>Войти</Button>
                </div>
            </Container>
        </header>
    )
}