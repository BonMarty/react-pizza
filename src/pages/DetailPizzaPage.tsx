import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { categories } from '../components/Categories';

const DetailPizzaPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
    category: number;
  }>();

  React.useEffect(() => {
    async function fetchSinglePizza() {
      try {
        const { data } = await axios.get(`https://62a898d8ec36bf40bda9f2dc.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (error) {
        console.log(error);
        alert('Ошибка при загрузке пиццы! Сейчас вы будете перенаправлены на главную страницу.');
        navigate('/react-pizza');
      }
    }

    fetchSinglePizza();
  }, []);

  if (!pizza) {
    return <div className="content__loader" />;
  }

  return (
    <div className="container">
      <div className="content--detail">
        <img src={pizza.imageUrl} alt={pizza.title} />
        <div className="content--detail__info">
          <h2>{pizza.title}</h2>
          <h3>{categories[pizza.category]}</h3>
          <h4>{pizza.price} ₽</h4>
          <p>
            <span>{pizza.title}</span> - блюдо, обычно приготовленное из сплющенного хлебного теста,
            намазанного пикантной смесью, обычно включающей помидоры и сыр, а часто и другие
            начинки, и запеченное. — называется также пицца-пирог.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailPizzaPage;
