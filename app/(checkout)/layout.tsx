'use client';

import { Container, Header } from '@/components/shared';
import { Suspense } from 'react';

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
      <div>
        <Suspense>
          <Header hasSearch={false} hasCart={false} className="border-b-gray-200" onOpenModal={function (): void {
            throw new Error('Function not implemented.');
          } } />
        </Suspense>
        {children}
      </div>
  );
}
