'use client';

import { signIn } from 'next-auth/react';
import React from 'react';
import { Button } from '@/components/ui';
import { Dialog, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
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

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        {/* Обязательный DialogTitle для доступности */}
        <DialogTitle>
          <VisuallyHidden>{type === 'login' ? 'Вход в аккаунт' : 'Регистрация'}</VisuallyHidden>
        </DialogTitle>

        {type === 'login' ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}

        <hr className="my-4" />

        <div className="flex gap-2 mb-4">
          <Button
            variant="secondary"
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="w-6 h-6"
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="Google logo"
            />
            Google
          </Button>
        </div>

        <Button variant="outline" onClick={onSwitchType} type="button" className="h-12 w-full">
          {type !== 'login' ? 'Войти' : 'Регистрация'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
