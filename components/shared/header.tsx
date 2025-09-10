import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from 'next/image'
import { Button } from "../ui";
import { ShoppingCart, Star, User } from "lucide-react";
import Link from "next/link";

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    return (
        <header className={cn('border border-b', className)}>
            <Container className='flex items-center justify-between py-8'>
                {/* Левая часть */}
                <div className="flex items-center gap-4">
                    <Image src="/next.svg" alt="Logo" width={85} height={85} />
                    <div>
                        <h1 className="text-2xl uppercase font-black">Fortvin text</h1>
                        <p className="text-sm text-gray-400 leading-3">стройте вместе с нами</p>
                    </div>
                </div>
                {/* Правая часть */}
                <div className="flex items-center gap-3">
                    <Button variant="outline"><Star size={16}/></Button>
                    <Button variant="outline"><ShoppingCart size={16}/></Button>
                    <Button variant="outline"><User size={16}/>Войти</Button>
                </div>
            </Container>
        </header>
    )
}