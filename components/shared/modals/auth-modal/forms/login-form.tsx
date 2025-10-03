import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '../../../title';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { FormInput } from '@/components/shared/form';
import { Button } from "@/components/ui/button";
import { formLoginSchema, TFormLoginValues } from './schemas';

interface Props {
  onClose?: VoidFunction;
  onClickLogin?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success('Вы успешно вошли в аккаунт', {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      console.error('Error [LOGIN]', error);
      toast.error('Не удалось войти в аккаунт', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <h2 className="font-bold underline mb-[40px]">Вход в аккаунт</h2>
      <form className="request-form" onSubmit={form.handleSubmit(onSubmit)}>
        
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button loading={form.formState.isSubmitting} className="colored-button w-full rounded-none h-12" type="submit">
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
