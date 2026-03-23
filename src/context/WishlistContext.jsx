import { createContext, useContext, useState, useEffect } from 'react';

// Create the Wishlist Context
const WishlistContext = createContext();

// ✅ Custom hook for easier access
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

// ✅ Wishlist Provider Component
export const WishlistProvider = ({ children }) => {
  // Load wishlist from localStorage on initial render
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load wishlist:', error);
      return [];
    }
  });

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error('Failed to save wishlist:', error);
    }
  }, [wishlist]);

  // ✅ Add/Remove product from wishlist (toggle functionality)
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        // Remove if already in wishlist (toggle off)
        return prev.filter(item => item.id !== product.id);
      }
      // Add if not in wishlist (toggle on)
      return [...prev, product];
    });
  };

  // ✅ Remove product by ID
  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter(item => item.id !== productId));
  };

  // ✅ Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // ✅ Clear entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  // ✅ Value object - everything we share globally
  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount: wishlist.length
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;