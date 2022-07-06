import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortByEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
}

export type SortType = {
  name: string;
  sortBy: SortByEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryIndex: number;
  sort: SortType;
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryIndex: 0,
  sort: {
    name: 'популярности (↑)',
    sortBy: SortByEnum.RATING_DESC,
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },

    changeCategory: (state, action: PayloadAction<number>) => {
      state.categoryIndex = action.payload;
    },

    changeSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    },

    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.categoryIndex = action.payload.categoryIndex;
      state.sort = action.payload.sort;
    },
  },
});

export const filterSelector = (state: RootState) => state.filter;
export const categorySelector = (state: RootState) => state.filter.categoryIndex;
export const sortSelector = (state: RootState) => state.filter.sort;

export const { changeSearchValue, changeCategory, changeSort, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
