import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { AuthProvider, useAuth } from "./AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PlaceOrder from "./pages/PlaceOrder";
import AdminOrders from "./pages/AdminOrders";
import Menu from "./pages/Menu";
import AdminHome from "./pages/AdminHome";
import OrderHistory from "./pages/OrderHistory";
import CancelOrder from "./pages/CancelOrder";
import AdminMenuManager from "./pages/AdminMenuManager";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Navbar from "./components/Navbar"; // ✅ Navbar import here

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar /> {/* ✅ Globally visible navbar */}
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const { currentUser, loading } = useAuth();

  const ADMIN_EMAIL = "tea-coffee-admin@gmail.com";

  if (loading) {
    return (
      <div
        style={{
          color: "#FFD700",
          textAlign: "center",
          paddingTop: "60px",
          fontSize: "1.5rem",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order" element={<PlaceOrder />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* User-protected Routes */}
        <Route
          path="/order-history"
          element={currentUser ? <OrderHistory /> : <Navigate to="/login" />}
        />
        <Route
          path="/cancel-order"
          element={currentUser ? <CancelOrder /> : <Navigate to="/login" />}
        />

        {/* Admin-protected Routes */}
        <Route
          path="/admin/home"
          element={
            currentUser?.email === ADMIN_EMAIL ? (
              <AdminHome />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/orders"
          element={
            currentUser?.email === ADMIN_EMAIL ? (
              <AdminOrders />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin-menu-manager"
          element={
            currentUser?.email === ADMIN_EMAIL ? (
              <AdminMenuManager />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
