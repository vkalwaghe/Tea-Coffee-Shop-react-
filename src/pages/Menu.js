import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import Logo from "../components/Logo"; // ✅ corrected path

function Menu() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [menuItems, setMenuItems] = useState([]);

  // 🔴 Fetch menu items from Firestore on load
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "menuItems"), (snapshot) => {
      const fetchedItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenuItems(fetchedItems);
    });

    return () => unsubscribe();
  }, []);

  const handleOrder = (item) => {
    if (!currentUser) {
      alert("To place an order, please login first!");
      navigate("/login");
    } else {
      navigate("/order", {
        state: { name: item.name, price: item.price },
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: "url('/images/menu-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          zIndex: 1,
        }}
      />

      {/* Logo */}
      <Logo />

      <div style={{ position: "relative", zIndex: 2 }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: "3rem",
            marginBottom: "30px",
            color: "#FFD700",
          }}
        >
          Our Menu
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "300px",
                borderRadius: "15px",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 0 8px rgba(255,255,255,0.5)",
                cursor: "pointer",
                border: "1px solid #fff",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  width: "100%",
                  background: "rgba(0,0,0,0.7)",
                  color: "#fff",
                  padding: "15px",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{ margin: "0", fontSize: "1.4rem", color: "#FFD700" }}
                >
                  {item.name}
                </h3>
                <p style={{ margin: "5px 0 0" }}>₹{item.price}</p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: "100%",
                  background: "rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <button
                  onClick={() => handleOrder(item)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "20px",
                    border: "none",
                    backgroundColor: "#FFD700",
                    color: "#000",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  Order Now
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Menu;
