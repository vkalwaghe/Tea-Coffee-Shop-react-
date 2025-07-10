import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useAuth } from "../AuthContext";
import Logo from "../components/Logo";
import { DEFAULT_TRANSITION } from "../constants";

function OrderHistory() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "orders"),
      where("email", "==", currentUser.email)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort by createdAt descending
      fetchedOrders.sort((a, b) => {
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return b.createdAt.seconds - a.createdAt.seconds;
      });

      setOrders(fetchedOrders);
    });

    return () => unsubscribe();
  }, [currentUser]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={DEFAULT_TRANSITION}
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/orderhisto-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        padding: "50px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          zIndex: 0,
        }}
      />

      <Logo />

      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "700px" }}>
        <h1
          style={{
            color: "#FFD700",
            textAlign: "center",
            fontSize: "3rem",
            marginBottom: "30px",
          }}
        >
          Order History
        </h1>

        {orders.length === 0 ? (
          <p style={{ textAlign: "center", color: "#ccc" }}>You have no orders yet.</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {orders.map((order) => (
              <motion.div
                key={order.id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  padding: "20px",
                  borderRadius: "15px",
                  border: "1px solid rgb(255, 255, 255)",
                  boxShadow: "0 5px 10px rgba(0,0,0,0.5)",
                }}
              >
                <h3 style={{ color: "#FFD700", marginBottom: "10px" }}>{order.drinkName}</h3>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                <p style={{ fontSize: "0.9rem", color: "#bbb" }}>
                  📅 Ordered on:{" "}
                  {order.createdAt
                    ? new Date(order.createdAt.seconds * 1000).toLocaleString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      backgroundColor:
                        order.status === "cancelled"
                          ? "crimson"
                          : order.status === "completed"
                          ? "green"
                          : "#FFD700",
                      color:
                        order.status === "cancelled" ||
                        order.status === "completed"
                          ? "#fff"
                          : "#000",
                      padding: "6px 14px",
                      borderRadius: "20px",
                      fontWeight: "bold",
                      fontSize: "0.95rem",
                    }}
                  >
                    {order.status ? order.status.toUpperCase() : "PLACED"}
                  </span>
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default OrderHistory;
