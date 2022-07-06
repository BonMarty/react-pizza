import React from 'react';

import { Link } from 'react-router-dom';

import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.root}>
      <div>
        <h2>УУпс!</h2>
        <p className={styles.description}>
          К сожалению, мы не можем найти страницу, которую вы ищите.
        </p>
        <Link to="/react-pizza" className="button button--black">
          На главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
