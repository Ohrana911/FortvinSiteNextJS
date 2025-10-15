import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput } from '../form';

interface Props {
  className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Персональные данные" className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5 gap-1">
        <FormInput name="firstName" label='Имя' className="text-base" placeholder="Ваше имя" />
        <FormInput name="lastName" label='Фамилия' className="text-base" placeholder="Ваша фамилия" />
        <FormInput name="email" label='Email' className="text-base" placeholder="example@mail.com" />
        <FormInput name="phone" label='Номер телефона' className="text-base" placeholder="89999999999" />
      </div>
    </WhiteBlock>
  );
};
