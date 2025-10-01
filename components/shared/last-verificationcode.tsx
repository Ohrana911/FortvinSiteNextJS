'use client';

import { useEffect, useState } from 'react';

export default function LastVerificationCode() {
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/verification-code/last')
      .then(res => res.json())
      .then(data => {
        if (data?.code) setCode(data.code);
      })
      .catch(err => console.log(err));
  }, []);

  if (!code) return <p>Код не найден</p>;

  return (
    <div>
      <h3>Последний код верификации:</h3>
      <p>{code}</p>
    </div>
  );
}
