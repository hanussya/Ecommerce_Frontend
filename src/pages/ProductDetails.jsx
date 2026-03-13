import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function ProductDetails() {
  const location = useLocation();
  const product = location.state?.product;

  if (!product) {
    return (
      <div className="details_page">
        <div className="empty_state">
          <h2>Product details unavailable</h2>
          <p>
            This page needs product data from the product list. Open a product from the home page to see its details.
          </p>
          <Link to="/" className="primary_btn">Go to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="details_page">
      <div className="details_card">
        <div className="details_image_wrap">
          <img
            src={product.productImages?.[0] || product.image}
            alt={product.name || product.title}
            className="details_image"
          />
        </div>

        <div className="details_content">
          <div className="details_badge">{product.categories || "Product"}</div>

          <h1 className="details_title">{product.name || product.title}</h1>
          <p className="details_price">${product.price}</p>

          <p className="details_description">
            {product.description || "No detailed description is available for this product yet."}
          </p>

          <div className="details_meta">
            <span>Category: {product.categories || "N/A"}</span>
            <span>Product ID: {product._id || product.id}</span>
          </div>

          <Link to="/" className="primary_btn">Back to Products</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;