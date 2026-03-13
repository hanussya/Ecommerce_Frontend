import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="not_found_wrapper">
      <div className="not_found_card">
        <div className="not_found_code">404</div>
        <h1>Page not found</h1>
        <p>
          The page you are trying to open does not exist or may have been moved.
          Go back to the homepage and continue browsing products.
        </p>

        <Link to="/" className="primary_btn">Back to Home</Link>
      </div>
    </div>
  );
}

export default PageNotFound;