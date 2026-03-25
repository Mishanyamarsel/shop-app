import { Link } from 'react-router-dom'

function Header() {
  return (
    <header style={{ 
      padding: '1rem', 
      display: 'flex', 
      gap: '1rem', 
      borderBottom: '1px solid #ccc',
      backgroundColor: '#f5f5f5'
    }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
        Магазин
      </Link>
      <Link to="/cart" style={{ textDecoration: 'none', color: 'black' }}>
        Корзина (0)
      </Link>
    </header>
  )
}

export default Header