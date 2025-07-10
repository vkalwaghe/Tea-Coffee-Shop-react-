import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { DEFAULT_TRANSITION } from "../constants";
import { motion } from "framer-motion";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc
} from "firebase/firestore";
import { useAuth } from "../AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CancelOrder() {
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

      // Sort client-side by createdAt descending
      fetchedOrders.sort((a, b) => {
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return b.createdAt.seconds - a.createdAt.seconds;
      });

      setOrders(fetchedOrders);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleCancel = async (orderId) => {
    const confirm = window.confirm("Are you sure you want to cancel this order?");
    if (!confirm) return;

    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        status: "cancelled",
      });
      toast.success("Order cancelled successfully!");
    } catch (err) {
      console.error("Failed to cancel order:", err);
      toast.error("Failed to cancel order.");
    }
  };

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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        color: "#fff",
        position: "relative",
      }}
    >
      <Logo />

      <ToastContainer position="top-right" autoClose={3000} />

      <h1 style={{ color: "#FFD700", marginBottom: "50px" }}>Your Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                backgroundColor: "rgba(0,0,0,0.7)",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid rgb(255, 255, 255)",
              }}
            >
              <p><strong>Drink:</strong> {order.drinkName}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>

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
                    padding: "5px 12px",
                    borderRadius: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {order.status ? order.status.toUpperCase() : "PLACED"}
                </span>
              </p>

              <p style={{ fontSize: "0.85rem", color: "#ccc", marginTop: "8px" }}>
                📅 Ordered on:{" "}
                {order.createdAt
                  ? new Date(order.createdAt.seconds * 1000).toLocaleString()
                  : "N/A"}
              </p>

              {order.status !== "cancelled" && order.status !== "completed" && (
                <button
                  onClick={() => handleCancel(order.id)}
                  style={{
                    marginTop: "10px",
                    padding: "8px 18px",
                    backgroundColor: "crimson",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default CancelOrder;
