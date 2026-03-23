import { createContext, useState, useContext, useEffect } from 'react';

// ✅ Step 1: Create the Cart Context
const CartContext = createContext();

// ✅ Step 2: Create custom hook for cleaner syntax
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// ✅ Step 3: Create Cart Provider Component
export const CartProvider = ({ children }) => {
  // Load cart from localStorage on initial render
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // ✅ Step 4: Add product to cart (or increase quantity if exists)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Product exists - increase quantity
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // New product - add with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // ✅ Step 5: Remove product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter(item => item.id !== productId)
    );
  };

  // ✅ Step 6: Update product quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // ✅ Step 7: Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // ✅ Step 8: Get total items count (for navbar badge)
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // ✅ Step 9: Get total price
  const getTotalPrice = () => {
    return cart.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );
  };

  // ✅ Step 10: Value object - everything we share globally
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;