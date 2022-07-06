import React from 'react';
import { changeCategory, categorySelector } from '../redux/slices/filterSlice';
import { useSelector, useDispatch } from 'react-redux';

export const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC = () => {
  const categoryIndex = useSelector(categorySelector);
  const dispatch = useDispatch();

  const setActiveCategory = (index: number) => {
    dispatch(changeCategory(index));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={category}
              onClick={() => setActiveCategory(index)}
              className={categoryIndex === index ? 'active' : ''}>
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
