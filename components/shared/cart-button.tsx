'use client';

import React from 'react';
import { Button } from '../ui';
import { ShoppingCart } from 'lucide-react';
import { CartDrawer } from './cart-drawer';
import { cn } from '@/lib/utils';


interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  return (
    <CartDrawer>
      <button className={cn("relative group linear", className)}>
        <div className="flex items-center gap-1 transition duration-300">
          <ShoppingCart 
            size={24} 
            strokeWidth={2} 
            className="transition-colors duration-300" 
          />
        </div>
      </button>
    </CartDrawer>
  );
};