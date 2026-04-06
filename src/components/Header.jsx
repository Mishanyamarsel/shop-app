import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';  // ← добавить

function Header() {
  const { getTotalItems } = useCart();  // ← добавить

  return (
    <header style={{ 
      padding: '1rem', 
      display: 'flex', 
      gap: '1rem', 
      borderBottom: '1px solid #ccc',
      backgroundColor: '#6a918a'
    }}>
      <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'rgb(245, 247, 245)' }}>
        Магазин
      </Link>
      <Link to="/cart" style={{ textDecoration: 'none', color: 'rgb(223, 239, 213)' }}>
        Корзина ({getTotalItems()})
      </Link>
    </header>
  );
}

export default Header;