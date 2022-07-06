import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import DetailPizzaPage from './pages/DetailPizzaPage';
import NotFoundPage from './pages/NotFoundPage';

import './scss/app.scss';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/react-pizza" element={<HomePage />} />
          <Route path="/react-pizza/cart" element={<CartPage />} />
          <Route path="/react-pizza/pizza/:id" element={<DetailPizzaPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
