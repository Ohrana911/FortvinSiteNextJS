'use client';

import { Button } from "@/components/ui";
import { useCartStore } from "@/store";

interface Props {
  productItemId: number;
}

export const AddToCartButton: React.FC<Props> = ({ productItemId }) => {
  const addCartItem = useCartStore(state => state.addCartItem);
  const loading = useCartStore(state => state.loading);

  const handleAdd = async () => {
    await addCartItem({ productItemId });
  };

  return (
    <Button
      onClick={handleAdd}
      disabled={loading}
      className="mt-4 w-full"
    >
      {loading ? "Добавляем..." : "В корзину"}
    </Button>
  );
};
