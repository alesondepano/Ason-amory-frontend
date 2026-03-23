import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';  // ✅ Import wishlist
import { useTheme } from '../context/ThemeContext';        // ✅ Import theme
import { useEffect } from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { getTotalItems } = useCart();
  const { wishlistCount } = useWishlist();  // ✅ Get wishlist count
  const { isDark, toggleTheme } = useTheme(); // ✅ Get theme state
  const cartCount = getTotalItems();
  const location = useLocation();

  // ✅ Close hamburger menu on mobile
  const closeMenu = () => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse?.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || 
                        new bootstrap.Collapse(navbarCollapse, { toggle: false });
      bsCollapse.hide();
    }
  };

  // Auto-close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container">
        {/* Logo */}
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="Ason Armory Logo" className="navbar-logo" />
        </NavLink>

        {/* Mobile Toggle */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Links - Added ms-lg-auto to keep them on the right */}
          <ul className="navbar-nav ms-lg-auto align-items-center">
            <li className="nav-item">
              <NavLink 
                to="/" 
                end 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/products" 
                end 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/about" 
                end 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/policies" 
                end 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                Policies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/contact" 
                end 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                Contact
              </NavLink>
            </li>
            
            {/* ✅ Wishlist Icon with Badge */}
            <li className="nav-item me-2">
              <NavLink 
                to="/wishlist" 
                className={({ isActive }) => `nav-link position-relative ${isActive ? 'active' : ''}`}
                title="Wishlist"
              >
                <i className="fas fa-heart"></i>
                {wishlistCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger wishlist-count">
                    {wishlistCount}
                    <span className="visually-hidden">items in wishlist</span>
                  </span>
                )}
              </NavLink>
            </li>
            
            {/* ✅ Theme Toggle Button */}
            <li className="nav-item me-2">
              <button 
                className="btn theme-toggle-btn"
                onClick={toggleTheme}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-label="Toggle theme"
              >
                <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
              </button>
            </li>
            
            {/* ✅ Cart Icon with Badge */}
            <li className="nav-item ms-3">
              <NavLink 
                to="/cart" 
                className={({ isActive }) => `nav-link position-relative ${isActive ? 'active' : ''}`}
              >
                <i className="fas fa-shopping-cart"></i>
                
                {/* Cart Badge - Only show if items exist */}
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                    <span className="visually-hidden">items in cart</span>
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;