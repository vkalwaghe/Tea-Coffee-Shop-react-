import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Navbar() {
  const { currentUser } = useAuth();
  const location = useLocation();

  const ADMIN_EMAIL = "tea-coffee-admin@gmail.com";

  const navLinkStyle = (path) => ({
    color: location.pathname === path ? "#FFD700" : "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "20px",
    transition: "background 0.2s",
  });

  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px 0",
        gap: "20px",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 900,
        backdropFilter: "blur(8px)",
      }}
    >
      <Link to="/" style={navLinkStyle("/")}>
        Home
      </Link>
      <Link to="/menu" style={navLinkStyle("/menu")}>
        Menu
      </Link>
      <Link to="/about" style={navLinkStyle("/about")}>
        About
      </Link>
      <Link to="/contact" style={navLinkStyle("/contact")}>
        Contact
      </Link>

      {currentUser?.email === ADMIN_EMAIL && (
        <Link to="/admin/orders" style={navLinkStyle("/admin/orders")}>
          Admin Orders
        </Link>
      )}
    </div>
  );
}

export default Navbar;
