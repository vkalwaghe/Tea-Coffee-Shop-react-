import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileMenu from "../components/ProfileMenu";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../AuthContext";
import { motion } from "framer-motion";
import Logo from "../components/Logo";
import { DEFAULT_TRANSITION } from "../constants";
function AdminHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useAuth();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{DEFAULT_TRANSITION}}
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
        position: "relative",
      }}
    >
      {/* Logo top-left */}
      <Logo />

      {/* Profile Icon + Dropdown */}
      {currentUser && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            cursor: "pointer",
            zIndex: 999,
          }}
          onClick={toggleMenu}
        >
          <FaUserCircle size={35} color="gold" />
          {menuOpen && <ProfileMenu onClose={closeMenu} />}
        </div>
      )}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
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
          Welcome Admin
        </h1>
        <p style={{ marginBottom: "30px" }}>Manage your orders and menu here.</p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <Link to="/admin/orders">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={navButton}
            >
              See Orders
            </motion.button>
          </Link>

          <Link to="/admin-menu-manager">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={navButton}
            >
              Manage Menu
            </motion.button>
          </Link>

          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={navButton}
            >
              Customer Home
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

const navButton = {
  padding: "14px 28px",
  borderRadius: "30px",
  backgroundColor: "#FFD700",
  color: "#000",
  fontWeight: "bold",
  border: "none",
  cursor: "pointer",
  fontSize: "1.1rem",
};

export default AdminHome;
