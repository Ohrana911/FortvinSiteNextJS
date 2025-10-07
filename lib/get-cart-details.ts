import { CartDTO } from '../services/dto/cart.dto';
import { calcCartItemTotalPrice } from './calc-cart-item-total-price';
// import { calcCartItemTotalPrice } from './calc-cart-item-total-price';

// export type CartStateItem = {
//   productItem: any;
//   id: number;
//   quantity: number;
//   name: string;
//   imageUrl: string;
//   price: number;
//   disabled?: boolean;
// };

export type CartStateItem = {
  productItem: any;
  id: number;
  quantity: number;             // количество поддонов
  name: string;
  imageUrl: string;
  price: number;                // цена за поддон
  quantityPerPallet: number;    // сколько кирпичей в поддоне
  retailPriceRubWithVAT: number;// цена за кирпич
  isOnSale: boolean;
  saleDescription: string;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

// export const getCartDetails = (data: CartDTO): ReturnProps => {
//   const items = data.items.map((item) => ({
//     id: item.id,
//     quantity: item.quantity,
//     name: item.productItem.product.name,
//     imageUrl: item.productItem.product.imageUrl,
//     price: item.productItem.product.retailPriceRubWithVAT,
//     // price: calcCartItemTotalPrice(item),
//     disabled: false,
//     // ingredients: item.ingredients.map((ingredient) => ({
//     //   name: ingredient.name,
//     //   price: ingredient.price,
//     // })),
//   })) as CartStateItem[];

//   return {
//     items,
//     totalAmount: data.totalAmount,
//   };
// };

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => {
    const product = item.productItem.product;
    const quantityPerPallet = product.quantityPerPallet || 1;
    const brickPrice = product.retailPriceRubWithVAT || 0;

    return {
      id: item.id,
      quantity: item.quantity, // поддоны
      name: product.name,
      imageUrl: product.imageUrl,
      retailPriceRubWithVAT: brickPrice,
      quantityPerPallet,
      price: brickPrice * quantityPerPallet, // цена за поддон
      isOnSale: product.isOnSale ?? false,          // ✅ добавили
      saleDescription: product.saleDescription ?? '', // ✅ добавили
    };
  }) as CartStateItem[];

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    items,
    // totalAmount: data.totalAmount,
    totalAmount,
  };
};
