import { CartItemType } from '../redux/slices/cartSlice';

export const calcTotalPrice = (items: CartItemType[]) => {
  return items.reduce((total, item) => {
    return item.price * item.count + total;
  }, 0);
};
