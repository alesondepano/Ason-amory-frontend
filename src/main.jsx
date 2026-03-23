import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// ✅ CSS Imports
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// ✅ Context Providers
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';  // If you added wishlist
import { ThemeProvider } from './context/ThemeContext';        // If you added dark mode

// ✅ Bootstrap JS - Load via CDN in index.html instead (see note below)
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // ❌ Remove this line

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ✅ Wrap App with all Context Providers */}
    <CartProvider>
      <WishlistProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </WishlistProvider>
    </CartProvider>
  </StrictMode>
);