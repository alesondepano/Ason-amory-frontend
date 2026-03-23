import { useWishlist } from '../context/WishlistContext';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const navigate = useNavigate();

  // ✅ Empty wishlist state
  if (wishlist.length === 0) {
    return (
      <section className="wishlist-page py-5">
        <div className="container text-center">
          <i className="fas fa-heart" style={{ fontSize: '4rem', color: '#ffc107' }}></i>
          <h3 className="mt-4">Your wishlist is empty</h3>
          <p className="text-muted">Save your favorite products here!</p>
          <button 
            className="btn btn-view-more mt-3"
            onClick={() => navigate('/products')}
          >
            <i className="fas fa-arrow-left me-2"></i>
            Browse Products
          </button>
        </div>
      </section>
    );
  }

  // ✅ Wishlist with items
  return (
    <section className="wishlist-page py-5">
      <div className="container">
        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <h1 className="section-title mb-0">
            My <span className="text-gold">Wishlist</span>
          </h1>
          <button 
            className="btn btn-outline-danger"
            onClick={clearWishlist}
            title="Remove all items from wishlist"
          >
            <i className="fas fa-trash me-2"></i>
            Clear All
          </button>
        </div>

        {/* Results Info */}
        <div className="results-info mb-4">
          <p className="mb-0">
            <strong>{wishlist.length}</strong> {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
          </p>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;