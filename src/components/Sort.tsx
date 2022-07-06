import React from 'react';

import { changeSort, SortType, sortSelector, SortByEnum } from '../redux/slices/filterSlice';
import { useSelector, useDispatch } from 'react-redux';

type PopupClickType = MouseEvent & {
  path: Node[];
};

type SortItem = {
  name: string;
  sortBy: SortByEnum;
};

export const sortOptions: SortItem[] = [
  { name: 'популярности (↑)', sortBy: SortByEnum.RATING_DESC },
  { name: 'популярности (↓)', sortBy: SortByEnum.RATING_ASC },
  { name: 'цене (↑)', sortBy: SortByEnum.PRICE_DESC },
  { name: 'цене (↓)', sortBy: SortByEnum.PRICE_ASC },
  { name: 'алфавиту (↑)', sortBy: SortByEnum.TITLE_DESC },
  { name: 'алфавиту (↓)', sortBy: SortByEnum.TITLE_ASC },
];

const Sort: React.FC = () => {
  const sort = useSelector(sortSelector);
  const dispatch = useDispatch();

  const sortRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutsidePopup = (e: MouseEvent) => {
      const event = e as PopupClickType;
      if (sortRef.current && !event.path.includes(sortRef.current)) {
        setOpenSort(false);
      }
    };

    document.body.addEventListener('click', handleClickOutsidePopup);

    return () => document.body.removeEventListener('click', handleClickOutsidePopup);
  }, []);

  const changeSortType = (option: SortType) => {
    dispatch(changeSort(option));
    setOpenSort(!openSort);
  };

  const [openSort, setOpenSort] = React.useState(false);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          className={openSort ? 'sort-arrow' : 'sort-arrow__active'}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>

        <b>Сортировка по:</b>
        <span onClick={() => setOpenSort(!openSort)}>{sort.name}</span>
      </div>
      {openSort && (
        <div className="sort__popup">
          <ul>
            {sortOptions.map((option) => {
              return (
                <li
                  key={option.name}
                  className={sort.sortBy === option.sortBy ? 'active' : ''}
                  onClick={() => changeSortType(option)}>
                  {option.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
