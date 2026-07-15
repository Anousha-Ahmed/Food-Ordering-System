export const BASE_URL = "http://127.0.0.1:8000";

export const API = {
  // Authentication
  REGISTER: `${BASE_URL}/user/register/`,
  LOGIN: `${BASE_URL}/user/login/`,

  // Category
  ALL_CATEGORY: `${BASE_URL}/restaurants/all-category`,
  CATEGORY_DETAIL : (id) => `${BASE_URL}/restaurants/category/${id}`,

  // Restaurant
  ALL_RESTAURANT: `${BASE_URL}/restaurants/all-restaurant`,
  RESTAURANT_DETAIL: (id) => `${BASE_URL}/restaurants/restaurant/${id}`,

  // Menu
  ALL_MENUITEM: `${BASE_URL}/restaurants/all-menuitem`,
  MENUITEM_DETAIL:(id) => `${BASE_URL}/restaurants/menuitem/${id}`,

  // Deals
  ALL_DEAL: `${BASE_URL}/restaurants/all-deal/`,
  DEAL_DETAIL: (id) => `${BASE_URL}/restaurants/deal/${id}/`,

  // CART
  CART: `${BASE_URL}/order/cart/`,
  CART_ADD: `${BASE_URL}/order/cart/add/`,
  CART_UPDATE: (id) =>`${BASE_URL}/order/cart/update-item/${id}/`,
  CART_DELETE: (id) =>`${BASE_URL}/order/cart/delete-item/${id}/`,

  // Checkout
  CHECKOUT: `${BASE_URL}/order/checkout/`,
  STRIPE_CHECKOUT: `${BASE_URL}/order/stripe/checkout/`,

  // Orders
  USER_ORDERS: `${BASE_URL}/order/orders/`,
  ORDER_DETAIL: (id) => `${BASE_URL}/order/order/${id}`,
  CANCEL_ORDER: (id) => `${BASE_URL}/order/order/${id}/cancel/`,

  // Search
  SEARCH: `${BASE_URL}/restaurants/search/`,


  // =======================
// ADMIN
// =======================

// Dashboard Analytics
ADMIN_OVERVIEW: `${BASE_URL}/order/admin/analytics/overview/`,
ADMIN_ORDER_STATUS: `${BASE_URL}/order/admin/analytics/orders-by-status/`,
ADMIN_REVENUE_TIME: `${BASE_URL}/order/admin/analytics/revenue-over-time/`,
ADMIN_RESTAURANT_REVENUE: `${BASE_URL}/order/admin/analytics/revenue-by-restaurant/`,
ADMIN_POPULAR_ITEMS: `${BASE_URL}/order/admin/analytics/popular-items/`,
ADMIN_POPULAR_DEALS: `${BASE_URL}/order/admin/analytics/popular-deals/`,

// Orders
ADMIN_ORDERS: `${BASE_URL}/order/admin/orders`,
UPDATE_ORDER_STATUS: (id) =>`${BASE_URL}/order/admin/orders/${id}/status/`,

// Restaurants
CREATE_RESTAURANT: `${BASE_URL}/restaurants/create-restaurant/`,
ALL_RESTAURANTS: `${BASE_URL}/restaurants/all-restaurant`,
UPDATE_RESTAURANT: (id) =>`${BASE_URL}/restaurants/update-restaurant/${id}/`,
DELETE_RESTAURANT: (id) =>`${BASE_URL}/restaurants/delete-restaurant/${id}/`,

// Categories
CREATE_CATEGORY: `${BASE_URL}/restaurants/create-category/`,
UPDATE_CATEGORY: (id) =>`${BASE_URL}/restaurants/update-category/${id}/`,
DELETE_CATEGORY: (id) =>`${BASE_URL}/restaurants/delete-category/${id}/`,

// Menu
CREATE_MENU: `${BASE_URL}/restaurants/create-menuitem/`,
UPDATE_MENU: (id) =>`${BASE_URL}/restaurants/update-menuitem/${id}/`,
DELETE_MENU: (id) =>`${BASE_URL}/restaurants/delete-menuitem/${id}/`,

// Deals
CREATE_DEAL: `${BASE_URL}/restaurants/create-deal/`,
UPDATE_DEAL: (id) =>`${BASE_URL}/restaurants/update-deal/${id}/`,
DELETE_DEAL: (id) =>`${BASE_URL}/restaurants/delete-deal/${id}/`,
};

