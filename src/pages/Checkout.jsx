// src/pages/Checkout.jsx
import { useState } from 'react';
import { useCart } from '../context/CartContext';  // ✅ Use the hook
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    email: '',
    phone: '',
    payment: 'cod'
  });

  const [submitted, setSubmitted] = useState(false);
  const [finalTotal, setFinalTotal] = useState(0);

  // ✅ Calculate totals from cart
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.12; // 12% VAT
  const total = subtotal + tax;

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
  e.preventDefault();

  // Validate required fields
  if (!form.firstName || !form.lastName || !form.address || !form.city || 
      !form.postalCode || !form.email || !form.phone) {
    alert("⚠️ Please complete all required fields");
    return;
  }

  // ✅ Calculate total BEFORE clearing cart
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.12;
  const total = subtotal + tax;
  
  // ✅ Save total to state
  setFinalTotal(total);

  // ✅ Clear cart AFTER saving total
  clearCart();
  
  // ✅ Show success page
  setSubmitted(true);
};


  // Success page
// Success confirmation page
if (submitted) {
  return (
    <section className="order-confirmation-page py-5">
      <div className="container">
        <div className="order-confirmation-card">
          <div className="text-center">
            <h2 className="mb-3">Order Confirmed!</h2>
            <p className="lead mb-3">
              Thank you, <strong>{form.firstName} {form.lastName}</strong>.
            </p>
            <p className="mb-2">
              <strong>Payment Method:</strong> {form.payment.toUpperCase()}
            </p>
            <p className="mb-4">
              <strong>Total Amount:</strong> 
              <span className="text-gold ms-2">₱{finalTotal.toFixed(2)}</span>
            </p>
            <p className="text-muted mb-4">
              You will receive a confirmation email shortly.
            </p>
            <button 
              className="btn btn-continue-shopping"
              onClick={() => navigate('/products')}
            >
              <i className="fas fa-shopping-cart me-2"></i>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

  return (
    <section className="checkout-page py-5">
      <div className="container">
        <h1 className="section-title mb-4">
          Checkout <span className="text-gold">Summary</span>
        </h1>

        <div className="row">
          {/* Checkout Form */}
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header bg-dark text-white">
                <h4 className="mb-0">Customer Information</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">First Name *</label>
                      <input 
                        type="text" 
                        name="firstName" 
                        className="form-control" 
                        value={form.firstName}
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Last Name *</label>
                      <input 
                        type="text" 
                        name="lastName" 
                        className="form-control" 
                        value={form.lastName}
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Address *</label>
                      <textarea 
                        name="address" 
                        className="form-control" 
                        value={form.address}
                        onChange={handleChange}
                        rows="2"
                        required
                      ></textarea>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">City *</label>
                      <input 
                        type="text" 
                        name="city" 
                        className="form-control" 
                        value={form.city}
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Postal Code *</label>
                      <input 
                        type="text" 
                        name="postalCode" 
                        className="form-control" 
                        value={form.postalCode}
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Email *</label>
                      <input 
                        type="email" 
                        name="email" 
                        className="form-control" 
                        value={form.email}
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Phone *</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        className="form-control" 
                        value={form.phone}
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    
                    {/* Payment Method */}
                    <div className="col-12 mt-3">
                      <label className="form-label">Payment Method *</label>
                      <select 
                        name="payment" 
                        className="form-control" 
                        value={form.payment}
                        onChange={handleChange}
                        required
                      >
                        <option value="cod">💵 Cash on Delivery</option>
                        <option value="gcash">📱 GCash</option>
                        <option value="card">💳 Credit/Debit Card</option>
                        <option value="bank">🏦 Bank Transfer</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="btn btn-proceed-checkout w-100 mt-4"
                  >
                    <i className="fas fa-check-circle"></i>
                    Place Order - ₱{total.toFixed(2)}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="order-summary-card">
              <div className="order-summary-header">
                <h4 className="mb-0">Order Summary</h4>
              </div>
              <div className="order-summary-body">
                {cart.map(item => (
                  <div key={item.id} className="order-summary-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}

                <hr />

                <div className="order-summary-item">
                  <span className="order-summary-label">Subtotal:</span>
                  <span className="order-summary-value">₱{subtotal.toFixed(2)}</span>
                </div>

                <div className="order-summary-item">
                  <span className="order-summary-label">Tax (12%):</span>
                  <span className="order-summary-value">₱{tax.toFixed(2)}</span>
                </div>

                <div className="order-summary-item">
                  <span className="order-summary-label">Shipping:</span>
                  <span className="shipping-free-badge">Free</span>
                </div>

                <div className="order-summary-total">
                  <span className="order-summary-label">Total:</span>
                  <span className="order-summary-value">₱{total.toFixed(2)}</span>
                </div>

                <button 
                  className="btn btn-continue-shopping"
                  onClick={() => navigate('/cart')}
                >
                  <i className="fas fa-arrow-left"></i>
                  Back to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;