import React from 'react';

interface Props {
  code: string;
}

export function VerificationUserTemplate({ code }: Props){
    return (   <div>
    <p>
      Код подтверждения: <h2>{code}</h2>
    </p>

    <p>Перейдите по ссылке, чтобы подтвердить регистрацию</p>

    <p>
      <a href={`https://fortvin.ru/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a>
    </p>
  </div>)
}
