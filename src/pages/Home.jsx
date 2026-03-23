import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from "../components/ProductCard";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";
import banner5 from "../assets/banner5.png";
import logo from "../assets/logo.png";

// ✅ Fallback products (if API fails)
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

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
      
        const RAW_URL = import.meta.env.VITE_API_URL || "https://ason-armory-backend.onrender.com";
        const API_URL = RAW_URL.trim().replace(/\/$/, "");
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        setProducts(data.slice(0, 4));
      } catch (err) {
        console.warn("⚠️ Backend not available, using fallback data:", err.message);
        setError("Using demo data (backend not connected)");
        setProducts(FALLBACK_PRODUCTS.slice(0, 4));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* Hero Section - Carousel */}
      <section className="home-hero">
        <div className="container">
          <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
            </div>

            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={banner1} className="d-block w-100 banner-img" alt="Premium tactical gear collection" loading="lazy" />
                <div className="carousel-caption d-none d-md-block">
                  <img src={logo} alt="Ason Armory Logo" className="banner-logo" loading="lazy" />
                  <p>Quality Gear. Trusted Performance.</p>
                </div>
              </div>

              <div className="carousel-item">
                <img src={banner2} className="d-block w-100 banner-img" alt="Tactical vests showcase" loading="lazy" />
                <div className="carousel-caption d-none d-md-block">
                  <img src={logo} alt="Ason Armory Logo" className="banner-logo" loading="lazy" />
                  <p>Premium Tactical Vests</p>
                </div>
              </div>

              <div className="carousel-item">
                <img src={banner3} className="d-block w-100 banner-img" alt="Action-ready equipment" loading="lazy" />
                <div className="carousel-caption d-none d-md-block">
                  <img src={logo} alt="Ason Armory Logo" className="banner-logo" loading="lazy" />
                  <p>Built for Action</p>
                </div>
              </div>

              <div className="carousel-item">
                <img src={banner4} className="d-block w-100 banner-img" alt="Precision equipment display" loading="lazy" />
                <div className="carousel-caption d-none d-md-block">
                  <img src={logo} alt="Ason Armory Logo" className="banner-logo" loading="lazy" />
                  <p>Precision Equipment</p>
                </div>
              </div>

              <div className="carousel-item">
                <img src={banner5} className="d-block w-100 banner-img" alt="Complete your loadout" loading="lazy" />
                <div className="carousel-caption d-none d-md-block">
                  <img src={logo} alt="Ason Armory Logo" className="banner-logo" loading="lazy" />
                  <p>Complete Your Loadout</p>
                </div>
              </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="home-products">
        <div className="container">
          <div className="products-title-banner">
            <h2 className="section-title">
              Featured <span className="text-gold">Products</span>
            </h2>
            
            <Link to="/products" className="btn-view-more">
              View More Products
            </Link>
          </div>

          {loading && (
            <div className="text-center py-4">
              <div className="spinner-border text-gold" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="alert alert-warning text-center mb-3">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}

          {!loading && products.length > 0 && (
            <div className="row g-3 g-md-4">
              {products.map(product => (
                <div className="col-lg-3 col-md-4 col-sm-6" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="col-12 text-center text-muted py-4">
              <p>No products available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;