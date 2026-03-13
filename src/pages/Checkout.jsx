import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import urlConfig from '../urlConfig';

function Checkout() {
  const cartProducts = useSelector((store) => store.cartReducer.cartProducts);
  const navigate = useNavigate();
  const [payingId, setPayingId] = useState("");

  const totalItems = useMemo(() => {
    return cartProducts.reduce((sum, item) => sum + item.indQuantity, 0);
  }, [cartProducts]);

  const totalPrice = useMemo(() => {
    return cartProducts.reduce((sum, item) => sum + Number(item.price) * item.indQuantity, 0);
  }, [cartProducts]);

  const handleCheckout = async (product) => {
    try {
      setPayingId(product.id);

      const amount = Number(product.price) * product.indQuantity * 100;

      const res = await axios.post(
        `${urlConfig.BOOKING_URL}/${product.id}`,
        { priceAtBooking: amount },
        { withCredentials: true }
      );

      const { razorpayOrder } = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'ShopZone',
        description: product.title,
        order_id: razorpayOrder.id,
        handler: function () {
          alert('Payment initiated successfully. Confirmation depends on backend verification.');
          navigate('/cart');
        },
        theme: {
          color: '#7c3aed'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Checkout failed');
    } finally {
      setPayingId("");
    }
  };

  if (!cartProducts.length) {
    return (
      <div className="page_container">
        <div className="empty_state">
          <h2>No items to checkout</h2>
          <p>Your cart is empty. Add some products before continuing to checkout.</p>
          <Link to="/" className="primary_btn">Go Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page_container">
      <h1 className="section_title">Checkout</h1>
      <p className="section_subtitle">Review your items and pay product by product.</p>

      <div className="product_wrapper" style={{ padding: 0 }}>
        {cartProducts.map((product) => (
          <div className="product" key={product.id}>
            <img
              src={product.image}
              alt={product.title}
              className="product_image"
            />

            <div className="product_meta">
              <p className="product_title">{product.title}</p>
              <p className="product_price">${Number(product.price) * product.indQuantity}</p>
              <p className="product_category">Qty: {product.indQuantity}</p>
            </div>

            <button
              className="primary_btn"
              style={{ width: "100%", marginTop: "1rem" }}
              onClick={() => handleCheckout(product)}
              disabled={payingId === product.id}
            >
              {payingId === product.id ? "Processing..." : "Pay Now"}
            </button>
          </div>
        ))}
      </div>

      <div className="cart_summary">
        <div className="cart_summary_text">
          {totalItems} item{totalItems !== 1 ? "s" : ""} in checkout
        </div>
        <div className="cart_total">Total: ${totalPrice.toFixed(2)}</div>
      </div>
    </div>
  );
}

export default Checkout;