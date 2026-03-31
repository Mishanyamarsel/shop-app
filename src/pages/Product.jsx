import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';

function Product() {
  // Получаем id товара из URL (например, /product/5 → id = "5")
  const { id } = useParams();
  
  // Хук для навигации (кнопка "Назад")
  const navigate = useNavigate();
  
  // Состояния компонента
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загружаем товар при загрузке страницы или при изменении id
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(id);
        if (data) {
          setProduct(data);
        } else {
          setError('Товар не найден');
        }
        setLoading(false);
      } catch (err) {
        setError('Ошибка загрузки товара');
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [id]); // если id изменится, загрузим новый товар

  // Показываем загрузку
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Загрузка...</h2>
      </div>
    );
  }

  // Показываем ошибку
  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        <h2>{error}</h2>
        <button 
          onClick={() => navigate('/')} 
          style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
        >
          Вернуться в магазин
        </button>
      </div>
    );
  }

  // Если товара нет, ничего не показываем
  if (!product) {
    return null;
  }

  // Показываем товар
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Кнопка "Назад" */}
      <button 
        onClick={() => navigate(-1)} 
        style={{ marginBottom: '20px', padding: '8px 16px', cursor: 'pointer' 
            ,background: '#343f5c',color:'#ffffff',border:'none',borderRadius:'8px'}}
      >
        ← Вернуться
      </button>
      
      {/* Контент: картинка и информация */}
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* Левая колонка: картинка */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <img 
            src={product.image} 
            alt={product.title}
            style={{ width: '100%', maxWidth: '400px', objectFit: 'contain' }}
          />
        </div>
        
        {/* Правая колонка: информация */}
        <div style={{ flex: 2 }}>
          <h1 style={{fontSize: '35px',lineHeight: '1.4'}}>{product.title}</h1>
          <p style={{ color: '#666', marginTop: '10px' }}>{product.description}</p>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#3a502c', marginTop: '20px' }}>
            ${product.price}
          </p>
          <p style={{ color: '#1e2749', marginTop: '10px' }}>
            Категория: {product.category}
          </p>
          <button 
            style={{
              marginTop: '30px',
              backgroundColor: '#ae5656',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
