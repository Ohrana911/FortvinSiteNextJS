// import { prisma } from '@/prisma/prisma-client';
// import { notFound } from 'next/navigation';
// import { ProductClient } from './product-client';

// export default async function ProductPage({ params }: { params: { id: string } }) {
//   const product = await prisma.product.findFirst({
//     where: { id: Number(params.id) },
//   });

//   if (!product) {
//     return notFound();
//   }

//   // Передаём данные в клиентский компонент
//   return <ProductClient product={product} />;
// }

import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { ProductClient } from './product-client';

// Для Next.js 15 используем Promise для params
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Деструктурируем с await
  const { id } = await params;
  
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
  });

  if (!product) {
    return notFound();
  }

  // Передаём данные в клиентский компонент
  return <ProductClient product={product} />;
}
