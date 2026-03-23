import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";

// ✅ Optional: Fallback products if API fails (same as Home.jsx)
import product1 from "../assets/22lr-ammo-100.jpg";
import product7 from "../assets/Airsoft BB Pellets (0.25g – 4000 pcs).jpg";
import product11 from "../assets/Ason Armory Branded Cap.jpg";
import product16 from "../assets/Ear Protection Headset (Noise Reduction).jpg";
import product20 from "../assets/Glock 17 Gen 5 (9mm Pistol).jpg";
import product22 from "../assets/Laser Sight Attachment.jpg";
import product28 from "../assets/SIG Sauer P320 (9mm Modular Pistol).jpg";
import product30 from "../assets/Tactical Belt (Heavy Duty Nylon).jpg";

const FALLBACK_PRODUCTS = [
  { id: 1, name: ".22 LR Ammunition (100 rounds)", price: 700, category: "Ammunition", image: product1 },
  { id: 2, name: "Airsoft BB Pellets (0.25g – 4000 pcs)", price: 450, category: "Airsoft", image: product7 },
  { id: 3, name: "Ason Armory Branded Cap", price: 500, category: "Apparel", image: product11 },
  { id: 4, name: "Ear Protection Headset (Noise Reduction)", price: 1400, category: "Tactical Gear", image: product16 },
  { id: 5, name: "Glock 17 Gen 5 (9mm Pistol)", price: 48000, category: "Firearms", image: product20 },
  { id: 6, name: "Laser Sight Attachment", price: 1500, category: "Accessories", image: product22 },
  { id: 7, name: "SIG Sauer P320 (9mm Modular Pistol)", price: 52000, category: "Firearms", image: product28 },
  { id: 8, name: "Tactical Belt (Heavy Duty Nylon)", price: 750, category: "Tactical Gear", image: product30 },
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const RAW_URL = import.meta.env.VITE_API_URL || "https://ason-armory-backend.onrender.com";
        const API_URL = RAW_URL.trim().replace(/\/$/, "");
        console.log("🔍 Fetching from:", `${API_URL}/api/products`); // Debug log
        const res = await fetch(`${API_URL}/api/products`);

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format");
        }

        setProducts(data);
      } catch (err) {
        console.warn("⚠️ Backend not available, using fallback data:", err.message);
        setError("Using demo data (backend not connected)");
        // ✅ FIX #2: Fallback to demo data like Home.jsx
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const getFilteredAndSortedProducts = () => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery) ||
          p.description?.toLowerCase().includes(searchQuery) ||
          p.category.toLowerCase().includes(searchQuery)
      );
    }

    if (priceRange.min) {
      result = result.filter((p) => p.price >= Number(priceRange.min));
    }

    if (priceRange.max) {
      result = result.filter((p) => p.price <= Number(priceRange.max));
    }

    if (sortBy) {
      result = sortProducts(result, sortBy);
    }

    return result;
  };

  const sortProducts = (products, sortBy) => {
    const sorted = [...products];

    switch (sortBy) {
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

  const handleSearchChange = (e) => {
    const query = e.target.value;
    if (query.trim()) {
      setSearchParams({ search: query.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  const applyPriceFilter = () => {
    setPriceRange({ ...priceRange });
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setPriceRange({ min: "", max: "" });
    setSortBy("");
    setSearchParams({});
  };

  if (loading) {
    return (
      <div className="loading-container text-center py-5">
        <div className="spinner-border text-gold" role="status"></div>
        <h3 className="mt-3">
          Loading products (first load may take a few seconds)...
        </h3>
      </div>
    );
  }

  {/* ✅ Show warning if using fallback data */}
  {error && !loading && (
    <div className="alert alert-warning text-center mb-3">
      <i className="fas fa-exclamation-triangle me-2"></i>
      {error}
    </div>
  )}

  return (
    <>
      {/* HEADER */}
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

      <section className="products-content">
        <div className="container">
          <div className="row">
            {/* SIDEBAR */}
            <div className="col-lg-3 col-md-4 mb-4">
              <Sidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              {/* PRICE FILTER */}
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
                    />
                    <input
                      type="number"
                      name="max"
                      className="form-control form-control-sm"
                      placeholder="Max ₱"
                      value={priceRange.max}
                      onChange={handlePriceChange}
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

              <button
                className="btn btn-outline-secondary w-100 mt-3"
                onClick={resetFilters}
              >
                Reset All Filters
              </button>
            </div>

            {/* PRODUCTS */}
            <div className="col-lg-9 col-md-8">
              {/* TOP BAR */}
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <input
                  className="form-control"
                  style={{ width: "200px" }}
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />

                <select
                  className="form-select form-select-sm"
                  style={{ width: "180px" }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A-Z</option>
                  <option value="name-desc">Name: Z-A</option>
                </select>

                <p className="mb-0 small">
                  {filteredProducts.length} / {products.length} products
                </p>
              </div>

              {/* GRID */}
              <div className="row">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <div className="text-center py-5">
                    <h4>No products found</h4>
                    <button
                      className="btn btn-warning mt-2"
                      onClick={resetFilters}
                    >
                      Clear Filters
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