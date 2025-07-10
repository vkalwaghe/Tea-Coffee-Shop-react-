import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Logo() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleLogoClick = () => {
    if (currentUser?.email === "tea-coffee-admin@gmail.com") {
      navigate("/admin/home");  // ✅ Corrected route slug if needed
    } else {
      navigate("/");
    }
  };

  return (
    <div
      onClick={handleLogoClick}
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        cursor: "pointer",
        zIndex: 999,
      }}
    >
      <img
        src="/logo.png"
        alt="Tea & Coffee Logo"
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/logo-fallback.png";  // fallback image if you have one
        }}
        style={{
          height: "50px",
          borderRadius: "8px",
          boxShadow: "0 0 8px rgba(255, 215, 0, 0.5)",
        }}
      />
    </div>
  );
}

export default Logo;
