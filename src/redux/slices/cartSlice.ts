import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../helpers/calcTotalPrice';
import { getCartFromLS } from '../../helpers/getCartFromLS';
import { RootState } from '../store';

export type CartItemType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItemType[];
}

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      const findedItem = state.items.find((item) => item.id === action.payload.id);

      if (findedItem) {
        findedItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      state.totalPrice = calcTotalPrice(state.items);
    },

    removeAllFromCart: (state) => {
      state.items = [];

      state.totalPrice = 0;
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const incrementedItem = state.items.find((item) => item.id === action.payload);

      if (incrementedItem) {
        incrementedItem.count += 1;
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const decrementedItem = state.items.find((item) => item.id === action.payload);

      if (decrementedItem) {
        if (decrementedItem.count > 1) {
          decrementedItem.count -= 1;
        }
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;

export const cartItemSelectorById = (id: string) => (state: RootState) =>
  state.cart.items.find((item: CartItemType) => item.id === id);

export const {
  addToCart,
  removeFromCart,
  removeAllFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
