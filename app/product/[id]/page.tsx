// export default async function ProductPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   return (
//     <div className="p-5">
//       <h1 className="text-2xl font-bold">Product {id}</h1>
//     </div>
//   );
// }

// import { Container, ProductForm } from '@/shared/components/shared';
import { ProductImage } from '@/components/shared/product-image';
import { Container } from '@/components/shared/container';

// import { ProductForm } from '@/components/shared/product-form';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { Title } from '@/components/shared';
import { AddToCartButton } from '@/components/shared/add-to-cart-button';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1 gap-6">
        <ProductImage imageUrl={product.imageUrl ?? '/placeholder.png'} size={20} />

        <div className="w-[490px] bg-[#FCFCFC] p-7 rounded-lg shadow-md">
          <Title text={product.name} size="md" className="font-extrabold mb-4" />
          <ul className="space-y-2 text-gray-700">
            <li><strong>Цвет:</strong> {product.color}</li>
            <li><strong>Морозостойкость:</strong> {product.frostResistance ?? '—'}</li>
            <li><strong>Водопоглощение:</strong> {product.waterAbsorption ?? '—'}</li>
            <li><strong>Размер:</strong> {product.size ?? '—'}</li>
            <li><strong>Вес (кг):</strong> {product.weightKg ?? '—'}</li>
            <li><strong>Штук на поддоне:</strong> {product.quantityPerPallet ?? '—'}</li>
            <li><strong>Поддонов в фуре:</strong> {product.palletsPerTruck ?? '—'}</li>
            <li><strong>Всего в фуре:</strong> {product.totalPerTruck ?? '—'}</li>
            <li><strong>Цена (₽ с НДС):</strong> {product.retailPriceRubWithVAT ?? '—'}</li>
            <li><strong>Город:</strong> {product.city ?? '—'}</li>
          </ul>
        </div>
      </div>
      {product.id > 0 && (
        <AddToCartButton productItemId={product.id} />
      )}
      

    </Container>
  );
}

