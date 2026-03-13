import { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import PageNotFound from './pages/PageNotFound';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from "./pages/Cart";
import User from './pages/User';
import Checkout from './pages/Checkout';
import PaginationProvider from './contexts/PaginationContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider from './contexts/AuthProvider';
import RequireAuth from './components/RequireAuth';

function App() {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    setShowNavbar(
      location.pathname !== "/signup" && location.pathname !== "/login"
    );
  }, [location]);

  return (
    <AuthProvider>
      <PaginationProvider>
        {showNavbar && <NavBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route element={<RequireAuth />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/user" element={<User />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </PaginationProvider>
    </AuthProvider>
  );
}

export default App;