import React, { useEffect, useState } from "react";
import Logo from "../components/Logo"; // ✅ Corrected relative path
import { motion } from "framer-motion";
import { db } from "../firebase";
import { DEFAULT_TRANSITION } from "../constants";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liveOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (orders.length > 0) {
        liveOrders.forEach((newOrder) => {
          const oldOrder = orders.find((o) => o.id === newOrder.id);
          if (!oldOrder) {
            toast.success(`🆕 New order from ${newOrder.customerName}`);
          }

          if (
            oldOrder &&
            oldOrder.status !== newOrder.status &&
            newOrder.status === "cancelled"
          ) {
            toast.error(`❌ ${newOrder.customerName} cancelled their order`);
          }

          if (
            oldOrder &&
            oldOrder.status !== newOrder.status &&
            newOrder.status === "completed"
          ) {
            toast.success(`✅ Order for ${newOrder.customerName} completed`);
          }
        });
      }

      setOrders(liveOrders);
    });

    return () => unsubscribe();
  }, [orders]);

  const handleComplete = async (orderId) => {
    const confirm = window.confirm(
      "Mark this order as completed? This cannot be undone."
    );
    if (!confirm) return;

    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        status: "completed",
      });
      toast.success("Order marked as completed!");
    } catch (err) {
      console.error("Error completing order:", err);
      toast.error("Failed to complete order.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{DEFAULT_TRANSITION}}
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a1a1a",
        color: "#fff",
        padding: "50px 20px",
        position: "relative",
      }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ✅ Logo top-left */}
      <Logo />

      <h1
        style={{
          textAlign: "center",
          fontSize: "3rem",
          marginBottom: "40px",
          color: "#FFD700",
        }}
      >
        Admin - All Orders
      </h1>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center", color: "#bbb" }}>No orders yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "25px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {orders.map((order) => (
            <motion.div
              key={order.id}
              whileHover={{ scale: 1.03 }}
              transition={{DEFAULT_TRANSITION}}
              style={{
                backgroundColor: "rgba(0,0,0,0.7)",
                padding: "20px",
                borderRadius: "15px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
              }}
            >
              <h3 style={{ color: "#FFD700", marginBottom: "10px" }}>
                {order.customerName}
              </h3>
              <p>📞 <strong>Phone:</strong> {order.phone}</p>
              <p>☕ <strong>Drink:</strong> {order.drinkName}</p>
              <p>🛒 <strong>Quantity:</strong> {order.quantity}</p>
              <p>💰 <strong>Total:</strong> ₹{order.totalAmount}</p>

              <p>
                📌 <strong>Status:</strong>{" "}
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
                    padding: "5px 12px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {order.status ? order.status.toUpperCase() : "PLACED"}
                </span>
              </p>

              <p style={{ fontSize: "0.9rem", color: "#aaa" }}>
                📅 Ordered on:{" "}
                {order.createdAt
                  ? new Date(order.createdAt.seconds * 1000).toLocaleString()
                  : "N/A"}
              </p>

              {order.status !== "cancelled" &&
                order.status !== "completed" && (
                  <button
                    onClick={() => handleComplete(order.id)}
                    style={{
                      marginTop: "12px",
                      padding: "10px 18px",
                      backgroundColor: "green",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Mark as Completed
                  </button>
                )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default AdminOrders;
