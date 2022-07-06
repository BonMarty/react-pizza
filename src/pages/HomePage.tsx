import React from 'react';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort, { sortOptions } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';

import { filterSelector, setFilters } from '../redux/slices/filterSlice';
import {
  fetchPizzas,
  PizzaItemType,
  pizzaSelector,
  SearchParams,
} from '../redux/slices/pizzaSlice';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isMounted = React.useRef(false);
  const isSearch = React.useRef(false);

  const { items, status } = useSelector(pizzaSelector);

  const { searchValue, categoryIndex, sort } = useSelector(filterSelector);

  const getPizzas = async () => {
    const sortBy = sort.sortBy.replace('-', '');
    const order = sort.sortBy.includes('-') ? 'asc' : 'desc';
    const category = categoryIndex > 0 ? `category=${categoryIndex}` : '0';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        categoryIndex,
        search,
      }),
    );
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchParams;

      const sort = sortOptions.find((object) => object.sortBy === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryIndex: Number(params.categoryIndex),
          sort: sort || sortOptions[0],
        }),
      );
    }
    isMounted.current = true;
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const query = qs.stringify({
        sortBy: sort.sortBy,
        categoryIndex,
      });

      navigate(`?${query}`);
    }

    if (!window.location.search) {
      dispatch(fetchPizzas({} as SearchParams));
    }
  }, [categoryIndex, sort, searchValue]);

  React.useEffect(() => {
    getPizzas();
  }, [categoryIndex, sort, searchValue]);

  const pizzas = items.map((pizza: PizzaItemType) => <PizzaBlock {...pizza} key={pizza.id} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      {status === 'error' ? (
        <div className="content__error">
          <h2>Произошла ошибка!</h2>
          <p>
            К сожалению, не удалось получить необходимую информацию для отображения. <br />
            Попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <>
          {status !== 'loading' ? (
            <>
              <h2 className="content__title">Все пиццы</h2>
              <div className="content__items">
                {pizzas.length > 0 ? (
                  pizzas
                ) : (
                  <h2 className="content__empty">К сожалению, по вашему запросу не найдено</h2>
                )}
              </div>
            </>
          ) : (
            <>
              <h2 className="content__title">Все пиццы</h2>
              <div className="content__loader" />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
