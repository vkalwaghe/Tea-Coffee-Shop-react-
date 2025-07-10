import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { motion } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Login successful:", user.email);

      // Check if admin
      if (user.email === "tea-coffee-admin@gmail.com") {
        navigate("/admin/home");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      alert(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email address to reset your password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent to your email.");
    } catch (error) {
      console.error("Password reset error:", error.message);
      alert(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        backgroundImage: "url('/login-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "30px",
          borderRadius: "15px",
          width: "350px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#FFD700", marginBottom: "20px" }}>Log In Here</h2>

        <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
          <div style={{ marginBottom: "15px" }}>
            <label>Email</label>
            <input
              type="email"
              placeholder="User Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "20px",
              border: "none",
              backgroundColor: "#FFD700",
              color: "#000",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Log In
          </button>
        </form>

        <p
          onClick={handleForgotPassword}
          style={{
            marginTop: "15px",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Forgot Password?
        </p>

        <p style={{ marginTop: "20px" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#FFD700" }}>
            Register
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

export default Login;
