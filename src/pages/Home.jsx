import { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Не удалось загрузить товары');
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Загрузка товаров...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        <h2>{error}</h2>
      </div>
    );
  }
  return (
  <div style={{ 
    backgroundColor: 'rgb(180, 186, 192)',  // ← темный фон всей страницы
    minHeight: '100vh',                     // ← на всю высоту экрана
    padding: '10px 80px'                   // ← отступы от краев
  }}>
    <h1 style={{ 
      textAlign: 'center', 
      marginBottom: '30px',
      color: '#f5f1f1',                        // ← белый заголовок (чтобы видно было)
      fontSize: '40px'
    }}>
      
    </h1>
    
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      justifyContent: 'center',
      backgroundColor: 'rgb(210, 219, 229)', // ← светлый фон под карточками
      borderRadius: '24px',                  // ← скругленные углы
      padding: '20px',                      // ← отступы внутри
      maxWidth: '1400px',                   // ← ограничиваем ширину
      margin: '0 auto'                      // ← центрируем блок
    }}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
);
}

export default Home;