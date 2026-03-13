import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from "react-redux";

function NavBar() {
  const quantity = useSelector((store) => store.cartReducer.cartQuantity);

  return (
    <div className="navbar">
      <Link to="/" className="nav_brand">ShopZone</Link>

      <div className="nav_links">
        <Link to="/">Home</Link>
        <Link to="/user">Profile</Link>
        <Link to="/cart">
          <div className="cart_container">
            <ShoppingCartIcon />
            <div className="cart_quantity">{quantity}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;