import React from 'react';

interface Props {
  code: string;
}

export function VerificationUserTemplate({ code }: Props){
    return (   <div>
    <p>
      Код подтверждения: <h2>{code}</h2>
    </p>

    <p>
      <a href={`https://https://fortvin-site-next-js.vercel.app/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a>
    </p>
  </div>)
}
