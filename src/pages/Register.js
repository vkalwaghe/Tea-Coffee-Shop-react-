import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Logo from "../components/Logo";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Registered:", userCredential.user);
        navigate("/login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div
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
        <h2 style={{ color: "#FFD700", marginBottom: "20px" }}>Register Here</h2>

        <form onSubmit={handleRegister} style={{ textAlign: "left" }}>
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
              placeholder="Create Password"
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
            Register
          </button>
        </form>

        <p style={{ marginTop: "20px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#FFD700" }}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
