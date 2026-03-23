// ✅ Remove unused useState import - only import what you use
const Sidebar = ({ 
  categories = [], 
  selectedCategory, 
  onCategoryChange,
  priceRange = { min: '', max: '' },
  onPriceChange,
  onApplyPrice,
  onReset 
}) => {
  // Default categories if not provided
  const defaultCategories = [
    'All',
    'Firearms',
    'Ammunition',
    'Airsoft',
    'Tactical Gear',
    'Accessories',
    'Apparel'
  ];
  
  const categoryList = categories.length > 0 ? categories : defaultCategories;

  // Handle category click
  const handleCategoryClick = (category) => {
    onCategoryChange?.(category);
  };

  // Handle price input change - only allow numbers
  const handlePriceInputChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || /^\d+$/.test(value)) {
      onPriceChange?.(e);
    }
  };

  return (
    <aside className="sidebar-card">
      {/* Sidebar Header */}
      <div className="sidebar-banner">
        <h3 className="sidebar-title">
          <i className="fas fa-filter me-2"></i>
          Filters
        </h3>
      </div>

      <div className="sidebar-body p-3">
        {/* ✅ Category Filter - Always show */}
        <h6 className="fw-bold mb-3">Categories</h6>
        <ul className="sidebar-list list-unstyled mb-4">
          {categoryList.map((category) => (
            <li key={category} className="sidebar-item">
              <button
                type="button"
                className={`sidebar-link w-100 text-start ${
                  selectedCategory === category ? 'active' : ''
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <span>{category}</span>
                {selectedCategory === category && (
                  <i className="fas fa-check ms-auto text-gold"></i>
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* ✅ Price Range Filter - Only show if props are provided */}
        {onPriceChange && (
          <>
            <h6 className="fw-bold mb-3">Price Range</h6>
            <div className="price-filter">
              <div className="d-flex gap-2 mb-2">
                <input
                  type="text"
                  inputMode="numeric"
                  name="min"
                  className="form-control form-control-sm"
                  placeholder="Min ₱"
                  value={priceRange.min}
                  onChange={handlePriceInputChange}
                  aria-label="Minimum price"
                />
                <input
                  type="text"
                  inputMode="numeric"
                  name="max"
                  className="form-control form-control-sm"
                  placeholder="Max ₱"
                  value={priceRange.max}
                  onChange={handlePriceInputChange}
                  aria-label="Maximum price"
                />
              </div>
              <button 
                className="btn btn-sm btn-outline-gold w-100"
                onClick={onApplyPrice}
                type="button"
              >
                <i className="fas fa-filter me-1"></i>
                Apply Price Filter
              </button>
            </div>
          </>
        )}

        {/* ✅ Reset Button - Only show if onReset is provided */}
        {onReset && (
          <button 
            className="btn btn-outline-secondary w-100 mt-3"
            onClick={onReset}
            type="button"
          >
            <i className="fas fa-undo me-1"></i>
            Reset All Filters
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;