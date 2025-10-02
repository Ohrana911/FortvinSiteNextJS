'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import * as CartItemDetails from './cart-item-details';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  className,
  quantityPerPallet,
  retailPriceRubWithVAT,
  disabled,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className,
      )}>
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info name={name} />
      </div>

      {/* <CartItemDetails.Price value={price} /> */}

      <div className="flex flex-col mt-2 text-sm text-gray-600 gap-1">
        {quantityPerPallet && <span>Количество на поддон: {quantityPerPallet}</span>}
        {retailPriceRubWithVAT && <span>Цена за поддон: {retailPriceRubWithVAT} ₽</span>}
        <span>Итого за {quantity} шт: {price} ₽</span>
      </div>

      <div className="flex items-center gap-5 ml-20">
        <CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} />
        <button type="button" onClick={onClickRemove}>
          <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
        </button>
      </div>
    </div>
  );
};
