import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Logged out successfully!");
        navigate("/login");
      })
      .catch((error) => {
        alert("Logout error: " + error.message);
      });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-5 py-2 rounded mt-4"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
