import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom'; 

const Cart = () => {
  // ✅ Get cart functions from context
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    getTotalItems,
    getTotalPrice 
  } = useCart();

  // Empty cart state
  if (cart.length === 0) {
    return (
      <section className="cart-page py-5">
        <div className="container text-center">
          <i className="fas fa-shopping-cart" style={{ fontSize: '4rem', color: '#ffc107' }}></i>
          <h3 className="mt-4">Your cart is empty</h3>
          <p className="text-muted">Add some products to get started!</p>
          
          {/* ✅ Updated: Black & Gold theme button */}
          <Link to="/products" className="btn btn-continue-shopping mt-3">
            <i className="fas fa-arrow-left"></i> Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page py-5">
      <div className="container">
        <h1 className="section-title mb-4">
          Shopping <span className="text-gold">Cart</span>
        </h1>

        <div className="row">
          {/* Cart Items */}
          <div className="col-lg-8">
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item card mb-3">
                  <div className="row g-0">
                    {/* Product Image */}
                    <div className="col-md-3">
                      <img 
                        src={item.image} 
                        className="img-fluid rounded-start" 
                        alt={item.name}
                        style={{ height: '120px', objectFit: 'contain', padding: '10px' }}
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="col-md-6">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text text-muted small">{item.category}</p>
                        <p className="card-text fw-bold">₱{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    {/* Quantity & Actions */}
                    <div className="col-md-3 d-flex flex-column justify-content-center align-items-end p-3">
                      {/* Quantity Controls */}
                      <div className="quantity-control d-flex align-items-center mb-2">
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="mx-3 fw-bold">{item.quantity}</span>
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      {/* Remove Button */}
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="fas fa-trash"></i> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Clear Cart Button - Updated to theme */}
            <button 
              className="btn btn-outline-danger mt-3"
              onClick={clearCart}
            >
              <i className="fas fa-trash-alt"></i> Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            {/* ✅ Updated: Order summary card with theme classes */}
            <div className="order-summary-card">
              <div className="order-summary-header">
                <h3 className="mb-0">Order Summary</h3>
              </div>
              <div className="order-summary-body">
                <div className="order-summary-item">
                  <span className="order-summary-label">Items ({getTotalItems()}):</span>
                  <span className="order-summary-value">₱{getTotalPrice().toLocaleString()}</span>
                </div>
                
                <div className="order-summary-item">
                  <span className="order-summary-label">Shipping:</span>
                  <span className="shipping-free-badge">Free</span>
                </div>
                
                <div className="order-summary-total">
                  <span className="order-summary-label">Total:</span>
                  <span className="order-summary-value">₱{getTotalPrice().toLocaleString()}</span>
                </div>
                
                {/* ✅ Updated: Black & Gold theme buttons */}
                <Link to="/checkout" className="btn btn-proceed-checkout">
                  <i className="fas fa-credit-card"></i>
                  Proceed to Checkout
                </Link>
                
                <Link to="/products" className="btn btn-continue-shopping">
                  <i className="fas fa-arrow-left"></i>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;