import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';
import urlConfig from '../../urlConfig';
import { useAuth } from "../../contexts/AuthProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAuthenticatedUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrMsg("");

      const userDetails = { email, password };
      const res = await axios.post(urlConfig.LOGIN_URL, userDetails, {
        withCredentials: true
      });

      setAuthenticatedUser(res.data.user);
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (err) {
      setErrMsg(err?.response?.data?.message || "Login failed. Please try again.");
      setTimeout(() => {
        setErrMsg("");
      }, 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth_screen signin_screen">
      <div className="auth_card">
        <div className="auth_left">
          <p className="auth_badge">Welcome back</p>
          <h1>Sign in to continue shopping</h1>
          <p className="auth_text">
            Access your cart, manage your orders, and continue browsing your favorite products.
          </p>
          <div className="auth_feature_list">
            <span>Secure sign in</span>
            <span>Quick access to cart</span>
            <span>Clean shopping experience</span>
          </div>
        </div>

        <div className="auth_right">
          <div className="auth_header">
            <h2>Sign In</h2>
            <p>Enter your details to access your account</p>
          </div>

          <form className="auth_form" onSubmit={handleSubmit}>
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {errMsg && <div className="errContainer">{errMsg}</div>}

            <button type="submit" className="auth_btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="auth_footer_text">
            Don't have an account?{" "}
            <Link to="/signup" className="auth_link">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;