import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";

// ✅ Fallback products
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
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const RAW_URL =
          import.meta.env.VITE_API_URL ||
          "https://ason-armory-backend.onrender.com";

        const API_URL = RAW_URL.trim().replace(/\/$/, "");

        // ✅ FIX: match Home endpoint
        const res = await fetch(`${API_URL}/products`);

        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format");
        }

        setProducts(data);
      } catch (err) {
        console.warn("⚠️ Backend not available:", err.message);
        setError("Using demo data (backend not connected)");
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // ✅ sorting
  const sortProducts = (list) => {
    const sorted = [...list];

    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sorted;
    }
  };

  // ✅ filtering
  const filteredProducts = sortProducts(
    products.filter((p) => {
      const matchCategory =
        selectedCategory === "All" || p.category === selectedCategory;

      const matchSearch =
        p.name.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery);

      const matchMin =
        !priceRange.min || p.price >= Number(priceRange.min);

      const matchMax =
        !priceRange.max || p.price <= Number(priceRange.max);

      return matchCategory && matchSearch && matchMin && matchMax;
    })
  );

  // handlers
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchParams(query ? { search: query } : {});
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setPriceRange({ min: "", max: "" });
    setSortBy("");
    setSearchParams({});
  };

  // loading
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-gold"></div>
        <h3 className="mt-3">Loading products...</h3>
      </div>
    );
  }

  return (
    <>
      {/* ERROR */}
      {error && (
        <div className="alert alert-warning text-center">
          ⚠️ {error}
        </div>
      )}

      {/* HEADER */}
      <section className="products-header">
        <div className="container">
          <h1>
            All <span className="text-gold">Products</span>
          </h1>
          <p>
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : "Discover our collection"}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="products-content">
        <div className="container">
          <div className="row">

            {/* SIDEBAR */}
            <div className="col-lg-3">
              <Sidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              <div className="mt-3">
                <input
                  type="number"
                  name="min"
                  placeholder="Min ₱"
                  className="form-control mb-2"
                  value={priceRange.min}
                  onChange={handlePriceChange}
                />
                <input
                  type="number"
                  name="max"
                  placeholder="Max ₱"
                  className="form-control"
                  value={priceRange.max}
                  onChange={handlePriceChange}
                />
              </div>

              <button
                className="btn btn-outline-secondary w-100 mt-3"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>

            {/* PRODUCTS */}
            <div className="col-lg-9">
              <div className="d-flex justify-content-between mb-3">
                <input
                  className="form-control"
                  style={{ width: "200px" }}
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />

                <select
                  className="form-select"
                  style={{ width: "180px" }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Sort</option>
                  <option value="price-low">Low to High</option>
                  <option value="price-high">High to Low</option>
                  <option value="name-asc">A-Z</option>
                  <option value="name-desc">Z-A</option>
                </select>
              </div>

              <div className="row g-3">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <div className="col-lg-4 col-md-6" key={p.id}>
                      <ProductCard product={p} />
                    </div>
                  ))
                ) : (
                  <h4 className="text-center">No products found</h4>
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