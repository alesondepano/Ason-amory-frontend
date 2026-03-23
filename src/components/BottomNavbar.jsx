import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const BottomNavbar = () => {
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <nav className="bottom-navbar">
      {/* Home */}
      <NavLink to="/" className="nav-item">
        <i className="fas fa-home"></i>
        <span>Home</span>
      </NavLink>

      {/* Products */}
      <NavLink to="/products" className="nav-item">
        <i className="fas fa-search"></i>
        <span>Products</span>
      </NavLink>

      {/* Cart - CENTERED */}
      <NavLink to="/cart" className="nav-item cart-center">
        <div className="cart-icon-wrapper">
          <i className="fas fa-shopping-cart"></i>
          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </div>
        <span>Cart</span>
      </NavLink>

      {/* Policies */}
      <NavLink to="/policies" className="nav-item">
        <i className="fas fa-file-alt"></i>
        <span>Policies</span>
      </NavLink>

      {/* Contact */}
      <NavLink to="/contact" className="nav-item">
        <i className="fas fa-envelope"></i>
        <span>Contact</span>
      </NavLink>
    </nav>
  );
};

export default BottomNavbar;