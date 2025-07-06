import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import "../styles/register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", {
        username,
        password,
      });
      alert("Registered! Please login.");
      navigate("/login");
    } catch {
      alert("Username already exists");
    }
  };

  return (
    <div className="auth-center-container">
      <form onSubmit={handleSubmit} className="card register-form">
        <h2 style={{ color: "#ffd700", marginBottom: "1.5rem" }}>Register</h2>
        <div className="input-icon-group">
          <FaUser className="input-icon" />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="input-icon-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button
          type="submit"
          className="btn"
          style={{ width: "100%", marginTop: "1rem" }}
        >
          Register
        </button>
        <div style={{ marginTop: "1rem" }}>
          <a href="/login" className="App-link">
            Already have an account? Login
          </a>
        </div>
      </form>
    </div>
  );
}

export default Register;
