import React from 'react';

import debounce from 'lodash.debounce';

import { changeSearchValue } from '../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

import styles from './Search.module.scss';

const Search: React.FC = () => {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState('');

  const inputRef = React.useRef<HTMLInputElement>(null);

  const debounceSearch = React.useCallback(
    debounce((value: string) => {
      updatePizzas(value);
    }, 300),
    [],
  );

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debounceSearch(e.target.value);
  };

  const updatePizzas = (value: string) => {
    dispatch(changeSearchValue(value));
  };

  const clearSearch = () => {
    updatePizzas('');
    setValue('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles.searchBox}>
      <svg className={styles.searchIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title />
        <g data-name="Layer 2" id="Layer_2">
          <path d="M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Поиск пиццы..."
        value={value}
        onChange={updateSearch}
      />
      {value && (
        <svg
          onClick={clearSearch}
          className={styles.clearIcon}
          data-name="Capa 1"
          id="Capa_1"
          viewBox="0 0 20 19.84"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
