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
      <a href={`https://fortvin-site-next-dfk6m4l0f-edwards-projects-9f16be86.vercel.app/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a>
    </p>
  </div>)
}
