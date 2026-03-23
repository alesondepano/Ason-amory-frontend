const Footer = () => {
  return (
    <footer className="bg-dark">
      <div className="container">
        <div className="text-center">
          {/* Social Icons */}
          <div className="mb-3">
            <a href="https://www.facebook.com/aleson.depano.31" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/alesondepano/" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://github.com/alesondepano" target="_blank" rel="noopener noreferrer" className="text-light mx-2">
              <i className="fab fa-github"></i>
            </a>
          </div>
          
          {/* Copyright */}
          <p className="mb-0 small">
            &copy; {new Date().getFullYear()} Ason Armory Co. | Designed by <span className="text-warning">aleson depano</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;