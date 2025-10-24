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
  isOnSale,
  saleDescription,
  disabled,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row items-end justify-between',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className,
      )}>
      <div className="flex items-start gap-5 flex-1">
        <CartItemDetails.Image src={imageUrl} />
        <div className="flex flex-col w-full">
          <CartItemDetails.Info name={name} />
          <div className="flex sm:flex-row flex-col mt-2 text-sm text-gray-600 gap-4">
            {/* {quantityPerPallet && <span>Количество на поддон: <br /> {quantityPerPallet}</span>} */}
            {retailPriceRubWithVAT && <span>Цена за ед.:<br /> {retailPriceRubWithVAT} ₽</span>}
          </div>
        </div>
      </div>

      {/* <CartItemDetails.Price value={price} /> */}

      <div className='flex flex-col h-full items-end gap-4 sm:mt-0 mt-4'>
        <div className="flex items-center gap-5 ml-20">
          <CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} />
          <button type="button" onClick={onClickRemove}>
            <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
          </button>
        </div>
        {isOnSale && saleDescription && (
              <span className="text-xs font-semibold text-red-500 mt-1">
                {saleDescription}
              </span>
            )}
        <span className='text-[20px] font-semibold text-gray-600'>Итого: {price} ₽</span>
      </div>
    </div>
  );
};
