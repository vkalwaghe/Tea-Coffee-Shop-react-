import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import ProfileMenu from "../components/ProfileMenu";
import { FaUserCircle } from "react-icons/fa";
import Logo from "../components/Logo";  // ✅ Corrected path — since Logo is in components
import { DEFAULT_TRANSITION } from "../constants";
function Home() {
  const { currentUser } = useAuth();
  const ADMIN_EMAIL = "tea-coffee-admin@gmail.com";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        backgroundImage: "url('/home-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        animation: "fadeIn 0.3s ease-in-out",
        position: "relative",
      }}
    >
      {/* Logo top-left */}
      <Logo />

      {/* Profile Icon */}
      {currentUser && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            cursor: "pointer",
            zIndex: 999,
          }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaUserCircle size={35} color="gold" />
          {menuOpen && <ProfileMenu onClose={() => setMenuOpen(false)} />}
        </div>
      )}

      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "40px",
          borderRadius: "20px",
          textAlign: "center",
          maxWidth: "600px",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            color: "#FFD700",
            marginBottom: "20px",
          }}
        >
          Welcome to Tea & Coffee Shop
        </h1>
        <p style={{ marginBottom: "30px" }}>Sip your happiness here! ☕🍵</p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <Link to="/menu" style={navButton}>
            Menu
          </Link>
          <Link to="/about" style={navButton}>
            About
          </Link>
          <Link to="/contact" style={navButton}>
            Contact
          </Link>

          {/* Show "Login" only when user is not logged in */}
          {!currentUser && (
            <Link to="/login" style={navButton}>
              Login
            </Link>
          )}

          {/* Show "See Orders" only for admin */}
          {currentUser?.email === ADMIN_EMAIL && (
            <Link to="/admin/orders" style={navButton}>
              See Orders
            </Link>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}

const navButton = {
  padding: "12px 24px",
  borderRadius: "30px",
  backgroundColor: "#FFD700",
  color: "#000",
  textDecoration: "none",
  fontWeight: "bold",
  transition: "{DEFAULT_TRANSITION}",
};

export default Home;
