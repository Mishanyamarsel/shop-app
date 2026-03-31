import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div style={{
      border: '3px solid #7eb393',
      borderRadius: '8px',
      padding: '16px',
      margin: '16px',
      width: '250px',
      display: 'inline-block',
      verticalAlign: 'top'
    }}>
      <img 
        src={product.image} 
        alt={product.title}
        style={{ width: '100%', height: '200px', objectFit: 'contain' }}
      />
      <h3 style={{ fontSize: '16px', height: '48px', overflow: 'hidden' }}>
        {product.title}
      </h3>
      <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2c3e50' }}>
        ${product.price}
      </p>
      <Link to={`/product/${product.id}`}>
        <button style={{
          backgroundColor: '#05422f',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%'
        }}>
          Подробнее
        </button>
      </Link>
    </div>
  );
}

export default ProductCard;