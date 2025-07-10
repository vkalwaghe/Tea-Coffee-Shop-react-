import React from "react";
import { motion } from "framer-motion";
import Logo from "../components/Logo";
import { DEFAULT_TRANSITION } from "../constants";
function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{DEFAULT_TRANSITION}}
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/about-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        color: "#fff",
        padding: "50px 20px",
        position: "relative",
      }}
    >
      <Logo />

      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.8)",
          padding: "30px",
          borderRadius: "15px",
          maxWidth: "700px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#FFD700", marginBottom: "20px" }}>About Us</h1>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
          Welcome to Tea & Coffee Shop — your one-stop destination for a
          delightful range of freshly brewed beverages. Whether you crave a
          soothing cup of tea or a rich aromatic coffee, we promise to deliver
          quality and warmth in every cup. Our online ordering system ensures
          quick service and the perfect sip at your doorstep.
        </p>
        <p style={{ marginTop: "20px" }}>
          Proudly brewed with love ☕🍵 since 2024.
        </p>
      </div>
    </motion.div>
  );
}

export default About;
