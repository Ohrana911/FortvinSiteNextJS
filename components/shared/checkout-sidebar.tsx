import React from 'react';

import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button, Skeleton } from '../ui';
import { cn } from '@/lib/utils';
import { CheckoutItemDetails } from './checkout-item-details';
import { WhiteBlock } from './white-block';

const VAT = 15;
const DELIVERY_PRICE = 250;

interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading, className }) => {
  const vatPrice = (totalAmount * VAT) / 100;
  //const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;
  const totalPrice = totalAmount;

  return (
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="h-11 w-48" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">{totalPrice} ₽</span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-400" />
            Стоимость корзины:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${totalAmount} ₽`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Способ оплаты:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `По согласованию`}
      />
      {/* <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Доставка:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${DELIVERY_PRICE} ₽`}
      /> */}

      <Button
        loading={loading}
        type="submit"
        className="colored-button mt-[20px] rounded-none">
        Оставить заявку
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
