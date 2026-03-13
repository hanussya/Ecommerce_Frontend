import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { useSelector } from "react-redux";

function Cart() {
  const productList = useSelector((store) => store.cartReducer.cartProducts);

  const totalPrice = productList.reduce((sum, item) => {
    return sum + (item.price * item.indQuantity);
  }, 0);

  const totalItems = productList.reduce((sum, item) => {
    return sum + item.indQuantity;
  }, 0);

  return (
    <>
      <div className="cart_page_header">
        <h1 className="section_title">Your Cart</h1>
        <p className="section_subtitle">
          Review your selected items and continue shopping whenever you like.
        </p>
      </div>

      <div className="cart_product_wrapper">
        {productList.length ? (
          <>
            <div className="product_wrapper" style={{ padding: 0, margin: 0 }}>
              <ProductList productList={productList} />
            </div>

            <div className="cart_summary">
              <div className="cart_summary_text">
                {totalItems} item{totalItems !== 1 ? "s" : ""} in cart
              </div>
              <div className="cart_total">Total: ${totalPrice.toFixed(2)}</div>
            </div>
          </>
        ) : (
          <div className="empty_state">
            <h2>Your cart is empty</h2>
            <p>
              Browse products and add something you like. Your selected products will appear here.
            </p>
            <Link to="/" className="primary_btn">Continue Shopping</Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;