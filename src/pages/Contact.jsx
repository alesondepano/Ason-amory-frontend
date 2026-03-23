const Contact = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container text-center">
          <h1 className="contact-title">Get in <span className="text-gold">Touch</span></h1>
          <p className="contact-subtitle">We'd love to hear from you. Send us a message!</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-card">
              <div className="form-banner">
                <h3>Send Us a Message</h3>
              </div>
              <div className="form-body">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input id="name" type="text" className="form-control custom-input" placeholder="Your name" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input id="email" type="email" className="form-control custom-input" placeholder="your@email.com" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <input id="phone" type="tel" className="form-control custom-input" placeholder="+63 XXX XXX XXXX" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input id="subject" type="text" className="form-control custom-input" placeholder="What is this about?" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea id="message" className="form-control custom-textarea" rows="5" placeholder="Your message..."></textarea>
                  </div>

                  <button type="submit" className=" btn-submit">
                    <i className="fas fa-paper-plane"></i>
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="contact-info-card">
              <div className="info-banner">
                <h3>Contact Information</h3>
              </div>
              <div className="info-body">
                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="info-details">
                    <h5>Address</h5>
                    <p>Sampaloc, Manila, Philippines</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="info-details">
                    <h5>Email</h5>
                    <p>asonarmoryco@gmail.com</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="info-details">
                    <h5>Phone</h5>
                    <p>+63 367 976 0127</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="info-details">
                    <h5>Business Hours</h5>
                    <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="social-section">
                  <h5>Follow Us</h5>
                  <div className="social-links">
                    <a href="https://www.facebook.com/aleson.depano.31" target="_blank" rel="noopener noreferrer" className="social-link">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.instagram.com/alesondepano/" target="_blank" rel="noopener noreferrer" className="social-link">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://github.com/alesondepano" target="_blank" rel="noopener noreferrer" className="social-link">
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map">
        <div className="container">
          <div className="map-banner text-center mb-4">
            <h3>Our Location</h3>
          </div>
          <div className="map-container">
            <iframe 
              title="Ason Armory Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.911375607084!2d120.98604977574124!3d14.60412417698908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9f8b14eb259%3A0xad4d12caac9a068e!2sFEU%20Institute%20of%20Technology!5e0!3m2!1sen!2sph!4v1774011840669!5m2!1sen!2sph"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;