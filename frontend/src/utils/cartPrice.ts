import type { CartItem } from "../context/cartStore";

export const getCartItemUnitPrice = (
  item: Pick<CartItem, "price" | "discountPrice">,
) =>
  item.discountPrice
    ? item.price - item.price * (item.discountPrice / 100)
    : item.price;

export const getCartItemSubtotal = (item: CartItem) =>
  getCartItemUnitPrice(item) * item.quantity;

export const getCartSubtotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + getCartItemSubtotal(item), 0);
