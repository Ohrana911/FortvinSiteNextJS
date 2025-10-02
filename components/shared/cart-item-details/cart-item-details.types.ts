export interface CartItemProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  disabled?: boolean;

    // новые поля
  quantityPerPallet: number;    // кирпичей в поддоне
  retailPriceRubWithVAT: number;// цена за 1 кирпич
}