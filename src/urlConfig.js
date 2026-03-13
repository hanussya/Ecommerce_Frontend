
// const BASE_URL = "http://localhost:8080";

const BASE_URL = 'https://ecommerce-backend-t7ic.onrender.com';

const urlConfig = {
  LOGIN_URL: `${BASE_URL}/api/auth/login`,
  SIGNUP_URL: `${BASE_URL}/api/auth/signup`,
  LOGOUT_URL: `${BASE_URL}/api/auth/logout`,
  GET_PRODUCTS: `${BASE_URL}/api/product/`,
  GET_CATEGORIES: `${BASE_URL}/api/product/categories`,
  BOOKING_URL: `${BASE_URL}/api/booking`
};

export default urlConfig;