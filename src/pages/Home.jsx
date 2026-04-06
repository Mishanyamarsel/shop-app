import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';

const categoryTranslations = {
  'beauty': 'Косметика',
  'fragrances': 'Парфюмерия',
  'furniture': 'Мебель',
  'groceries': 'Продукты',
  'home-decoration': 'Декор',
  'kitchen-accessories': 'Кухонные принадлежности',
  'laptops': 'Ноутбуки',
  'mens-shirts': 'Мужские рубашки',
  'mens-shoes': 'Мужская обувь',
  'mens-watches': 'Мужские часы',
  'mobile-accessories': 'Аксессуары для телефонов',
  'motorcycle': 'Мотоциклы',
  'skin-care': 'Уход за кожей',
  'smartphones': 'Смартфоны',
  'sports-accessories': 'Спортивные аксессуары',
  'sunglasses': 'Солнцезащитные очки',
  'tablets': 'Планшеты',
  'tops': 'Верхняя одежда',
  'vehicle': 'Транспорт',
  'womens-bags': 'Женские сумки',
  'womens-dresses': 'Женские платья',
  'womens-jewellery': 'Украшения',
  'womens-shoes': 'Женская обувь',
  'womens-watches': 'Женские часы'
};

const translateCategory = (category) => {
  return categoryTranslations[category] || category;
};

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(['Все', ...categoriesData]);
        setLoading(false);
      } catch (err) {
        setError('Не удалось загрузить данные');
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  useEffect(() => {
    if (selectedCategory === '' || selectedCategory === 'Все') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        product => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

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
      backgroundColor: 'rgb(180, 186, 192)',
      minHeight: '100vh',
      padding: '20px 0'
    }}>
      {/* Заголовок и фильтры в одной строке */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '15px',
        padding: '0 20px',
        marginBottom: '20px'
      }}>
        <h1 style={{ 
          margin: 0,
          color: '#f5f1f1',
          fontSize: '32px'
        }}>
          Товары
        </h1>
        
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '8px'
        }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '6px 14px',
                fontSize: '14px',
                backgroundColor: selectedCategory === category ? '#2c3e50' : '#6a918a',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {translateCategory(category)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Контейнер с карточками */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center',
        backgroundColor: 'rgb(210, 219, 229)',
        borderRadius: '24px',
        padding: '20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;