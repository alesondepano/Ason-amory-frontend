import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

// ✅ Fallback product images - All 35 products
import product1 from "../assets/22lr-ammo-100.jpg";
import product2 from "../assets/45acp-ammo-50.jpg";
import product3 from "../assets/3x Magnifier Scope.jpg";
import product4 from "../assets/5.56 NATO Rifle Ammo (20 rounds).jpg";
import product5 from "../assets/9mm FMJ Ammunition (50 rounds).jpg";
import product6 from "../assets/12 Gauge Shotgun Shells (25 rounds).jpg";
import product7 from "../assets/Airsoft BB Pellets (0.25g – 4000 pcs).jpg";
import product8 from "../assets/Airsoft Glock 17 Gas Blowback.jpg";
import product9 from "../assets/Airsoft M4 Electric Rifle (AEG).jpg";
import product10 from "../assets/Airsoft Sniper Rifle (Spring Powered).jpg";
import product11 from "../assets/Ason Armory Branded Cap.jpg";
import product12 from "../assets/Beretta 92FS (9mm Classic).jpg";
import product13 from "../assets/Colt M4 Carbine (5.56 Rifle).jpg";
import product14 from "../assets/Combat Knee & Elbow Pads Set.jpg";
import product15 from "../assets/Daniel Defense V11 (5.56 Rifle).jpg";
import product16 from "../assets/Ear Protection Headset (Noise Reduction).jpg";
import product17 from "../assets/Face Mask Tactical Balaclava.jpg";
import product18 from "../assets/Fingerless Tactical Gloves.jpg";
import product19 from "../assets/Gel Blaster Tactical Rifle.jpg";
import product20 from "../assets/Glock 17 Gen 5 (9mm Pistol).jpg";
import product21 from "../assets/Glock 19 Gen 5 (Compact 9mm).jpg";
import product22 from "../assets/Laser Sight Attachment.jpg";
import product23 from "../assets/Magazine Pouch (Triple Slot).jpg";
import product24 from "../assets/Military Tactical Backpack (40L).jpg";
import product25 from "../assets/Range Safety Glasses.jpg";
import product26 from "../assets/Red Dot Sight (Reflex Optic).jpg";
import product27 from "../assets/Rifle Sling (Adjustable Tactical).jpg";
import product28 from "../assets/SIG Sauer P320 (9mm Modular Pistol).jpg";
import product29 from "../assets/Smith & Wesson M&P Shield (9mm).jpg";
import product30 from "../assets/Tactical Belt (Heavy Duty Nylon).jpg";
import product31 from "../assets/Tactical Combat Boots.jpg";
import product32 from "../assets/Tactical Kydex Holster.jpg";
import product33 from "../assets/Tactical Vest (Plate Carrier).jpg";
import product34 from "../assets/Universal Gun Cleaning Kit.jpg";
import product35 from "../assets/Weapon Flashlight (LED Tactical Light).jpg";

const FALLBACK_PRODUCTS = [
  // 🔫 Firearms (8)
  { id: 1, name: "Glock 17 Gen 5 (9mm Pistol)", image: product20, price: 48000, oldPrice: 55000, rating: 5, discount: 13, category: "Firearms", description: "Reliable 9mm pistol, fifth generation.", stock: 12 },
  { id: 2, name: "SIG Sauer P320 (9mm Modular Pistol)", image: product28, price: 52000, oldPrice: 60000, rating: 5, discount: 13, category: "Firearms", description: "Modular 9mm pistol system.", stock: 10 },
  { id: 3, name: "Smith & Wesson M&P 15 Sport II", image: product13, price: 65000, oldPrice: 75000, rating: 5, discount: 13, category: "Firearms", description: "Versatile AR-15 style rifle for sport and defense.", stock: 8 },
  { id: 4, name: "Ruger 10/22 Carbine (.22 LR)", image: product21, price: 28000, oldPrice: 32000, rating: 4, discount: 13, category: "Firearms", description: "Classic .22 LR carbine, perfect for training.", stock: 15 },
  { id: 5, name: "Beretta 92FS (9mm Pistol)", image: product12, price: 45000, oldPrice: 52000, rating: 5, discount: 13, category: "Firearms", description: "Classic Italian 9mm pistol, trusted worldwide.", stock: 10 },
  { id: 6, name: "Springfield XD-M Elite (9mm)", image: product29, price: 49500, oldPrice: 57000, rating: 5, discount: 13, category: "Firearms", description: "High-performance 9mm with enhanced ergonomics.", stock: 9 },
  { id: 7, name: "CZ 75 SP-01 (9mm Pistol)", image: product20, price: 47000, oldPrice: 54000, rating: 5, discount: 13, category: "Firearms", description: "Czech-engineered precision 9mm pistol.", stock: 7 },
  { id: 8, name: "Heckler & Koch VP9 (9mm)", image: product28, price: 54000, oldPrice: 62000, rating: 5, discount: 13, category: "Firearms", description: "German-engineered striker-fired 9mm.", stock: 6 },

  // 🎯 Ammunition (6)
  { id: 9, name: ".22 LR Ammunition (100 rounds)", image: product1, price: 700, oldPrice: 850, rating: 4, discount: 18, category: "Ammunition", description: "High-quality .22 LR ammunition for target practice.", stock: 150 },
  { id: 10, name: ".45 ACP Ammunition (50 rounds)", image: product2, price: 1800, oldPrice: 2200, rating: 5, discount: 18, category: "Ammunition", description: "Premium .45 ACP rounds for reliable performance.", stock: 80 },
  { id: 11, name: "5.56 NATO Rifle Ammo (20 rounds)", image: product4, price: 900, oldPrice: 1100, rating: 5, discount: 18, category: "Ammunition", description: "Military-grade 5.56 NATO ammunition.", stock: 200 },
  { id: 12, name: "9mm FMJ Ammunition (50 rounds)", image: product5, price: 1200, oldPrice: 1500, rating: 4, discount: 20, category: "Ammunition", description: "Full metal jacket 9mm rounds for consistent performance.", stock: 180 },
  { id: 13, name: "12 Gauge Shotgun Shells (25 rounds)", image: product6, price: 1500, oldPrice: 1800, rating: 5, discount: 17, category: "Ammunition", description: "Powerful 12 gauge shells for hunting and sport.", stock: 120 },
  { id: 14, name: ".308 Winchester (20 rounds)", image: product4, price: 2100, oldPrice: 2600, rating: 5, discount: 19, category: "Ammunition", description: "Precision .308 Winchester for long-range shooting.", stock: 95 },

  // 🎒 Tactical Gear (9)
  { id: 15, name: "Tactical Belt (Heavy Duty Nylon)", image: product30, price: 750, oldPrice: 950, rating: 5, discount: 21, category: "Tactical Gear", description: "Heavy-duty nylon belt for gear attachment.", stock: 85 },
  { id: 16, name: "Ear Protection Headset (Noise Reduction)", image: product16, price: 1400, oldPrice: 1800, rating: 5, discount: 22, category: "Tactical Gear", description: "Advanced noise reduction for hearing protection.", stock: 60 },
  { id: 17, name: "Combat Knee & Elbow Pads Set", image: product14, price: 900, oldPrice: 1200, rating: 4, discount: 25, category: "Tactical Gear", description: "Protective gear for intense tactical operations.", stock: 75 },
  { id: 18, name: "Fingerless Tactical Gloves", image: product18, price: 650, oldPrice: 850, rating: 4, discount: 24, category: "Tactical Gear", description: "Durable fingerless gloves for enhanced grip.", stock: 90 },
  { id: 19, name: "Military Tactical Backpack (40L)", image: product24, price: 2200, oldPrice: 2800, rating: 5, discount: 21, category: "Tactical Gear", description: "Durable 40L backpack for extended missions.", stock: 40 },
  { id: 20, name: "Range Safety Glasses", image: product25, price: 600, oldPrice: 800, rating: 4, discount: 25, category: "Tactical Gear", description: "Impact-resistant safety glasses for shooting.", stock: 100 },
  { id: 21, name: "Tactical Combat Boots", image: product31, price: 3000, oldPrice: 3800, rating: 5, discount: 21, category: "Tactical Gear", description: "Durable combat boots for all terrain.", stock: 50 },
  { id: 22, name: "Tactical Vest (Plate Carrier)", image: product33, price: 3500, oldPrice: 4500, rating: 5, discount: 22, category: "Tactical Gear", description: "Modular plate carrier vest for protection.", stock: 30 },
  { id: 23, name: "Face Mask Tactical Balaclava", image: product17, price: 350, oldPrice: 500, rating: 4, discount: 30, category: "Tactical Gear", description: "Breathable tactical face mask for all conditions.", stock: 150 },

  // 🔧 Accessories (7)
  { id: 24, name: "Laser Sight Attachment", image: product22, price: 1500, oldPrice: 2000, rating: 4, discount: 25, category: "Accessories", description: "Precision laser sight for improved accuracy.", stock: 50 },
  { id: 25, name: "3x Magnifier Scope", image: product3, price: 3200, oldPrice: 4000, rating: 4, discount: 20, category: "Accessories", description: "Crystal clear 3x magnification for enhanced accuracy.", stock: 45 },
  { id: 26, name: "Red Dot Sight (Reflex Optic)", image: product26, price: 2500, oldPrice: 3200, rating: 5, discount: 22, category: "Accessories", description: "Fast target acquisition red dot sight.", stock: 35 },
  { id: 27, name: "Rifle Sling (Adjustable Tactical)", image: product27, price: 700, oldPrice: 900, rating: 4, discount: 22, category: "Accessories", description: "Adjustable tactical sling for rifle carry.", stock: 70 },
  { id: 28, name: "Tactical Kydex Holster", image: product32, price: 1200, oldPrice: 1500, rating: 4, discount: 20, category: "Accessories", description: "Secure Kydex holster for quick draw.", stock: 60 },
  { id: 29, name: "Universal Gun Cleaning Kit", image: product34, price: 850, oldPrice: 1100, rating: 4, discount: 23, category: "Accessories", description: "Complete cleaning kit for all firearms.", stock: 75 },
  { id: 30, name: "Weapon Flashlight (LED Tactical Light)", image: product35, price: 1800, oldPrice: 2300, rating: 5, discount: 22, category: "Accessories", description: "High-lumen tactical weapon light.", stock: 55 },

  // 👕 Apparel (2)
  { id: 31, name: "Ason Armory Branded Cap", image: product11, price: 500, oldPrice: 650, rating: 5, discount: 23, category: "Apparel", description: "Official Ason Armory branded tactical cap.", stock: 100 },
  { id: 32, name: "Magazine Pouch (Triple Slot)", image: product23, price: 950, oldPrice: 1200, rating: 4, discount: 21, category: "Apparel", description: "Triple magazine pouch for quick reloads.", stock: 80 },

  // 🎮 Airsoft (4)
  { id: 33, name: "Airsoft BB Pellets (0.25g – 4000 pcs)", image: product7, price: 450, oldPrice: 600, rating: 4, discount: 25, category: "Airsoft", description: "Precision airsoft BBs for competitive play.", stock: 300 },
  { id: 34, name: "Airsoft Glock 17 Gas Blowback", image: product8, price: 5200, oldPrice: 6500, rating: 5, discount: 20, category: "Airsoft", description: "Realistic gas blowback airsoft pistol.", stock: 25 },
  { id: 35, name: "Airsoft M4 Electric Rifle (AEG)", image: product9, price: 6500, oldPrice: 8000, rating: 5, discount: 19, category: "Airsoft", description: "High-performance electric airsoft rifle.", stock: 20 },
];

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const RAW_URL =
          import.meta.env.VITE_API_URL ||
          "https://ason-armory-backend.onrender.com";

        const API_URL = RAW_URL.trim().replace(/\/$/, "");

        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid data format");

        const transformed = data.map((p) => ({
          ...p,
          image: p.image?.startsWith("http")
            ? p.image.replace("http://localhost:5000", API_URL)
            : p.image,
        }));

        setProducts(transformed);
      } catch (err) {
        console.log("ℹ️ Using 35 fallback products (backend unavailable)");
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];

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

  const filteredProducts = sortProducts(
    products.filter((p) => {
      const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery);
      const matchMin = !priceRange.min || p.price >= Number(priceRange.min);
      const matchMax = !priceRange.max || p.price <= Number(priceRange.max);
      return matchCategory && matchSearch && matchMin && matchMax;
    })
  );

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

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-gold" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h3 className="mt-3">Loading 35 products...</h3>
      </div>
    );
  }

  return (
    <>
      <section className="products-header">
        <div className="container">
          <h1>
            All <span className="text-gold">Products</span>
          </h1>
          <p>Discover our premium collection</p>
        </div>
      </section>

      <section className="products-content">
        <div className="container">
          <div className="row">
            {/* Sidebar Filters - Inline (not using Sidebar component) */}
            <div className="col-lg-3">
              <div className="filters-sidebar">
                <h3 className="filters-title">Filters</h3>
                
                <div className="filter-section">
                  <h4>Categories</h4>
                  <div className="category-list">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
                        onClick={() => setSelectedCategory(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="filter-section">
                  <h4>Price Range</h4>
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

                <button className="btn-reset-filters" onClick={resetFilters}>
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="col-lg-9">
              <div className="products-toolbar">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="search products..."
                    className="search-input"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <i className="fas fa-search search-icon"></i>
                </div>

                <div className="sort-box">
                  <span>Sort:</span>
                  <select
                    className="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name-asc">Name: A-Z</option>
                    <option value="name-desc">Name: Z-A</option>
                  </select>
                </div>

                <div className="results-count">
                  Showing {filteredProducts.length} of {products.length} products
                </div>
              </div>

              {(sortBy || selectedCategory !== "All") && (
                <div className="active-filters">
                  {selectedCategory !== "All" && (
                    <span className="filter-tag">
                      {selectedCategory}
                      <button onClick={() => setSelectedCategory("All")}>×</button>
                    </span>
                  )}
                  {sortBy && (
                    <span className="filter-tag">
                      Sort: {sortBy}
                      <button onClick={() => setSortBy("")}>×</button>
                    </span>
                  )}
                </div>
              )}

              <div className="row g-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <div className="col-lg-4 col-md-6" key={p.id}>
                      <ProductCard product={p} />
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-5">
                    <h4 className="text-muted">No products found</h4>
                    <p className="text-muted small">Try adjusting your filters or search terms</p>
                    <button className="btn btn-outline-gold mt-2" onClick={resetFilters}>
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