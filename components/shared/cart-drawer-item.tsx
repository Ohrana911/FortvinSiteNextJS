'use client';

import React from 'react';
import { cn } from '@/lib/utils';

import * as CartItem from './cart-item-details';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import { CountButton } from './count-button';
import { Trash2Icon } from 'lucide-react';


interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  quantity,
  quantityPerPallet,
  retailPriceRubWithVAT,
  disabled,
  onClickCountButton,
  onClickRemove,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex bg-white p-5 gap-6',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className,
      )}>
      <CartItem.Image src={imageUrl} />

      <div className="flex-1">
        <div className='flex flex-row gap-2'>
          <CartItem.Info name={name} />
          <Trash2Icon
              onClick={onClickRemove}
              className="text-gray-400 cursor-pointer hover:text-[var(--color-blue)]"
              size={24}
            />
        </div>
        
        <hr className="my-3" />

        {/* <div className="flex items-center justify-between">
          <CountButton onClick={onClickCountButton} value={quantity} />

          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon
              onClick={onClickRemove}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
            />
          </div>
        </div> */}

        <div className="flex items-center justify-between">
          
          <CountButton onClick={onClickCountButton} value={quantity} />

          <div className="flex flex-col items-end gap-1">
            {/* Цена за поддон */}
            <CartItem.Price value={price * quantity} />

            {/* Подсказка: кирпичи и цена за штуку */}
            <span className="text-xs text-gray-500">
              {quantityPerPallet} шт × {retailPriceRubWithVAT} ₽
              
            </span>
          </div>
        </div>


      </div>
    </div>
  );
};