import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "../AuthContext";
import Logo from "../components/Logo";  // ✅ corrected path

function PlaceOrder() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { name: drinkName, price } = location.state || {};

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);

  const totalAmount = price ? quantity * price : 0;

  const handleOrder = async (e) => {
    e.preventDefault();

    if (!drinkName || !price) {
      alert("No drink selected. Please go back to menu.");
      navigate("/menu");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        email: currentUser.email,
        customerName,
        phone,
        drinkName,
        price,
        quantity,
        totalAmount,
        status: "placed",
        createdAt: Timestamp.now(),
      });

      alert("Order placed successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/order-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        padding: "20px",
        position: "relative",
      }}
    >
      {/* Logo */}
      <Logo />

      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.8)",
          padding: "30px",
          borderRadius: "15px",
          width: "400px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
        }}
      >
        <h2
          style={{
            color: "#FFD700",
            marginBottom: "25px",
            textAlign: "center",
          }}
        >
          Place Your Order
        </h2>

        <form
          onSubmit={handleOrder}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            type="text"
            placeholder="Your Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="text"
            value={drinkName || ""}
            disabled
            style={{
              ...inputStyle,
              backgroundColor: "#333",
              color: "#FFD700",
            }}
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            style={inputStyle}
          />

          <div
            style={{
              textAlign: "center",
              marginTop: "10px",
              fontSize: "1.2rem",
              color: "#FFD700",
            }}
          >
            Estimated Total: ₹{totalAmount}
          </div>

          <button
            type="submit"
            style={{
              padding: "12px",
              borderRadius: "20px",
              border: "none",
              backgroundColor: "#FFD700",
              color: "#000",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "1rem",
              marginTop: "10px",
            }}
          >
            Confirm Order
          </button>
        </form>
      </div>
    </motion.div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

export default PlaceOrder;
