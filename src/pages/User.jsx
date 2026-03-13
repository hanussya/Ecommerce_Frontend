import React from 'react';
import { useAuth } from '../contexts/AuthProvider';

function User() {
  const { authenticatedUser } = useAuth();
  const name = authenticatedUser?.name || "Guest User";
  const email = authenticatedUser?.email || "No email available";
  const initial = name?.charAt(0)?.toUpperCase() || "G";

  return (
    <div className="page_container">
      <div className="user_card">
        <div className="user_top">
          <div className="user_avatar">{initial}</div>

          <div className="user_info">
            <h2>{name}</h2>
            <p>{email}</p>
          </div>
        </div>

        <div className="user_grid">
          <div className="info_box">
            <h4>Account Status</h4>
            <p>
              {authenticatedUser ? "Signed in and ready to use protected routes." : "Browsing as guest."}
            </p>
          </div>

          <div className="info_box">
            <h4>Shopping Profile</h4>
            <p>
              Save your cart, manage product browsing, and continue your shopping flow from one place.
            </p>
          </div>

          <div className="info_box">
            <h4>Orders</h4>
            <p>
              This section can later show order history, shipping status, and payment summaries.
            </p>
          </div>

          <div className="info_box">
            <h4>Preferences</h4>
            <p>
              Add profile settings, address details, and account controls here when you expand the project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;