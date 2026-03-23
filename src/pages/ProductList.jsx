import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";

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

// ✅ Additional fallback images (reuse with different products)
import fallbackGeneric from "../assets/logo.png";

const FALLBACK_PRODUCTS = [
  // Firearms (8)
  { id: 1, name: "Glock 17 Gen 5 (9mm Pistol)", price: 48000, category: "Firearms", image: product20 },
  { id: 2, name: "SIG Sauer P320 (9mm Modular Pistol)", price: 52000, category: "Firearms", image: product28 },
  { id: 3, name: "Smith & Wesson M&P 15 Sport II", price: 65000, category: "Firearms", image: fallbackGeneric },
  { id: 4, name: "Ruger 10/22 Carbine (.22 LR)", price: 28000, category: "Firearms", image: fallbackGeneric },
  { id: 5, name: "Beretta 92FS (9mm Pistol)", price: 45000, category: "Firearms", image: fallbackGeneric },
  { id: 6, name: "Springfield XD-M Elite (9mm)", price: 49500, category: "Firearms", image: fallbackGeneric },
  { id: 7, name: "CZ 75 SP-01 (9mm Pistol)", price: 47000, category: "Firearms", image: fallbackGeneric },
  { id: 8, name: "Heckler & Koch VP9 (9mm)", price: 54000, category: "Firearms", image: fallbackGeneric },

  // Ammunition (7)
  { id: 9, name: ".22 LR Ammunition (100 rounds)", price: 700, category: "Ammunition", image: product1 },
  { id: 10, name: "9mm Luger FMJ (50 rounds)", price: 1200, category: "Ammunition", image: fallbackGeneric },
  { id: 11, name: ".45 ACP Hollow Point (20 rounds)", price: 1800, category: "Ammunition", image: fallbackGeneric },
  { id: 12, name: "5.56x45mm NATO (20 rounds)", price: 950, category: "Ammunition", image: fallbackGeneric },
  { id: 13, name: "12 Gauge Buckshot (10 rounds)", price: 850, category: "Ammunition", image: fallbackGeneric },
  { id: 14, name: ".308 Winchester (20 rounds)", price: 2100, category: "Ammunition", image: fallbackGeneric },
  { id: 15, name: ".380 ACP Practice (50 rounds)", price: 1100, category: "Ammunition", image: fallbackGeneric },

  // Tactical Gear (7)
  { id: 16, name: "Tactical Belt (Heavy Duty Nylon)", price: 750, category: "Tactical Gear", image: product30 },
  { id: 17, name: "Ear Protection Headset (Noise Reduction)", price: 1400, category: "Tactical Gear", image: product16 },
  { id: 18, name: "Tactical Vest (Modular Plate Carrier)", price: 3500, category: "Tactical Gear", image: fallbackGeneric },
  { id: 19, name: "Combat Gloves (Reinforced Knuckle)", price: 950, category: "Tactical Gear", image: fallbackGeneric },
  { id: 20, name: "Tactical Backpack (30L MOLLE)", price: 2800, category: "Tactical Gear", image: fallbackGeneric },
  { id: 21, name: "Knee & Elbow Pad Set (Hard Shell)", price: 1650, category: "Tactical Gear", image: fallbackGeneric },
  { id: 22, name: "Tactical Flashlight (1000 Lumens)", price: 1200, category: "Tactical Gear", image: fallbackGeneric },

  // Accessories (7)
  { id: 23, name: "Laser Sight Attachment", price: 1500, category: "Accessories", image: product22 },
  { id: 24, name: "Red Dot Sight (Reflex)", price: 3200, category: "Accessories", image: fallbackGeneric },
  { id: 25, name: "Weapon Cleaning Kit (Universal)", price: 850, category: "Accessories", image: fallbackGeneric },
  { id: 26, name: "Magazine Pouch (Double Stack)", price: 650, category: "Accessories", image: fallbackGeneric },
  { id: 27, name: "Bipod (Adjustable 6-9 inch)", price: 1900, category: "Accessories", image: fallbackGeneric },
  { id: 28, name: "Suppressor Mount (Threaded)", price: 2400, category: "Accessories", image: fallbackGeneric },
  { id: 29, name: "Gun Case (Hard Shell, Foam Lined)", price: 2100, category: "Accessories", image: fallbackGeneric },

  // Apparel (4)
  { id: 30, name: "Ason Armory Branded Cap", price: 500, category: "Apparel", image: product11 },
  { id: 31, name: "Tactical T-Shirt (Moisture-Wicking)", price: 850, category: "Apparel", image: fallbackGeneric },
  { id: 32, name: "Cargo Pants (Ripstop Fabric)", price: 1950, category: "Apparel", image: fallbackGeneric },
  { id: 33, name: "Operator Hoodie (Reinforced)", price: 1600, category: "Apparel", image: fallbackGeneric },

  // Airsoft (2)
  { id: 34, name: "Airsoft BB Pellets (0.25g – 4000 pcs)", price: 450, category: "Airsoft", image: product7 },
  { id: 35, name: "Airsoft Spring Pistol (Green Gas)", price: 3200, category: "Airsoft", image: fallbackGeneric },
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

        // ✅ Show ALL products from API (no slice)
        setProducts(data);
      } catch (err) {
        // 🤫 Silent fallback - no user-facing error
        console.log("ℹ️ Using 35 fallback products (backend unavailable)");
        // ✅ Show ALL 35 fallback products
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Categories (fallback-safe)
  const categories = ["All", ...new Set(products.map((p) => p.category).filter(Boolean))];

  // ✅ Sorting
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

  // ✅ Filtering
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

  // Handlers
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

  // Loading state
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
      {/* Header */}
      <section className="products-header">
        <div className="container">
          <h1>
            All <span className="text-gold">Products</span>
          </h1>
          <p className="text-muted">
            {searchQuery
              ? `Search results for "${searchQuery}" (${filteredProducts.length} found)`
              : `Browse our full collection (${products.length} items)`}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="products-content">
        <div className="container">
          <div className="row">

            {/* Sidebar */}
            <div className="col-lg-3">
              <Sidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              <div className="mt-3">
                <label className="form-label small text-muted">Price Range (₱)</label>
                <input
                  type="number"
                  name="min"
                  placeholder="Min"
                  className="form-control mb-2"
                  value={priceRange.min}
                  onChange={handlePriceChange}
                />
                <input
                  type="number"
                  name="max"
                  placeholder="Max"
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

              {/* Category count badge */}
              <div className="mt-3 p-2 bg-light rounded small">
                <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products shown
              </div>
            </div>

            {/* Products Grid */}
            <div className="col-lg-9">
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <input
                  className="form-control"
                  style={{ width: "220px" }}
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />

                <select
                  className="form-select"
                  style={{ width: "200px" }}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="">Sort by</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>

              {/* Product Grid */}
              <div className="row g-3">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => (
                    <div className="col-lg-4 col-md-6 col-sm-6" key={p.id}>
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

              {/* Results footer */}
              {filteredProducts.length > 0 && (
                <div className="text-center text-muted small mt-4">
                  Showing {filteredProducts.length} of {products.length} products
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ProductList;