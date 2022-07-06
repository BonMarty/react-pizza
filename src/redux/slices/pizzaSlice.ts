import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export type PizzaItemType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: PizzaItemType[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

export type SearchParams = {
  sortBy: string;
  order: string;
  categoryIndex: number;
  search: string;
};

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async (params: SearchParams) => {
    const { sortBy, order, categoryIndex, search } = params;

    const category = categoryIndex > 0 ? `category=${categoryIndex}` : '';

    const { data } = await axios.get<PizzaItemType[]>(
      `https://62a898d8ec36bf40bda9f2dc.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`,
    );

    return data as PizzaItemType[];
  },
);

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzaItemType[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const pizzaSelector = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
