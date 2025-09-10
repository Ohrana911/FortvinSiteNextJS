import { CartItemDTO } from "@/services/dto/cart.dto";
import { Item } from "@radix-ui/react-select";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
    return item.productItem.price * item.quantity;
}