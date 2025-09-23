// 'use client';


// import { ProductWithRelations } from '@/@types/prisma';
// import { useCartStore } from '@/store';

// import React from 'react';
// import toast from 'react-hot-toast';

// interface Props {
//   product: ProductWithRelations;
//   onSubmit?: VoidFunction;
// }

// export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
//   const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);

//   const firstItem = product.items[0];

//   const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
//     try {
//       const itemId = productItemId ?? firstItem.id;

//       await addCartItem({
//         productItemId: itemId,
//       });

//       toast.success(product.name + ' добавлена в корзину');

//       _onSubmit?.();
//     } catch (err) {
//       toast.error('Не удалось добавить товар в корзину');
//       console.error(err);
//     }
//   };


//   return (
//     <ChooseProductForm
//       imageUrl={product.imageUrl}
//       name={product.name}
//       onSubmit={onSubmit}
//       price={firstItem.price}
//       loading={loading}
//     />
//   );
// };