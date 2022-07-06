import React from 'react';
import { Link } from 'react-router-dom';

const CartEmpty: React.FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>Корзина пуста</h2>
      <p>
        Вероятней всего, вы ещё не заказывали пиццу.
        <br />
        Для того, чтобы посмотреть каталог пицц и сделать заказ, перейди на&nbsp;
        <Link to="/react-pizza" style={{ color: '#0000EE' }}>
          главную страницу
        </Link>
        .
      </p>
      <img src={process.env.PUBLIC_URL + '/img/empty-cart.png'} alt="Empty cart" />
      <Link to="/react-pizza" className="button button--black">
        <span>На главную</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
