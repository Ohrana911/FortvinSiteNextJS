'use client';

import { signIn } from 'next-auth/react';
import React from 'react';
import { Button } from '@/components/ui';
import * as Dialog from '@radix-ui/react-dialog';
import { RegisterForm } from './forms/register-form';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { LoginForm } from './forms/login-form';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = React.useState<'login' | 'register'>('login');

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* затемнение заднего фона */}
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[100]" />

        {/* модальное окно */}
        <Dialog.Content className="fixed left-1/2 top-1/2 z-[100] w-[520px] -translate-x-1/2 -translate-y-1/2 bg-white p-10 shadow-lg focus:outline-none">
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: 20,
              right: 24,
              background: 'transparent',
              border: 'none',
              fontSize: 24,
              cursor: 'pointer',
            }}
          >
            &times;
          </button>
          
          <Dialog.Title>
            <VisuallyHidden>
              {type === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
            </VisuallyHidden>
          </Dialog.Title>

          {type === 'login' ? (
            <LoginForm onClose={onClose} />
          ) : (
            <RegisterForm onClose={onClose} />
          )}

          <hr className="my-4" />

          <div className="flex gap-2 mb-4">
            <Button
              variant="custom"
              onClick={() =>
                signIn('google', {
                  callbackUrl: '/',
                  redirect: true,
                })
              }
              type="button"
              className="gap-2 h-12 p-2 flex-1 cursor-pointer"
            >
              <img
                className="w-6 h-6"
                src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                alt="Google logo"
              />
              Google
            </Button>
          </div>

          <Button
            variant="custom"
            onClick={onSwitchType}
            type="button"
            className="h-12 w-full cursor-pointer"
          >
            {type !== 'login' ? 'Войти' : 'Регистрация'}
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
