const Policies = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="policies-hero">
        <div className="container text-center">
          <h1 className="policies-title">
            Store <span className="text-gold">Policies</span>
          </h1>
          <p className="policies-subtitle">
            Terms & Conditions for Ason Armory Co.
          </p>
        </div>
      </section>

      {/* Policies Content */}
      <section className="policies-content">
        <div className="container">
          <div className="policies-grid">

            {/* Payment */}
            <div className="policy-card">
              <div className="policy-banner">
                <h3>1. Payment</h3>
              </div>
              <div className="policy-body">
                <ul>
                  <li>All payments must be completed at the time of order.</li>
                  <li>
                    We accept <strong>GCash, PayMaya, and major credit/debit cards</strong>.
                  </li>
                  <li>Please ensure your payment details are correct before confirming.</li>
                </ul>
              </div>
            </div>

            {/* Shipping */}
            <div className="policy-card">
              <div className="policy-banner">
                <h3>2. Shipping</h3>
              </div>
              <div className="policy-body">
                <ul>
                  <li>
                    Orders are shipped within <strong>1–3 business days</strong> after payment confirmation.
                  </li>
                  <li>Delivery time may vary depending on your location.</li>
                  <li>Tracking information will be provided once your order is shipped.</li>
                </ul>
              </div>
            </div>

            {/* Returns & Refunds */}
            <div className="policy-card">
              <div className="policy-banner">
                <h3>3. Returns & Refunds</h3>
              </div>
              <div className="policy-body">
                <ul>
                  <li>
                    Return requests are accepted within <strong>7 days</strong> of receiving your order only if the product is defective or damaged.
                  </li>
                  <li>Items must be unused and in original packaging.</li>
                  <li>Refunds will be processed once the returned item is inspected.</li>
                  <li>
                    Return shipping costs are the buyer&apos;s responsibility unless the item is defective.
                  </li>
                </ul>
              </div>
            </div>

            {/* Order Cancellations */}
            <div className="policy-card">
              <div className="policy-banner">
                <h3>4. Order Cancellations</h3>
              </div>
              <div className="policy-body">
                <ul>
                  <li>
                    Orders can be cancelled within <strong>24 hours</strong> of purchase.
                  </li>
                  <li>After this period, cancellations cannot be guaranteed.</li>
                  <li>Double-check your order before confirming payment.</li>
                </ul>
              </div>
            </div>

            {/* Store Rules */}
            <div className="policy-card">
              <div className="policy-banner">
                <h3>5. Store Rules & Conduct</h3>
              </div>
              <div className="policy-body">
                <ul>
                  <li>Provide accurate shipping information to avoid delays.</li>
                  <li>
                    ASON Armory Co. reserves the right to cancel orders that appear fraudulent or suspicious.
                  </li>
                  <li>Abusive or disrespectful behavior toward our staff will not be tolerated.</li>
                </ul>
              </div>
            </div>

            {/* Privacy */}
            <div className="policy-card">
              <div className="policy-banner">
                <h3>6. Privacy</h3>
              </div>
              <div className="policy-body">
                <p>
                  Your personal information is kept confidential and will only be used to process orders.
                  We do not share your data with third-party companies for marketing purposes.
                </p>
              </div>
            </div>

            {/* Agreement */}
            <div className="policy-card full-width">
              <div className="policy-banner">
                <h3>7. Agreement</h3>
              </div>
              <div className="policy-body">
                <p>
                  By purchasing from <strong>ASON Armory Co.</strong>, you agree to follow our store policies.
                  We reserve the right to update these policies at any time; changes will be posted on this page.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Policies;