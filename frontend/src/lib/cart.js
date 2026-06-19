import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TOKEN_KEY = "mpk-cart-token";

export const getCartToken = () => localStorage.getItem(TOKEN_KEY) || null;
export const setCartToken = (t) => (t ? localStorage.setItem(TOKEN_KEY, t) : localStorage.removeItem(TOKEN_KEY));

export const apiAddToCart = async (packageId) => {
  const cart_token = getCartToken();
  const { data } = await axios.post(`${API}/cart/add`, { package_id: packageId, cart_token });
  if (data.cart_token) setCartToken(data.cart_token);
  // Notify listeners (Header badge)
  window.dispatchEvent(new CustomEvent("mpk-cart-updated"));
  return data;
};

export const apiGetCart = async () => {
  const cart_token = getCartToken();
  if (!cart_token) return { cart_token: null, items: [], subtotal: 0, currency: "xof" };
  const { data } = await axios.get(`${API}/cart`, { params: { cart_token } });
  return data;
};

export const apiRemoveFromCart = async (packageId) => {
  const cart_token = getCartToken();
  if (!cart_token) return;
  await axios.delete(`${API}/cart/item/${packageId}`, { params: { cart_token } });
  window.dispatchEvent(new CustomEvent("mpk-cart-updated"));
};

export const apiCartUpsell = async (customerEmail) => {
  const { data } = await axios.get(`${API}/cart/upsell`, { params: { customer_email: customerEmail || undefined } });
  return data;
};

export const apiCartCheckout = async ({ customer_email, include_upsell }) => {
  const cart_token = getCartToken();
  if (!cart_token) throw new Error("Cart vide");
  const { data } = await axios.post(`${API}/cart/checkout`, {
    cart_token,
    origin_url: window.location.origin,
    customer_email,
    include_upsell,
  });
  return data;
};

export const apiCartFinalize = async (sessionId) => {
  const { data } = await axios.post(`${API}/cart/finalize/${sessionId}`);
  if (data.payment_status === "paid") setCartToken(null);
  window.dispatchEvent(new CustomEvent("mpk-cart-updated"));
  return data;
};

export const formatXof = (n) => Number(n).toLocaleString("de-DE");
