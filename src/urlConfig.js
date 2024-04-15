
const BASE_URL = import.meta.env.VITE_BASE_URL
console.log("base url",import.meta.env.VITE_BASE_URL) // "123"
// console.log(import.meta.env.DB_PASSWORD) // undefined
const urlConfig = {
LOGIN_URL: `${BASE_URL}/api/auth/login`,
SIGNUP_URL: `${BASE_URL}/api/auth/signup`,
LOGOUT_URL: `${BASE_URL}/api/auth/logout`,
GET_PRODUCTS: `${BASE_URL}/api/product/`,
GET_CATEGORIES: `${BASE_URL}/api/product/categories`,
}
export default urlConfig;