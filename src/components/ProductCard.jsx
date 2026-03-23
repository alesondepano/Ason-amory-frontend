import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext'; // ✅ Import wishlist hook
import { useNavigate } from 'react-router-dom'; // ✅ For product detail navigation

const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  
  // ✅ Get functions from Context
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist(); // ✅ Wishlist functions
  const navigate = useNavigate();

  // ✅ Check if product is in wishlist
  const inWishlist = isInWishlist(product.id);

  // ✅ Handle Add to Cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  // ✅ Handle Wishlist Toggle
  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent card click from triggering
    addToWishlist(product); // Toggle: add if not in, remove if in
  };

  // ✅ Handle View Product Detail
  const handleViewProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <article 
      className="card product-card h-100 product-card-wrapper"
      onClick={handleViewProduct}
      style={{ cursor: 'pointer' }}
    >
      {/* Image Section */}
      <div className="product-img-wrapper position-relative">
        {/* Sale Badge */}
        {product.discount > 0 && (
          <span className="sale-badge">-{product.discount}%</span>
        )}
        
        {/* ✅ Wishlist Button - Now Functional */}
        <button 
          className={`wishlist-btn ${inWishlist ? 'active' : ''}`} 
          type="button" 
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <i className={`fas ${inWishlist ? 'fa-heart' : 'fa-heart'}`}></i>
        </button>
        
        {/* Product Image with Fallback */}
        {imageError ? (
          <div className="card-img-top product-img d-flex align-items-center justify-content-center" 
               style={{ 
                 background: '#f8f9fa', 
                 height: '200px',
                 position: 'absolute',
                 top: 0,
                 left: 0,
                 width: '100%',
                 padding: '12px'
               }}>
            <i className="fas fa-image" style={{ fontSize: '3rem', color: '#ddd' }}></i>
          </div>
        ) : (
          <img 
            src={product.image} 
            className="card-img-top product-img" 
            alt={product.name} 
            loading="lazy"
            onError={() => setImageError(true)}
            onClick={(e) => e.stopPropagation()} // Prevent image click from triggering card
          />
        )}
      </div>
      
      {/* Card Body */}
      <div className="card-body" onClick={(e) => e.stopPropagation()}>
        {/* Category */}
        {product.category && (
          <span className="product-category">{product.category}</span>
        )}
        
        {/* Product Name */}
        <h5 className="card-title">{product.name}</h5>
        
        {/* Rating */}
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <i 
                key={i} 
                className={i < (product.rating || 0) ? 'fas fa-star' : 'far fa-star'}
              />
            ))}
          </div>
          {product.reviews > 0 && (
            <span className="review-count">({product.reviews})</span>
          )}
        </div>
        
        {/* Price */}
        <div className="product-price">
          ₱{product.price.toLocaleString()}
          {product.oldPrice && (
            <span className="old-price ms-2 text-decoration-line-through text-muted" style={{ fontSize: '0.9rem' }}>
              ₱{product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
        
        {/* ✅ Add to Cart Button */}
        <button 
          className="btn btn-add-to-cart w-100" 
          type="button"
          onClick={handleAddToCart}
        >
          <i className="fas fa-shopping-cart"></i>
          <span>Add to Cart</span>
        </button>
      </div>
    </article>
  );
};

export default ProductCard;