import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// ✅ Components
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomNavbar from './components/BottomNavbar';

// ✅ Pages
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import SingleProduct from './pages/SingleProduct';
import About from './pages/About';
import Policies from './pages/Policies';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';  // ✅ Imported

// ✅ Context Providers
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';  // ✅ Add if using wishlist
import { ThemeProvider } from './context/ThemeContext';        // ✅ Add if using dark mode

function App() {
  return (
    <Router>
      {/* ✅ Wrap with ALL context providers (order matters!) */}
      <CartProvider>
        <WishlistProvider>
          <ThemeProvider>
            {/* Layout Structure */}
            <Header />
            <Navbar />
            
            {/* Main Content Area */}
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/product/:id" element={<SingleProduct />} />
                <Route path="/about" element={<About />} />
                <Route path="/policies" element={<Policies />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/wishlist" element={<Wishlist />} />  {/* ✅ Add this route */}
              </Routes>
            </main>
            
            {/* Bottom Navigation - Mobile Only */}
            <BottomNavbar />
            
            <Footer />
          </ThemeProvider>
        </WishlistProvider>
      </CartProvider>
    </Router>
  );
}

export default App;