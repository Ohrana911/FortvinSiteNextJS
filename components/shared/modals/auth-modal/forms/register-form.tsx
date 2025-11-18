'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { registerUser } from '@/app/actions';

import { Button } from '@/components/ui';
import { FormInput } from '@/components/shared/form';
import { formRegisterSchema, TFormRegisterValues } from './schemas';

interface Props {
  onClose?: VoidFunction;
  onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin }) => {
  const router = useRouter();
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      const result = await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
        phone: data.phone,
      });

      // Если регистрация успешна, делаем редирект
      if (result && result.success) {
        toast.success('Регистрация успешна! Проверьте вашу почту для подтверждения.', {
          icon: '✅',
        });

        // Редирект на страницу ввода кода
        router.push('/verify');
        onClose?.();
      }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Неверный E-Mail или пароль';
        toast.error(errorMessage, {
          icon: '❌',
        });
      }
  };

  return (
    <FormProvider {...form}>
      <h2 className="font-bold underline mb-[40px]">Регистрация</h2>
      <form className="request-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Полное имя" required />
        <FormInput name="phone" label="Телефон" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput name="confirmPassword" label="Подтвердите пароль" type="password" required />

        <Button loading={form.formState.isSubmitting} className="colored-button w-full rounded-none h-12" type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};