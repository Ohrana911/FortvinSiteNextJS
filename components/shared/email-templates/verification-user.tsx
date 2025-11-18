// components/shared/email-templates/verification-user.tsx
import React from 'react';

interface Props {
  code: string;
}

export function VerificationUserTemplate({ code }: Props) {
  return (
    <div>
      <p>Ваш код подтверждения:</p>
      <h2 style={{ fontSize: '32px', letterSpacing: '5px', textAlign: 'center' }}>
        {code}
      </h2>
      <p>Введите этот код на сайте для завершения регистрации</p>
      {/* <p>Или перейдите по ссылке ниже для автоматического подтверждения:</p> */}
      {/* <p>
        <a href={`https://localhost:8000/api/auth/verify?code=${code}`}>
          Подтвердить регистрацию
        </a>
      </p> */}
    </div>
  );
}