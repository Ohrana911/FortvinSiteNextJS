'use client';

import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormTextarea } from '../form';
import { Controller, useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';
import { AdressInput } from '../address-input';

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-4">
        <p className='text-[var(--color-gray)]'>Введите и выберите адрес доставки</p>
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AdressInput onChange={field.onChange} />
              {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
            </>
          )}
        />
      </div>
    </WhiteBlock>
  );
};
