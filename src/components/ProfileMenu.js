import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function ProfileMenu({ onClose }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    if (onClose) onClose();

    // Smooth redirect to home page ("/") after logout
    setTimeout(() => {
      navigate("/", { replace: true });  // <-- send to homepage not login page
    }, 150); // Optional small delay for smoother transition effect
  };

  const menuItemStyle = {
    padding: "10px 0",
    textDecoration: "none",
    color: "#FFD700",
    display: "block",
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "60px",
        right: "0px",
        backgroundColor: "#2a2a2a",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 3px 8px rgba(0,0,0,0.5)",
        zIndex: 999,
      }}
    >
      {/* Show for customers */}
      {currentUser?.email !== "tea-coffee-admin@gmail.com" && (
        <>
          <Link to="/order-history" style={menuItemStyle}>
            Order History
          </Link>
          <Link to="/cancel-order" style={menuItemStyle}>
            Cancel Order
            </Link>

        </>
      )}

      {/* Logout for everyone */}
      <p
        onClick={handleLogout}
        style={{ ...menuItemStyle, cursor: "pointer", marginTop: "10px" }}
      >
        Logout
      </p>
    </div>
  );
}

export default ProfileMenu;
