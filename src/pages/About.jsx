import { useEffect } from "react";
import { Link } from "react-router-dom";
import aboutImage from "../assets/about.png";

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container text-center">
          <h1 className="about-title">
            About <span className="text-gold">Ason Armory Co.</span>
          </h1>
          <p className="about-subtitle">
            Your Trusted Partner in Premium Tactical Gear
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="about-content">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4">
              <div className="about-image-wrapper">
                <img
                  src={aboutImage}
                  alt="About Ason Armory"
                  className="img-fluid about-image"
                />
              </div>
            </div>

            <div className="col-lg-6">
              <h2 className="section-title">Our Story</h2>
              <p className="about-text">
                Ason Armory Co. was founded with a single mission: to provide
                high-quality tactical gear and equipment at affordable prices.
                We believe that everyone deserves access to premium protection
                and performance gear without breaking the bank.
              </p>
              <p className="about-text">
                From tactical vests to precision equipment, every product in our
                collection is carefully selected to meet the highest standards
                of durability and functionality.
              </p>

              <div className="about-stats mt-4">
                <div className="row text-center">
                  <div className="col-4">
                    <div className="stat-box">
                      <h3 className="stat-number text-gold">500+</h3>
                      <p className="stat-label">Products</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="stat-box">
                      <h3 className="stat-number text-gold">1000+</h3>
                      <p className="stat-label">Customers</p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="stat-box">
                      <h3 className="stat-number text-gold">100%</h3>
                      <p className="stat-label">Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="container">
          <h2 className="section-title text-center mb-5">Our Values</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="value-card">
                <div className="value-icon-wrapper">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h4>Quality First</h4>
                <p>
                  Every product is tested for durability and performance in
                  real-world conditions.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="value-card">
                <div className="value-icon-wrapper">
                  <i className="fas fa-hand-holding-usd"></i>
                </div>
                <h4>Affordable Prices</h4>
                <p>
                  Premium gear shouldn't cost a fortune. We keep our prices
                  competitive.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="value-card">
                <div className="value-icon-wrapper">
                  <i className="fas fa-truck"></i>
                </div>
                <h4>Fast Shipping</h4>
                <p>
                  Quick and reliable delivery to get your gear when you need it
                  most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="about-why">
        <div className="container">
          <h2 className="section-title text-center mb-5">
            Why Choose <span className="text-gold">Ason Armory?</span>
          </h2>
          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="why-card">
                <div className="why-icon-wrapper">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h5>Verified Quality</h5>
                <p>All products undergo strict quality checks.</p>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="why-card">
                <div className="why-icon-wrapper">
                  <i className="fas fa-undo"></i>
                </div>
                <h5>Easy Returns</h5>
                <p>30-day return policy.</p>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="why-card">
                <div className="why-icon-wrapper">
                  <i className="fas fa-headset"></i>
                </div>
                <h5>24/7 Support</h5>
                <p>Our team is always ready.</p>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="why-card">
                <div className="why-icon-wrapper">
                  <i className="fas fa-lock"></i>
                </div>
                <h5>Secure Payment</h5>
                <p>Industry-standard encryption.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container text-center">
          <h2 className="cta-title">Ready to Gear Up?</h2>
          <p className="cta-text mb-4">
            Explore our collection of premium tactical equipment.
          </p>
          <Link to="/products" className="btn btn-cta">
            Shop Now
          </Link>
        </div>
      </section>
    </>
  );
};

export default About;
