import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState(""); // ✅ For sorting
  const [searchParams, setSearchParams] = useSearchParams(); // ✅ For search
  
  // ✅ Get search query from URL
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  
  // ✅ Price filter state
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch('http://localhost:5000/api/products');
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error("API Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map(p => p.category))];

  // ✅ Filter & Sort Products
  const getFilteredAndSortedProducts = () => {
    let result = [...products];
    
    // ✅ Filter by category
    if (selectedCategory !== "All") {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    // ✅ Filter by search query (name, description, category)
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery) ||
        p.description?.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery)
      );
    }
    
    // ✅ Filter by price range
    if (priceRange.min) {
      result = result.filter(p => p.price >= Number(priceRange.min));
    }
    if (priceRange.max) {
      result = result.filter(p => p.price <= Number(priceRange.max));
    }
    
    // ✅ Sort products
    if (sortBy) {
      result = sortProducts(result, sortBy);
    }
    
    return result;
  };

  // ✅ Sort helper function
  const sortProducts = (products, sortBy) => {
    const sorted = [...products];
    
    switch(sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case "rating":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "discount":
        return sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      default:
        return sorted;
    }
  };

  const filteredProducts = getFilteredAndSortedProducts();

  // ✅ Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    if (query.trim()) {
      setSearchParams({ search: query.trim() });
    } else {
      setSearchParams({}); // Clear search param
    }
  };

  // ✅ Handle price filter change
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Apply price filter
  const applyPriceFilter = () => {
    // Force re-render by updating state
    setPriceRange({ ...priceRange });
  };

  // ✅ Reset all filters
  const resetFilters = () => {
    setSelectedCategory("All");
    setPriceRange({ min: "", max: "" });
    setSortBy("");
    setSearchParams({});
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-gold" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3 className="mt-3">Loading products...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-danger text-center">
          <h4>Error Loading Products</h4>
          <p className="mb-0">{error}</p>
          <button 
            className="btn btn-sm btn-outline-dark mt-2" 
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Page Header */}
      <section className="products-header">
        <div className="container">
          <h1 className="products-title">
            All <span className="text-gold">Products</span>
          </h1>
          <p className="products-subtitle">
            {searchQuery 
              ? `Search results for "${searchQuery}"` 
              : "Discover our premium collection"}
          </p>
        </div>
      </section>

      {/* Products Content */}
      <section className="products-content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3 col-md-4 mb-4">
              <Sidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              
              {/* ✅ Price Filter in Sidebar */}
              <div className="sidebar-card mt-3">
                <div className="sidebar-banner">
                  <h6 className="sidebar-title mb-0">
                    <i className="fas fa-tag me-2"></i>Price Range
                  </h6>
                </div>
                <div className="p-3">
                  <div className="d-flex gap-2 mb-2">
                    <input
                      type="number"
                      name="min"
                      className="form-control form-control-sm"
                      placeholder="Min ₱"
                      value={priceRange.min}
                      onChange={handlePriceChange}
                      min="0"
                    />
                    <input
                      type="number"
                      name="max"
                      className="form-control form-control-sm"
                      placeholder="Max ₱"
                      value={priceRange.max}
                      onChange={handlePriceChange}
                      min="0"
                    />
                  </div>
                  <button 
                    className="btn btn-sm btn-outline-gold w-100"
                    onClick={applyPriceFilter}
                  >
                    Apply
                  </button>
                </div>
              </div>
              
              {/* ✅ Reset Filters Button */}
              <button 
                className="btn btn-outline-secondary w-100 mt-3"
                onClick={resetFilters}
              >
                <i className="fas fa-undo me-1"></i> Reset All Filters
              </button>
            </div>

            {/* Products Grid */}
            <div className="col-lg-9 col-md-8">
              {/* ✅ Search Bar + Sort + Results Info */}
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                {/* Search Input */}
                <div className="search-box" style={{ width: "200px" }}>
                  <input 
                    className="form-control search-input" 
                    type="search" 
                    placeholder="Search products..." 
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className="btn search-btn" type="button">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
                
                {/* Sort Dropdown */}
                <div className="sort-dropdown d-flex align-items-center gap-2">
                  <label className="small text-muted mb-0">Sort:</label>
                  <select 
                    className="form-select form-select-sm" 
                    style={{ width: "auto", minWidth: "180px" }}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                    <option value="rating">Rating: High to Low</option>
                    <option value="discount">Discount: High to Low</option>
                  </select>
                </div>
                
                {/* Results Count */}
                <div className="results-info">
                  <p className="mb-0 small">
                    Showing <strong>{filteredProducts.length}</strong> of {products.length} products
                    {searchQuery && <span> • Search: "{searchQuery}"</span>}
                    {selectedCategory !== "All" && <span> • {selectedCategory}</span>}
                    {(priceRange.min || priceRange.max) && <span> • Price filtered</span>}
                  </p>
                </div>
              </div>

              {/* ✅ Active Filter Badges */}
              {(searchQuery || selectedCategory !== "All" || sortBy || priceRange.min || priceRange.max) && (
                <div className="active-filters mb-3">
                  {searchQuery && (
                    <span className="badge bg-secondary me-2">
                      Search: "{searchQuery}"
                      <button 
                        className="btn-close btn-close-white ms-2 small"
                        onClick={() => setSearchParams({})}
                        aria-label="Clear search"
                      ></button>
                    </span>
                  )}
                  {selectedCategory !== "All" && (
                    <span className="badge bg-secondary me-2">
                      {selectedCategory}
                      <button 
                        className="btn-close btn-close-white ms-2 small"
                        onClick={() => setSelectedCategory("All")}
                        aria-label="Clear category"
                      ></button>
                    </span>
                  )}
                  {sortBy && (
                    <span className="badge bg-secondary me-2">
                      Sort: {sortBy.replace("-", " ")}
                      <button 
                        className="btn-close btn-close-white ms-2 small"
                        onClick={() => setSortBy("")}
                        aria-label="Clear sort"
                      ></button>
                    </span>
                  )}
                  {(priceRange.min || priceRange.max) && (
                    <span className="badge bg-secondary me-2">
                      Price: ₱{priceRange.min || 0} - ₱{priceRange.max || "∞"}
                      <button 
                        className="btn-close btn-close-white ms-2 small"
                        onClick={() => setPriceRange({ min: "", max: "" })}
                        aria-label="Clear price"
                      ></button>
                    </span>
                  )}
                </div>
              )}

              {/* Products Grid */}
              <div className="products-grid">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <i className="fas fa-search" style={{ fontSize: "3rem", color: "#ccc" }}></i>
                    <h4 className="mt-3">No products found</h4>
                    <p className="text-muted">
                      {searchQuery 
                        ? `Try different keywords or clear your search` 
                        : "Try selecting a different category or price range"}
                    </p>
                    <button 
                      className="btn btn-view-more"
                      onClick={resetFilters}
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductList;