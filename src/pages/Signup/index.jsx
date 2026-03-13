import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import urlConfig from "../../urlConfig";
import "./signup.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrMsg("Passwords do not match.");
      setTimeout(() => setErrMsg(""), 2500);
      return;
    }

    try {
      setLoading(true);
      setErrMsg("");

      const userDetails = { name, email, password, confirmPassword };
      await axios.post(urlConfig.SIGNUP_URL, userDetails);

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (err) {
      setErrMsg(err?.response?.data?.message || "Signup failed. Please try again.");
      setTimeout(() => {
        setErrMsg("");
      }, 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth_screen signup_screen">
      <div className="auth_card">
        <div className="auth_left">
          <p className="auth_badge">Create account</p>
          <h1>Start your shopping journey with us</h1>
          <p className="auth_text">
            Sign up to save products, manage your orders, and enjoy a smoother ecommerce experience.
          </p>
          <div className="auth_feature_list">
            <span>Fast signup</span>
            <span>Track cart and purchases</span>
            <span>Modern shopping UI</span>
          </div>
        </div>

        <div className="auth_right">
          <div className="auth_header">
            <h2>Sign Up</h2>
            <p>Create your account in just a few steps</p>
          </div>

          <form className="auth_form" onSubmit={handleSubmit}>
            <label htmlFor="signup-name">Name</label>
            <input
              id="signup-name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label htmlFor="signup-confirm-password">Confirm Password</label>
            <input
              id="signup-confirm-password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {errMsg && <div className="errContainer">{errMsg}</div>}

            <button type="submit" className="auth_btn" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="auth_footer_text">
            Already have an account?{" "}
            <Link to="/login" className="auth_link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;