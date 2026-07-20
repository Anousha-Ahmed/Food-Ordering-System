import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/customer/Home";
import Login from "./pages/customer/Login";
import Signup from "./pages/customer/Signup";
import Restaurants from "./pages/customer/RestaurantsItems";
import RestaurantDetail from "./components/layout/RestaurantDetail";
import Checkout from "./pages/customer/Checkout";
import SpecialOffer from "./pages/customer/SpecialOffer";
import DealDetail from "./pages/customer/DealDetail";
import CustomerProtectedRoute from "./pages/customer/CustomerProtectedRoute";
import PaymentSuccess from "./pages/customer/PaymentSuccess";
import PaymentCancel from "./pages/customer/PaymentCancel";
import Orders from "./pages/customer/Orders";
import OrderDetail from "./pages/customer/OrderDetail";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProtectedRoute from "./pages/admin/AdminProtectedRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import ManageOrders from "./pages/admin/ManageOrders";
import ManageMenu from "./pages/admin/ManageMenu";
import ManageCategories from "./pages/admin/ManageCategories";
import CategoryRestaurant from "./components/layout/CategoryRestaurant";
import ManageRestaurants from "./pages/admin/MaanageRestaurant";
import ManageDeals from "./pages/admin/ManageDeals";

const App = () => {
  return (
    <>
      <Routes>
        {/* ✅ PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ RESTAURANT ROUTES */}
        <Route
          path="/restaurants/category/:id"
          element={<CategoryRestaurant />}
        />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/offers" element={<SpecialOffer />} />
        <Route path="/offers/:id" element={<DealDetail />} />

        {/* ✅ PAYMENT ROUTES */}
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancel" element={<PaymentCancel />} />

        {/* ✅ CUSTOMER PROTECTED ROUTES */}
        <Route element={<CustomerProtectedRoute />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
        </Route>

        {/* ✅ ADMIN PROTECTED ROUTES */}
        <Route element={<AdminProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<ManageOrders />} />
            <Route path="/admin/menu" element={<ManageMenu />} />
            <Route path="/admin/categories" element={<ManageCategories />} />
            <Route path="/admin/restaurants" element={<ManageRestaurants />} />
            <Route path="/admin/deals" element={<ManageDeals />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
