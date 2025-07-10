import React from "react";
import { motion } from "framer-motion";
import Logo from "../components/Logo";
import { DEFAULT_TRANSITION } from "../constants";
function Contact() {
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
        <h1 style={{ color: "#FFD700", marginBottom: "20px" }}>Contact Us</h1>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
          We'd love to hear from you! Reach out for orders, suggestions or
          feedback.
        </p>
        <div style={{ marginTop: "20px", fontSize: "1rem" }}>
          📧 <strong>Email:</strong> teacoffeeshop@gmail.com
          <br />
          📞 <strong>Phone:</strong> +91 98765 43210
          <br />
          📍 <strong>Location:</strong> Shirdi, Maharashtra
        </div>

        <div style={{ marginTop: "25px" }}>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={socialLink}
          >
            Instagram
          </a>{" "}
          |{" "}
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={socialLink}
          >
            Facebook
          </a>{" "}
          |{" "}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            style={socialLink}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}

const socialLink = {
  color: "#FFD700",
  textDecoration: "none",
  fontWeight: "bold",
  margin: "0 8px",
};

export default Contact;
