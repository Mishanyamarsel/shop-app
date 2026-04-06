import { useCart } from '../context/CartContext';

function Cart() {
  const { 
    cartItems, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    clearCart,
    getTotalPrice 
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Корзина пуста</h2>
        <p>Добавьте товары из магазина</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Корзина</h1>
      
      {cartItems.map(item => (
        <div key={item.id} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          borderBottom: '1px solid #ddd',
          padding: '20px 0'
        }}>
          <img 
            src={item.thumbnail || item.images?.[0] || item.image} 
            alt={item.title} 
            style={{ width: '80px', height: '80px', objectFit: 'contain' }}
          />
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '16px' }}>{item.title}</h3>
            <p style={{ fontWeight: 'bold' }}>${item.price}</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              onClick={() => decreaseQuantity(item.id)}
              style={{ padding: '5px 10px', cursor: 'pointer' }}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button 
              onClick={() => increaseQuantity(item.id)}
              style={{ padding: '5px 10px', cursor: 'pointer' }}
            >
              +
            </button>
          </div>
          
          <button 
            onClick={() => removeFromCart(item.id)}
            style={{ 
              padding: '5px 10px', 
              backgroundColor: '#e74c3c', 
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Удалить
          </button>
        </div>
      ))}
      
      <div style={{ marginTop: '30px', textAlign: 'right' }}>
        <h2>Итого: ${getTotalPrice().toFixed(2)}</h2>
        <button 
          onClick={clearCart}
          style={{ 
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#2c3e50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Очистить корзину
        </button>
      </div>
    </div>
  );
}

export default Cart;